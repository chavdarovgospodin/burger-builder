import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        isPristine: true
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        isPristine: true
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code"
        },
        value: "",
        validation: {
            required: true,
            minLength: 3,
            maxLength: 5
        },
        valid: false,
        isPristine: true
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        isPristine: true
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
            required: true
        },
        valid: false,
        isPristine: true
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        valid: true,
        validation: {},
      }
    },
    isValidated: false
  };
  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let orderElement in this.state.orderForm) {
        formData[orderElement] = this.state.orderForm[orderElement];
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order);

  };

  inputChangeHandler = (event, inputIdentifier) => {
        const copiedOrderForm = {
            ...this.state.orderForm
        };
        const updatedformElement = {
            ...copiedOrderForm[inputIdentifier]
        };
       
        updatedformElement.value = event.target.value;
        updatedformElement.valid = this.checkValidation(updatedformElement.value, updatedformElement.validation)
        updatedformElement.isPristine = false;
        copiedOrderForm[inputIdentifier] = updatedformElement;
        let isValidated = true;
        for (let inputEl in copiedOrderForm) {
            isValidated = copiedOrderForm[inputEl].valid && isValidated;
        }
        this.setState({orderForm: copiedOrderForm, isValidated: isValidated});
  }
  checkValidation = (valid, rules) => {
    let isValid = true;
    if(rules.required) {
        isValid = valid.trim() !== '' && isValid;
    }
    if(rules.minLength) {
        isValid = valid.trim().length >= rules.minLength && isValid;
    }
    if(rules.maxLength) {
        isValid = valid.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangeHandler(event,formElement.id)}
            validation = {!formElement.config.valid}
            isPristine = {formElement.config.isPristine}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.isValidated}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
