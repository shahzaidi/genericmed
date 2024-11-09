import {
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_CATEGORY_DETAILS_REQUEST,
  GET_CATEGORY_DETAILS_SUCCESS,
  GET_CATEGORY_DETAILS_FAIL,
} from "../constants/categoryConstants";

export const getAllCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return {
        loading: true,
        categories: [],
      };

    case GET_ALL_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload.categories,
        categoriesCount: action.payload.categoriesCount,
      };

    case GET_ALL_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Get Category Details

export const getCategoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case GET_CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
        category: {},
      };

    case GET_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CATEGORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
