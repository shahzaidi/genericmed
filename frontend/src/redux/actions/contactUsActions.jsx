// Contact Us

import axios from "axios";
import {
  CREATE_CONTACT_US_REQUEST,
  CREATE_CONTACT_US_SUCCESS,
  CREATE_CONTACT_US_FAIL,
  GET_CONTACT_US_META_DATA_REQUEST,
  GET_CONTACT_US_META_DATA_SUCCESS,
  GET_CONTACT_US_META_DATA_FAIL,
  CLEAR_ERROR,
} from "../constants/contactUsConstants";
import { toast } from "react-toastify";

export const contactUsAction =
  ({ ...options }, setContacted, setContactLoading) =>
  async (dispatch) => {
    try {
      setContactLoading(true);
      const token = localStorage.getItem("token");

      //   console.log(name, email, phone, message, setContacted, "tokenK");
      dispatch({ type: CREATE_CONTACT_US_REQUEST });

      const { data } = await axios.post(
        "api/v1/contactUs/new",
        {
          name: options?.name,
          email: options?.email,
          phoneNumber: options?.phoneNumber,
          message: options?.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({ type: CREATE_CONTACT_US_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setContactLoading(false);
        setContacted(true);
      }
    } catch (error) {
      setContactLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({ type: CREATE_CONTACT_US_FAIL, payload: errorMessage });
      }
      if (errorMessage) {
        setContactLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Clearing Errors

export const clearError = () => async (dispatch) => {
  dispatch({ CLEAR_ERROR });
};

// Digital Marketing Contact Us Page

export const getContactUsMetaPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACT_US_META_DATA_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/contactUs/gm`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_CONTACT_US_META_DATA_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_CONTACT_US_META_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};
