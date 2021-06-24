import React, { lazy } from "react";
import {
  Redirect,
  Route,
  withRouter,
  Switch,
  useLocation,
} from "react-router-dom";

const Home = lazy(() => import("../../containers/HomeContainer"));
const About = lazy(() => import("../../containers/AboutContainer"));
const Contact = lazy(() => import("../../containers/ContactContainer"));
const Cart = lazy(() => import("../../containers/CartContainer"));
const WishList = lazy(() => import("../../containers/WishListContainer"));

const Routes = ({ isLoggedIn }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  return (
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
  );
};

export default withRouter(Routes);
