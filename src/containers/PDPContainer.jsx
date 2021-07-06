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
  Paper,
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
import { addItemToCart, setCart } from "../main/store/actions/CartActions";
import { translate } from "../resources/language/translate";
import { openLoginModal } from "../main/store/actions/LoginModalActions";

const PDPContainer = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isError, setError] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [variantAvailable, setVariantAvailable] = useState({
    sizeVar: false,
    colorVar: false,
  });
  const dispatch = useDispatch();

  const authState = useSelector((state) => state?.authReducer);
  const { isLoggedIn } = authState;

  const checkOptionsAvailable = (variant) => {
    console.log("coming to check otions", variant);
    let variantOptions = [];
    if (product?.variant_groups && product.variant_groups.length) {
      variantOptions = _.find(product.variant_groups, { name: variant });
      console.log(variantOptions);
    }
    return variantOptions ? true : false;
  };

  const useStyles = makeStyles((theme) => {
    return {
      root: {
        flexGrow: 1,
        marginTop: theme.spacing(5),
      },
      gridList: {
        padding: theme.spacing(6),
      },
      gridPadding: {
        padding: theme.spacing(2),
      },
      img: {
        ...theme.img,
        boxShadow: theme.shadows[3],
      },
      cartButton: {
        paddingTop: theme.spacing(2),
      },
    };
  });
  const classes = useStyles();

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
    }
  }, [product, id]);

  useEffect(() => {
    const sizeVar = checkOptionsAvailable("Size");
    const colorVar = checkOptionsAvailable("Color");
    setVariantAvailable({
      sizeVar,
      colorVar,
    });
  }, [product]);
  if (isError) {
    return (
      <main>
        <Error />
      </main>
    );
  }
  if (_.isEmpty(product)) {
    return (
      <Paper>
        <Skeleton variant="rect" width={210} height={"50%"} />
      </Paper>
    );
  }

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const checkUserLogin = (fn, fnProps) => {
    if (isLoggedIn) {
      fnProps ? fn(fnProps) : fn();
    } else {
      dispatch(openLoginModal());
    }
  };

  const handleAddToWishList = () => {
    try {
      /* const { sizeVar, colorVar } = variantAvailable;
      if (sizeVar && !size) {
        dispatch(setError("Please Select Size"));
        return;
      }
      if (colorVar && !color) {
        dispatch(setError("Please Select Color"));
        return;
      } */
      dispatch(addItemToWishList(product));
    } catch (err) {
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleAddToCart = async () => {
    try {
      /* const { sizeVar, colorVar } = variantAvailable;
      if (sizeVar && !size) {
        dispatch(setError("Please Select Size"));
        return;
      }
      if (colorVar && !color) {
        dispatch(setError("Please Select Color"));
        return;
      } */
      dispatch(setLoader(true));
      const response = await addToCart(product?.id, 1);
      const { success, cart } = response;
      if (success) {
        dispatch(setCart(cart));
      }
    } catch (err) {
      console.log(err);
      dispatch(setError("Error in adding Item from Cart"));
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <main className={classes.root}>
      <Grid container className={classes.gridList}>
        <Grid key={product.id} xs={5} item className={classes.gridPadding}>
          <CardMedia className={classes.media}>
            <img
              className={classes.img}
              src={product.media.source}
              alt={classes.media}
            />
          </CardMedia>
        </Grid>
        <Grid xs={6} item className={classes.gridPadding}>
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="subtitle2">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Typography>
          <Typography variant="h5" className={classes.gridPadding}>
            {product.price.formatted_with_symbol}
          </Typography>

          <Grid item style={{ display: "flex" }}>
            <Typography variant="h5" style={{ paddingRight: 5 }}>
              {translate("Size")}:{" "}
            </Typography>
            <SizeSelector
              product={product}
              handleChange={handleChange}
              size={size}
            />
          </Grid>
          <Grid item style={{ display: "flex" }}>
            <Typography variant="h5" style={{ paddingRight: 5 }}>
              {translate("Color")}:{" "}
            </Typography>
            <ColorSelector
              product={product}
              setColor={setColor}
              color={color}
            ></ColorSelector>
          </Grid>
          <div className={classes.cartButton}>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                checkUserLogin(handleAddToWishList);
              }}
            >
              <FavoriteIcon /> Add to Wishlist
            </Button>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                checkUserLogin(handleAddToCart);
              }}
            >
              <ShoppingCart /> Add to Cart
            </Button>
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
