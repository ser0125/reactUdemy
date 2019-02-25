import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
   /*  constructor(){
        super(props);
        this.state = {
        } */
        state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            openModal: false
        }
        updatePurchase(ingredients) {
            const sum = Object.keys(ingredients).map(key => {
                return ingredients[key];
            }).reduce((sum, value) => {
                return sum + value;
            }, 0);

            this.setState({
                purchasable:  sum > 0
            })


        }
        addIngredientHandler = (ingredient) => {
            const oldCount = this.state.ingredients[ingredient];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[ingredient] = updatedCount;

            const priceAddition = INGREDIENT_PRICES[ingredient];
            const oldPrice = this.state.totalPrice;
            const updatedPrice = oldPrice + priceAddition;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: updatedPrice
            })
            this.updatePurchase(updatedIngredients);
        }
        removeIngredientHandler = (ingredient) => {
          const oldCount = this.state.ingredients[ingredient];
          if(oldCount <=0){
              return;
          }
          const updatedCount = oldCount -1 ;
          const updatedIngredients = {
              ...this.state.ingredients
          }
          updatedIngredients[ingredient] = updatedCount;

          const priceDeduction = INGREDIENT_PRICES[ingredient];
          const oldPrice = this.state.totalPrice;
          const updatedPrice = oldPrice - priceDeduction;

          this.setState({
              ingredients: updatedIngredients,
              totalPrice: updatedPrice
          })
          this.updatePurchase(updatedIngredients);
        }
        orderNow = () => {
            this.setState({
                openModal: true
            });
        }
        closeModal = () => {
            this.setState({
                openModal: false
            });
        }
        purchaseContinueHandler = () => {
            alert('You continue!');
        }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        } 
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        return (
            <Aux>
                <Modal show={this.state.openModal} modalClosed={this.closeModal}>
                  <OrderSummary 
                  ingredients={this.state.ingredients}
                  purchaseCancelled= {this.closeModal}
                  purchaseContinued ={this.purchaseContinueHandler}
                  price={this.state.totalPrice}/>
                 </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls
                 ingredients={this.state.ingredients}
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
                  disabled={disabledInfo}
                  totalPrice={this.state.totalPrice}
                  purchasable={this.state.purchasable}
                  onClick={this.orderNow}/> 
            </Aux>
        );
    };

}

export default BurgerBuilder;