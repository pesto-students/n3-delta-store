import {
  SET_GEOIP_DATA,
  SET_HOME_CATEGORIES,
} from "../constants/StoreConstants";

export const setHomeCategories = (categoryData) => (dispatch) => {
  dispatch({ type: SET_HOME_CATEGORIES, payload: categoryData });
};

export const setGeoIpData = (data) => (dispatch) => {
  dispatch({ type: SET_GEOIP_DATA, payload: data });
};
