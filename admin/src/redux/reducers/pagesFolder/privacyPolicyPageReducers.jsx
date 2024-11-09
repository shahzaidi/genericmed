// Get Privacy Policy Page Details

import {
  GET_PRIVACY_POLICY_DETAILS_FAIL,
  GET_PRIVACY_POLICY_DETAILS_REQUEST,
  GET_PRIVACY_POLICY_DETAILS_SUCCESS,
} from "../../constants/pagesFolder/privacyPolicyPageConstants";

export const getPrivacyAndPolicyDetailsPageReducer = (
  state = { privacyPolicyPage: {} },
  action
) => {
  switch (action.type) {
    case GET_PRIVACY_POLICY_DETAILS_REQUEST:
      return {
        loading: true,
        privacyPolicyPage: {},
      };

    case GET_PRIVACY_POLICY_DETAILS_SUCCESS:
      return {
        loading: false,
        privacyPolicyPage: action.payload.privacyPolicyPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_PRIVACY_POLICY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        privacyPolicyPage: {},
      };

    default:
      return state;
  }
};
