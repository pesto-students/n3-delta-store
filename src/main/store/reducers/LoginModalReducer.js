import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
} from "../constants/StoreConstants";

const initialState = {
  isOpen: false,
};

const LoginModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL: {
      return {
        isOpen: true,
      };
    }

    case CLOSE_LOGIN_MODAL: {
      return {
        isOpen: false,
      };
    }

    default:
      return state;
  }
};

export default LoginModalReducer;
