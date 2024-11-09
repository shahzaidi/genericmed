import axios from "axios";
import * as types from "../constants/couponConstants";

import { toast } from "react-toastify";

export const createCouponRequest = () => ({
  type: types.CREATE_COUPON_REQUEST,
});

export const createCouponSuccess = (coupon) => ({
  type: types.CREATE_COUPON_SUCCESS,
  payload: coupon,
});

export const createCouponFailure = (error) => ({
  type: types.CREATE_COUPON_FAIL,
  payload: error,
});

export const getAllCouponsRequest = () => ({
  type: types.GET_ALL_COUPON_REQUEST,
});

export const getAllCouponsSuccess = (coupon) => ({
  type: types.GET_ALL_COUPON_SUCCESS,
  payload: coupon,
});

export const getAllCouponsFailure = (error) => ({
  type: types.GET_ALL_COUPON_FAIL,
  payload: error,
});

export const deleteCouponRequest = () => ({
  type: types.DELETE_COUPON_REQUEST,
});

export const deleteCouponSuccess = () => ({
  type: types.DELETE_COUPON_SUCCESS,
});

export const deleteCouponFailure = (error) => ({
  type: types.DELETE_COUPON_FAILURE,
  payload: error,
});

export const createCoupon = (couponData) => {
  return async (dispatch) => {
    dispatch(createCouponRequest());
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/api/v1/coupons/create",
        couponData,
        config
      );

      if (data?.message) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
      console.log(`coupon data is here`, data);
      dispatch(createCouponSuccess(data.couponCode));
    } catch (error) {
      dispatch(
        createCouponFailure(error.response.data.message || error.message)
      );
    }
  };
};

export const getAllCoupons = (page) => {
  return async (dispatch) => {
    dispatch(getAllCouponsRequest());
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`/api/v1/coupons/getAll?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getAllCouponsSuccess(data));
    } catch (error) {
      dispatch(
        getAllCouponsFailure(error.response.data.message || error.message)
      );
    }
  };
};

export const deleteCoupon = (couponId) => {
  return async (dispatch) => {
    dispatch(deleteCouponRequest());
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/coupons/delete?id=${couponId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteCouponSuccess());
    } catch (error) {
      dispatch(
        deleteCouponFailure(error.response.data.message || error.message)
      );
    }
  };
};
