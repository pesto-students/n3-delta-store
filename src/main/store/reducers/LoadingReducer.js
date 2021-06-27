import { SET_LOADING } from "../constants/StoreConstants";

const initialState = {
  loading: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action?.payload
      };
    default:
      return state;
  }
};

export default LoadingReducer;
