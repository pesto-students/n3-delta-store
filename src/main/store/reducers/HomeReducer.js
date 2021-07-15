import {
  SET_GEOIP_DATA,
  SET_HOME_CATEGORIES,
} from "../constants/StoreConstants";

const initialState = {
  categories: [],
  geoIpData: {},
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_GEOIP_DATA:
      return {
        ...state,
        geoIpData: action.payload,
      };
    default:
      return state;
  }
};
export const homeInitalState = initialState;
export default HomeReducer;
