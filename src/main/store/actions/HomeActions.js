import { SET_HOME_CATEGORIES } from '../constants/StoreConstants';

export const setHomeCategories = categoryData => dispatch => {
    dispatch({ type: SET_HOME_CATEGORIES, payload: categoryData });
};
