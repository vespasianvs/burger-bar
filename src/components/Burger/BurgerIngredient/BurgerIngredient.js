import React, {Component} from 'react';
import classes from './BurgerIngredient.module.css';
import {SortableElement} from 'react-sortable-hoc';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    
    render() {
        return (
            <div className={classes[this.props.type]}></div>
        );
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string,
    key: PropTypes.string,
    index: PropTypes.number,
    disabled: PropTypes.bool
}

export default SortableElement(BurgerIngredient);