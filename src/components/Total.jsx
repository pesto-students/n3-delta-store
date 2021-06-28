import React from "react";
import {
  Box,
  Button,
  ButtonBase,
  CardMedia,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import SizeSelect from "./SizeSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Total = ({ total = {} }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item style={{ display: "flex" }}>
                <Typography variant="subtitle1" style={{ paddingRight: 5 }}>
                  color:
                </Typography>
                <Typography variant="subtitle1">asdf</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              gutterBottom
              style={{ display: "flex" }}
            >
              bla
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ display: "flex", flexGrow: 1 }}>
          <Grid item>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="secondary"
            >
              Proceed to checkout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Total;
