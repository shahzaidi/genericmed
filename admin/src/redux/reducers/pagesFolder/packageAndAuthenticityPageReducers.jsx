import {
  GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_REQUEST,
  GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_SUCCESS,
  GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/packageAndAuthenticityConstants";

// Get Package And Authenticity Details

export const getPackageAndAuthenticityPageDetailsReducer = (
  state = { packageAndAuthenticityPage: {} },
  action
) => {
  switch (action.type) {
    case GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        packageAndAuthenticityPage: {},
      };

    case GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        packageAndAuthenticityPage: action.payload.packageAndAuthenticityPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_PACKAGE_AND_AUTHENTICITY_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        packageAndAuthenticityPage: {},
      };

    default:
      return state;
  }
};
