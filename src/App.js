import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import Routes from "./main/routes/route";
import { setError } from "./main/store/actions/ErrorActions";
import "./resources/styles/reset.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const dispatch = useDispatch();
  const errorState = useSelector((state) => state?.errorReducer);
  const { error, message } = errorState;
  return (
    <Suspense fallback={<div>Please Wait...</div>}>
      <Routes />
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(setError(null));
        }}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </Suspense>
  );
}

export default App;
