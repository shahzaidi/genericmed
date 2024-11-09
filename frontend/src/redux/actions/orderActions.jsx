// Create Order For Login and Guest User

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  CLEAR_ERROR,
} from "../constants/orderConstants";
import { emptyCartAction } from "./cartActions";

export const createOrderAction =
  (
    address,
    products,
    orderTotal,
    discountAmount = 0,
    finalAmount,
    paymentGateway,
    checkOutPageDone,
    setCheckOutPageDone,
    navigate,
    setPaymentReviewOutPageDone
  ) =>
  async (dispatch) => {
    try {
      console.log(
        address,
        products,
        orderTotal,
        discountAmount,
        finalAmount,
        paymentGateway,
        "fromOrder Api.............//"
      );
      const token = localStorage.getItem("token");
      let url = token ? "/api/v1/order/create" : "/api/v1/Guest/order/create";

      dispatch({ type: CREATE_ORDER_REQUEST });
      setCheckOutPageDone(true);
      const { data } = await axios.post(
        url,
        {
          address,
          products,
          orderTotal,
          discountAmount,
          finalAmount,
          paymentGateway,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setCheckOutPageDone(!checkOutPageDone);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 1000,
        });
        console.log(data?.order?._id, "topOredr");
        // setOrderNumber(data?.order?._id);
        // Call emptyCartAction by dispatching it
        // Call emptyCartAction by dispatching it
        console.log("before emptyCartAction dispatch");
        dispatch(emptyCartAction()); // Assuming emptyCartAction returns an action object
        console.log("after emptyCartAction dispatch");
        // window.location.href = `/Thankyou/${data?.order?._id}`;
        navigate(`/Thankyou/${data?.order?._id}`);
        setPaymentReviewOutPageDone(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: errorMessage });
      }
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }
  };

// Order Details

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let url = token
      ? `/api/v1/order/getUserOrder/latest/${id}`
      : `/api/v1/order/getGuestUserOrder/latest/${id}`;
    dispatch({ type: GET_ORDER_REQUEST });

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors

export const clearError = () => async (dispatch) => {
  dispatch({ CLEAR_ERROR });
};
