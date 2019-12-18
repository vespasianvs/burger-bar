import React, {Component} from 'react';
import Burger from '../components/Burger/Burger';
import IngredientControls from '../components/Burger/IngredientControls/IngredientControls';
import arrayMove from 'array-move';
import BurgerContext from '../hoc/burgerContext/burgerContext'
import Modal from '../components/UI/Modal/Modal';
import Backdrop from '../components/UI/Backdrop/Backdrop';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import classes from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {
    state = {
        ingredients: [],
        totalPrice: 0,
        purchasing: false
    }

    static contextType = BurgerContext;

    ingredientTypes = [
        {displayName: "Beef Burger", type: "BeefBurger", price: 100}, 
        {displayName: "Veggie Burger", type: "VeggieBurger", price: 100},
        {displayName: "Cheese", type: "Cheese", price: 50}, 
        {displayName: "Bacon", type: "Bacon", price: 75},
        {displayName: "Lettuce", type: "Lettuce", price: 30},
        {displayName: "Tomato", type: "Tomato", price: 40}
    ];

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
        this.context.order.push([...this.state.ingredients])

        this.setState({
            ingredients: [],
            totalPrice: 0,
            purchasing: false
        });

        this.context.burger = {
            BeefBurger: 0,
            VeggieBurger: 0,
            Cheese: 0,
            Bacon: 0,
            Lettuce: 0,
            Tomato: 0
        }
    }

    render() {
        return (
            <div className={classes.BurgerBuilder}>
                <Backdrop show={this.state.purchasing} cancel={this.cancelPurchaseHandler}/>
                <Modal show={this.state.purchasing}>
                    <OrderSummary order={this.orderPurchaseHandler} cancel={this.cancelPurchaseHandler} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
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
                <IngredientControls 
                        types={this.ingredientTypes} 
                        totalPrice={this.state.totalPrice}
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        />
                <button className='DefaultButton' onClick={this.orderHandler} disabled={this.state.ingredients.length===0}>ORDER NOW</button>
            </div>
        );
    }
}

export default BurgerBuilder;