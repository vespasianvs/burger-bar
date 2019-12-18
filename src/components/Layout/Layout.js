import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';

class layout extends Component {
    state = {
        sideDrawerVisible: false
    }
    
    toggleSideDrawerHandler = event => {
        this.setState((prevState, props) => {
            return {
                sideDrawerVisible: !prevState.sideDrawerVisible
            }
        })
    }

    cancelSidebarHandler = (event) => {
        this.setState({sideDrawerVisible: false});
    }

    render() {
        return (
            <Fragment>
                <Toolbar toggle={this.toggleSideDrawerHandler} />
                <SideDrawer show={this.state.sideDrawerVisible} />
                <Backdrop show={this.state.sideDrawerVisible} cancel={this.cancelSidebarHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default layout;