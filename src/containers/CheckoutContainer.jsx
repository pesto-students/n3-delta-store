import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Divider, makeStyles, Container, Grid } from "@material-ui/core";
import EmptyCart from "../components/EmptyCart";
import NoAuth from "../components/NoAuth";
import Total from "../components/Total";
import CheckoutFlow from "../components/CheckoutFlow";
const useStyles = makeStyles(() => ({
  container: {
    marginTop: "20px",
    marginBottom: "70px",
  },

  columnTitle: {
    margin: "8px 0px",
  },

  billSummary: {
    position: "sticky",
    top: "20px",
  },
}));
const Checkout = () => {
  const classes = useStyles();

  const authState = useSelector((state) => state?.authReducer);
  const cart = useSelector((state) => state?.cart);
  const { isLoggedIn } = authState;
  const { items, cartLength, total } = cart;

  if (!isLoggedIn) {
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justify="center">
          <NoAuth />
        </Grid>
      </Container>
    );
  } else {
    if (!items?.length) {
      return (
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            <EmptyCart />
          </Grid>
        </Container>
      );
    }

    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <h2 className={classes.columnTitle}>Checkout</h2>
            <Divider />
            <CheckoutFlow />
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.billSummary}>
              <h2 className={classes.columnTitle}>Total</h2>
              <Divider />
              <Total />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
};

export default Checkout;
