import axios from "axios";
import {
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  GET_CATEGORY_DETAILS_REQUEST,
  GET_CATEGORY_DETAILS_SUCCESS,
  GET_CATEGORY_DETAILS_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
} from "../constants/categoryConstants";
import { toast } from "react-toastify";

export const getAllCategory =
  (page = 1) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch({ type: GET_ALL_CATEGORY_REQUEST });
      let link = `/api/v1/categories?page=${page}`;

      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//   Create Category

export const createCategory = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  console.log(12345, "category object");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/category/new";
    let image =
      "https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg";

    dispatch({ type: CREATE_CATEGORY_REQUEST });
    console.log(
      object,
      "productObject........................./////////////////////"
    );
    const { data } = await axios.post(
      url,
      {
        name: object?.categoryName,
        status: object?.status,
        image: object?.image ? object?.image : image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        object.onClose();
      }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    console.log(
      error.response?.data?.message,
      "productObject........................./////////////////////"
    );
    if (errorMessage) {
      dispatch({ type: CREATE_CATEGORY_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Delete Category

export const deleteCategory = (id) => async (dispatch) => {
  try {
    // setLoginSignUpLoading(true);
    const token = localStorage.getItem("token");

    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/categories/delete/?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      // setLoginSignUpLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(getAllCategory());
    }
  } catch (error) {
    // setLoginSignUpLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: DELETE_CATEGORY_FAIL, payload: errorMessage });
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

// Get Category Details

export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/categories/${id}`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_CATEGORY_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Category Details

export const updateCategoryDetailsAction = (options) => async (dispatch) => {
  // console.log(
  //   options.categoryName,
  //   options.status,
  //   options.image,
  //   "catOptions...............///////"
  // );
  const link = `/api/v1/categories/update?id=${options?.id}`;
  try {
    const token = localStorage.getItem("token");

    let image =
      "https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg";
    // setUserCLoading(true);
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    console.log(
      options.id,
      options.categoryName,
      options.status,
      options.image,
      "catOptions...............///////"
    );
    const { data } = await axios.put(
      link,
      {
        name: options?.categoryName,
        status: options?.status,
        image: options?.image ? options?.image : image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    // localStorage.setItem("token", data?.token);
    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        options.onClose();
        options?.navigate("/allcategories");
      }, 1100);
    }
  } catch (error) {
    console.log(link, options, "catOptions...............///////");
    // setUserCLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({ type: UPDATE_CATEGORY_FAIL, payload: errorMessage });
    if (errorMessage) {
      // setUserCLoading(false);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};
