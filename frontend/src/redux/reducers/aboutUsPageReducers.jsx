import {
  GET_ABOUT_US_PAGE_DETAILS_REQUEST,
  GET_ABOUT_US_PAGE_DETAILS_SUCCESS,
  GET_ABOUT_US_PAGE_DETAILS_FAIL,
  GET_ABOUT_US_META_DATA_REQUEST,
  GET_ABOUT_US_META_DATA_SUCCESS,
  GET_ABOUT_US_META_DATA_FAIL,
} from "../constants/aboutUsPageConstants";

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

// Get About Us Page Details

export const getAboutUsPageMetaDetailsReducer = (
  state = { aboutUsMeta: {} },
  action
) => {
  switch (action.type) {
    case GET_ABOUT_US_META_DATA_REQUEST:
      return {
        metaAboutUsLoading: true,
        aboutUsMeta: {},
      };

    case GET_ABOUT_US_META_DATA_SUCCESS:
      return {
        metaAboutUsLoading: false,
        aboutUsMeta: action.payload.aboutUs,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_ABOUT_US_META_DATA_FAIL:
      return {
        metaAboutUsLoading: false,
        metaAboutUsError: action.payload,
        aboutUsMeta: {},
      };

    default:
      return state;
  }
};
