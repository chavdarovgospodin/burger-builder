import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  //GLOBAL CONSTANT
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    errorState: false
  };
  componentDidMount () {
    axios.get('https://react-my-burger-79d89.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error=> {
        this.setState({errorState: true});
      })
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

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIgredients = {
      ...this.state.ingredients
    };

    updatedIgredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIgredients });
    this.updatePurchaseState(updatedIgredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIgredients = {
      ...this.state.ingredients
    };

    updatedIgredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIgredients });
    this.updatePurchaseState(updatedIgredients);
  };

  purchasedCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Kokorcho',
        adress: {
          street: 'Undercity',
          zipCode: '123',
          country: 'Azeroth'
        },
        email: 'kokorcho@abv.bg'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
          this.setState({loading:false ,purchasing:false});
          console.log(response);
      })
        .catch(error=> {
          this.setState({loading:false ,purchasing:false});
        })
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

  let burger = this.state.errorState ? <p>Ingredients cannot be loaded</p> : <Spinner/>;
    if(this.state.ingredients) {
      burger = (
        <Aux>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
                  disabled={disabledInfo}
                  price={this.state.totalPrice}
                  purchasable={this.state.purchasable}
                  ordered={this.purchaseHandler}
              />
        </Aux>   
      );
      orderSummary = 
      <OrderSummary
      continue={this.purchasedContinueHandler}
      cancel={this.purchasedCancelHandler}
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
    />
    }
    if(this.state.loading) {
      orderSummary = <Spinner/>;
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

export default withErrorHandler(BurgerBuilder, axios);
