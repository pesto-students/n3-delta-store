import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import emptyCartSrc from "../resources/images/cart_empty.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const EmptyCart = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Your Cart is Empty
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Add items that you wish to buy to your cart.
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="empty Cart"
          height="140"
          image={emptyCartSrc}
          title="Empty Cart"
        />
      </CardActionArea>
      <CardActions>
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          Continue Shopping
        </Button>
      </CardActions>
    </Card>
  );
};

export default EmptyCart;
