import React from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import AccountProfile from '../components/AccountProfile';
import AccountProfileDetails from '../components/AccountProfileDetails';

const Profile = (props) => {
  const useStyles = makeStyles((theme) => {
    return ({
      page: {
        ...theme.page,
        marginTop: theme.spacing(8)
      }

    })
  });
  const classes = useStyles();

  return (
    <main className={classes.page}>
      <Container>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <AccountProfile />
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </main>
  );
};

export default Profile;
