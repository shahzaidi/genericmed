import {
  GET_ABOUT_US_PAGE_DETAILS_REQUEST,
  GET_ABOUT_US_PAGE_DETAILS_SUCCESS,
  GET_ABOUT_US_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/aboutUsConstants";

// Get About Us Page Details

export const getAboutUsPageDetailsReducer = (
  state = { aboutUs: {} },
  action
) => {
  switch (action.type) {
    case GET_ABOUT_US_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        aboutUs: {},
      };

    case GET_ABOUT_US_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        aboutUs: action.payload.aboutUs,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_ABOUT_US_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        aboutUs: {},
      };

    default:
      return state;
  }
};
