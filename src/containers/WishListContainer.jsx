import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Container, Grid, Typography } from "@material-ui/core";
import EmptyCart from "../components/EmptyCart";
import NoAuth from "../components/NoAuth";
import WishListItem from "../components/WishListItem";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: 0,
    padding: theme.spacing(4),
    ...theme.page,
  },
  container: {
    marginTop: "100px",
    marginBottom: "70px",
  },

  columnTitle: {
    margin: "8px 0px",
  },
  flex: {
    display: "flex",
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
        <main>
          <Grid container className={classes.gridContainer}>
            <Grid item className={classes.flex}>
              <Typography gutterBottom variant="h6">
                Wishlist Items
              </Typography>
              <Typography gutterBottom variant="h6" color="textSecondary">
                ({items?.length})
              </Typography>
            </Grid>
            <Grid container>
              {items?.map((item) => (
                <WishListItem item={item} />
              ))}
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
};

export default WishList;
