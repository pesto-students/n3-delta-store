import {
  SET_WISHLIST,
  ADD_ITEM_TO_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
  MOVE_ITEM_FROM_WISHLIST_TO_CART,
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
