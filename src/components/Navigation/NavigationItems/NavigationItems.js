import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="#" active={true}>Burger Builder</NavigationItem>
            <NavigationItem link="#">My Basket</NavigationItem>
            <NavigationItem link="#">Past Orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems;