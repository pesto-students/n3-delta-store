import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  Divider,
  makeStyles,
  Container,
  Grid,
  Button,
} from "@material-ui/core";
import EmptyCart from "../components/EmptyCart";
import NoAuth from "../components/NoAuth";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(() => ({
  container: {
    marginTop: "100px",
    marginBottom: "70px",
  },

  columnTitle: {
    margin: "8px 0px",
  },
}));
const Cart = () => {
  const classes = useStyles();
  const history = useHistory();

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
      <Container maxWidth="md" className={classes.container}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid item style={{ display: "flex", justifyContent:'space-between', paddingBottom:10 }}>
              <h2 className={classes.columnTitle}>
                My Cart({cartLength}) ({total})
              </h2>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(`/checkout`);
                }}
              >
                proceed to checkout
              </Button>
            </Grid>
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
