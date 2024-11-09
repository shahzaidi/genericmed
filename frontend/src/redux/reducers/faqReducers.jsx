import {
  GET_FAQ_DETAILS_FAIL,
  GET_FAQ_DETAILS_REQUEST,
  GET_FAQ_DETAILS_SUCCESS,
  GET_ALL_FAQ_FAIL,
  GET_ALL_FAQ_REQUEST,
  GET_ALL_FAQ_SUCCESS,
} from "../constants/faqConstants";

export const getFaqPageDetailsReducer = (state = { faq: {} }, action) => {
  switch (action.type) {
    case GET_FAQ_DETAILS_REQUEST:
      return {
        faqLoading: true,
        faq: {},
      };

    case GET_FAQ_DETAILS_SUCCESS:
      return {
        faqLoading: false,
        faq: action.payload.faqsPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_FAQ_DETAILS_FAIL:
      return {
        faqLoading: false,
        faqError: action.payload,
        faq: {},
      };

    default:
      return state;
  }
};

// Pages Get All Faqs

export const getAllFaqsReducer = (state = { faqs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_FAQ_REQUEST:
      return {
        loading: true,
        faqs: [],
      };

    case GET_ALL_FAQ_SUCCESS:
      return {
        loading: false,
        faqs: action.payload.faqs,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_ALL_FAQ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
