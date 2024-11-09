// Get All Admins

import axios from "axios";
import {
  CREATE_ADMIN_FAIL,
  CREATE_ADMIN_REQUEST,
  CREATE_ADMIN_SUCCESS,
  GET_ALL_ADMIN_FAIL,
  GET_ALL_ADMIN_REQUEST,
  GET_ALL_ADMIN_SUCCESS,
} from "../constants/adminsConstants";
import { toast } from "react-toastify";

// Get All Admin

export const getAllAdmin = (page) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let link = `/api/v1/admin/profiles/getAll?page=${page}`;
    dispatch({ type: GET_ALL_ADMIN_REQUEST });

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ALL_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
      type: GET_ALL_ADMIN_FAIL,
      payload: errorMessage,
    });
  }
};

//   Create Admin

export const createAdmin = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/user/register/admin";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_ADMIN_REQUEST });

    const { data } = await axios.post(
      url,
      {
        firstName: object?.firstName,
        lastName: object?.lastName,
        email: object?.email,
        isAdmin: object?.isAdmin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_ADMIN_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(() => {
        window.location.href = "/alladminlist";
      }, 5100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: CREATE_ADMIN_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};
