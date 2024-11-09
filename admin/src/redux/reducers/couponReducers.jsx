import * as types from "../constants/couponConstants";

const initialState = {
  coupon: null,
  loading: false,
  error: null,
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_COUPON_SUCCESS:
      return {
        ...state,
        coupon: action.payload,
        loading: false,
        error: null,
      };
    case types.CREATE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCouponsReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case types.GET_ALL_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
        error: "", // Clear error on request
      };
    case types.GET_ALL_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: action.payload.coupons,
        couponsCount: action.payload.couponsCount,
      };
    case types.GET_ALL_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
