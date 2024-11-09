import { CLEAR_ERROR } from "../constants/productConstants";
import { toast } from "react-toastify";
import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  CREATE_AND_UPDATE_REQUEST,
  CREATE_AND_UPDATE_SUCCESS,
  CREATE_AND_UPDATE_FAIL,
} from "../constants/reviewsConstants";
import axios from "axios";

// Get All Reviews

export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/all/reviews/?productId=${id}`);

    dispatch({ type: GET_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add and update review for login user

export const giveAndUpdateReviewByLoginUser =
  (productId, rating, comment, name = "") =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let url = name !== "" ? "/api/v1/review/guest" : "/api/v1/review/login";
      let review =
        name !== ""
          ? { productId, rating, comment, name }
          : {
              productId,
              rating,
              comment,
            };
      console.log(rating, comment, token, productId, "tokenK");
      dispatch({ type: CREATE_AND_UPDATE_REQUEST });

      const { data } = await axios.put(url, review, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data?.message) {
        dispatch({ type: CREATE_AND_UPDATE_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({ type: CREATE_AND_UPDATE_FAIL, payload: errorMessage });
      }
      if (errorMessage) {
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
