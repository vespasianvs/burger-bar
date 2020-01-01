import React, {useContext} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import BurgerContext from '../../../hoc/burgerContext/burgerContext';
import BasketPopup from '../../Order/BasketPopup/BasketPopup';

const NavigationItems = props => {
    let burgerContext = useContext(BurgerContext)
    
    let basketSize = null;

    if (burgerContext.orders.length > 0) basketSize = '(' + burgerContext.orders.length + ')';

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="#" active={true}>Burger Builder</NavigationItem>
            <NavigationItem link="#">My Basket {basketSize}<div><BasketPopup/></div></NavigationItem>
            <NavigationItem link="#">Past Orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems;