import React, {Component} from 'react';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import BurgerProvider from '../BurgerProvider/BurgerProvider';

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
            <BurgerProvider>
                <Toolbar toggle={this.toggleSideDrawerHandler} />
                <SideDrawer show={this.state.sideDrawerVisible} />
                <Backdrop show={this.state.sideDrawerVisible} cancel={this.cancelSidebarHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </BurgerProvider>
        );
    }
}

export default layout;