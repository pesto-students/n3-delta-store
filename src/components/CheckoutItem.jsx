import React from "react";
import { makeStyles } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "12px 0px",
    outline: "2px solid #e9e9eb",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    minWidth: 200,
    backgroundPosition: "top",
    [theme.breakpoints.down("sm")]: {
      minWidth: 100,
      height: 100,
    },
    height: "150px",
    backgroundSize: "contain",
    margin: 10,
  },
  productTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      position: "relative",
    },
  },

  quantity: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      left: "-110px",
    },
  },
}));

const CheckoutItem = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={product?.media?.source}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component="h5"
            variant="h5"
            className={classes.productTitle}
          >
            {product?.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Qty:
            <span className="bold">{`${product?.quantity}`}</span>
          </Typography>
          <Typography variant="subtitle1" color="primary">
            <span className="bold">
              {`${product?.price?.formatted_with_symbol}`}
            </span>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default CheckoutItem;
