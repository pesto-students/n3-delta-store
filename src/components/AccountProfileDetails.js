import  React,{ useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import _ from "lodash";
import { isValidEmail } from "../utils/util";
import { setAuth } from "../main/store/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { dbUtils } from "../services/firestore/db";
import { setLoader } from "../main/store/actions/LoadingActions";
import { setError } from "../main/store/actions/ErrorActions";
import PropTypes from 'prop-types'
import {
  addAddress,
  setDefaultAddress,
} from "../main/store/actions/AddressInfoActions";

const AccountProfileDetails = (props) => {
  const { user } = props;
  const addressInfo = useSelector((state) => state?.addressInfo);
  const { displayName, email, address, phone } = addressInfo;
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => {
    return {
      footer: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(2),
      },
      tab: {
        padding: theme.spacing(2, 1),
      },
      error: {
        color: theme.palette.error.main,
      },
    };
  });
  const classes = useStyles();

  /**
   *
   * @param {domevent} event
   * @param {value to be updated} newValue
   */
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [values, setValues] = useState({
    displayName: displayName || "",
    email: email || "",
    address: address || "",
    phone: phone || "",
  });

  useEffect(() => {
    console.log(
      "in accountprofiledetails useEffect",
      addressInfo?.defaultAddress
    );

    if (user && !_.isEmpty(user)) {
      setValues({ ...values, ...user, ...addressInfo?.defaultAddress });
    }
  }, [user, addressInfo]);
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    const { uid } = user;
    const { displayName, address } = values;
    const { error = "" } =
      (await dbUtils.udpateUser(uid, {
        ...values,
      })) || {};
    if (error) {
      dispatch(setError(`Error in updating user details`));
    }
    const userData = await dbUtils.getUser(uid);
    if (userData) {
      console.log("what is userdata", userData);
      const { wishList, ...otherInfo } = userData;
      dispatch(setDefaultAddress(otherInfo));
      dispatch(addAddress(otherInfo));
    }
  };

  const validate = (type, text) => {
    if (type === "email") {
      return (
        submitted &&
        (_.isEmpty(values[type])
          ? `Please specify the ${text}`
          : isValidEmail(values[type])
          ? ""
          : `Please specify valid ${text}`)
      );
    } else {
      return submitted && _.isEmpty(values[type]) ? (
        <span className={classes.error}>{`Please specify the ${text}`}</span>
      ) : (
        ""
      );
    }
  };
  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="My Profile Tabs"
      >
        <Tab className={classes.tab} label="Personal Info" />
        <Tab className={classes.tab} label="Payment" disabled />
        <Tab className={classes.tab} label="My Orders" disabled />
      </Tabs>
      <div
        role="tabpanel"
        hidden={value !== 0}
        id={`simple-tabpanel-${0}`}
        aria-labelledby={`simple-tab-${0}`}
      >
        <Paper
          component="form"
          autoComplete="off"
          noValidate
          {...props}
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              _.isEmpty(values.displayName) ||
              _.isEmpty(values.email) ||
              _.isEmpty(values.address)
            ) {
              return;
            }

            if (!isValidEmail(values.email)) {
              return;
            }
            dispatch(setLoader(true));

            await dbUtils.udpateUser(values.id, values);
            dispatch(setAuth(values));
            setSubmitted(true);
            dispatch(setLoader(false));
          }}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText={validate("displayName", "full name")}
                    label="Full name"
                    name="displayName"
                    onChange={handleChange}
                    required
                    value={values.displayName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    helperText={validate("email", "email")}
                    name="email"
                    type="email"
                    //onChange={handleChange}
                    //required
                    disabled
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    helperText={validate("address", "address")}
                    onChange={handleChange}
                    required
                    value={values.address}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box className={classes.footer}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleSave}
              >
                Save details
              </Button>
            </Box>
          </Card>
        </Paper>
      </div>
    </>
  );
};

AccountProfileDetails.propTypes = {
  user: PropTypes.element.isRequired,
};

export default AccountProfileDetails;
