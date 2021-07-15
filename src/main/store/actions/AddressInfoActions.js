import { SET_DEFAULT_ADDRESS, ADD_ADDRESS } from "../constants/StoreConstants";

export const addAddress = (items) => (dispatch) => {
  dispatch({ type: ADD_ADDRESS, payload: items });
};

export const setDefaultAddress = (data) => (dispatch) => {
  dispatch({ type: SET_DEFAULT_ADDRESS, payload: data });
};
