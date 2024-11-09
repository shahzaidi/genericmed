import {
  GET_CONTACT_US_PAGE_DETAILS_REQUEST,
  GET_CONTACT_US_PAGE_DETAILS_SUCCESS,
  GET_CONTACT_US_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/contactUsConstants";

// Get About Us Page Details

export const getContactUsPageDetailsReducer = (
  state = { contactUs: {} },
  action
) => {
  switch (action.type) {
    case GET_CONTACT_US_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        contactUs: {},
      };

    case GET_CONTACT_US_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        contactUs: action.payload.contactUs,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CONTACT_US_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        contactUs: {},
      };

    default:
      return state;
  }
};
