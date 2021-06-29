import { SET_DISPLAY_TYPE } from '../constants/StoreConstants';

export const setDisplayType = window => dispatch => {
    dispatch({ type: SET_DISPLAY_TYPE, payload: window });
};
