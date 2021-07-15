import React from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import AccountProfile from "../components/AccountProfile";
import AccountProfileDetails from "../components/AccountProfileDetails";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const useStyles = makeStyles((theme) => {
    return {
      page: {
        ...theme.page,
        marginTop: theme.spacing(8),
      },
      container: {
        padding: theme.spacing(1, 1),
      },
      profile: {
        [theme.breakpoints.up("sm")]: {
          marginTop: theme.spacing(6),
        },
      },
    };
  });
  const classes = useStyles();
  const user = useSelector((state) => state?.authReducer?.user);

  return (
    <main className={classes.page} data-testid="profile-main-container">
      <Container>
        <Box className={classes.mainPage}>
          <Container className={classes.container} maxWidth="lg">
            <Grid container spacing={2}>
              <Grid
                className={classes.profile}
                item
                lg={4}
                md={6}
                xs={12}
                data-testid="profile-component-holder"
              >
                <AccountProfile user={user} />
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
                data-testid="profile-details-component-holder"
              >
                <AccountProfileDetails user={user} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </main>
  );
};

export default Profile;
