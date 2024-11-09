import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_ABOUT_US_PAGE_REQUEST,
  CREATE_ABOUT_US_PAGE_SUCCESS,
  CREATE_ABOUT_US_PAGE_FAIL,
  GET_ABOUT_US_PAGE_DETAILS_REQUEST,
  GET_ABOUT_US_PAGE_DETAILS_SUCCESS,
  GET_ABOUT_US_PAGE_DETAILS_FAIL,
  UPDATE_ABOUT_US_PAGE_DETAILS_REQUEST,
  UPDATE_ABOUT_US_PAGE_DETAILS_SUCCESS,
  UPDATE_ABOUT_US_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/aboutUsPageConstants";

// Digital Marketing About Us Page

export const createAboutUsPageAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/aboutUsPage";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_ABOUT_US_PAGE_REQUEST });

    console.log(
      object,
      "productObject.........................//////after request"
    );
    const { data } = await axios.post(
      url,
      {
        imageUrl: object?.imageUrl
          ? object?.imageUrl
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: object?.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_ABOUT_US_PAGE_SUCCESS, payload: data });
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
      dispatch({ type: CREATE_ABOUT_US_PAGE_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};

// Digital Marketing About Us Page

export const getAboutUsPageDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ABOUT_US_PAGE_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/aboutUsPage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ABOUT_US_PAGE_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_ABOUT_US_PAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing About Us Page

export const updateAboutUsPageAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/aboutUsPage/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_ABOUT_US_PAGE_DETAILS_REQUEST });

    const { data } = await axios.put(
      url,
      {
        imageUrl: object?.imageUrl
          ? object?.imageUrl
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: object?.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: UPDATE_ABOUT_US_PAGE_DETAILS_SUCCESS, payload: data });
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
        type: UPDATE_ABOUT_US_PAGE_DETAILS_FAIL,
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
