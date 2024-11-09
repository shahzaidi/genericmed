import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_PACKAGE_AND_AUTHENTICITY_PAGE_REQUEST,
  CREATE_PACKAGE_AND_AUTHENTICITY_PAGE_SUCCESS,
  CREATE_PACKAGE_AND_AUTHENTICITY_PAGE_FAIL,
  GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_REQUEST,
  GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_SUCCESS,
  GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_FAIL,
  UPDATE_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_REQUEST,
  UPDATE_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_SUCCESS,
  UPDATE_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/packageAndAuthenticityConstants";

// Pages Package And Authenticity Page

export const packageAndAuthenticityPageAction =
  (object) => async (dispatch) => {
    console.log(object, "productObject.........................//////");
    try {
      const token = localStorage.getItem("token");
      let url = "/api/v1/packageAndAuthenticityPage";

      // console.log(rating, comment, token, productId, "tokenK");
      dispatch({ type: CREATE_PACKAGE_AND_AUTHENTICITY_PAGE_REQUEST });

      console.log(
        object,
        "productObject.........................//////after request"
      );
      const { data } = await axios.post(
        url,
        {
          termsAndConditions: object?.termsAndConditions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({
          type: CREATE_PACKAGE_AND_AUTHENTICITY_PAGE_SUCCESS,
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
          type: CREATE_PACKAGE_AND_AUTHENTICITY_PAGE_FAIL,
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

// Pages Package And Authenticity Page

export const getPackageAndAuthenticityDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/packageAndAuthenticityPage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Pages Package And Authenticity Page

export const updatePackageAndAuthenticityAction =
  (id, object) => async (dispatch) => {
    console.log(object, "productObject.........................//////");
    try {
      const token = localStorage.getItem("token");
      let url = `/api/v1/packageAndAuthenticityPage/${id}`;

      // console.log(rating, comment, token, productId, "tokenK");
      dispatch({ type: UPDATE_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_REQUEST });

      const { data } = await axios.put(
        url,
        {
          termsAndConditions: object?.termsAndConditions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({
          type: UPDATE_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_SUCCESS,
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
          type: UPDATE_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_FAIL,
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
