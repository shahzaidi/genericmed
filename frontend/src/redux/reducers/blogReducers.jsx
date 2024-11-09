import {
  GET_ALL_BLOG_REQUEST,
  GET_ALL_BLOG_SUCCESS,
  GET_ALL_BLOG_FAIL,
  GET_ALL_BLOG_CATEGORY_REQUEST,
  GET_ALL_BLOG_CATEGORY_SUCCESS,
  GET_ALL_BLOG_CATEGORY_FAIL,
  GET_BLOGS_META_DATA_REQUEST,
  GET_BLOGS_META_DATA_SUCCESS,
  GET_BLOGS_META_DATA_FAIL,
  GET_BLOG_DETAILS_REQUEST,
  GET_BLOG_DETAILS_SUCCESS,
  GET_BLOG_DETAILS_FAIL,
  GET_BLOGS_FOR_HOME_REQUEST,
  GET_BLOGS_FOR_HOME_SUCCESS,
  GET_BLOGS_FOR_HOME_FAIL,
  CLEAR_ERROR,
} from "../constants/blogConstants";

// Get All Blogs

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
        blogCount: action.payload.count,
      };

    case GET_ALL_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
        blogs: [],
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Get All Blogs Category

export const getAllBlogCategoryReducer = (
  state = { blogCategories: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BLOG_CATEGORY_REQUEST:
      return {
        categoryLoading: true,
        blogCategories: [],
      };

    case GET_ALL_BLOG_CATEGORY_SUCCESS:
      return {
        categoryLoading: false,
        blogCategories: action.payload.blogCategories,
      };

    case GET_ALL_BLOG_CATEGORY_FAIL:
      return {
        categoryLoading: false,
        categoryError: action.payload,
        blogCategories: [],
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

// Get Blog Details

export const getBlogPageDetailsReducer = (state = { blogPage: {} }, action) => {
  switch (action.type) {
    case GET_BLOGS_META_DATA_REQUEST:
      return {
        blogsLoading: true,
        blogPage: {},
      };

    case GET_BLOGS_META_DATA_SUCCESS:
      return {
        blogsLoading: false,
        blogPage: action.payload.blogPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_BLOGS_META_DATA_FAIL:
      return {
        blogsLoading: false,
        blogsError: action.payload,
        blogPage: {},
      };

    default:
      return state;
  }
};

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
        blog: {},
      };

    default:
      return state;
  }
};

// Get Home Page Blogs

export const getHomePageBlogsReducer = (state = { homeBlogs: [] }, action) => {
  switch (action.type) {
    case GET_BLOGS_FOR_HOME_REQUEST:
      return {
        homeBlogsLoading: true,
        homeBlogs: [],
      };

    case GET_BLOGS_FOR_HOME_SUCCESS:
      return {
        homeBlogsLoading: false,
        homeBlogs: action.payload.blogs,
      };

    case GET_BLOGS_FOR_HOME_FAIL:
      return {
        homeBlogsLoading: false,
        homeBlogsError: action.payload,
        homeBlogs: [],
      };

    case CLEAR_ERROR:
      return {
        ...state,
        homeBlogsError: null,
      };

    default:
      return state;
  }
};

// // Get Blogs Meta Details

// export const getBlogsMetaPageDetailsReducer = (
//   state = { blogPage: {} },
//   action
// ) => {
//   switch (action.type) {
//     case GET_BLOG_META_DATA_REQUEST:
//       return {
//         blogMetaLoading: true,
//         blogPage: {},
//       };

//     case GET_BLOG_META_DATA_SUCCESS:
//       return {
//         blogMetaLoading: false,
//         blogPage: action.payload.blogPage,
//         // categoryCount: action.payload.categoryCount,
//       };

//     case GET_BLOG_META_DATA_FAIL:
//       return {
//         blogMetaLoading: false,
//         blogMetaError: action.payload,
//         blogPage: {},
//       };

//     default:
//       return state;
//   }
// };
