import React, { Suspense, useEffect, useRef } from "react";
import Routes from "./main/routes/route";
import "./resources/styles/reset.scss";
import { ThemeProvider } from "@material-ui/core";
import theme from "./resources/styles/theme";
import GlobalError from "./components/GlobalError";
import Loading from "./components/Loading";
import firebase from "./config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./main/store/actions/AuthActions";
import { setDisplayType } from "./main/store/actions/DisplayActions";
import { setLoader } from "./main/store/actions/LoadingActions";
import { getCart, getExistingUserCart } from "./main/axios/commerce";
import { noCart, setCart } from "./main/store/actions/CartActions";
import { dbUtils } from "./services/firestore/db";
import { setWishList } from "./main/store/actions/WishListActions";
import axios from "axios";
import { setGeoIpData } from "./main/store/actions/HomeActions";
import _ from "lodash";

function AppMain() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.loader?.loading || false);
  const geoIpdata = useSelector((state) => state?.homeReducer?.geoIpData || {});
  const authState = useSelector((state) => state?.authReducer);
  const wishList = useSelector((state) => state?.wishList);
  const { isLoggedIn, user } = authState;
  const initialRender = useRef(true);

  useEffect(() => {
    if (_.isEmpty(geoIpdata)) {
      axios.get(`https://freegeoip.app/json/`).then((res) => {
        dispatch(setGeoIpData(res.data));
      });
    }
  }, [geoIpdata]);
  /* ; */

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
    const { uid } = user;
    const userData = await dbUtils.getUser(uid);
    if (userData) {
      const { wishList } = userData;
      dispatch(setWishList(wishList));
      fetchCartItems();
    } else {
      createAndFetchCart();
    }
  };

  const updateDbWishList = async (items) => {
    const { uid } = user;
    await dbUtils.updateUserWishList(uid, items);
  };

  useEffect(() => {
    if (initialRender?.current) {
      initialRender.current = false;
      return;
    }
    //console.log(wishList);
    updateDbWishList(wishList?.items);
  }, [wishList]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      dispatch(noCart());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const updateUser = (response) => {
      dispatch(setAuth(response));
    };
    firebase.auth().onAuthStateChanged(updateUser);
  }, []);

  useEffect(() => {
    const setResponsiveness = () => {
      dispatch(setDisplayType(window));
    };

    window.addEventListener("resize", () => setResponsiveness());
    setResponsiveness();
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, [dispatch]);
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

export default AppMain;
