import { SET_AUTH, GET_AUTH } from '../constants/StoreConstants';

export const setAuth = user => dispatch => {
    dispatch({ type: SET_AUTH, payload: user });
};

export const getAuth = () => dispatch => {
    dispatch({ type: GET_AUTH });
};
