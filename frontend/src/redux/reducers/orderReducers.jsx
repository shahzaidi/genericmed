// Order Details

import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLEAR_ERROR,
} from "../constants/orderConstants";

export const getOrderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        orderLoading: true,
        order: {},
      };

    case GET_ORDER_SUCCESS:
      return {
        orderLoading: false,
        order: action.payload.order,
      };

    case GET_ORDER_FAIL:
      return {
        orderLoading: false,
        orderError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
