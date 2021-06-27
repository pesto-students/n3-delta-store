import { formatUserInfo } from "../../../utils/util";
import { SET_AUTH, GET_AUTH } from "../constants/StoreConstants";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      const { payload = null } = action;

      return {
        ...state,
        isLoggedIn: payload ? true : false,
        user: payload ? formatUserInfo(payload) : null,
      };
    }
    case GET_AUTH:
      return state;
    default:
      return state;
  }
};

export default AuthReducer;
