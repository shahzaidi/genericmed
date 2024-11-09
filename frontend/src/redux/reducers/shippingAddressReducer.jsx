// Get Selected Sipping Address For Login User

import {
  CLEAR_ERROR,
  GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_FAIL,
  GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_REQUEST,
  GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_SUCCESS,
} from "../constants/shippingAddressConstants";

export const getSelectedSippingAddressForLoginUserReducer = (
  state = { selectedShippingAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_REQUEST:
      return {
        shippingAddressLoading: true,
        selectedShippingAddress: {},
      };

    case GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_SUCCESS:
      return {
        shippingAddressLoading: false,
        selectedShippingAddress: action.payload.defaultAddress,
      };

    case GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_FAIL:
      return {
        shippingAddressLoading: false,
        shippingAddressError: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        shippingAddressError: null,
      };

    default:
      return state;
  }
};
