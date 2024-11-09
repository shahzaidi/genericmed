import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  CLEAR_ERROR,
} from "../constants/reviewsConstants";

// Get All Product Reviews Reducers

export const getProductReviewsReducer = (
  state = { reviewsArray: [] },
  action
) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        reviewsLoading: true,
        ...state,
      };

    case GET_REVIEWS_SUCCESS:
      return {
        reviewsLoading: false,
        reviewsArray: action.payload.reviews,
      };

    case GET_REVIEWS_FAIL:
      return {
        reviewsLoading: false,
        reviewsError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        reviewsError: null,
      };

    default:
      return state;
  }
};
