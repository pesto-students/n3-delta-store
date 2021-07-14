import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Link,
  TextField,
} from "@material-ui/core";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LocationCityOutlined, MailOutline } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { translate } from "../resources/language/translate";
import { getCurrentFullYear } from "../utils/util";

const Footer = (props) => {
  const useStyles = makeStyles((theme) => {
    return {
      cardIFootertem: {
        padding: theme.spacing(0),
      },
      cardContent: {
        height: "100%",
      },
      textField: {
        width: "100%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
      },
      alignItemCenter: {
        ...theme.alignItemCenter,
      },
    };
  });

  const history = useHistory();
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer>
      <Divider />

      <Grid container>
        <Grid className={classes.cardIFootertem} item xs={12} md={4}>
          <Card className={classes.cardContent}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {translate("Contact Us")}
              </Typography>
              <Typography variant="subtitle1">
                {translate("Need a hand? Or a high five?")}
              </Typography>
              <Typography variant="subtitle1">
                {translate("Here's how to reach us.")}
              </Typography>

              <Typography variant="h6">
                <Link
                  href="mailto:mitesh.jethmalani@gmail.com"
                  className={classes.alignItemCenter}
                  onClick={(e) => e.preventDefault()}
                >
                  <MailOutline fontSize="small" /> mitesh.jethmalani@gmail.com
                </Link>
              </Typography>
              <Typography variant="h6" className={classes.alignItemCenter}>
                <LocationCityOutlined /> Address:
              </Typography>
              <Typography variant="subtitle2">Pesto Tech</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} className={classes.cardIFootertem}>
          <Card className={classes.cardContent}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Shop with us
              </Typography>
              <Typography variant="h6" gutterBottom>
                <Link href="/shop/men">Men</Link>
              </Typography>
              <Typography variant="h6" gutterBottom>
                <Link href="/shop/women">Women</Link>
              </Typography>
              <Typography variant="h6" gutterBottom>
                <Link href="/shop/accessories">Accessories</Link>
              </Typography>
              <Typography variant="h6">
                <Link href="/shop/new-arrivals">New Arrivals</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.cardIFootertem} item xs={12} md={4}>
          <Card className={classes.cardContent}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                  {translate("Receive offers")}
                </Typography>
                <Typography variant="h6">
                  {translate(
                    "Taste the holidays of the everyday close to home."
                  )}
                </Typography>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="subscription-email">
                    Your Email
                  </InputLabel>
                  <Input
                    id="subscription-email"
                    type="email"
                    className={classes.textField}
                    required={true}
                  />
                </FormControl>
                {/* <TextField type="email" required={true} title="Your Email" label="Your Email" className={classes.textField} placeholder={translate("Your email")} /> */}
                <Button
                  type="submit"
                  color="primary"
                  aria-label={translate("Keep me updated")}
                  variant="contained"
                  fullWidth={true}
                >
                  {translate("Keep me updated")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography align="center">
        Copyright © {getCurrentFullYear()} template
      </Typography>
    </footer>
  );
};

export default Footer;
