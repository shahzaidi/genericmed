import {
  GET_ALL_BLOG_CATEGORY_FAIL,
  GET_ALL_BLOG_CATEGORY_REQUEST,
  GET_ALL_BLOG_CATEGORY_SUCCESS,
  GET_BLOG_CATEGORY_DETAILS_REQUEST,
  GET_BLOG_CATEGORY_DETAILS_SUCCESS,
  GET_BLOG_CATEGORY_DETAILS_FAIL,
} from "../constants/blogCategoryConstants";

// Get All Blog Category

export const getAllBlogCategoryReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BLOG_CATEGORY_REQUEST:
      return {
        loading: true,
        categories: [],
      };

    case GET_ALL_BLOG_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: action.payload.blogCategories,
        blogCategoriesCount: action.payload.blogCategoriesCount,
      };

    case GET_ALL_BLOG_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Get Blog Category Details

export const getBlogCategoryDetailsReducer = (
  state = { blogCategory: {} },
  action
) => {
  switch (action.type) {
    case GET_BLOG_CATEGORY_DETAILS_REQUEST:
      return {
        blogLoading: true,
        blogCategory: {},
      };

    case GET_BLOG_CATEGORY_DETAILS_SUCCESS:
      return {
        blogLoading: false,
        blogCategory: action.payload.category,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_BLOG_CATEGORY_DETAILS_FAIL:
      return {
        blogLoading: false,
        blogError: action.payload,
      };

    default:
      return state;
  }
};
