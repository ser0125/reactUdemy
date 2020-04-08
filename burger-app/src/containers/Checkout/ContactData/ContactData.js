import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from "react-redux";
import * as actionTypes from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementtype: 'input',
          elementconfig: {
            type: 'text',
            placeholder: 'Your name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementtype: 'input',
          elementconfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementtype: 'input',
          elementconfig: {
            type: 'text',
            placeholder: 'ZIP Code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        country: {
          elementtype: 'input',
          elementconfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementtype: 'input',
          elementconfig: {
            type: 'email',
            placeholder: 'Your E-Mail'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementtype: 'select',
          elementconfig: {
            options: [{value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}]
          },
          value: 'fastest',
          validation: {},
          valid: true
        },
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for(let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.burgerPurchase(this.props.token, orders);
  };
  inputChangedHandler = (event, inputId) => {
 
    const updatedFormElement = 
    updateObject(this.state.orderForm[inputId], {
      value:  event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormElement
    });
    let formIsValid = true;
    for(let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }


    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    };

    let form = (
      <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => {
            return <Input key={formElement.id}
            elementtype={formElement.config.elementtype} 
            elementconfig={formElement.config.elementconfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=> this.inputChangedHandler(event, formElement.id)}/>
          })}
          <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button> 
        </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
       <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    burgerPurchase: (token, orderData) => dispatch(actionTypes.burgerPurchase(token, orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));