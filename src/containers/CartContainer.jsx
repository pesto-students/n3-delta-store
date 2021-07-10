import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  Divider,
  makeStyles,
  Container,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import EmptyCart from "../components/EmptyCart";
import NoAuth from "../components/NoAuth";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
    marginBottom: "70px",
    ...theme.page,
  },

  columnTitle: {
    margin: "8px 0px",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  flex: { display: "flex", flexDirection: "row" },
}));
const Cart = () => {
  const classes = useStyles();
  const history = useHistory();

  const authState = useSelector((state) => state?.authReducer);
  const cart = useSelector((state) => state?.cart);
  const { isLoggedIn } = authState;
  const { items, cartLength, total, currency } = cart;

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
          <Grid item xs={10}>
            <Grid item container className={classes.cartHeader}>
              <Grid item className={classes.flex}>
                <Typography gutterBottom variant="h6">
                  My Cart
                </Typography>
                <Typography gutterBottom variant="h6" color="textSecondary">
                  ({cartLength})
                </Typography>
              </Grid>
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
