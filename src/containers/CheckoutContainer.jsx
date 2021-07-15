import React from "react";
import { useSelector } from "react-redux";
import { Divider, makeStyles, Container, Grid } from "@material-ui/core";
import EmptyCart from "../components/EmptyCart";
import NoAuth from "../components/NoAuth";
import Total from "../components/Total";
import CheckoutFlow from "../components/CheckoutFlow";

/**
 * Css for Checkout page
 */
const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.page,
    marginTop: theme.spacing(8),
    marginBottom: "70px",
  },

  columnTitle: {
    margin: theme.spacing(1, 0),
  },
}));
const Checkout = () => {
  const classes = useStyles();

  const authState = useSelector((state) => state?.authReducer);
  const cart = useSelector((state) => state?.cart);
  const { isLoggedIn } = authState;
  const { items } = cart;

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
            <div>
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
