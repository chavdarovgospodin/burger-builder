import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
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
    let summary = <Redirect to='' />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary =(
        <div>
          {purchasedRedirect}
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
      )
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}



export default connect(mapStateToProps)(Checkout);
