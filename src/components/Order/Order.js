import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    return (
        <div className={classes.Order}>
            <p>Your Ingredients: </p>
            <p>Total Price: <strong>USD</strong></p>
        </div>
    )
}

export default Order;