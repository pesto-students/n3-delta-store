import {
  SET_CART_ITEMS,
  CLEAR_CART,
  SET_CART,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  NO_CART
} from "../constants/StoreConstants";

export const setCartItems = (items) => (dispatch) => {
  dispatch({ type: SET_CART_ITEMS, payload: items });
};

export const setCart = (cart) => (dispatch) => {
  dispatch({ type: SET_CART, payload: cart });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};

export const noCart = () => (dispatch) => {
  dispatch({ type: NO_CART });
};

export const addItemToCart = (id, data) => (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART, payload: { id, data } });
};

export const removeItemFromCart = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM_FROM_CART, payload: id });
};
