import React from 'react';
import classes from './Burger.css'
import BurgerIngrediant from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // eslint-disable-next-line array-callback-return
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // eslint-disable-next-line no-unused-expressions
              return  <BurgerIngrediant key ={igKey +i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)   
        },[]);
        
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding Ingredients</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top"/>
            {transformedIngredients}
            <BurgerIngrediant type="bread-bottom"/>
        </div>
    );
};

export default burger;