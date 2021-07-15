import React from "react";
import { Container, makeStyles, Paper, Typography } from "@material-ui/core";

const NotFound = () => {
  const useStyles = makeStyles((theme) => {
    return {
      page: {
        ...theme.page,
        marginTop: theme.spacing(8),
      },
      paper: {
        [theme.breakpoints.up("sm")]: {
          padding: theme.spacing(2),
          position: "absolute",
          top: "50%",
          left: "50%",
          "-ms-transform": "translateX(-50%) translateY(-50%)",
          "-webkit-transform": "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        },
      },
    };
  });
  const classes = useStyles();
  return (
    <>
      <Paper
        className={classes.page}
        style={{ minHeight: "90vh" }}
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h2">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
        </Container>
      </Paper>
    </>
  );
};

export default NotFound;
