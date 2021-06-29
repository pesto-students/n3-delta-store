import { SET_DISPLAY_TYPE } from "../constants/StoreConstants";

const initialState = {
    isMobile: false,
};

const DisplayReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DISPLAY_TYPE:
            return {
                ...state,
                isMobile: window.innerWidth < 900,
            };
        default:
            return state;
    }
};

export default DisplayReducer;
