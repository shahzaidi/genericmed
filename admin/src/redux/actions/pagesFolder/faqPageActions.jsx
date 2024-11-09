import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import {
  CREATE_FAQ_FAIL,
  CREATE_FAQ_REQUEST,
  CREATE_FAQ_SUCCESS,
  GET_FAQ_DETAILS_FAIL,
  GET_FAQ_DETAILS_REQUEST,
  GET_FAQ_DETAILS_SUCCESS,
  UPDATE_FAQ_DETAILS_FAIL,
  UPDATE_FAQ_DETAILS_REQUEST,
  UPDATE_FAQ_DETAILS_SUCCESS,
  GET_ALL_FAQ_FAIL,
  GET_ALL_FAQ_REQUEST,
  GET_ALL_FAQ_SUCCESS,
  DELETE_FAQ_REQUEST,
  DELETE_FAQ_SUCCESS,
  DELETE_FAQ_FAIL,
} from "../../constants/pagesFolder/faqPageConstants";

// Pages create FAQ Page

export const createFaqAction = (object, onClose) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/faqsPage";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_FAQ_REQUEST });

    console.log(
      object,
      "productObject.........................//////after request"
    );
    const { data } = await axios.post(
      url,
      {
        category: object?.category,
        question: object?.question,
        answer: object?.answer,
        status: object?.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_FAQ_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      onClose();
      setTimeout(() => {
        dispatch(getAllFaqsAction());
      }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: CREATE_FAQ_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};

// Pages get FAQ details Page

export const getFaqDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FAQ_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/faqsPage/${id}`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_FAQ_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_FAQ_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Pages update FAQ Page

export const updateFaqAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/faqsPage/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_FAQ_DETAILS_REQUEST });

    const { data } = await axios.put(
      url,
      {
        category: object?.category,
        question: object?.question,
        answer: object?.answer,
        status: object?.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: UPDATE_FAQ_DETAILS_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.href = "/pagefaq";
      }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: UPDATE_FAQ_DETAILS_FAIL,
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

// Pages Get All Faqs

export const getAllFaqsAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let link = `/api/v1/getAllFaqs`;
    dispatch({ type: GET_ALL_FAQ_REQUEST });

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ALL_FAQ_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
      type: GET_ALL_FAQ_FAIL,
      payload: errorMessage,
    });
  }
};

// Pages delete FAQ Page

export const deleteFaqAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/faqsPage/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: DELETE_FAQ_REQUEST });

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: DELETE_FAQ_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        dispatch(getAllFaqsAction());
      }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: DELETE_FAQ_FAIL,
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
