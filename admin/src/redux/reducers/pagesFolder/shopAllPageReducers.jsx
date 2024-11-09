import {
  GET_SHOP_ALL_PAGE_DETAILS_REQUEST,
  GET_SHOP_ALL_PAGE_DETAILS_SUCCESS,
  GET_SHOP_ALL_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/shopAllPageConstants";

// Get About Us Page Details

export const getShopAllPagePageDetailsReducer = (
  state = { shopAllPage: {} },
  action
) => {
  switch (action.type) {
    case GET_SHOP_ALL_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        shopAllPage: {},
      };

    case GET_SHOP_ALL_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        shopAllPage: action.payload.shopAllPage,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_SHOP_ALL_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        shopAllPage: {},
      };

    default:
      return state;
  }
};
