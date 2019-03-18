import React, { Component } from 'react';
import ReactAux from '../../../hoc/Auxiliar/ReactAux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be a functional component.
    componentWillUpdate () {
        console.log('[OrderSummary] Will update');
        
    }
    
    render () {        
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(key => {
        return <li key={key}>
            <span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
            </li>
    });

    return (
        <ReactAux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button children="CANCEL" btnType="Danger" click={this.props.purchaseCancelled}/>
            <Button children="CONTINUE" btnType="Success" click={this.props.purchaseContinued}/>
        </ReactAux>
    )
}
}

export default OrderSummary;