/**
 userProfile:{
   uid: '',
  fullName:'',
   address:'',
   payment:{

   },
   orders:{

   },
 }
 */

import { ADD_ADDRESS, SET_DEFAULT_ADDRESS } from "../constants/StoreConstants";

const initialState = {
  addresses: [
    {
      uid: "1",
      firstName: "john",
      lastName: "doe",
      email: "johndoe@example.com",
      mobile: "1234567890",
      addressLine: "something",
      state: "Karnataka",
      city: "Bangalore",
      pin: "560103",
    },
  ],
  defaultAddress: {
    uid: "1",
    firstName: "john",
    lastName: "doe",
    email: "johndoe@example.com",
    mobile: "1234567890",
    addressLine: "something",
    state: "Karnataka",
    city: "Bangalore",
    pin: "560103",
  },
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
        default: { ...payload },
      };
    }
    default:
      return state;
  }
};

export default AddressInfoReducer;
