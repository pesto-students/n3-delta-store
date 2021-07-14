import {
  CLEAR_CART,
  SET_CART,
  SET_CART_ITEMS,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  EMPTY_CART,
  NO_CART,
} from "../constants/StoreConstants";

const initialState = {
  items: [],
  cartId: null,
  cartLength: 0,
  cart: {},
  total: 0,
  currency: {},
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART: {
      const {
        id = null,
        total_items = 0,
        line_items = [],
        subtotal = {},
        currency = {},
      } = action?.payload;
      return {
        ...state,
        cartId: id,
        cartLength: total_items,
        items: line_items,
        cart: action?.payload,
        total: subtotal?.raw,
        currency,
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        items: [],
      };
    }
    case NO_CART: {
      return {
        ...initialState,
      };
    }
    case SET_CART_ITEMS: {
      const { payload = [] } = action;
      return {
        ...state,
        items: payload,
        // cartLength: calculateCartLength(payload),
      };
    }
    case ADD_ITEM_TO_CART: {
      return {
        ...state,
        items: action?.payload,
      };
    }
    case REMOVE_ITEM_FROM_CART: {
      return {
        ...state,
        items: action?.payload,
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
