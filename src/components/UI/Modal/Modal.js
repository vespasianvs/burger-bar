import React, { memo } from 'react';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100)',
                opacity: props.show ? '1' : '0',
                display: props.show ? 'block' : 'none'
            }}>
            {props.children}
        </div>
    )
}

const shouldUpdate = (prevProps, nextProps) => {
    return prevProps.show === nextProps.show;
}

export default memo(Modal, shouldUpdate);