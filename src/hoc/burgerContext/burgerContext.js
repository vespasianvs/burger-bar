import React from 'react';

const burgerContext = React.createContext({
    burger: {
        BeefBurger: 0,
        VeggieBurger: 0,
        Cheese: 0,
        Bacon: 0,
        Lettuce: 0,
        Tomato: 0
    },
    order: []
});

export default burgerContext;