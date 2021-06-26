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

const Home = lazy(() => import("../../containers/HomeContainer"));
const About = lazy(() => import("../../containers/AboutContainer"));
const Contact = lazy(() => import("../../containers/ContactContainer"));
const Shop = lazy(() => import('../../containers/ShopContainer'));
const Cart = lazy(() => import("../../containers/CartContainer"));
const WishList = lazy(() => import("../../containers/WishListContainer"));

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
      </Switch>
      <Footer />
    </>
  );
};

export default withRouter(Routes);
