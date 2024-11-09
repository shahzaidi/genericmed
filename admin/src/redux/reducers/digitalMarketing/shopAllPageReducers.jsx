import {
  GET_SHOP_ALL_PAGE_DETAILS_REQUEST,
  GET_SHOP_ALL_PAGE_DETAILS_SUCCESS,
  GET_SHOP_ALL_PAGE_DETAILS_FAIL,
} from "../../constants/digitalMarketing/shopAllConstants";

// Get Shop All Meta Details

export const getShopAllPageDetailsReducer = (
  state = { shopAll: {} },
  action
) => {
  switch (action.type) {
    case GET_SHOP_ALL_PAGE_DETAILS_REQUEST:
      return {
        loading: true,
        shopAll: {},
      };

    case GET_SHOP_ALL_PAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        shopAll: action.payload.shopAll,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_SHOP_ALL_PAGE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        shopAll: {},
      };

    default:
      return state;
  }
};
