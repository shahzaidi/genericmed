import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import {
  GET_FAQ_DETAILS_FAIL,
  GET_FAQ_DETAILS_REQUEST,
  GET_FAQ_DETAILS_SUCCESS,
  GET_ALL_FAQ_FAIL,
  GET_ALL_FAQ_REQUEST,
  GET_ALL_FAQ_SUCCESS,
} from "../constants/faqConstants";

// Pages Get All Faqs

export const getAllFaqsAction = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let link = `/api/v1/faqs/getAllFaqs`;
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

// Pages get FAQ details Page

export const getFaqDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FAQ_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/faq/faqsPage/${id}`;

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
