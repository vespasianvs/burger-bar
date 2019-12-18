import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = props => {

    return (
        <header className={classes.Toolbar}>
            <div>
                <button className={classes.MenuToggle} onClick={props.toggle}><i className="fas fa-bars"></i></button>
            </div>
            <div><Logo size="small" /></div>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;