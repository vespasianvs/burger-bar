import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.module.css';
import BurgerContext from '../../hoc/burgerContext/burgerContext';
import {Route} from 'react-router-dom';
import CustomerDetails from '../CustomerDetails/CustomerDetails';

class Checkout extends Component {

    static contextType = BurgerContext;

    clearBasketHandler = () => {
        this.context.clearOrders();
    }

    nextHandler = () => {
        this.props.history.push(this.props.match.url + '/CustomerDetails')
    }

    render() {
        let buttons = null;

        if(this.context.orders.length > 0) {
            buttons =   (<div>
                            <button className='DefaultButton' onClick={this.nextHandler}>NEXT</button>
                            <button className='CancelButton' onClick={this.clearBasketHandler}>EMPTY BASKET</button>
                        </div>)
        }

        return (
            <div className={classes.Checkout}>
                <Fragment>
                    <h1>Check your order</h1>
                    <CheckoutSummary />
                    {buttons}
                    <Route path={this.props.match.url + '/CustomerDetails'} exact component={CustomerDetails} />
                </Fragment>           
            </div>
        )
    }
}

export default Checkout