import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, getProduct } from "../main/axios/commerce";
import Error from "../components/Error";
import _ from "lodash";
import {
  Button,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { ShoppingCart } from "@material-ui/icons";
import SizeSelector from "../components/SizeSelector";
import ColorSelector from "../components/ColorSelector";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../main/store/actions/LoadingActions";
import { addItemToWishList } from "../main/store/actions/WishListActions";
import { setCart } from "../main/store/actions/CartActions";
import { openLoginModal } from "../main/store/actions/LoginModalActions";
import { setError as setGlobalError } from "../main/store/actions/ErrorActions";
import { getProductImg } from "../utils/util";

const PDPContainer = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isError, setError] = useState(false);
  const [size, setSize] = useState("0");
  const [color, setColor] = useState("");
  const [variantAvailable, setVariantAvailable] = useState({
    sizeVar: false,
    colorVar: false,
  });
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.authReducer);
  const { isLoggedIn } = authState;

  /**
   *
   * @param {*} variant
   * @returns variant option of a product
   */
  const checkOptionsAvailable = (variant) => {
    //console.log("coming to check otions", variant);
    let variantOptions = [];
    if (product?.variant_groups && product.variant_groups.length) {
      variantOptions = _.find(product.variant_groups, { name: variant });
      //console.log(variantOptions);
    }
    return variantOptions ? variantOptions.id : false;
  };
  /**
   * PDP style
   */
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        ...theme.page,
        flexGrow: 1,
        marginTop: theme.spacing(8),
      },
      gridList: {
        padding: theme.spacing(6),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(1),
        },
      },
      gridPadding: {
        padding: theme.spacing(2),
      },
      img: {
        ...theme.img,
        boxShadow: theme.shadows[3],
        height: "450px",
        width: "400px",
        backgroundSize: "contain",
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
          width: "auto",
          //height: "auto"
        },
      },
      cartButton: {
        paddingTop: theme.spacing(2),
      },
      productTitle: {
        ...theme.typography.h3,
        [theme.breakpoints.down("md")]: {
          ...theme.typography.h4,
        },
      },
      minWidth: {
        minWidth: "80px",
      },
      alignItemCenter: {
        ...theme.alignItemCenter,
      },
      media: {
        textAlign: "center",
      },
    };
  });
  const classes = useStyles();

  /**
   * Get product data by id
   */
  useEffect(() => {
    if (!product || _.isEmpty(product)) {
      dispatch(setLoader(true));
      getProduct(id)
        .then((productData) => {
          dispatch(setLoader(false));
          setProduct(productData);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    } else if (product && id !== product.id) {
      dispatch(setLoader(true));
      getProduct(id)
        .then((productData) => {
          dispatch(setLoader(false));
          setProduct(productData);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    }
  }, [product, id, dispatch]);

  /**
   * Set colo and size variant on load
   */
  useEffect(() => {
    const sizeVar = checkOptionsAvailable("Size");
    const colorVar = checkOptionsAvailable("Color");
    setVariantAvailable({
      sizeVar,
      colorVar,
    });
  }, [product]);

  /**
   *
   * @param {*} event
   * Set size on dropdown change
   */
  const handleChange = (event) => {
    setSize(event.target.value);
  };
  /**
   *
   * @param {*} fn
   * @param {*} fnProps
   * On adding item in cart check for login
   */
  const checkUserLogin = (fn, fnProps) => {
    if (isLoggedIn) {
      fnProps ? fn(fnProps) : fn();
    } else {
      dispatch(openLoginModal());
    }
  };

  /**
   * On Click wishlist validate and add to firestore
   */
  const handleAddToWishList = () => {
    try {
      const { sizeVar, colorVar } = variantAvailable;
      if (sizeVar && !size) {
        dispatch(setGlobalError("Please Select Size"));
        return;
      }
      if (colorVar && !color) {
        dispatch(setGlobalError("Please Select Color"));
        return;
      }
      dispatch(addItemToWishList(product));
    } catch (err) {
    } finally {
      dispatch(setLoader(false));
    }
  };

  /**
   * On add to cart click validate and add item to cart
   */
  const handleAddToCart = async () => {
    try {
      const { sizeVar, colorVar } = variantAvailable;
      if (sizeVar && !size) {
        dispatch(setGlobalError("Please Select Size"));
        return;
      }
      if (colorVar && !color) {
        dispatch(setGlobalError("Please Select Color"));
        return;
      }
      dispatch(setLoader(true));
      const metaData = {};
      metaData[sizeVar] = size;
      metaData[colorVar] = color;
      const response = await addToCart(product?.id, 1, metaData);
      const { success, cart } = response;
      if (success) {
        dispatch(setCart(cart));
      }
    } catch (err) {
      console.log(err);
      dispatch(setGlobalError("Error in adding Item from Cart"));
    } finally {
      dispatch(setLoader(false));
    }
  };

  if (isError) {
    return (
      <main>
        <Error />
      </main>
    );
  }

  if (_.isEmpty(product)) {
    return (
      <main className={classes.root}>
        <Grid container className={classes.gridList}>
          <Grid
            key={product.id}
            xs={12}
            sm={12}
            md={12}
            lg={5}
            item
            className={classes.gridPadding}
          >
            <Skeleton variant="rect" className={classes.img} />
          </Grid>
          <Grid xs={12} sm={12} md={6} item className={classes.gridPadding}>
            <Skeleton variant="text" height={20} />
            <Skeleton animation="wave" />
          </Grid>
        </Grid>
      </main>
    );
  }

  return (
    <main className={classes.root}>
      <Grid container className={classes.gridList}>
        <Grid
          key={product.id}
          xs={12}
          sm={12}
          md={12}
          lg={5}
          item
          className={classes.gridPadding}
        >
          <CardMedia className={classes.media}>
            <img
              className={classes.img}
              src={getProductImg(product, color) || product.media.source}
              alt={product.name}
            />
          </CardMedia>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          item
          className={classes.gridPadding}
        >
          <Typography className={classes.productTitle}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Typography>
          <Typography variant="h5" className={classes.gridPadding}>
            {product.price.formatted_with_symbol}
          </Typography>

          <Typography variant="h5" className={classes.gridPadding}>
            <SizeSelector
              product={product}
              handleChange={handleChange}
              size={size}
              className={classes.minWidth}
            />
          </Typography>

          <Typography variant="h5" className={classes.gridPadding}>
            <ColorSelector
              product={product}
              setColor={setColor}
              color={color}
            ></ColorSelector>
          </Typography>
          <div className={classes.cartButton}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    checkUserLogin(handleAddToCart);
                  }}
                >
                  <Typography variant="h6" className={classes.alignItemCenter}>
                    <ShoppingCart /> Add to Cart
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    checkUserLogin(handleAddToWishList);
                  }}
                >
                  <Typography variant="h6" className={classes.alignItemCenter}>
                    <FavoriteIcon /> Add to Wishlist
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

PDPContainer.propTypes = {
  id: PropTypes.string,
};

export default PDPContainer;
