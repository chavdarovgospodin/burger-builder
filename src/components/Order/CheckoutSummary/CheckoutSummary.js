import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary  = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.cancelHandler}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueHandler}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;