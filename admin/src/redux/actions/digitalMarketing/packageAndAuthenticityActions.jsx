import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_PACKAGE_AND_AUTHENTICITY_REQUEST,
  CREATE_PACKAGE_AND_AUTHENTICITY_SUCCESS,
  CREATE_PACKAGE_AND_AUTHENTICITY_FAIL,
  GET_PACKAGE_AND_AUTHENTICITY_DETAILS_REQUEST,
  GET_PACKAGE_AND_AUTHENTICITY_DETAILS_SUCCESS,
  GET_PACKAGE_AND_AUTHENTICITY_DETAILS_FAIL,
  UPDATE_PACKAGE_AND_AUTHENTICITY_DETAILS_REQUEST,
  UPDATE_PACKAGE_AND_AUTHENTICITY_DETAILS_SUCCESS,
  UPDATE_PACKAGE_AND_AUTHENTICITY_DETAILS_FAIL,
} from "../../constants/digitalMarketing/packageAndAuthenticityConstants";

// Digital Marketing Package And Authenticity Page

export const packageAndAuthenticityAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/packagingAndAuthenticity";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_PACKAGE_AND_AUTHENTICITY_REQUEST });

    console.log(
      object,
      "productObject.........................//////after request"
    );
    const { data } = await axios.post(
      url,
      {
        slug: object?.slug,
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
      dispatch({
        type: CREATE_PACKAGE_AND_AUTHENTICITY_SUCCESS,
        payload: data,
      });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      // setTimeout(() => {
      //   window.location.href = "/blogallblogs";
      // }, 5100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: CREATE_PACKAGE_AND_AUTHENTICITY_FAIL,
        payload: errorMessage,
      });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Digital Marketing Package And Authenticity Page

export const getPackageAndAuthenticityPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PACKAGE_AND_AUTHENTICITY_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/packagingAndAuthenticity`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_PACKAGE_AND_AUTHENTICITY_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_AND_AUTHENTICITY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing Package And Authenticity Page

export const updatePackageAndAuthenticityPageAction =
  (id, object) => async (dispatch) => {
    console.log(object, "productObject.........................//////");
    try {
      const token = localStorage.getItem("token");
      let url = `/api/v1/packagingAndAuthenticity/${id}`;

      // console.log(rating, comment, token, productId, "tokenK");
      dispatch({ type: UPDATE_PACKAGE_AND_AUTHENTICITY_DETAILS_REQUEST });

      const { data } = await axios.put(
        url,
        {
          slug: object?.slug,
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
        dispatch({
          type: UPDATE_PACKAGE_AND_AUTHENTICITY_DETAILS_SUCCESS,
          payload: data,
        });
      }

      if (data?.success === true) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
        // setTimeout(() => {
        //   window.location.href = "/blogallblogs";
        // }, 5100);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({
          type: UPDATE_PACKAGE_AND_AUTHENTICITY_DETAILS_FAIL,
          payload: errorMessage,
        });
      }
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };
