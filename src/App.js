import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>      
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/orders" component={Orders}/>
              <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
