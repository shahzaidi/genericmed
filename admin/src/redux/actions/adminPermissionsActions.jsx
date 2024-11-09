import axios from "axios";

import {
  ASSIGN_PERMISSIONS_REQUEST,
  ASSIGN_PERMISSIONS_SUCCESS,
  ASSIGN_PERMISSIONS_FAIL,
  GET_ADMIN_PERMISSIONS_REQUEST,
  GET_ADMIN_PERMISSIONS_SUCCESS,
  GET_ADMIN_PERMISSIONS_FAIL,
} from "../constants/adminPermissionsConstants";
import { toast } from "react-toastify";

// Get All Admin Permissions

export const getAdminPermissions = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let link = `/api/v1/user/getPermissions/${id}`;
    dispatch({ type: GET_ADMIN_PERMISSIONS_REQUEST });

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ADMIN_PERMISSIONS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
      type: GET_ADMIN_PERMISSIONS_FAIL,
      payload: errorMessage,
    });
  }
};

// Provide Permissions

export const providePermissions = (id, options) => async (dispatch) => {
  try {
    console.log(options, "optionsssssss,,,,,,,");
    const token = localStorage.getItem("token");
    let link = `/api/v1/user/assignPermissions/${id}`;
    dispatch({ type: ASSIGN_PERMISSIONS_REQUEST });

    const { data } = await axios.put(
      link,
      { permissions: options },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: ASSIGN_PERMISSIONS_SUCCESS, payload: data });
    if (data?.message) {
      // localStorage.setItem("user", JSON.stringify(data?.user));
      // setAuthUser(data?.user);
      // setUserCLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
    // window.location.href = "/allcategories";
  } catch (error) {
    console.log(link, options, "catOptions...............///////");
    // setUserCLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({ type: ASSIGN_PERMISSIONS_FAIL, payload: errorMessage });
    if (errorMessage) {
      // setUserCLoading(false);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};
