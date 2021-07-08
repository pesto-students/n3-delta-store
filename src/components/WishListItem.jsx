import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button, Grid } from "@material-ui/core";
import { addToCart } from "../main/axios/commerce";
import { useDispatch } from "react-redux";
import { setLoader } from "../main/store/actions/LoadingActions";
import { setError } from "../main/store/actions/ErrorActions";
import { setCart } from "../main/store/actions/CartActions";
import {
  moveItemFromWishList,
  removeItemFromWishList,
} from "../main/store/actions/WishListActions";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import { translate } from "../resources/language/translate";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    outline: "1px solid #e9e9eb",
  },
  media: {
    height: "200px",
    backgroundSize: "contain",
  },
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  subheader: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const WishListItem = ({ item = {} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(null);
  const handleMove = async () => {
    try {
      dispatch(setLoader(true));
      const response = await addToCart(item?.id, 1);
      const { success, cart } = response;
      if (success) {
        dispatch(setCart(cart));
        dispatch(moveItemFromWishList(item?.id));
      }
    } catch (err) {
      console.log(err);
      dispatch(setError("Error in moving Item from WishList to Cart"));
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(setLoader(true));
      dispatch(removeItemFromWishList(item?.id));
    } catch (err) {
      console.log(err);
      dispatch(setError("Error deleting item from WishList"));
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} sm container spacing={2}>
          <Typography className={classes.title} variant="subtitle2">
            {item?.name}
          </Typography>
          <Typography className={classes.subheader} variant="h6">
            {item?.price?.formatted_with_symbol}
          </Typography>
        </Grid>
        <IconButton
          aria-label="delete item from wishlist"
          onClick={handleDelete}
        >
          <CancelIcon />
        </IconButton>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={item?.media?.source}
        title="product image"
      />
      {/* <Grid item style={{ display: "flex" }}>
        <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
          {translate("Size")}:{" "}
        </Typography>
        <SizeSelector
          product={item}
          handleChange={(event) => {
            setSize(event.target.value);
          }}
          size={size}
        />
      </Grid>
      <Grid item style={{ display: "flex" }}>
        <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
          {translate("Color")}:{" "}
        </Typography>
        <ColorSelector product={item} color={color} setColor={() => {}} />
      </Grid> */}

      <CardActions disableSpacing>
        <Button
          size="small"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleMove}
        >
          Move to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default WishListItem;
