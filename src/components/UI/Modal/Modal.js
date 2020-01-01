import React, { memo } from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <div className={classes.Modal}
            style={{ ...props.myStyle, 
                transform: props.show ? 'translateY(0)' : 'translateY(-100)',
                opacity: props.show ? '1' : '0',
                display: props.show ? 'block' : 'none'
            }}>
            <div className={classes.TopBar}>
                <button className='CloseX' onClick={props.cancel}>X</button>
            </div>
            {props.children}
        </div>
    )
}

const shouldUpdate = (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && nextProps.children === prevProps.children;
}

export default memo(Modal, shouldUpdate);