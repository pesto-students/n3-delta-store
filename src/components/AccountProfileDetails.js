import { useState } from 'react';
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
  Typography
} from '@material-ui/core';
import _ from 'lodash';
import { isValidEmail } from '../utils/util';


const AccountProfileDetails = (props) => {
  const [value, setValue] = useState(0);


  const useStyles = makeStyles((theme) => {
    return ({
      footer: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2)
      }, tab: {
        padding: theme.spacing(2, 1)
      }, error: {
        color: theme.palette.error.main
      }

    })
  });
  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    country: 'USA'
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const validate = (type, text) => {
    if (type === 'email') {

      return (submitted && (_.isEmpty(values[type]) ? `Please specify the ${text}` : isValidEmail(values[type]) ? "" : `Please specify valid ${text}`));
    } else {

      return (submitted && _.isEmpty(values[type])) ? <span className={classes.error} >{`Please specify the ${text}`}</span> : "";
    }
  }
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
        <Paper component="form"
          autoComplete="off"
          noValidate
          {...props}
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true);
            if (_.isEmpty(values.firstName)
              || _.isEmpty(values.lastName)
              || _.isEmpty(values.email)
              || _.isEmpty(values.country)) {
              return;
            }

            if (!isValidEmail(values.email)) {
              return
            }
          }}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText={validate('firstName', "first name")}
                    label="First name"
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Last name"
                    helperText={validate('lastName', "last name")}
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    helperText={validate('email', "email")}
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
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
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    helperText={validate('country', "country")}
                    onChange={handleChange}
                    required
                    value={values.country}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              className={classes.footer}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
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

export default AccountProfileDetails;