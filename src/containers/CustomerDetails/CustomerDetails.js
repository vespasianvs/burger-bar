import React, {Component, Fragment} from 'react';
import classes from './CustomerDetails.module.css';
import Firebase from 'firebase/app';
import 'firebase/database';
import FormInput from '../../components/UI/FormInput/FormInput';
import { TraceSpinner } from 'react-spinners-kit';
import BurgerContext from '../../hoc/burgerContext/burgerContext';

class CustomerDetails extends Component {

    state = {
        form: null
    }

    static contextType = BurgerContext;

    checkValidity(value, objValidation) {
        let isValid = true;

        if(objValidation.required) isValid = value.length>0 && isValid
        if(objValidation.regex) {
            let regex = new RegExp(objValidation.regex);
            isValid = regex.test(value) && isValid
        }

        return isValid
    }  

    orderHandler = (e) => {
        let formData = {};
        let isValid = true;
        const form = this.state.form;
                
        e.preventDefault();
      
        for (let childId in form) {
            if(form[childId].valid) formData[childId] = form[childId].value ? form[childId].value : "";
            else {
                isValid = false;

                this.setState(prevState => {
                    let updatedForm = {...prevState.form}
                    let updatedElement = {...updatedForm[childId]};
                    updatedElement.touched = true;
                    updatedForm[childId] = updatedElement;

                    return {
                        form: updatedForm
                    }
                })
            }
        }

        if (isValid) {
            formData["orders"] = this.context.orders;

            Firebase.database().ref('orders/'+form["email"].value.replace(/[.#$[\]]/g, "")+"/"+Date.now()).set({
                order: formData
            });

            this.props.history.push('/OrderComplete');
        }
        return false;
    }

    inputChangedHandler = (elementId, event) => {
        const formVal = event.target.value;

        this.setState(prevState => {
            const updatedForm = { ...prevState.form };
            const updatedElement = { ...updatedForm[elementId] };

            updatedElement.value = formVal;
            updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.elementConfig.validation);
            updatedForm[elementId] = updatedElement;

            return {
                form: updatedForm
            }
        })
    }

    inputBlurHandler = (elementId, event) => {
        this.setState(prevState => {
            const updatedForm = { ...prevState.form };
            const updatedElement = { ...updatedForm[elementId] };

            updatedElement.touched = true;
            updatedForm[elementId] = updatedElement;

            return {
                form: updatedForm
            }
        })
    }

    componentDidMount = () => {
        let ref = Firebase.database().ref("formSchema");
        ref.once("value").then(snapshot => {
            const dataObj = snapshot.exportVal();

            const data = Object.entries(dataObj);
            data.forEach(val => {
                val[1].value = ""
                val[1].valid = false;
                val[1].touched = false;
            })
        
            this.setState({ form: dataObj }) 
        })
    }

    render() {
        let form = <div className={classes.TraceSpinner}><TraceSpinner frontColor='#5C2E00' backColor='#DF8600' /></div>;

        if (this.state.form) {
            const data = Object.entries(this.state.form);
            data.sort((a, b) => { 
                let n = a[1].group - b[1].group;

                if (n) return n;
                else return a[1].order - b[1].order 
            })

            let group = 0;
            form = data.map((val, key) => {
                let elem = null;

                if (group !== val[1].group) {
                    elem = <h3>{val[1].groupName}</h3>
                }

                group = val[1].group

                let showError = !val[1].valid && val[1].touched && val[1].elementConfig.validation !== null

                return (
                    <Fragment key={val[0]} >
                        {elem}
                        <FormInput
                            value={val[1].value}
                            inputType={val[1].elementType} 
                            name={val[0]} elementConfig={val[1].elementConfig} 
                            changed={this.inputChangedHandler.bind(this, val[0])}
                            blur={this.inputBlurHandler.bind(this, val[0])} 
                            error={showError}
                            />
                    </Fragment>
                )
            })
        }
        return (
            <Fragment>
                <h1>Enter your details</h1>
                <form id="frmCustomerDetails" onSubmit={this.orderHandler}>
                    {form}
                    <div>
                        <button className='DefaultButton'>ORDER</button>
                        <button className='CancelButton' onClick={this.toggleHandler}>BACK</button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default CustomerDetails