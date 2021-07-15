import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { addToCart } from "../main/axios/commerce";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../main/store/actions/LoadingActions";
import { setError } from "../main/store/actions/ErrorActions";
import { setCart } from "../main/store/actions/CartActions";
import {
  closeWishListModal,
  moveItemFromWishList,
  openWishListModal,
  removeItemFromWishList,
} from "../main/store/actions/WishListActions";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import { translate } from "../resources/language/translate";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 210,
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
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialogContainer: {
    minWidth: "350px",
  },
  dialogPaper: {
    minHeight: "100px",
    minWidth: "350px",
    backgroundColor: "rgb(72,89,107,0.1)",
  },
  actions: {
    backgroundColor: "rgb(72,89,107,0.1)",
  },
  verticalMargin: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  loginButton: {
    margin: "0 8px",
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    padding: 5,
  },
  defaultPaddingR: {
    paddingRight: 5,
  },
}));

const WishListSelectionModal = () => {
  const classes = useStyles();
  const wishList = useSelector((state) => state?.wishList);
  const { isModalOpen, currentItem: item } = wishList;
  const [size, setSize] = useState("");
  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
  const [variantAvailable, setVariantAvailable] = useState({
    sizeVar: false,
    colorVar: false,
  });
  const { sizeVar, colorVar } = variantAvailable;
  const checkOptionsAvailable = (variant) => {
    let variantOptions = [];
    if (item?.variant_groups && item.variant_groups.length) {
      variantOptions = _.find(item.variant_groups, { name: variant });
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
  }, [item]);

  const handleClose = () => {
    dispatch(closeWishListModal());
  };

  const handleSelection = async () => {
    try {
      const { sizeVar, colorVar } = variantAvailable;
      if (sizeVar && !size) {
        dispatch(setError("Please Select Size"));
        return;
      }
      if (colorVar && !color) {
        dispatch(setError("Please Select Color"));
        return;
      }
      handleClose();
      dispatch(setLoader(true));
      const metaData = {};
      if (sizeVar) {
        metaData[sizeVar] = size;
      }
      if (colorVar) {
        metaData[colorVar] = color;
      }
      const response = await addToCart(item?.id, 1, metaData);
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

  const handleSizeChange = (event) => {
    const selected = event?.target?.value;
    setSize(selected);
  };

  const handleColorChange = (selected) => {
    setColor(selected);
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => {
        handleClose();
      }}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={classes.dialogContainer}
    >
      <DialogTitle id="simple-dialog-title">
        Select Variant to continue
      </DialogTitle>
      <DialogContent className={classes.dialogPaper}>
        {sizeVar && (
          <Grid item xs={3} className={classes.flex}>
            <Typography variant="subtitle2" className={classes.defaultPaddingR}>
              {translate("Size")}:{" "}
            </Typography>
            <SizeSelector
              handleChange={handleSizeChange}
              size={size}
              product={item}
            />
          </Grid>
        )}
        {colorVar && (
          <Grid item className={classes.flex}>
            <Typography variant="subtitle2" className={classes.defaultPaddingR}>
              {translate("Color")}:{" "}
            </Typography>
            <ColorSelector
              product={item}
              color={color}
              setColor={handleColorChange}
            />
          </Grid>
        )}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={handleSelection} color="primary">
          Done
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const WishListItem = ({ item = {} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      dispatch(setLoader(true));
      const response = await addToCart(item?.id, 1);
      const { success, cart } = response;
      if (success) {
        dispatch(setCart(cart));
        dispatch(moveItemFromWishList(item?.id));
      }
    } catch (err) {
      dispatch(setError("Error in moving Item from WishList to Cart"));
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleMove = async () => {
    if (item?.variant_groups?.length > 0) {
      dispatch(openWishListModal(item));
    } else {
      handleAdd();
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
      <CardContent className={classes.cardContent}>
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

      <CardActions disableSpacing>
        <Button
          size="medium"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleMove}
        >
          Move to Cart
        </Button>
      </CardActions>
      <WishListSelectionModal item={item} />
    </Card>
  );
};

WishListItem.propTypes = {
  item: PropTypes.object,
};

WishListSelectionModal.propTypes = {
  item: PropTypes.element.isRequired,
};

export default WishListItem;
