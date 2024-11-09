import {
  GET_ALL_WISHLISTS_PRODUCTS_REQUEST,
  GET_ALL_WISHLISTS_PRODUCTS_SUCCESS,
  GET_ALL_WISHLISTS_PRODUCTS_FAIL,
  CLEAR_ERROR,
} from "../constants/wishListConstants";

// Get Wish List Reducers

export const getWishlistReducer = (state = { wishlistArray: [] }, action) => {
  switch (action.type) {
    case GET_ALL_WISHLISTS_PRODUCTS_REQUEST:
      return {
        wishlistLoading: true,
        ...state,
      };

    case GET_ALL_WISHLISTS_PRODUCTS_SUCCESS:
      return {
        wishLoading: false,
        wishlistArray: action.payload.wishlistProducts,
        wishlistCount: action.payload.count,
      };

    case GET_ALL_WISHLISTS_PRODUCTS_FAIL:
      return {
        wishLoading: false,
        wishlistError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        wishlistError: null,
      };

    default:
      return state;
  }
};
