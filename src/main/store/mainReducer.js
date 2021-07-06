import { combineReducers } from "redux";

import AuthReducer from "./reducers/AuthReducer";
import HomeReducer from "./reducers/HomeReducer";
import ErrorReducer from "./reducers/ErrorReducer";
import LoginModalReducer from "./reducers/LoginModalReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import CartReducer from "./reducers/CartReducer";
import DisplayReducer from "./reducers/DisplayReducer";
import WishListReducer from "./reducers/WishlistReducer";
import AddressInfoReducer from "./reducers/AddressInfoReducer";

export default combineReducers({
  authReducer: AuthReducer,
  loginModalReducer: LoginModalReducer,
  errorReducer: ErrorReducer,
  homeReducer: HomeReducer,
  loader: LoadingReducer,
  cart: CartReducer,
  display: DisplayReducer,
  wishList: WishListReducer,
  addressInfo: AddressInfoReducer,
});
