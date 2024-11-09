import {
  GET_ALL_CART_PRODUCT_ITEMS_REQUEST,
  GET_ALL_CART_PRODUCT_ITEMS_SUCCESS,
  GET_ALL_CART_PRODUCT_ITEMS_FAIL,
  CLEAR_ERROR,
} from "../constants/cartConstants";

// Get Wish List Reducers

export const getCartItemsReducer = (state = { cartArray: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CART_PRODUCT_ITEMS_REQUEST:
      return {
        cartItemLoading: true,
        ...state,
      };

    case GET_ALL_CART_PRODUCT_ITEMS_SUCCESS:
      return {
        cartItemLoading: false,
        cartArray: action.payload.cartItems,
      };

    case GET_ALL_CART_PRODUCT_ITEMS_FAIL:
      return {
        cartItemLoading: false,
        cartError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        cartError: null,
      };

    default:
      return state;
  }
};
