import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
     }
     continueHandler = () => {
        this.props.history.push('/checkout/aaaa');
     }
     cancelHandler = () => {
        this.props.history.goBack();
     }
     render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                continueHandler= {this.continueHandler}
                cancelHandler={this.cancelHandler}/>
            </div>
        )
    }
    }

export default Checkout;