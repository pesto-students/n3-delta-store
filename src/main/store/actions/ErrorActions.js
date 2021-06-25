import { SET_ERROR } from "../constants/StoreConstants";

export const setError = (err) => (dispatch) => {
  dispatch({ type: SET_ERROR, payload: err });
};
