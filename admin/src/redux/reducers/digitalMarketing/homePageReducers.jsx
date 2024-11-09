import {
  GET_HOME_PAGE_DETAILS_REQUEST,
  GET_HOME_PAGE_DETAILS_SUCCESS,
  GET_HOME_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/homePageConstants";

// Get Home Page Details

export const getHomePageDetailsReducer = (state = { homePage: {} }, action) => {
  switch (action.type) {
    case GET_HOME_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        homePage: {},
      };

    case GET_HOME_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        homePage: action.payload.homePage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_HOME_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        homePage: {},
      };

    default:
      return state;
  }
};
