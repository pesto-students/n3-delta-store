import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../main/store/actions/ErrorActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GlobalError = () => {
  const dispatch = useDispatch();
  const errorState = useSelector((state) => state?.errorReducer);
  const { error, message } = errorState;
  return (
    <Snackbar
      open={error}
      autoHideDuration={6000}
      onClose={() => {
        dispatch(setError(null));
      }}
    >
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );
};

export default GlobalError;
