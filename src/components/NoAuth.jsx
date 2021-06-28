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
import { useDispatch } from "react-redux";
import { openLoginModal } from "../main/store/actions/LoginModalActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const NoAuth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Please Log in
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Log in to see your amazing cart.
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
          onClick={() => {
            dispatch(openLoginModal());
          }}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default NoAuth;
