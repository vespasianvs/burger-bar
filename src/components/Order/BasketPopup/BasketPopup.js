import React, {useContext, Fragment} from 'react';
import classes from './BasketPopup.module.css';
import Burger from '../../Burger/Burger';
import BurgerContext from '../../../hoc/burgerContext/burgerContext';

const BasketPopup = (props) => {
    const burgerContext = useContext(BurgerContext)
    let content = 'Add a burger to your basket';

    if (burgerContext.orders.length > 0) {
        content = <Fragment>
                        { burgerContext.orders.map(val => {
                            return (
                                <div className={classes.ItemRow}>
                                    <div style={{width: '100%'}} >
                                        <Burger sortable={false} ingredients={val[0]} />
                                    </div>
                                    <div>£{(val[1]/100).toFixed(2)}</div>
                                </div>
                            )
                        })}
                        <div className={classes.TotalRow}>
                            <div></div>
                            <div>£{(burgerContext.orders.reduce((total, val) => {
                                        return total+val[1]
                                    }, 0)/100).toFixed(2)}</div>
                        </div>
                        <div>
                            <button className='DefaultButton' onClick={props.order}>CHECKOUT</button>
                            <button className='CancelButton' onClick={props.cancel}>EMPTY</button>
                        </div> 
                </Fragment>         
    }

    return (
        <div className={classes.BasketPopup} >
            {content}
        </div>
    )
}

export default BasketPopup;