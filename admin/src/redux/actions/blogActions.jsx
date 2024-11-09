import axios from "axios";
import {
  GET_ALL_BLOG_REQUEST,
  GET_ALL_BLOG_SUCCESS,
  GET_ALL_BLOG_FAIL,
  GET_BLOG_DETAILS_REQUEST,
  GET_BLOG_DETAILS_SUCCESS,
  GET_BLOG_DETAILS_FAIL,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
} from "../constants/blogConstatnts";
import { toast } from "react-toastify";

// Get All Blog

export const getAllBlog =
  (page = 1) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let link = `/api/v1/blog/getAll?page=${page}`;
      dispatch({ type: GET_ALL_BLOG_REQUEST });

      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_BLOG_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({
        type: GET_ALL_BLOG_FAIL,
        payload: errorMessage,
      });
    }
  };

// Get Blog Details

export const getBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BLOG_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/get/blog/details?id=${id}`;

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

//   Create Blog

export const createBlogAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/blog/new";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_BLOG_REQUEST });

    const { data } = await axios.post(
      url,
      {
        title: object?.title,
        content: object?.content,
        author: object?.author,
        status: object?.status,
        slug: object?.slug,
        category: object?.category,
        blogImage: object?.blogImage
          ? object?.blogImage
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        featuredImage: object?.featuredImage
          ? object?.featuredImage
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        metaTitle: object?.metaTitle,
        metaDescription: object?.metaDescription,
        metaKeyword: object?.metaKeyword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(() => {
        window.location.href = "/blogallblogs";
      }, 5100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: CREATE_BLOG_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

//   Update Blog

export const updateBlogAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/blog/update?id=${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_BLOG_REQUEST });

    const { data } = await axios.put(
      url,
      {
        title: object?.title,
        content: object?.content,
        author: object?.author,
        status: object?.status,
        slug: object?.slug,
        category: object?.category,
        blogImage: object?.blogImage
          ? object?.blogImage
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        featuredImage: object?.featuredImage
          ? object?.featuredImage
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        metaTitle: object?.metaTitle,
        metaDescription: object?.metaDescription,
        metaKeyword: object?.metaKeyword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(() => {
        window.location.href = "/blogallblogs";
      }, 5100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: UPDATE_BLOG_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Delete Blog

export const deleteBlogAction = (id) => async (dispatch) => {
  try {
    // setLoginSignUpLoading(true);
    const token = localStorage.getItem("token");

    dispatch({ type: DELETE_BLOG_REQUEST });

    const { data } = await axios.delete(`/api/v1/blogs/delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: DELETE_BLOG_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      // setLoginSignUpLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(() => {
        window.location.href = "/blogallblogs";
      }, 5100);
    }
  } catch (error) {
    // setLoginSignUpLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: DELETE_BLOG_FAIL,
        payload: errorMessage,
      });
    }
    if (errorMessage) {
      // setLoginSignUpLoading(false);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};
