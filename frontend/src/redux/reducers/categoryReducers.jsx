import {
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_CATEGORIES_META_DATA_REQUEST,
  GET_CATEGORIES_META_DATA_SUCCESS,
  GET_CATEGORIES_META_DATA_FAIL,
  CLEAR_ERROR,
} from "../constants/categoryConstants";

export const getAllCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return {
        categoryLoading: true,
        categories: [],
      };

    case GET_ALL_CATEGORY_SUCCESS:
      return {
        categoryLoading: false,
        categories: action.payload.categories,
        categoryCount: action.payload.categoryCount,
      };

    case GET_ALL_CATEGORY_FAIL:
      return {
        categoryLoading: false,
        categoryError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        categoryError: null,
      };

    default:
      return state;
  }
};

// Get Category Meta Details

export const getCategoryMetaPageDetailsReducer = (
  state = { categoryPage: {} },
  action
) => {
  switch (action.type) {
    case GET_CATEGORIES_META_DATA_REQUEST:
      return {
        categoryMetaLoading: true,
        categoryPage: {},
      };

    case GET_CATEGORIES_META_DATA_SUCCESS:
      return {
        categoryMetaLoading: false,
        categoryPage: action.payload.categoryPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CATEGORIES_META_DATA_FAIL:
      return {
        categoryMetaLoading: false,
        categoryMetaError: action.payload,
        categoryPage: {},
      };

    default:
      return state;
  }
};
