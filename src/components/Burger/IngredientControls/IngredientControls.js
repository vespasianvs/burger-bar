import React from 'react';
import IngredientControl from './IngredientControl/IngredientControl';
import classes from './IngredientControls.module.css';

const ingredientControls = props => {
    const controls = Object.entries(props.types).map((value, index) => {
                        return (
                        <IngredientControl 
                            type={value[0]} 
                            name={value[1].displayName}
                            price={value[1].price}
                            index={index} 
                            count={props.ingredients.filter(val => val === value[0]).length}
                            key={`item-${value[0]}`} 
                            addIngredient={props.addIngredient.bind(this, value[0], value[1].price)}
                            removeIngredient={props.removeIngredient.bind(this, value[0], value[1].price)} />
                        )
                    })

    return (
        <div className={classes.ControlGroup}>
            <div className={classes.Control}>
                        <strong>Item</strong>
                        <strong>Cost</strong>
                        <div></div>
                        <div></div>
                        <strong>Quantity</strong>
                        <strong>Cost</strong>
            </div>
            {controls}
            <div className={classes.Control + " " + classes.Last}>
                        <strong></strong>
                        <strong></strong>
                        <div></div>
                        <div></div>
                        <strong>Total:</strong>
                        <strong>£{(props.totalPrice/100).toFixed(2)}</strong>
            </div>
        </div>
    )
}

export default ingredientControls;