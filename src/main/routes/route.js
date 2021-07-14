import React, { lazy } from "react";
import {
  Redirect,
  Route,
  withRouter,
  Switch,
  useLocation,
} from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Checkout from "../../containers/CheckoutContainer";
import PropTypes from "prop-types";

const Home = lazy(() => import("../../containers/HomeContainer"));
const About = lazy(() => import("../../containers/AboutContainer"));
const Contact = lazy(() => import("../../containers/ContactContainer"));
const Shop = lazy(() => import("../../containers/ShopContainer"));
const PDP = lazy(() => import("../../containers/PDPContainer"));
const Cart = lazy(() => import("../../containers/CartContainer"));
const WishList = lazy(() => import("../../containers/WishListContainer"));
const Profile = lazy(() => import("../../containers/ProfileContainer"));

const Routes = ({ isLoggedIn }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

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
        <Route
          exact
          path="/shop"
          render={() => {
            return <Shop />;
          }}
        />
        <Route
          exact
          path="/shop/:categories"
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
          path="/cart"
          render={() => {
            return <Cart />;
          }}
        />
        <Route
          exact
          path="/wishlist"
          render={() => {
            return <WishList />;
          }}
        />
        <Route
          exact
          path="/checkout"
          render={() => {
            return <Checkout />;
          }}
        />
        <Route
          exact
          path="/profile"
          render={() => {
            return <Profile />;
          }}
        />
      </Switch>
      <Footer />
    </>
  );
};

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default withRouter(Routes);
