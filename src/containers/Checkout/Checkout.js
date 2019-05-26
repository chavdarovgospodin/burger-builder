import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.entries);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[0];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }
  continueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };
  cancelHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
          <h1 style={{textAlign: 'center'}}>A delicious Burger!</h1>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continueHandler={this.continueHandler}
          cancelHandler={this.cancelHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
        />
      </div>
    );
  }
}

export default Checkout;
