import {
  GET_HOMES_META_DATA_REQUEST,
  GET_HOMES_META_DATA_SUCCESS,
  GET_HOMES_META_DATA_FAIL,
} from "../constants/homePageConstants";

// Get Home Page Details

export const getHomePageMetaDetailsReducer = (
  state = { homePage: {} },
  action
) => {
  switch (action.type) {
    case GET_HOMES_META_DATA_REQUEST:
      return {
        homePageLoading: true,
        homePage: {},
      };

    case GET_HOMES_META_DATA_SUCCESS:
      return {
        homePageLoading: false,
        homePage: action.payload.homePage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_HOMES_META_DATA_FAIL:
      return {
        homePageLoading: false,
        homePageError: action.payload,
        homePage: {},
      };

    default:
      return state;
  }
};
