import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToWishList } from "../main/store/actions/WishListActions";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";

const ShopCard = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showActions, setShowAcions] = useState(false);

  const handlePopoverOpen = (event) => {
    setShowAcions(true);
  };

  const handlePopoverClose = () => {
    setShowAcions(false);
  };

  const useStyles = makeStyles((theme) => {
    const cardWidth = 210;
    const cardHeight = 380;
    return {
      cardWidth: {
        width: cardWidth,
        boxShadow: "none",
        minHeight: cardHeight,
        outline: "2px solid #e9e9eb",
        "&:hover": {
          boxShadow: theme.shadows[18],
        },
        cursor: "pointer",
      },
      root: {
        ...theme.page,
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        marginBottom: 0,
        [theme.breakpoints.up("sm")]: {
          display: "flex",
          flex: 1,
        },
      },
      media: {
        textAlign: "center",
        height: 270,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      },
      img: {
        ...theme.img,
      },
      producPrice: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: 1,
        color: "#282c3f",
        marginBottom: "6px",
      },
      producName: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: 1,
        color: "#282c3f",
        marginBottom: "6px",
      },
      gridList: {
        margin: theme.spacing(1),
      },
      productGridList: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
      },
      gridContainer: {
        [theme.breakpoints.down("md")]: {
          justifyContent: "center",
        },
      },
    };
  });
  const classes = useStyles();

  const mapVariants = () => {
    let sizes = "";
    const [variant] = product?.variant_groups;
    variant?.options?.map(({ name }, index) => {
      if (!index) {
        sizes = `${name}`;
      } else {
        sizes += `,${name}`;
      }
    });
    return sizes;
  };
  const available = mapVariants();
  return (
    <Grid
      key={product.id}
      item
      className={classes.productGridList}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Card className={classes.cardWidth}>
        <CardMedia className={classes.media} style={{ position: "relative" }}>
          <img
            className={classes.img}
            src={product.media.source}
            alt={classes.media}
            onClick={() => history.push(`/shop/product/${product.id}`)}
          />
          {/* {showActions && (
            <Grid
              item
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "white",
                // width:'100%'
              }}
            >
              <IconButton
                aria-label="Wish list"
                color="default"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(addItemToWishList(product));
                }}
              >
                <Favorite />
              </IconButton>
            </Grid>
          )} */}
        </CardMedia>
        <CardContent
          style={{
            position: "relative",
            height: 110,
            backgroundColor: "#f4f4f4",
          }}
        >
          <Typography className={classes.producName} variant="h5">
            {product.name}
          </Typography>
          <Typography className={classes.productPrice} variant="h6">
            {product.price.formatted_with_symbol}
          </Typography>
          {available && (
            <Typography className={classes.productPrice} variant="subtitle2">
              {`Avaialble in: ${available}`}
            </Typography>
          )}
          {showActions && (
            <Grid
              item
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: "white",
                width: "100%",
                boxSizing: "border-box",
                padding: 16,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography gutterBottom variant="body2">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h6">
                {product.price.formatted_with_symbol}
              </Typography>
              <Button
                startIcon={<FavoriteBorderOutlined />}
                size="small"
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch(addItemToWishList(product));
                }}
              >
                wishlist
              </Button>{" "}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
export default ShopCard;
