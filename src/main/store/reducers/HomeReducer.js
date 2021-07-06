import {  SET_HOME_CATEGORIES } from "../constants/StoreConstants";

const initialState = {
    categories: [],
};

const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HOME_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        default:
            return state;
    }
};
export const homeInitalState = initialState;
export default HomeReducer;
