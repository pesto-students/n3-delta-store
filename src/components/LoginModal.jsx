import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDispatch, useSelector } from "react-redux";
import googleLogo from "../resources/images/google_logo.png";
import { closeLoginModal } from "../main/store/actions/LoginModalActions";
import { googleProvider } from "../services/Authentication/authMethods";
import { socialAuth } from "../services/Authentication/auth";
import { setAuth } from "../main/store/actions/AuthActions";
import { setError } from "../main/store/actions/ErrorActions";
import { setLoader } from "../main/store/actions/LoadingActions";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "100px",
    backgroundColor: "rgb(72,89,107,0.1)",
  },
  actions: {
    backgroundColor: "rgb(72,89,107,0.1)",
  },
  verticalMargin: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  loginButton: {
    margin: "0 8px",
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
    },
  },
}));

function LoginModal() {
  const classes = useStyles();
  const loginModalState = useSelector((state) => state?.loginModalReducer);
  const authState = useSelector((state) => state?.authReducer);
  const { isLoggedIn } = authState;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeLoginModal());
  };
  const handleLogin = async (provider) => {
    dispatch(setLoader(true));
    const response = await socialAuth(provider);
    const { error } = response;
    if (error) {
      dispatch(setError(`Couldn't log you in! Please Try Again`));
    } else {
      dispatch(setAuth(response?.user));
    }
    dispatch(setLoader(false));
    handleClose();
  };

  useEffect(() => {
    handleClose();
  }, [isLoggedIn]);

  return (
    <Dialog
      open={loginModalState.isOpen}
      onClose={() => {
        handleClose();
      }}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="simple-dialog-title">Login to continue</DialogTitle>
      <DialogContent className={classes.dialogPaper}>
        <div className="login-btn">
          <Button
            startIcon={
              <img
                width="15px"
                style={{ marginBottom: "3px", marginRight: "5px" }}
                alt="Google login"
                src={googleLogo}
              />
            }
            onClick={() => {
              handleLogin(googleProvider);
            }}
            color="primary"
          >
            SignIn with Google
          </Button>
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginModal;
