import React, {Fragment, Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import classes from './withErrorHandler.module.css';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        constructor(props) {
            super(props);

            axiosInstance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })

            axiosInstance.interceptors.response.use(null, error => {
                this.setState({error: error});
                return Promise.reject(error);
            })
        }

        state = {
            error: null
        }

        cancelErrorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Backdrop show={this.state.error} cancel={this.cancelErrorHandler}/>
                    <Modal show={this.state.error} cancel={this.cancelErrorHandler} myStyle={{zIndex: 1000, top: '40%'}}>
                        <div className={classes.errorInfo}>
                            {this.state.error ? this.state.error.message : null}
                            <div>
                                <button className='CancelButton' onClick={this.cancelErrorHandler}>CLOSE</button>
                            </div>
                        </div>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
            }
    }
}

export default withErrorHandler;