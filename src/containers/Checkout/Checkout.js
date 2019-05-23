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
     componentDidMount() {
         const query = new URLSearchParams(this.props.location.search);
         console.log(query.entries)
         const ingredients = {};
         for (let param of query.entries()) {
             ingredients[param[0]] = +param[1];
         }
         this.setState({ingredients: ingredients});
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