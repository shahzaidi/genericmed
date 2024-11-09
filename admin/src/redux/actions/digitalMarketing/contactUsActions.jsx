import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CONTACT_US_PAGE_FAIL,
  CREATE_CONTACT_US_PAGE_REQUEST,
  CREATE_CONTACT_US_PAGE_SUCCESS,
  GET_CONTACT_US_PAGE_DETAILS_REQUEST,
  GET_CONTACT_US_PAGE_DETAILS_SUCCESS,
  GET_CONTACT_US_PAGE_DETAILS_FAIL,
  UPDATE_CONTACT_US_PAGE_DETAILS_REQUEST,
  UPDATE_CONTACT_US_PAGE_DETAILS_SUCCESS,
  UPDATE_CONTACT_US_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/contactUsConstants";

// Digital Marketing Contact Us Page

export const contactUsPageAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/contactUs";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_CONTACT_US_PAGE_REQUEST });

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
      dispatch({ type: CREATE_CONTACT_US_PAGE_SUCCESS, payload: data });
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
      dispatch({ type: CREATE_CONTACT_US_PAGE_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Digital Marketing Contact Us Page

export const getContactUsPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACT_US_PAGE_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/contactUs`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_CONTACT_US_PAGE_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_CONTACT_US_PAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing Contact Us Page

export const updateContactUsPageAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/contactUs/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_CONTACT_US_PAGE_DETAILS_REQUEST });

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
      dispatch({ type: UPDATE_CONTACT_US_PAGE_DETAILS_SUCCESS, payload: data });
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
        type: UPDATE_CONTACT_US_PAGE_DETAILS_FAIL,
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
