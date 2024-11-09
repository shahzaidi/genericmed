import {
  GET_CATEGORIES_PAGE_BANNERS_DETAILS_REQUEST,
  GET_CATEGORIES_PAGE_BANNERS_DETAILS_SUCCESS,
  GET_CATEGORIES_PAGE_BANNERS_DETAILS_FAIL,
} from "../constants/categoriesPageImagesConstants";

// Get About Us Page Details

export const getCategoriesPageBannersDetailsReducer = (
  state = { categoriesPageBanners: {} },
  action
) => {
  switch (action.type) {
    case GET_CATEGORIES_PAGE_BANNERS_DETAILS_REQUEST:
      return {
        categoriesPageLoading: true,
        categoriesPageBanners: {},
      };

    case GET_CATEGORIES_PAGE_BANNERS_DETAILS_SUCCESS:
      return {
        categoriesPageLoading: false,
        categoriesPageBanners: action.payload.categoriesPagePage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_CATEGORIES_PAGE_BANNERS_DETAILS_FAIL:
      return {
        categoriesPageLoading: false,
        categoriesPageError: action.payload,
        categoriesPageBanners: {},
      };

    default:
      return state;
  }
};
