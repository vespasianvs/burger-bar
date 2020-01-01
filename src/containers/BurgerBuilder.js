import React, {Component} from 'react';
import Burger from '../components/Burger/Burger';
import IngredientControls from '../components/Burger/IngredientControls/IngredientControls';
import arrayMove from 'array-move';
import BurgerContext from '../hoc/burgerContext/burgerContext'
import Modal from '../components/UI/Modal/Modal';
import Backdrop from '../components/UI/Backdrop/Backdrop';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import classes from './BurgerBuilder.module.css';
import AxiosDB from '../axiosDB';
import { TraceSpinner } from 'react-spinners-kit';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

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
        AxiosDB.get('https://burger-bar-b2f01.firebaseio.com/ingredients.json')
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
            this.context.burger[ingredient]+=1;

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
                this.context.burger[ingredient]-=1;

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

        this.setState({loading: true})

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: "Andy Cork",
                address: {
                    house: "12",
                    street: "Letsby Avenue",
                    city: "Tinkertown",
                    postcode: "TT23 6BY"
                },
                telephone: "01234 787657",
                email: "andy@tinkertown.com"
            },
            deliveryMethod: "JustEat"
        }
        
        AxiosDB.post('/orders.json', order)
            .then(response => {
                console.log(response)
        
                this.context.burger = {
                    BeefBurger: 0,
                    VeggieBurger: 0,
                    Cheese: 0,
                    Bacon: 0,
                    Lettuce: 0,
                    Tomato: 0
                }

                this.setState({
                    ingredients: [],
                    totalPrice: 0,
                    purchasing: false,
                    loading:false
                });
            })
            .catch(error => {
                this.setState({
                    loading:false
                });
                console.error(error);
            })
    }

    render() {
        let orderSummary = <OrderSummary order={this.orderPurchaseHandler} cancel={this.cancelPurchaseHandler} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
        let burgerControls = (<IngredientControls 
                                types={this.state.ingredientTypes} 
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
                <BurgerContext.Provider 
                    value={{
                        burger: {
                            BeefBurger: 0,
                            VeggieBurger: 0,
                            Cheese: 0,
                            Bacon: 0,
                            Lettuce: 0,
                            Tomato: 0
                        },
                        order: []
                    }} >
                    <Burger ingredients={this.state.ingredients} onSortEnd={this.onSortEnd} />
                </BurgerContext.Provider>
                {burgerControls}
                <button className='DefaultButton' onClick={this.orderHandler} disabled={this.state.ingredients.length===0}>ORDER NOW</button>
            </div>
        );
    }
}

export default withErrorHandler(BurgerBuilder, AxiosDB);