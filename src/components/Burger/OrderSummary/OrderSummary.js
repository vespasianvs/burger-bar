import React from 'react';
import Burger from '../Burger';

const OrderSummary = (props) => {
    return (
        <div>
            <h1>Your Order</h1>
            <div style={{width:'50%', margin: '0 auto'}} >
                <Burger sortable={false} ingredients={props.ingredients} />
            </div>
            <div>Total Cost: £{(props.totalPrice/100).toFixed(2)}</div>
            <div>
                <button className='DefaultButton' onClick={props.order}>ORDER NOW</button>
                <button className='CancelButton' onClick={props.cancel}>CANCEL</button>
            </div>
        </div>
    );
}

export default OrderSummary;