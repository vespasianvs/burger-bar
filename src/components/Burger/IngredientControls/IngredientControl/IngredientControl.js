import React, {useContext} from 'react';
import classes from '../IngredientControls.module.css';
import BurgerContext from '../../../../hoc/burgerContext/burgerContext';

const IngredientControl = props => {
    const burgerContext = useContext(BurgerContext);

    return (
        <div>
            <div className={classes.Control}>
                <label>{props.name}</label>
                <label>£{(props.price/100).toFixed(2)}</label>
                <button onClick={props.addIngredient}><i className="fas fa-plus-square"></i></button>
                <button onClick={props.removeIngredient} disabled={burgerContext.burger[props.type]<1 ? true : false}><i className="fas fa-minus-square"></i></button>
                <label className={classes.Centered}>{burgerContext.burger[props.type]}</label>
                <label>£{((burgerContext.burger[props.type]*props.price)/100).toFixed(2)}</label>
            </div>
        </div>
    );
}

export default IngredientControl;