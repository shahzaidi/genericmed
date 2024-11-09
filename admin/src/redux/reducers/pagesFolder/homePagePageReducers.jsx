import {
  GET_HOME_PAGE_BANNERS_DETAILS_REQUEST,
  GET_HOME_PAGE_BANNERS_DETAILS_SUCCESS,
  GET_HOME_PAGE_BANNERS_DETAILS_FAIL,
} from "../../constants/pagesFolder/homePagePageConstants";

// Get About Us Page Details

export const getHomePageBannersDetailsReducer = (
  state = { homePageBanners: {} },
  action
) => {
  switch (action.type) {
    case GET_HOME_PAGE_BANNERS_DETAILS_REQUEST:
      return {
        loading: true,
        homePageBanners: {},
      };

    case GET_HOME_PAGE_BANNERS_DETAILS_SUCCESS:
      return {
        loading: false,
        homePageBanners: action.payload.homepagePage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_HOME_PAGE_BANNERS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        homePageBanners: {},
      };

    default:
      return state;
  }
};
