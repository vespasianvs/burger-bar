import React from 'react';
import BurgerContext from '../burgerContext/burgerContext';

class BurgerProvider extends React.Component {
    state = {
        orders: [],
        addOrder: (newOrder, price) => 
                this.setState(prevState => { 
                    const oldOrders = prevState.orders;

                    return { orders: oldOrders.concat([[[...newOrder], price]]) }
                })
    };

    render() {
        return (
            <BurgerContext.Provider value={this.state}>
                {this.props.children}
            </BurgerContext.Provider>
        )
    }
}

export default BurgerProvider;