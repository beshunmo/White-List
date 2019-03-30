import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { PAGES } from './pages';
import App from '../components/app/app';
import HomePage from '../components/home-page/home-page';
import CartPage from '../components/cart/cart';
import Page404 from '../components/page404/page404';
import Login from '../components/login';
import CardProduct from '../components/card-product/card-product';
import BigProduct from '../components/big-product/big-product';
import Profile from '../components/profile/profile';


const WrappedApp = (Component, props) => (
  <App appName='GoodPrice'>
    <Component { ...props } />
  </App>
);

export default () => (
  <Switch>
    <Route
      exact path={ PAGES.card.path }
      render={ props => WrappedApp(HomePage, props) }
    />
    <Route
    exact path={ PAGES.home.path }
      render={ props => WrappedApp(HomePage, props) }
    />
    <Route
    exact path={ PAGES.profile.path }
      render={ props => WrappedApp(Profile, props) }
    />
    <Route
       path={ PAGES.BigProduct.path }
      render={ props => WrappedApp(BigProduct, props) }
    />
    <Route
      exact path={ PAGES.cart.path }
      render={ props => WrappedApp(CartPage, props) }
    />
    <Route
      exact path={ PAGES.page404.path }
      render={ props => WrappedApp(Page404, props) }
    />
      <Route
        exact path={ PAGES.login.path }
        render={ props => WrappedApp(Login, props) }
      />
    <Route
      path = '/'
      render={ () => (
        <Redirect to={ PAGES.page404.path } />
      ) }
    />
  </Switch>
);
