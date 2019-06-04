import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

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
          ingredients={this.props.ings}
          continueHandler={this.continueHandler}
          cancelHandler={this.cancelHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component = {ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
