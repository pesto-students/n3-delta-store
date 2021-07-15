/*
uid,
displayName,
email,
address,
mobile,
 */

import { ADD_ADDRESS, SET_DEFAULT_ADDRESS } from "../constants/StoreConstants";

/* const initialState = {
  addresses: [
    {
      uid: "1",
      displayName: "john",
      email: "johndoe@example.com",
      address: "something",
    },
  ],
  defaultAddress: {
    uid: "1",
    displayName: "john",
    email: "johndoe@example.com",
    address: "something",
  },
}; */

const initialState = {
  addresses: [],
  defaultAddress: {},
};

const AddressInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS: {
      const { payload = {} } = action;

      return {
        ...state,
        addresses: [...state.addresses, payload],
      };
    }
    case SET_DEFAULT_ADDRESS: {
      const { payload = {} } = action;

      return {
        ...state,
        defaultAddress: { ...payload },
      };
    }
    default:
      return state;
  }
};

export default AddressInfoReducer;
