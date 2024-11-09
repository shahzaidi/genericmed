import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_HOME_PAGE_FAIL,
  CREATE_HOME_PAGE_REQUEST,
  CREATE_HOME_PAGE_SUCCESS,
  GET_HOME_PAGE_DETAILS_REQUEST,
  GET_HOME_PAGE_DETAILS_SUCCESS,
  GET_HOME_PAGE_DETAILS_FAIL,
  UPDATE_HOME_PAGE_DETAILS_REQUEST,
  UPDATE_HOME_PAGE_DETAILS_SUCCESS,
  UPDATE_HOME_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/homePageConstants";

// Digital Marketing Home Page

export const createHomePageAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/homePage";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_HOME_PAGE_REQUEST });

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
      dispatch({ type: CREATE_HOME_PAGE_SUCCESS, payload: data });
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
      dispatch({ type: CREATE_HOME_PAGE_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Digital Marketing Home Page

export const getHomePageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HOME_PAGE_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/homePage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_HOME_PAGE_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_HOME_PAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing Home Page

export const updateHomePageAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/homePage/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_HOME_PAGE_DETAILS_REQUEST });

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
      dispatch({ type: UPDATE_HOME_PAGE_DETAILS_SUCCESS, payload: data });
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
        type: UPDATE_HOME_PAGE_DETAILS_FAIL,
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
