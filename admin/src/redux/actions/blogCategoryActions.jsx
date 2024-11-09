import axios from "axios";
import {
  GET_ALL_BLOG_CATEGORY_FAIL,
  GET_ALL_BLOG_CATEGORY_REQUEST,
  GET_ALL_BLOG_CATEGORY_SUCCESS,
  CREATE_BLOG_CATEGORY_REQUEST,
  CREATE_BLOG_CATEGORY_FAIL,
  CREATE_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY_REQUEST,
  DELETE_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY_FAIL,
  GET_BLOG_CATEGORY_DETAILS_REQUEST,
  GET_BLOG_CATEGORY_DETAILS_SUCCESS,
  GET_BLOG_CATEGORY_DETAILS_FAIL,
  UPDATE_BLOG_CATEGORY_REQUEST,
  UPDATE_BLOG_CATEGORY_SUCCESS,
  UPDATE_BLOG_CATEGORY_FAIL,
} from "../constants/blogCategoryConstants";
import { toast } from "react-toastify";

//   Get All Blog Category

export const getAllBlogCategory =
  (page = 1) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch({ type: GET_ALL_BLOG_CATEGORY_REQUEST });
      let link = `/api/v1/blog/categories?page=${page}`;

      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_BLOG_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_BLOG_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//   Create Blog Category

export const createBlogCategory = (object, onClose) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  console.log(12345, "category object");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/blog/category/new";
    let image =
      "https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg";

    dispatch({ type: CREATE_BLOG_CATEGORY_REQUEST });
    console.log(
      object,
      "productObject........................./////////////////////"
    );
    const { data } = await axios.post(
      url,
      {
        name: object?.name,
        status: object?.status,
        image:
          object?.image === null || object?.image === ""
            ? image
            : object?.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_BLOG_CATEGORY_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    console.log(
      error.response?.data?.message,
      "productObject........................./////////////////////"
    );
    if (errorMessage) {
      dispatch({ type: CREATE_BLOG_CATEGORY_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Delete Blog Category

export const deleteBlogCategory = (id) => async (dispatch) => {
  try {
    // setLoginSignUpLoading(true);
    const token = localStorage.getItem("token");

    dispatch({ type: DELETE_BLOG_CATEGORY_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/blog/categories/delete/?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: DELETE_BLOG_CATEGORY_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      // setLoginSignUpLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(getAllBlogCategory());
    }
  } catch (error) {
    // setLoginSignUpLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: DELETE_BLOG_CATEGORY_FAIL, payload: errorMessage });
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

// Get Blog Category Details

export const getBlogCategoryDetails = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: GET_BLOG_CATEGORY_DETAILS_REQUEST });
    let link = `/api/v1/blog/categories/${id}`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_BLOG_CATEGORY_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_BLOG_CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Blog Category Details

export const updateBlogCategoryDetailsAction =
  (id, object, onClose) => async (dispatch) => {
    // console.log(
    //   options.categoryName,
    //   options.status,
    //   options.image,
    //   "catOptions...............///////"
    // );
    const link = `/api/v1/blog/categories/update?id=${id}`;
    try {
      const token = localStorage.getItem("token");

      let image =
        "https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg";
      // setUserCLoading(true);
      dispatch({ type: UPDATE_BLOG_CATEGORY_REQUEST });
      //   console.log(
      //     options.id,
      //     options.categoryName,
      //     options.status,
      //     options.image,
      //     "catOptions...............///////"
      //   );
      const { data } = await axios.put(
        link,
        {
          name: object?.name,
          status: object?.status,
          image:
            object?.image === null || object?.image === ""
              ? image
              : object?.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATE_BLOG_CATEGORY_SUCCESS, payload: data });
      // localStorage.setItem("token", data?.token);
      if (data?.message) {
        // localStorage.setItem("user", JSON.stringify(data?.user));
        // setAuthUser(data?.user);
        // setUserCLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });

        setTimeout(() => {
          onClose();
        }, 2000);
      }
      // window.location.href = "/allcategories";
    } catch (error) {
      console.log(link, options, "catOptions...............///////");
      // setUserCLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({ type: UPDATE_BLOG_CATEGORY_FAIL, payload: errorMessage });
      if (errorMessage) {
        // setUserCLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };
