import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const SideDrawer = props => {
    return (
        <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(" ")}>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default SideDrawer;