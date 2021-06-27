import React, { Suspense, useEffect } from "react";
import Routes from "./main/routes/route";
import "./resources/styles/reset.scss";
import { ThemeProvider } from "@material-ui/core";
import theme from "./resources/styles/theme";
import GlobalError from "./components/GlobalError";
import Loading from "./components/Loading";
import firebase from "./config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./main/store/actions/AuthActions";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.loader?.loading || false);
  const updateUser = (response) => {
    dispatch(setAuth(response));
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(updateUser);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading open={true} />}>
        <Routes />
        <GlobalError />
        <Loading open={loading}/>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
