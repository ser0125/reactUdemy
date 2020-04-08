import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';


const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount (){
    this.props.onAuthCheckState();
  }
  
  render() {
    let routes = (
      <Switch>
      <Route path='/auth' component={asyncAuth} /> 
      <Route path='/logout' component={Logout} /> 
      <Route path='/' exact component={BurgerBuilder} /> 
      <Redirect to='/' />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path='/checkout' component={asyncCheckout} /> 
            <Route path='/orders' component={asyncOrders} /> 
            <Route path='/logout' component={Logout} /> 
            <Route path='/' exact component={BurgerBuilder} /> 
            <Route path='/auth' component={asyncAuth} /> 
            <Redirect to='/' />
        </Switch>
      );
    }

    return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
}

const mapStateToPros = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToPros, mapDispatchToProps)(App));
