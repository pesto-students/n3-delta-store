import React, { useEffect, useState } from "react";
import _ from "lodash";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { translate } from "../resources/language/translate";

const SizeSelector = (props) => {
  const { product = {}, handleChange, size } = props;
  const [sizeOptionsEle, setSizeOptionsEle] = useState([]);
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
        <div style={{ display: "flex" }}>
          <FormControl>
            <Select
              labelId="size-open-select-label"
              id="size-open-select"
              value={size}
              onChange={handleChange}
            >
              <MenuItem value="">Select</MenuItem>
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

export default SizeSelector;
