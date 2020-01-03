import React from 'react';
import classes from './FormInput.module.css';

const FormInput = (props) => {
    let element = null;
    let inputClasses = [classes.InputElement];
    
    if(props.error) inputClasses.push(classes.HasError);

    switch(props.inputType) {
        case 'input':
            element = (
                <div className={classes.formRow}>
                    <label htmlFor={props.name}>{props.elementConfig.placeholder}</label>
                    <input 
                        className={inputClasses.join(' ')}
                        value={props.value}
                        type={props.elementConfig.type} 
                        placeholder={props.elementConfig.placeholder} 
                        name={props.name} 
                        onChange={props.changed}
                        onBlur={props.blur}></input>
                </div>
            )
            break;
        case 'dropdown':
            element = (
                <div className={classes.formRow}>
                    <label htmlFor={props.name}>{props.elementConfig.placeholder}</label>
                    <select className={inputClasses.join(' ')} name={props.name} placeholder={props.elementConfig.placeholder} onChange={props.changed} onBlur={props.blur} value={props.value}>
                        <option key="empty" value=""></option>
                        {Object.keys(props.elementConfig.options).map((key, i) => {
                            return <option key={key} value={key}>{props.elementConfig.options[key]}</option>
                        })}                    
                    </select>
                </div>
            )
            break;
        default:
            element = null;
    }

    return element;
}

export default FormInput;