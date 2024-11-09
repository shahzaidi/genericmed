import {
  GET_CATEGORY_PAGE_DETAILS_REQUEST,
  GET_CATEGORY_PAGE_DETAILS_SUCCESS,
  GET_CATEGORY_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/categoryPageConstants";

// Get Blog Details

export const getCategoryPagePageDetailsReducer = (
  state = { categoriesPagePage: {} },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_PAGE_DETAILS_REQUEST:
      return {
        categoriesLoading: true,
        categoriesPagePage: {},
      };

    case GET_CATEGORY_PAGE_DETAILS_SUCCESS:
      return {
        categoriesLoading: false,
        categoriesPagePage: action.payload.categoriesPagePage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CATEGORY_PAGE_DETAILS_FAIL:
      return {
        categoriesLoading: false,
        categoriesError: action.payload,
        categoriesPagePage: {},
      };

    default:
      return state;
  }
};
