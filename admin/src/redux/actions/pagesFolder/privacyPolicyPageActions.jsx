// Digital Marketing Blog Page

import axios from "axios";
import {
  CREATE_PRIVACY_POLICY_REQUEST,
  CREATE_PRIVACY_POLICY_SUCCESS,
  CREATE_PRIVACY_POLICY_FAIL,
  GET_PRIVACY_POLICY_DETAILS_FAIL,
  GET_PRIVACY_POLICY_DETAILS_REQUEST,
  GET_PRIVACY_POLICY_DETAILS_SUCCESS,
  UPDATE_PRIVACY_POLICY_DETAILS_REQUEST,
  UPDATE_PRIVACY_POLICY_DETAILS_SUCCESS,
  UPDATE_PRIVACY_POLICY_DETAILS_FAIL,
} from "../../constants/pagesFolder/privacyPolicyPageConstants";
import { toast } from "react-toastify";

// Pages Privacy And Policy Page

export const createPrivacyPolicyPageAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/privacyPolicyPage";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_PRIVACY_POLICY_REQUEST });

    console.log(
      object,
      "productObject.........................//////after request"
    );
    const { data } = await axios.post(
      url,
      {
        privacyPolicy: object?.privacyPolicy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_PRIVACY_POLICY_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      // setTimeout(() => {
      //   window.location.href = "/blogallblogs";
      // }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: CREATE_PRIVACY_POLICY_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};

// Pages Privacy And Policy Page

export const getPrivacyPolicyPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRIVACY_POLICY_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/privacyPolicyPage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_PRIVACY_POLICY_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_PRIVACY_POLICY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Pages Privacy And Policy Page

export const updatePrivacyPolicyPageAction =
  (id, object) => async (dispatch) => {
    console.log(object, "productObject.........................//////");
    try {
      const token = localStorage.getItem("token");
      let url = `/api/v1/privacyPolicyPage/${id}`;

      // console.log(rating, comment, token, productId, "tokenK");
      dispatch({ type: UPDATE_PRIVACY_POLICY_DETAILS_REQUEST });

      const { data } = await axios.put(
        url,
        {
          privacyPolicy: object?.privacyPolicy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({
          type: UPDATE_PRIVACY_POLICY_DETAILS_SUCCESS,
          payload: data,
        });
      }

      if (data?.success === true) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 1000,
        });
        // setTimeout(() => {
        //   window.location.href = "/blogallblogs";
        // }, 1100);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({
          type: UPDATE_PRIVACY_POLICY_DETAILS_FAIL,
          payload: errorMessage,
        });
      }
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }
  };
