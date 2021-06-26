import { SET_AUTH, GET_AUTH } from "../constants/StoreConstants";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isLoggedIn: action?.payload ? true : false,
        user: action.payload,
      };
    case GET_AUTH:
      return state;
    default:
      return state;
  }
};

export default AuthReducer;
