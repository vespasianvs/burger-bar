import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {
    return (
        <div className={classes.Backdrop}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100)',
                opacity: props.show ? '1' : '0',
                display: props.show ? 'block' : 'none'
            }} onClick={props.cancel}>
        </div>
    )
}

export default Backdrop;