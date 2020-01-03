import React, {useContext} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import BurgerContext from '../../../hoc/burgerContext/burgerContext';
import BasketPopup from '../../Order/CheckoutSummary/CheckoutSummary';
import {useHistory} from 'react-router-dom';

const NavigationItems = props => {
    let burgerContext = useContext(BurgerContext)

    const history = useHistory();
    const checkoutHandler = () => {
        history.push('/OrderSummary') ;           
    }

    const clearBasketHandler = (e) => {
        e.preventDefault();
        burgerContext.clearOrders();
    }
    
    let basketSize = null;
    let buttons = null;

    if (burgerContext.orders.length > 0) {
        basketSize = '(' + burgerContext.orders.length + ')';

        buttons =   (<div>
                        <button className='DefaultButton' onClick={checkoutHandler}>CHECKOUT</button>
                        <button className='CancelButton' onClick={clearBasketHandler}>EMPTY</button>
                    </div>)
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/Build" exact active={true}>Burger Builder</NavigationItem>
            <NavigationItem link="/OrderSummary" exact>My Basket {basketSize}
                <div>
                    <BasketPopup/>
                    {buttons}
                </div>
            </NavigationItem>
            <NavigationItem link="/PastOrders" exact>Past Orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems;