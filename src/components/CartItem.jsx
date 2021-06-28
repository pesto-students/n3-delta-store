import React from "react";
import {
  Box,
  Button,
  ButtonBase,
  CardMedia,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SizeSelect from "./SizeSelect";
import { removeFromCart } from "../main/axios/commerce";
import { setError } from "../main/store/actions/ErrorActions";
import { setCart } from "../main/store/actions/CartActions";
import { useDispatch } from "react-redux";
import { setLoader } from "../main/store/actions/LoadingActions";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const CartItem = ({ item = {} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleRemove = async () => {
    try {
      dispatch(setLoader(true));
      const response = await removeFromCart(item?.id);
      const { success, cart } = response;
      if (success) {
        dispatch(setCart(cart));
      }
    } catch (err) {
      dispatch(setError("Error in Removing Item from Cart"));
    } finally {
      dispatch(setLoader(false));
    }
  };
  const handleMove = async () => {
    try {
      const response = await removeFromCart(item?.id);
      const { success, cart } = response;
      if (success) {
        setCart(cart);
        dispatch(setCart(cart));
      }
    } catch (err) {
      console.log(err);
      dispatch(setError("Error in Removing Item from Cart"));
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={item?.media?.source}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {item.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ display: "flex" }}
                >
                  {item?.currency}
                  {item?.price?.formatted_with_symbol}
                </Typography>
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <SizeSelect />
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <Typography variant="subtitle1" style={{ paddingRight: 5 }}>
                  color:
                </Typography>
                <Typography variant="subtitle1">{item?.colour}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              gutterBottom
              style={{ display: "flex" }}
            >
              {item?.currency}
              {item?.line_total?.formatted_with_symbol}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ display: "flex", flexGrow: 1 }}>
          <Grid item>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleMove}
            >
              Move to Wishlist
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CartItem;
