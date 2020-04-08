import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import ReactAux from '../../../hoc/Auxiliar/ReactAux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <ReactAux>
        <Backdrop show={props.open} clicked={props.close}/>
        <div className={attachedClasses.join(' ')} onClick={props.close}>
        <div className={classes.Logo}>
            <Logo />
        </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </ReactAux>
    );
}

export default sideDrawer;