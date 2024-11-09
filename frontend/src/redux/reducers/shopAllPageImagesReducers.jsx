import {
  GET_SHOP_ALL_PAGE_BANNERS_DETAILS_REQUEST,
  GET_SHOP_ALL_PAGE_BANNERS_DETAILS_SUCCESS,
  GET_SHOP_ALL_PAGE_BANNERS_DETAILS_FAIL,
} from "../constants/shopAllPageImagesConstants";

// Get About Us Page Details

export const getShopAllPageBannersDetailsReducer = (
  state = { shopAllPageBanners: {} },
  action
) => {
  switch (action.type) {
    case GET_SHOP_ALL_PAGE_BANNERS_DETAILS_REQUEST:
      return {
        shopAllPageLoading: true,
        shopAllPageBanners: {},
      };

    case GET_SHOP_ALL_PAGE_BANNERS_DETAILS_SUCCESS:
      return {
        shopAllPageLoading: false,
        shopAllPageBanners: action.payload.shopAllPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_SHOP_ALL_PAGE_BANNERS_DETAILS_FAIL:
      return {
        shopAllPageLoading: false,
        shopAllPageError: action.payload,
        shopAllPageBanners: {},
      };

    default:
      return state;
  }
};
