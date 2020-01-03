import React, {useContext, Fragment} from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import BurgerContext from '../../../hoc/burgerContext/burgerContext';

const CheckoutSummary = (props) => {
    const burgerContext = useContext(BurgerContext)
    let content = 'Add a burger to your basket';

    if (burgerContext.orders.length > 0) {
        content = <Fragment>
                        { burgerContext.orders.map((val, index) => {
                            return (
                                <div className={classes.ItemRow} key={index}>
                                    <div className={classes.Burger} >
                                        <Burger sortable={false} ingredients={val[0]} />
                                    </div>
                                    <div className={classes.Price}>£{(val[1]/100).toFixed(2)}</div>
                                </div>
                            )
                        })}
                        <div className={classes.TotalRow}>
                            <div className={classes.Burger}></div>
                            <div className={classes.Price}>£{(burgerContext.orders.reduce((total, val) => {
                                        return total+val[1]
                                    }, 0)/100).toFixed(2)}</div>
                        </div>
                </Fragment>         
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default CheckoutSummary;