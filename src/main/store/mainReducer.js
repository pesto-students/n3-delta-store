import { combineReducers } from "redux";

import AuthReducer from "./reducers/AuthReducer";
import ErrorReducer from "./reducers/ErrorReducer";
import LoginModalReducer from "./reducers/LoginModalReducer";

export default combineReducers({
  authReducer: AuthReducer,
  loginModalReducer: LoginModalReducer,
  errorReducer: ErrorReducer,
});
