import {
  CLEAR_ERROR,
  COUPON_APPLY_FAIL,
  COUPON_APPLY_REQUEST,
  COUPON_APPLY_SUCCESS,
  GET_ALL_COUPON_REQUEST,
  GET_ALL_COUPON_SUCCESS,
  GET_ALL_COUPON_FAIL,
} from "../constants/couponConstants";

// Coupon Reducer

export const couponReducer = (state = { couponObject: {} }, action) => {
  switch (action.type) {
    case COUPON_APPLY_REQUEST:
      return {
        couponLoading: true,
        couponObject: {},
      };

    case COUPON_APPLY_SUCCESS:
      return {
        couponLoading: false,
        couponObject: action.payload,
      };

    case COUPON_APPLY_FAIL:
      return {
        couponLoading: false,
        couponError: action.payload,
        couponObject: {},
      };

    case CLEAR_ERROR:
      return {
        ...state,
        couponError: null,
      };

    default:
      return state;
  }
};

// Get All Coupons Reducer

export const getAllCouponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case GET_ALL_COUPON_REQUEST:
      return {
        couponsLoading: true,
        ...state,
      };

    case GET_ALL_COUPON_SUCCESS:
      return {
        couponsLoading: false,
        coupons: action.payload.coupons,
      };

    case GET_ALL_COUPON_FAIL:
      return {
        couponsLoading: false,
        couponsError: action.payload,
        coupons: [],
      };

    case CLEAR_ERROR:
      return {
        ...state,
        couponsError: null,
      };

    default:
      return state;
  }
};
