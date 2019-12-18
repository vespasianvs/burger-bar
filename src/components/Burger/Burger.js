import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {SortableContainer} from 'react-sortable-hoc';
import classes from './Burger.module.css';

const burger = props => {
    let burgerIngredients = null;

    if (props.ingredients.length === 0) {
        burgerIngredients = <h2>Choose some ingedients for your burger!</h2>
    } else {
        burgerIngredients = props.ingredients.map((ingredient, index) => {
            return <BurgerIngredient 
                        key={`item-${ingredient}-${index}`} 
                        index={index} 
                        type={ingredient}
                        disabled={false}
                        />;
        })
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient 
                key="BunTop" 
                type="BunTop"
                collection="Buns"
                index={0}
                disabled={true}
            />
            {burgerIngredients}
            <BurgerIngredient 
                key="BunBottom" 
                type="BunBottom"
                collection="Buns"
                index={1}
                disabled={true}
            />
            <strong>Drag ingredients around to stack your burger YOUR way!</strong>
        </div>
)}

export default SortableContainer(burger);