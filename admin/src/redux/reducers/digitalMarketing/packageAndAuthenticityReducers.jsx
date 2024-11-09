import {
  GET_PACKAGE_AND_AUTHENTICITY_DETAILS_REQUEST,
  GET_PACKAGE_AND_AUTHENTICITY_DETAILS_SUCCESS,
  GET_PACKAGE_AND_AUTHENTICITY_DETAILS_FAIL,
} from "../../constants/digitalMarketing/packageAndAuthenticityConstants";

// Get Package And Authenticity Details

export const getPackageAndAuthenticityDetailsReducer = (
  state = { packagingAndAuthenticity: {} },
  action
) => {
  switch (action.type) {
    case GET_PACKAGE_AND_AUTHENTICITY_DETAILS_REQUEST:
      return {
        loading: true,
        packagingAndAuthenticity: {},
      };

    case GET_PACKAGE_AND_AUTHENTICITY_DETAILS_SUCCESS:
      return {
        loading: false,
        packagingAndAuthenticity: action.payload.packagingAndAuthenticity,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_PACKAGE_AND_AUTHENTICITY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        packagingAndAuthenticity: {},
      };

    default:
      return state;
  }
};
