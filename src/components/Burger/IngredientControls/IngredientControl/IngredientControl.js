import React from 'react';
import classes from '../IngredientControls.module.css';

const IngredientControl = props => {
    return (
        <div>
            <div className={classes.Control}>
                <label>{props.name}</label>
                <label>£{(props.price/100).toFixed(2)}</label>
                <button onClick={props.addIngredient}><i className="fas fa-plus-square"></i></button>
                <button onClick={props.removeIngredient} disabled={props.count<1 ? true : false}><i className="fas fa-minus-square"></i></button>
                <label className={classes.Centered}>{props.count}</label>
                <label>£{((props.count*props.price)/100).toFixed(2)}</label>
            </div>
        </div>
    );
}

export default IngredientControl;