import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px",
  },
  paper: {
    padding: "10px",
    margin: "10px",
  },
  addAddressContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#3F51B5",
  },
  plusIcon: {
    marginRight: "10px",
  },
  editIcon: {
    color: "#2d3748b3",
    margin: "0 5px",
  },
  deleteIcon: {
    color: "#E65B65",
    margin: "0 5px",
  },
}));

const AddressSelection = () => {
  const classes = useStyles();
  const addressInfo = useSelector((state) => state?.addressInfo);
  const { addresses, defaultAddress } = addressInfo;
  const [currentAddress, setCurrentAddress] = useState("");
  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target);
    setCurrentAddress(event.target.value);
  };

  const renderAddress = (addressInfo) => {
    const {
      uid,
      firstName,
      lastName,
      email,
      state,
      city,
      pin,
      address,
      mobile,
    } = addressInfo;
    return (
      <FormControlLabel
        key={uid}
        value={uid}
        control={<Radio color="primary" />}
        label={
          <Grid container justify="flex-start" alignItems="center">
            <Grid item>
              <Paper elevation={3} className={classes.paper}>
                <h4>
                  {firstName} {lastName}
                </h4>
                <h6>{email}</h6>
                <h6>{mobile}</h6>
                <h6>
                  {address}, {city}, {state}
                </h6>
                <h6>{pin}</h6>
              </Paper>
            </Grid>
          </Grid>
        }
      />
    );
  };

  return (
    <Grid
      container
      justify="center"
      direction="column"
      className={classes.root}
    >
      <Grid item>
        <FormControl component="span">
          <RadioGroup
            aria-label="address"
            name="address"
            value={currentAddress}
            onChange={handleChange}
          >
            {addresses.map((addressInfo) => renderAddress(addressInfo))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AddressSelection;
