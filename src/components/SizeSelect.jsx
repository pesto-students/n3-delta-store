import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const sizes = [
  {
    label: "S",
    value: "small",
    disabled: false,
  },
  {
    label: "M",
    value: "medium",
    disabled: true,
  },
  {
    label: "L",
    value: "large",
    disabled: false,
  },
  {
    label: "XL",
    value: "extraLarge",
    disabled: false,
  },
  {
    label: "XXL",
    value: "mega",
    disabled: true,
  },
];

const SizeSelect = () => {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const availableSizes = () =>
    sizes.map(({ label, value, disabled }) => (
      <FormControlLabel
        value={value}
        control={<Radio />}
        label={label}
        disabled={disabled}
      />
    ));

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Size</FormLabel>
      <RadioGroup
        aria-label="size"
        name="size"
        value={value}
        onChange={handleChange}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {availableSizes()}
      </RadioGroup>
    </FormControl>
  );
};

export default SizeSelect;
