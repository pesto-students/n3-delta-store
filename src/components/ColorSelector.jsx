import React, { useEffect } from "react";
import _ from "lodash";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Brightness1SharpIcon from "@material-ui/icons/Brightness1Sharp";
import PropTypes from "prop-types";

const ColorSelector = (props) => {
  const useStyles = makeStyles((theme) => ({
    selectedPallette: {
      border: "5px solid",
      borderRadius: "12px",
      borderImageSlice: "1",
      borderImageSource: `linear-gradient(to left, #743ad5, #d53a9d);`,
      ...theme.alignItemCenter,
    },
    optionPallette: {
      ...theme.alignItemCenter,
      border: "5px solid transparent",
      "&:hover": {
        boxShadow: theme.shadows[3],
      },
    },
  }));
  const classes = useStyles();
  const { product = {}, setColor = () => {}, color } = props;
  useEffect(() => {
    const colorOptions = _.find(product?.variant_groups, { name: "Color" });
    if (colorOptions && colorOptions.options && colorOptions.options.length) {
      if (!color) {
        setColor(colorOptions.options[0].id);
      }
    }
  }, [product]);

  let colorEle = [];
  if (product?.variant_groups && product.variant_groups.length) {
    const colorOptions = _.find(product.variant_groups, { name: "Color" });
    if (colorOptions && colorOptions.options && colorOptions.options.length) {
      colorEle = _.map(colorOptions.options, (option) => {
        return (
          <Grid item key={option.id}>
            <Box
              borderRadius={16}
              onClick={() => setColor(option.id)}
              tabIndex={0}
              border={5}
              className={
                color === option.id
                  ? classes.selectedPallette
                  : classes.optionPallette
              }
            >
              <Brightness1SharpIcon
                fontSize="large"
                style={{ color: option.name }}
              />
            </Box>
          </Grid>
        );
      });
    }
  }

  return (
    <>
      {colorEle && colorEle.length ? (
        <>
          <Grid container spacing={2} className={classes.gridPadding}>
            {[colorEle]}
          </Grid>
        </>
      ) : (
        ""
      )}
    </>
  );
};

ColorSelector.propTypes = {
  product: PropTypes.object,
  color: PropTypes.string,
  setColor: PropTypes.func,
};

export default ColorSelector;
