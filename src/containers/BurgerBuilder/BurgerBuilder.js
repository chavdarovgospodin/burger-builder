import React, { Component } from "react";
import { connect } from 'react-redux'; 
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index.js';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount () {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients) // creates an array from object
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchasedCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({ pathname: '/checkout'});
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

  let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner/>;
    if(this.props.ings) {
      burger = (
        <Aux>
               <Burger ingredients={this.props.ings} />
               <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemoved}
                  disabled={disabledInfo}
                  price={this.props.price}
                  purchasable={this.updatePurchaseState(this.props.ings)}
                  ordered={this.purchaseHandler}
              />
        </Aux>   
      );
      orderSummary = 
      <OrderSummary
      continue={this.purchasedContinueHandler}
      cancel={this.purchasedCancelHandler}
      ingredients={this.props.ings}
      price={this.props.price}
    />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasedCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
}

const mapDispatchToProps = dispatch=> {
  return {
    onIngredientAdded: (ing) => dispatch(actions.addIngredient(ing)),
    onIngredientRemoved: (ing) => dispatch(actions.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
