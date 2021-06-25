import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter, Switch, useLocation } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';

// import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../../containers/HomeContainer'));
const About = lazy(() => import('../../containers/AboutContainer'));
const Contact = lazy(() => import('../../containers/ContactContainer'));
const Shop = lazy(() => import('../../containers/ShopContainer'));
const PDP = lazy(() => import('../../containers/PDPContainer'));

const Routes = ({ isLoggedIn }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  return (
    <>
    <Header />
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (isLoggedIn && from) {
            return <Redirect to={from} />;
          } else {
            return <Home />;
          }
        }}
      />
      <Route
        exact
        path="/shop"
        render={() => {
          return <Shop />;
        }}
      />
      <Route
        exact
        path="/shop/product/:id"
        render={() => {
          return <PDP />;
        }}
      />
      <Route
        exact
        path="/about"
        render={() => {
          return <About />;
        }}
      />
      <Route
        exact
        path="/contact"
        render={() => {
          return <Contact />;
        }}
      />
      {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
    </Switch>
    <Footer />
    </>
  );
};

const mapStateToProps = () => {
  return {
    //isLoggedIn: authReducer.isLoggedIn,
  };
};

export default withRouter(connect(mapStateToProps)(Routes));
