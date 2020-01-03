import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import IngredientControls from '../../components/Burger/IngredientControls/IngredientControls';
import arrayMove from 'array-move';
import BurgerContext from '../../hoc/burgerContext/burgerContext'
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import classes from './BurgerBuilder.module.css';
import AxiosDB from '../../axiosDB'
import { TraceSpinner } from 'react-spinners-kit';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

    state = {
        ingredients: [],
        ingredientTypes: [],
        totalPrice: 0,
        purchasing: false,
        loading: true,
        error: null
    }
    
    static contextType = BurgerContext;

    componentDidMount() {
        AxiosDB.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredientTypes: response.data,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({error:error, loading: false})
            })
    }

    addIngredientHandler = (ingredient, price, event) => {
        this.setState((prevState, props) => {
            prevState.ingredients.splice(0, 0, ingredient);

            return {
                ingredients: prevState.ingredients,
                totalPrice: prevState.totalPrice+price
            }
        });
    }

    removeIngredientHandler = (ingredient, price, event) => {
        this.setState((prevState, props) => {
            const index = prevState.ingredients.indexOf(ingredient);

            if(index >= 0) {
                prevState.ingredients.splice(index, 1);

                return {
                    ingredients: prevState.ingredients,
                    totalPrice: prevState.totalPrice-price
                }
            } else {
                return {};
            }
        });
    }

    orderHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({ingredients}) => ({
            ingredients: arrayMove(ingredients, oldIndex, newIndex),
        }));
    };

    cancelPurchaseHandler = (event) => {
        this.setState({purchasing: false});
        event.stopPropagation();
    }

    orderPurchaseHandler = () => {
            this.context.addOrder(this.state.ingredients, this.state.totalPrice)

            this.setState({
                ingredients: [],
                totalPrice: 0,
                purchasing: false,
                loading:false
            });
    }

    render() {console.log(this.props);
        let orderSummary = <OrderSummary order={this.orderPurchaseHandler} cancel={this.cancelPurchaseHandler} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
        let burgerControls = (<IngredientControls 
                                types={this.state.ingredientTypes} 
                                ingredients={this.state.ingredients}
                                totalPrice={this.state.totalPrice}
                                addIngredient={this.addIngredientHandler} 
                                removeIngredient={this.removeIngredientHandler}
                                />)
        if (this.state.loading) {
            orderSummary = <div className={classes.TraceSpinner}><TraceSpinner frontColor='#5C2E00' backColor='#DF8600' /></div>
            burgerControls = <div className={classes.TraceSpinner}><TraceSpinner frontColor='#5C2E00' backColor='#DF8600' /></div>
        }

        if (this.state.error) {
            burgerControls = <div>Could not load the ingredients: {this.state.error.message}</div>
        }

        return (
            <div className={classes.BurgerBuilder}>
                <Backdrop show={this.state.purchasing} cancel={this.cancelPurchaseHandler}/>
                <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                <div className={classes.BurgerContainer}>
                    <Burger sortable={true} ingredients={this.state.ingredients} onSortEnd={this.onSortEnd} />
                </div>
                <strong>Drag ingredients around to stack your burger YOUR way!</strong>
                {burgerControls}
                <button className='DefaultButton' onClick={this.orderHandler} disabled={this.state.ingredients.length===0}>ORDER NOW</button>
            </div>
        );
    }
}

export default withErrorHandler(BurgerBuilder, AxiosDB);