import { SET_ERROR } from "../constants/StoreConstants";

const initialState = {
  error: false,
  message: null,
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      const errorFlag = action?.payload ? true : false;
      return {
        ...state,
        error: errorFlag,
        message: action?.payload,
      };
    default:
      return state;
  }
};

export default ErrorReducer;
