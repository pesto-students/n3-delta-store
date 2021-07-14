import {
  SET_WISHLIST,
  ADD_ITEM_TO_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
  MOVE_ITEM_FROM_WISHLIST_TO_CART,
  CLEAR_WISHLIST,
} from "../constants/StoreConstants";

const initialState = {
  items: [],
};

const remove = (tobeRemovedId, items = []) => {
  return items.filter(({ id }) => id !== tobeRemovedId);
};

const add = (tobeAdded, items = []) => {
  let found = false;
  items.map(({ id }) => {
    if (!found) {
      found = id === tobeAdded?.id;
    }
  });
  if (!found) {
    items.push(tobeAdded);
  }
  return items;
};

const WishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WISHLIST: {
      const wishList = action?.payload || [];
      return {
        ...state,
        items: wishList,
      };
    }
    case ADD_ITEM_TO_WISHLIST: {
      console.log("coming here");
      return {
        ...state,
        items: add(action?.payload, state.items),
      };
    }
    case REMOVE_ITEM_FROM_WISHLIST:
    case MOVE_ITEM_FROM_WISHLIST_TO_CART: {
      const id = action?.payload;
      return {
        ...state,
        items: remove(id, state.items),
      };
    }
    case CLEAR_WISHLIST: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default WishListReducer;
