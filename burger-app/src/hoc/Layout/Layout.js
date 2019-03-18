import React, { Component } from 'react';
import ReactAux from '../Auxiliar/ReactAux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    SideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
        SideDrawerToggle = () => {
            this.setState(( prevState ) => {
               return { showSideDrawer: !prevState.showSideDrawer }
            })
    }
    render() {
        return (
            <ReactAux>
                <Toolbar drawerToggleClicked={this.SideDrawerToggle}/>
                <SideDrawer
                 open={this.state.showSideDrawer}
                 close={this.SideDrawerCloseHandler}/>
                <main className={classes.Content}>
                {this.props.children}
                </main>
            </ReactAux>
            )
        }
    }

export default Layout;