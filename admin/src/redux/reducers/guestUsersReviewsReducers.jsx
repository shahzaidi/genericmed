import {
  GET_GUEST_USERS_REVIEWS_REQUEST,
  GET_GUEST_USERS_REVIEWS_SUCCESS,
  GET_GUEST_USERS_REVIEWS_FAIL,
} from "../constants/guestUserReviewsConstants";

// Get All Guest Users Reviews
export const getAllGuestUsersReviewsReducer = (
  state = { reviews: [] },
  action
) => {
  switch (action.type) {
    case GET_GUEST_USERS_REVIEWS_REQUEST:
      return {
        reviewsLoading: true,
        reviews: [],
      };

    case GET_GUEST_USERS_REVIEWS_SUCCESS:
      return {
        reviewsLoading: false,
        reviews: action.payload.reviews,
        allReviewsCount: action.payload.allReviewsCount,
      };

    case GET_GUEST_USERS_REVIEWS_FAIL:
      return {
        reviewsLoading: false,
        reviewsError: action.payload,
      };

    default:
      return state;
  }
};

// Get All Guest Users Pending Reviews
export const getAllGuestUsersPendingReviewsReducer = (
  state = { reviews: [] },
  action
) => {
  switch (action.type) {
    case GET_GUEST_USERS_REVIEWS_REQUEST:
      return {
        reviewsLoading: true,
        reviews: [],
      };

    case GET_GUEST_USERS_REVIEWS_SUCCESS:
      return {
        reviewsLoading: false,
        reviews: action.payload.reviews,
        pendingReviewsCount: action.payload.pendingReviewsCount,
      };

    case GET_GUEST_USERS_REVIEWS_FAIL:
      return {
        reviewsLoading: false,
        reviewsError: action.payload,
      };

    default:
      return state;
  }
};

// Get All Guest Users Approved Reviews
export const getAllGuestUsersApprovedReviewsReducer = (
  state = { reviews: [] },
  action
) => {
  switch (action.type) {
    case GET_GUEST_USERS_REVIEWS_REQUEST:
      return {
        reviewsLoading: true,
        reviews: [],
      };

    case GET_GUEST_USERS_REVIEWS_SUCCESS:
      return {
        reviewsLoading: false,
        reviews: action.payload.reviews,
        approvedReviewsCount: action.payload.approvedReviewsCount,
      };

    case GET_GUEST_USERS_REVIEWS_FAIL:
      return {
        reviewsLoading: false,
        reviewsError: action.payload,
      };

    default:
      return state;
  }
};
