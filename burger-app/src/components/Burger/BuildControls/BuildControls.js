import React from 'react'; 
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const buildControls = (props) => {
    const controls = Object.keys(props.ingredients).map(key => {
        return  <BuildControl
         added={() => props.ingredientAdded(key)}
         removed={() => props.ingredientRemoved(key)}
         disabled = {props.disabled[key]}
         key={key}
          label={key}/>
    });
       return (
           <div className={classes.BuildControls}>
           <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
           {controls}
           <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
           </div>
           );
    
}

export default buildControls;