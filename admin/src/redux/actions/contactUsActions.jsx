// Get All Contact Us

import axios from "axios";
import {
  GET_ALL_CONTACT_US_REQUEST,
  GET_ALL_CONTACT_US_SUCCESS,
  GET_ALL_CONTACT_US_FAIL,
  GET_CONTACT_US_DETAILS_REQUEST,
  GET_CONTACT_US_DETAILS_SUCCESS,
  GET_CONTACT_US_DETAILS_FAIL,
  DELETE_CONTACT_US_DETAILS_REQUEST,
  DELETE_CONTACT_US_DETAILS_SUCCESS,
  DELETE_CONTACT_US_DETAILS_FAIL,
} from "../constants/contactUsConstants";
import { toast } from "react-toastify";

// Get All Contact Us

export const getAllContactUs = (page) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let link = `/api/v1/contactUs/getAll?page=${page}`;
    dispatch({ type: GET_ALL_CONTACT_US_REQUEST });

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ALL_CONTACT_US_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
      type: GET_ALL_CONTACT_US_FAIL,
      payload: errorMessage,
    });
  }
};

// Get Contact Us Details

export const getContactUsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACT_US_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/contactUs/get?id=${id}`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_CONTACT_US_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_CONTACT_US_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Contact Us Details

export const deleteContactUsDetails = (id) => async (dispatch) => {
  try {
    // setLoginSignUpLoading(true);
    const token = localStorage.getItem("token");

    dispatch({ type: DELETE_CONTACT_US_DETAILS_REQUEST });

    const { data } = await axios.delete(`/api/v1/contactUs/delete?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: DELETE_CONTACT_US_DETAILS_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      // setLoginSignUpLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      //   setTimeout(() => {
      dispatch(getAllContactUs());
      //   }, 5100);
    }
  } catch (error) {
    // setLoginSignUpLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: DELETE_CONTACT_US_DETAILS_FAIL,
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
