import axios from "axios";
import {
  GET_GUEST_USERS_REVIEWS_REQUEST,
  GET_GUEST_USERS_REVIEWS_SUCCESS,
  GET_GUEST_USERS_REVIEWS_FAIL,
  DELETE_GUEST_USERS_REVIEW_REQUEST,
  DELETE_GUEST_USERS_REVIEW_SUCCESS,
  DELETE_GUEST_USERS_REVIEW_FAIL,
  APPROVE_GUEST_USERS_REVIEW_REQUEST,
  APPROVE_GUEST_USERS_REVIEW_SUCCESS,
  APPROVE_GUEST_USERS_REVIEW_FAIL,
} from "../constants/guestUserReviewsConstants";
import { toast } from "react-toastify";

// Get All Guest Users Reviews

export const getAllGuestUsersReviews =
  (page = 1) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let link = `/api/v1/all/guest/users/reviews?page=${page}`;
      dispatch({ type: GET_GUEST_USERS_REVIEWS_REQUEST });

      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_GUEST_USERS_REVIEWS_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({
        type: GET_GUEST_USERS_REVIEWS_FAIL,
        payload: errorMessage,
      });
    }
  };

// Get All Guest Users Pending Reviews

export const getAllGuestUsersPendingReviews = (page) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let link = `/api/v1/all/pending/guest/users/reviews?page=${page}`;
    dispatch({ type: GET_GUEST_USERS_REVIEWS_REQUEST });

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_GUEST_USERS_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
      type: GET_GUEST_USERS_REVIEWS_FAIL,
      payload: errorMessage,
    });
  }
};

// Get All Guest Users Approved Reviews

export const getAllGuestUsersApprovedReviews = (page) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let link = `/api/v1/all/approved/guest/users/reviews?page=${page}`;
    dispatch({ type: GET_GUEST_USERS_REVIEWS_REQUEST });

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_GUEST_USERS_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({
      type: GET_GUEST_USERS_REVIEWS_FAIL,
      payload: errorMessage,
    });
  }
};

// Delete Guest Users Review

export const deleteGuestUsersReview =
  (productId, reviewId, name) => async (dispatch) => {
    try {
      // setLoginSignUpLoading(true);
      const token = localStorage.getItem("token");

      dispatch({ type: DELETE_GUEST_USERS_REVIEW_REQUEST });

      const { data } = await axios.delete(
        `/api/v1/delete/review/${productId}/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({ type: DELETE_GUEST_USERS_REVIEW_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        // setLoginSignUpLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
        if (name === "allGuestsReviews") {
          dispatch(getAllGuestUsersReviews());
        }
        if (name === "pending") {
          dispatch(getAllGuestUsersPendingReviews());
          // setTimeout(() => {
          //   window.location.href = "/pendingreviews";
          // }, 5100);
        }

        if (name === "approved") {
          dispatch(getAllGuestUsersApprovedReviews());
        }
      }
    } catch (error) {
      // setLoginSignUpLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({
          type: DELETE_GUEST_USERS_REVIEW_FAIL,
          payload: errorMessage,
        });
      }
      if (errorMessage) {
        // setLoginSignUpLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Approved Review By Admin

export const approvedReviewAction = (reviewId, name) => async (dispatch) => {
  const link = `/api/v1/update/review/${reviewId}`;
  try {
    const token = localStorage.getItem("token");

    dispatch({ type: APPROVE_GUEST_USERS_REVIEW_REQUEST });

    const { data } = await axios.put(
      link,
      {
        isApproved: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: APPROVE_GUEST_USERS_REVIEW_SUCCESS, payload: data });
    // localStorage.setItem("token", data?.token);
    if (data?.message) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      if (name === "PendingApproved") {
        dispatch(getAllGuestUsersPendingReviews());
      }
      setTimeout(() => {
        window.location.href = "/allreviews";
      }, 5100);
    }

    // window.location.href = "/allcategories";
  } catch (error) {
    // setUserCLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({ type: APPROVE_GUEST_USERS_REVIEW_FAIL, payload: errorMessage });
    if (errorMessage) {
      // setUserCLoading(false);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};
