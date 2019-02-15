import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients) // ["salad", "bacon", "cheese", "meat"]
    .map(key => {
        //props.ingredients[key] = 1,1,2,2
        return [...Array(props.ingredients[key])].map((_,i) => { // [undefined],[undefined],[undefined,undefined],[undefined,undefined]
            return <BurgerIngredient key={key + i} type={key} /> 
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if(transformIngredients.length === 0){
        transformIngredients = <p>Please start adding the ingredients!</p>;
    }
    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top"/>
            {transformIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;