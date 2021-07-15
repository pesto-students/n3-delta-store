import React, { useEffect, useState } from "react";
import _ from "lodash";
import { MenuItem, FormControl, Select, makeStyles } from "@material-ui/core";
import { translate } from "../resources/language/translate";
import PropTypes from "prop-types";

/**
 * CSS for size selector
 */
const useStyles = makeStyles((theme) => {
  return {
    flex: {
      display: "flex",
    },
  };
});

const SizeSelector = (props) => {
  const classes = useStyles();

  const { product = {}, handleChange, size, className } = props;
  const [sizeOptionsEle, setSizeOptionsEle] = useState([]);
  /**
   * Size selector menu item list
   */
  useEffect(() => {
    if (product?.variant_groups && product.variant_groups.length) {
      const sizeOptions = _.find(product.variant_groups, { name: "Size" });
      if (sizeOptions?.options && sizeOptions.options.length) {
        let sizeOptionsEle = _.map(sizeOptions.options, (option) => {
          return (
            <MenuItem value={option.id}>{translate(option.name)}</MenuItem>
          );
        });
        setSizeOptionsEle(sizeOptionsEle);
      }
    }
  }, [product]);

  return (
    <>
      {sizeOptionsEle && sizeOptionsEle.length ? (
        <div className={classes.flex}>
          <FormControl>
            <Select
              labelId="size-open-select-label"
              id="size-open-select"
              value={size}
              onChange={handleChange}
              className={className}
            >
              <MenuItem value="0">Select</MenuItem>
              {[sizeOptionsEle]}
            </Select>
          </FormControl>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

SizeSelector.propTypes = {
  product: PropTypes.object,
  handleChange: PropTypes.func,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default SizeSelector;
