import {
  GET_ABOUT_US_PAGE_DETAILS_REQUEST,
  GET_ABOUT_US_PAGE_DETAILS_SUCCESS,
  GET_ABOUT_US_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/aboutUsPageConstants";

// Get About Us Page Details

export const getAboutUsDetailsReducer = (
  state = { aboutUsPage: {} },
  action
) => {
  switch (action.type) {
    case GET_ABOUT_US_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        aboutUsPage: {},
      };

    case GET_ABOUT_US_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        aboutUsPage: action.payload.aboutUsPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_ABOUT_US_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        aboutUsPage: {},
      };

    default:
      return state;
  }
};
