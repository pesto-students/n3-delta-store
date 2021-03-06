import {
  SET_WISHLIST,
  ADD_ITEM_TO_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
  MOVE_ITEM_FROM_WISHLIST_TO_CART,
  CLEAR_WISHLIST,
  OPEN_WISHLIST_MODAL,
  CLOSE_WISHLIST_MODAL,
} from "../constants/StoreConstants";

export const setWishList = (items) => (dispatch) => {
  dispatch({ type: SET_WISHLIST, payload: items });
};

export const addItemToWishList = (data) => (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_WISHLIST, payload: data });
};

export const removeItemFromWishList = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM_FROM_WISHLIST, payload: id });
};

export const moveItemFromWishList = (id) => (dispatch) => {
  dispatch({ type: MOVE_ITEM_FROM_WISHLIST_TO_CART, payload: id });
};

export const clearWishlist = () => (dispatch) => {
  dispatch({ type: CLEAR_WISHLIST });
};

export const openWishListModal = (data) => (dispatch) => {
  dispatch({ type: OPEN_WISHLIST_MODAL, payload: data });
};

export const closeWishListModal = () => (dispatch) => {
  dispatch({ type: CLOSE_WISHLIST_MODAL });
};
