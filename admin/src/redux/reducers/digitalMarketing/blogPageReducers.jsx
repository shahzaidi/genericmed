import {
  GET_BLOG_PAGE_DETAILS_REQUEST,
  GET_BLOG_PAGE_DETAILS_SUCCESS,
  GET_BLOG_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/blogPageConstants";

// Get Blog Details

export const getBlogPageDetailsReducer = (state = { blogPage: {} }, action) => {
  switch (action.type) {
    case GET_BLOG_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        blogPage: {},
      };

    case GET_BLOG_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        blogPage: action.payload.blogPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_BLOG_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        blogPage: {},
      };

    default:
      return state;
  }
};
