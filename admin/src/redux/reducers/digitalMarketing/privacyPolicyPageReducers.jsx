// Get Privacy Policy Page Details

import {
  GET_PRIVACY_POLICY_PAGE_DETAILS_FAIL,
  GET_PRIVACY_POLICY_PAGE_DETAILS_REQUEST,
  GET_PRIVACY_POLICY_PAGE_DETAILS_SUCCESS,
} from "../../constants/digitalMarketing/privacyPageConstants";

export const getPrivacyAndPolicyDetailsReducer = (
  state = { privacyPolicy: {} },
  action
) => {
  switch (action.type) {
    case GET_PRIVACY_POLICY_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        privacyPolicy: {},
      };

    case GET_PRIVACY_POLICY_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        privacyPolicy: action.payload.privacyPolicy,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_PRIVACY_POLICY_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        privacyPolicy: {},
      };

    default:
      return state;
  }
};
