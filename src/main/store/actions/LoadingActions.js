import { SET_LOADING } from "../constants/StoreConstants";

export const setLoader = (input) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: input });
};
