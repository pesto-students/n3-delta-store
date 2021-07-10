import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonBase,
  Divider,
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
import _ from "lodash";
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
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 700,
    outline: "2px solid #e9e9eb",
  },
  image: {
    width: 150,
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
  flex: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
}));

const checkSelectedOptions = (options = [], variant) => {
  if (options.length === 0) {
    return "";
  }
  const [selectedVariant = null] = options.filter(
    ({ group_name }) => group_name === variant
  );
  return selectedVariant?.option_id || "";
};

const CartItem = ({ item = {} }) => {
  const { selected_options = [] } = item;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [size, setSize] = useState(
    checkSelectedOptions(selected_options, "Size")
  );
  const [color, setColor] = useState(
    checkSelectedOptions(selected_options, "Color")
  );
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [variantAvailable, setVariantAvailable] = useState({
    sizeVar: false,
    colorVar: false,
  });
  const { sizeVar, colorVar } = variantAvailable;

  const checkOptionsAvailable = (variant) => {
    let variantOptions = [];
    if (product?.variant_groups && product.variant_groups.length) {
      variantOptions = _.find(product.variant_groups, { name: variant });
      console.log(variantOptions);
    }
    return variantOptions ? variantOptions.id : false;
  };

  useEffect(() => {
    const sizeVar = checkOptionsAvailable("Size");
    const colorVar = checkOptionsAvailable("Color");
    setVariantAvailable({
      sizeVar,
      colorVar,
    });
  }, [product]);

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

  const handleSizeChange = (event) => {
    const selected = event?.target?.value;
    setSize(selected);
    const variantData = {};
    variantData[sizeVar] = selected;
    const metaData = { options: variantData };
    handleUpdateCartItem(metaData);
  };

  const handleColorChange = (selected) => {
    setColor(selected);
    const variantData = {};
    variantData[colorVar] = selected;
    const metaData = { options: variantData };
    handleUpdateCartItem(metaData);
  };

  const handleUpdateCartItem = async (body) => {
    try {
      dispatch(setLoader(true));
      const response = await updateCart(item?.id, body);
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

  const handleQuantityChange = async (selectedQuantity) => {
    const body = {
      quantity: selectedQuantity,
    };
    handleUpdateCartItem(body);
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
              <Grid item>
                <Typography gutterBottom variant="h6">
                  {item.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
              </Grid>
              <Grid item container className={classes.flex}>
                <Grid item xs={6} className={classes.flex}>
                  <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
                    {translate("Quantity")}:{" "}
                  </Typography>
                  <QuantitySelector
                    onChange={handleQuantityChange}
                    value={quantity}
                  />
                </Grid>
                {sizeVar && (
                  <Grid item xs={3} className={classes.flex}>
                    <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
                      {translate("Size")}:{" "}
                    </Typography>
                    <SizeSelector
                      handleChange={handleSizeChange}
                      size={size}
                      product={product}
                    />
                  </Grid>
                )}
              </Grid>
              {colorVar && (
                <Grid item style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="subtitle2" style={{ paddingRight: 5 }}>
                    {translate("Color")}:{" "}
                  </Typography>
                  <ColorSelector
                    product={product}
                    color={color}
                    setColor={handleColorChange}
                  />
                </Grid>
              )}
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
        <Divider
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <Grid container spacing={2} className={classes.flex}>
          <Grid item xs={3}>
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
