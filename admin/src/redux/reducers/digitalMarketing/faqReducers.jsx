import {
  GET_FAQ_PAGE_DETAILS_FAIL,
  GET_FAQ_PAGE_DETAILS_REQUEST,
  GET_FAQ_PAGE_DETAILS_SUCCESS,
} from "../../constants/digitalMarketing/faqConstants";

export const getFaqDetailsReducer = (state = { faq: {} }, action) => {
  switch (action.type) {
    case GET_FAQ_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        faq: {},
      };

    case GET_FAQ_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        faq: action.payload.faq,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_FAQ_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        faq: {},
      };

    default:
      return state;
  }
};
