import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PropTypes from "prop-types";

const QuantitySelector = ({ onChange, value = 1 }) => {
  const [quantity, setQuantity] = useState(value);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender?.current) {
      initialRender.current = false;
      return;
    }
    console.log("coming into quantity useEffect");
    if (onChange) onChange(quantity);
  }, [quantity]);

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button
        disabled={!(quantity > 1)}
        onClick={handleDecrement}
        color="secondary"
      >
        -
      </Button>
      <Button>{quantity}</Button>
      <Button
        disabled={!(quantity < 10)}
        onClick={handleIncrement}
        color="primary"
      >
        +
      </Button>
    </ButtonGroup>
  );
};

QuantitySelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default QuantitySelector;
