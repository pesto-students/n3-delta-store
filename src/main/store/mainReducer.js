import { combineReducers } from "redux";

import AuthReducer from "./reducers/AuthReducer";
import ErrorReducer from "./reducers/ErrorReducer";
import LoginModalReducer from "./reducers/LoginModalReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import CartReducer from "./reducers/CartReducer";

export default combineReducers({
  authReducer: AuthReducer,
  loginModalReducer: LoginModalReducer,
  errorReducer: ErrorReducer,
  loader: LoadingReducer,
  cart: CartReducer,
});
