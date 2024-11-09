import {
  GET_CATEGORY_PAGE_DETAILS_REQUEST,
  GET_CATEGORY_PAGE_DETAILS_SUCCESS,
  GET_CATEGORY_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/categoryPageConstants";

// Get Category Meta Details

export const getCategoryPageDetailsReducer = (
  state = { categoryPage: {} },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_PAGE_DETAILS_REQUEST:
      return {
        categoryPageLoading: true,
        categoryPage: {},
      };

    case GET_CATEGORY_PAGE_DETAILS_SUCCESS:
      return {
        categoryPageLoading: false,
        categoryPage: action.payload.categoryPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CATEGORY_PAGE_DETAILS_FAIL:
      return {
        categoryPageLoading: false,
        categoryPageError: action.payload,
        categoryPage: {},
      };

    default:
      return state;
  }
};
