import {
  CLOSE_LOGIN_MODAL,
  OPEN_LOGIN_MODAL,
} from "../constants/StoreConstants";

export const openLoginModal = () => (dispatch) => {
  dispatch({ type: OPEN_LOGIN_MODAL });
};

export const closeLoginModal = () => (dispatch) => {
  dispatch({ type: CLOSE_LOGIN_MODAL });
};
