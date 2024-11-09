import axios from "axios";
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
  GET_BLOG_META_DATA_REQUEST,
  GET_BLOG_META_DATA_SUCCESS,
  GET_BLOG_META_DATA_FAIL,
  GET_BLOGS_FOR_HOME_REQUEST,
  GET_BLOGS_FOR_HOME_SUCCESS,
  GET_BLOGS_FOR_HOME_FAIL,
  CLEAR_ERROR,
} from "../constants/blogConstants";

// Get All Blog

export const getAllBlogAction =
  (category, currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_BLOG_REQUEST });
      let link = `/api/v1/blog/getAll/gm/?page=${currentPage}`;
      if (category) {
        link = `/api/v1/blog/getAll/gm/?category=${category}&page=${currentPage}`;
      }

      const { data } = await axios.get(link);

      dispatch({ type: GET_ALL_BLOG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_BLOG_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Blog Category

export const getAllBlogCategoryAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BLOG_CATEGORY_REQUEST });
    let link = `/api/v1/blog/categories/gm`;

    const { data } = await axios.get(link);

    dispatch({ type: GET_ALL_BLOG_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_BLOG_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBlogDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/get/blog/details/gm?id=${id}`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_BLOG_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_BLOG_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing Blog Page

export const getBlogPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOGS_META_DATA_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/blogPage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_BLOGS_META_DATA_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_BLOGS_META_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get 4 latest blogs for home page

export const getHomePageBlogsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOGS_FOR_HOME_REQUEST });
    let link = `/api/v1/blog/getLatestBlogs`;

    const { data } = await axios.get(link);

    dispatch({ type: GET_BLOGS_FOR_HOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_FOR_HOME_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing Blog Page

export const getBlogsMetaPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_META_DATA_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/blogPage/gm`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_BLOG_META_DATA_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_BLOG_META_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};
