// Create User Address

import axios from "axios";
import {
  COUPON_APPLY_FAIL,
  COUPON_APPLY_REQUEST,
  COUPON_APPLY_SUCCESS,
  GET_ALL_COUPON_REQUEST,
  GET_ALL_COUPON_SUCCESS,
  GET_ALL_COUPON_FAIL,
} from "../constants/couponConstants";
import { toast } from "react-toastify";

export const applyCouponAction = (code, orderTotal) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    // setUserCLoading(true);
    dispatch({ type: COUPON_APPLY_REQUEST });

    const { data } = await axios.post(
      `/api/v1/coupons/apply`,
      {
        code,
        orderTotal,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: COUPON_APPLY_SUCCESS, payload: data });

    // localStorage.setItem("token", data?.token);
    if (data?.message) {
      // localStorage.setItem("user", JSON.stringify(data?.user));
      // setAuthUser(data?.user);
      //   setUserCLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  } catch (error) {
    // setUserCLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({ type: COUPON_APPLY_FAIL, payload: errorMessage });
    if (errorMessage) {
      //   setUserCLoading(false);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Get All Coupons

export const getAllCouponsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_COUPON_REQUEST });

    const { data } = await axios.get(`/api/v1/coupons/getAll/gm`);

    dispatch({ type: GET_ALL_COUPON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};
