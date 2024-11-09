import {
  GET_ALL_CONTACT_US_REQUEST,
  GET_ALL_CONTACT_US_SUCCESS,
  GET_ALL_CONTACT_US_FAIL,
  GET_CONTACT_US_DETAILS_REQUEST,
  GET_CONTACT_US_DETAILS_SUCCESS,
  GET_CONTACT_US_DETAILS_FAIL,
} from "../constants/contactUsConstants";

// Get All Contact Us

export const getAllContactUsReducer = (
  state = { contactUsMessages: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_CONTACT_US_REQUEST:
      return {
        loading: true,
        contactUsMessages: [],
      };

    case GET_ALL_CONTACT_US_SUCCESS:
      return {
        loading: false,
        contactUsMessages: action.payload.contactUsMessages,
        contactUsCount: action.payload.contactUsCount,
      };

    case GET_ALL_CONTACT_US_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Get Contact Us Details

export const getContactUsDetailsReducer = (
  state = { contactMessage: {} },
  action
) => {
  switch (action.type) {
    case GET_CONTACT_US_DETAILS_REQUEST:
      return {
        loading: true,
        contactMessage: {},
      };

    case GET_CONTACT_US_DETAILS_SUCCESS:
      return {
        loading: false,
        contactMessage: action.payload.contactMessage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CONTACT_US_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
