import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Divider, makeStyles, Container, Grid } from "@material-ui/core";
import EmptyCart from "../components/EmptyCart";
import NoAuth from "../components/NoAuth";
const useStyles = makeStyles(() => ({
  container: {
    marginTop: "20px",
    marginBottom: "70px",
  },

  columnTitle: {
    margin: "8px 0px",
  },
}));
const Cart = () => {
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
      <Container maxWidth="sm" className={classes.container}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <h2 className={classes.columnTitle}>
              My Cart({cartLength}) ({total})
            </h2>
            <Divider />
            {items?.map((item) => (
              <CartItem item={item} />
            ))}
          </Grid>
        </Grid>
      </Container>
    );
  }
};

export default Cart;
