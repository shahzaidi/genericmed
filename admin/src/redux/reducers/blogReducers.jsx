// Get All Contact Us

import {
  GET_ALL_BLOG_FAIL,
  GET_ALL_BLOG_REQUEST,
  GET_ALL_BLOG_SUCCESS,
  GET_BLOG_DETAILS_REQUEST,
  GET_BLOG_DETAILS_SUCCESS,
  GET_BLOG_DETAILS_FAIL,
} from "../constants/blogConstatnts";

// Digital Marketing Get All Blog

export const getAllBlogReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_BLOG_REQUEST:
      return {
        loading: true,
        blogs: [],
      };

    case GET_ALL_BLOG_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogs,
        blogsCount: action.payload.blogsCount,
      };

    case GET_ALL_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Digital Marketing Get Blog Details

export const getBlogDetailsReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case GET_BLOG_DETAILS_REQUEST:
      return {
        blogLoading: true,
        blog: {},
      };

    case GET_BLOG_DETAILS_SUCCESS:
      return {
        blogLoading: false,
        blog: action.payload.blog,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_BLOG_DETAILS_FAIL:
      return {
        blogLoading: false,
        blogError: action.payload,
      };

    default:
      return state;
  }
};
