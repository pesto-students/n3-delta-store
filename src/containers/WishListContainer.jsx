import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Container, Grid } from "@material-ui/core";
import EmptyCart from "../components/EmptyCart";
import NoAuth from "../components/NoAuth";
import WishListItem from "../components/WishListItem";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: 0,
  },
  container: {
    marginTop: "100px",
    marginBottom: "70px",
  },

  columnTitle: {
    margin: "8px 0px",
  },
  gridContainer: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      marginTop: "20px",
      marginBottom: "70px",
    },
  },
}));
const WishList = () => {
  const classes = useStyles();

  const authState = useSelector((state) => state?.authReducer);
  const wishList = useSelector((state) => state?.wishList);
  const { isLoggedIn } = authState;
  const { items } = wishList;

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
      <div className={classes.root}>
        <div style={{ display: "flex" }}>
          {items?.map((item) => (
            <WishListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }
};

export default WishList;
