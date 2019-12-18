import React from 'react';
import IngredientControl from './IngredientControl/IngredientControl';
import classes from './IngredientControls.module.css';

const ingredientControls = props => {
    const controls = props.types.map((value, index) => {
                        return (
                        <IngredientControl 
                            type={value.type} 
                            name={value.displayName}
                            price={value.price}
                            index={index} 
                            key={`item-${value.type}`} 
                            addIngredient={props.addIngredient.bind(this, value.type, value.price)}
                            removeIngredient={props.removeIngredient.bind(this, value.type, value.price)} />
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