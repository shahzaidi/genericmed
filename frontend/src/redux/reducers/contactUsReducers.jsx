import axios from "axios";
import {
  GET_CONTACT_US_META_DATA_REQUEST,
  GET_CONTACT_US_META_DATA_SUCCESS,
  GET_CONTACT_US_META_DATA_FAIL,
} from "../constants/contactUsConstants";

// Digital Marketing Get About Us Page Details

export const getContactUsMetaPageDetailsReducer = (
  state = { contactUsMeta: {} },
  action
) => {
  switch (action.type) {
    case GET_CONTACT_US_META_DATA_REQUEST:
      return {
        contactUsMetaLoading: true,
        contactUsMeta: {},
      };

    case GET_CONTACT_US_META_DATA_SUCCESS:
      return {
        contactUsMetaLoading: false,
        contactUsMeta: action.payload.contactUs,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CONTACT_US_META_DATA_FAIL:
      return {
        contactUsMetaLoading: false,
        contactUsMetaError: action.payload,
        contactUsMeta: {},
      };

    default:
      return state;
  }
};
