import React, { Component } from 'react';
import ReactAux from '../../hoc/Auxiliar/ReactAux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import axios from '../../axios-order';


export class BurgerBuilder extends Component {
   /*  constructor(){
        super(props);
        this.state = {
        } */
        state = {
            openModal: false
        }

        componentDidMount() {
            this.props.initIngredients();
        }
        updatePurchase(ingredients) {
            const sum = Object.keys(ingredients).map(key => {
                return ingredients[key];
            }).reduce((sum, value) => {
                return sum + value;
            }, 0);
            return sum > 0;
        }
        orderNow = () => {
            if(this.props.isAuthenticated){
                this.setState({
                    openModal: true
                });
            } else {
                this.props.onSetAuthRedirectPath('/checkout');
                this.props.history.push('/auth');
            }
        }
        closeModal = () => {
            this.setState({
                openModal: false
            });
        }

        purchaseContinueHandler = () => {
            this.props.onInitPurchase();
            this.props.history.push('/checkout');
        }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        } 
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(this.props.ingredients) {
            burger =(
            <ReactAux>
            <Burger ingredients={this.props.ingredients}/>
            <BurgerControls
             ingredients={this.props.ingredients}
              ingredientAdded={this.props.addIngredient}
              ingredientRemoved={this.props.removeIngredient}
              disabled={disabledInfo}
              isAuth={this.props.isAuthenticated}
              totalPrice={this.props.totalPrice}
              purchasable={this.updatePurchase(this.props.ingredients)}
              onClick={this.orderNow}/> 
              </ReactAux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.props.ingredients}
            purchaseCancelled= {this.closeModal}
            purchaseContinued ={this.purchaseContinueHandler}
            price={this.props.totalPrice}/>;
            }

            if(this.state.loading) {
                orderSummary = <Spinner />;
            }

        return (
            <ReactAux>
                <Modal show={this.state.openModal} modalClosed={this.closeModal}>
                {orderSummary}
                 </Modal>
                {burger}
            </ReactAux>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingredientName) => dispatch(actionTypes.addIngredient({ingredientName: ingredientName})),
        removeIngredient: (ingredientName) => dispatch((actionTypes.removeIngredient({ingredientName: ingredientName}))),
        initIngredients: () => dispatch((actionTypes.initIngredients())),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));