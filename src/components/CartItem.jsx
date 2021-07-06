import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonBase,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  getProduct,
  getVariantsForProduct,
  removeFromCart,
  updateCart,
} from "../main/axios/commerce";
import { setError } from "../main/store/actions/ErrorActions";
import { setCart } from "../main/store/actions/CartActions";
import { useDispatch } from "react-redux";
import { setLoader } from "../main/store/actions/LoadingActions";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ColorSelector from "./ColorSelector";
import { addItemToWishList } from "../main/store/actions/WishListActions";
import { translate } from "../resources/language/translate";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  gridFlex: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 5,
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
  const history = useHistory();
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const getVariants = async () => {
    const { product } = await getVariantsForProduct(item?.product_id);
    setProduct(product);
  };

  const getProductData = async () => {
    dispatch(setLoader(true));
    const prd = await getProduct(item?.product_id);
    setProduct(prd);
    dispatch(setLoader(false));
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleRemove = async (wishlist) => {
    try {
      dispatch(setLoader(true));
      const response = await removeFromCart(item?.id);
      const { success, cart } = response;
      if (success) {
        console.log("what is wishlist", wishlist);
        if (wishlist) {
          dispatch(addItemToWishList(product));
        }
        dispatch(setCart(cart));
      }
    } catch (err) {
      dispatch(setError("Error in Removing Item from Cart"));
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleMoveToWishList = async () => {
    await handleRemove(true);
  };

  const handleSizeChange = (selectedSize) => {
    console.log(`selectedSize is`, selectedSize);
  };

  const handleQuantityChange = async (selectedQuantity) => {
    console.log(`selectedQuantity is`, selectedQuantity);
    try {
      dispatch(setLoader(true));
      const response = await updateCart(item?.id, {
        quantity: selectedQuantity,
      });
      const { success, cart } = response;
      if (success) {
        dispatch(setCart(cart));
      }
    } catch (err) {
      console.log(err);
      dispatch(setError("Error in Removing Item from Cart"));
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} key={item?.product_id}>
          <Grid
            item
            onClick={() => history.push(`/shop/product/${item?.product_id}`)}
          >
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="product image"
                src={item?.media?.source}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {item.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: 5,
                  }}
                >
                  <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
                    {translate("Size")}:{" "}
                  </Typography>
                  <SizeSelector
                    handleChange={handleSizeChange}
                    size={size}
                    product={product}
                  />
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: 5,
                  }}
                >
                  <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
                    {translate("Quantity")}:{" "}
                  </Typography>
                  <QuantitySelector
                    onChange={handleQuantityChange}
                    value={quantity}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
                  {translate("Color")}:{" "}
                </Typography>
                <ColorSelector product={product} />
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
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            flexGrow: 1,
          }}
        >
          <Grid item>
            <Button
              size="large"
              fullWidth
              color="secondary"
              onClick={() => {
                handleRemove();
              }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              fullWidth
              color="primary"
              onClick={handleMoveToWishList}
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
