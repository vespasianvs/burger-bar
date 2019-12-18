import React from 'react';
import LogoImage from '../../../assets/burger-logo.png';
import classes from './Logo.module.css';

const Logo = props => {
    return (
        <img className={classes[props.size]} src={LogoImage} alt="Burger Builder Bar Logo" />
    );
}

export default Logo;