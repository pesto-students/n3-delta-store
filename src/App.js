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
import { setLoader } from "./main/store/actions/LoadingActions";
import { getCart, getExistingUserCart } from "./main/axios/commerce";
import { noCart, setCart } from "./main/store/actions/CartActions";
import { dbUtils } from "./services/firestore/db";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.loader?.loading || false);
  const authState = useSelector((state) => state?.authReducer);
  const { isLoggedIn, user } = authState;

  const updateUser = (response) => {
    dispatch(setAuth(response));
  };

  const fetchCartItems = async (id) => {
    dispatch(setLoader(true));
    const cart = await getExistingUserCart(id);
    dispatch(setCart(cart));
    dispatch(setLoader(false));
  };

  const createAndFetchCart = async () => {
    dispatch(setLoader(true));
    const cart = await getCart();
    const { id } = cart;
    await dbUtils.addUser(user, id);
    dispatch(setCart(cart));
    dispatch(setLoader(false));
  };

  const getUserData = async () => {
    console.log(user);
    const { uid } = user;
    const userData = await dbUtils.getUser(uid);
    if (userData) {
      fetchCartItems();
    } else {
      createAndFetchCart();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      dispatch(noCart());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(updateUser);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading open={true} />}>
        <Routes />
        <GlobalError />
        <Loading open={loading} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
