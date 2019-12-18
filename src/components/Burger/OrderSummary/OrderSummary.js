import React from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import {SortableContainer} from 'react-sortable-hoc';
import classes from './OrderSummary.module.css';

const OrderSummary = (props) => {
    return (
        <div>
            <h1>Your Order</h1>
            <div className={classes.Burger}>
                <BurgerIngredient 
                    key="BunTop" 
                    type="BunTop"
                    collection="Buns"
                    index={0}
                    disabled={true}
                />
                {props.ingredients.map((ingredient, index) => {
                    return <BurgerIngredient 
                                key={`item-${ingredient}-${index}`} 
                                index={index} 
                                type={ingredient}
                                disabled={true}
                                />;
                })}
                <BurgerIngredient 
                    key="BunBottom" 
                    type="BunBottom"
                    collection="Buns"
                    index={1}
                    disabled={true}
                />
            </div>
            <div>Total Cost: £{(props.totalPrice/100).toFixed(2)}</div>
            <div>
                <button className='DefaultButton' onClick={props.order}>ORDER NOW</button>
                <button className='CancelButton' onClick={props.cancel}>CANCEL</button>
            </div>
        </div>
    );
}

export default SortableContainer(OrderSummary);