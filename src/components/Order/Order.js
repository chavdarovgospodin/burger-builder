import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, ammount: props.ingredients[ingredientName]});
    }
    const ingredientsOutput = ingredients.map(ig=> (
        <span style={{
        textTransform:'capitalize' ,
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc'}}
        key={ig.name}>{ig.name}({ig.ammount})</span>
    ))
    return (
        <div className={classes.Order}>
            <p>Your Ingredients: {ingredientsOutput}</p>
            <p>Total Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;