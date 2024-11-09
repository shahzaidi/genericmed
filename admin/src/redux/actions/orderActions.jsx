import axios from "axios";
import {
  GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_REQUEST,
  GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_SUCCESS,
  GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_FAIL,
} from "../constants/orderConstants";
import * as types from "../constants/orderConstants";
import { toast } from "react-toastify";

export const fetchOrdersRequest = () => {
  return {
    type: types.FETCH_ORDERS_REQUEST,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: types.FETCH_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const fetchOrdersFailure = (error) => {
  return {
    type: types.FETCH_ORDERS_FAILURE,
    payload: error,
  };
};
export const fetchPendingOrdersRequest = () => {
  return {
    type: types.FETCH_PENDING_ORDERS_REQUEST,
  };
};

export const fetchPendingOrdersSuccess = (orders) => {
  return {
    type: types.FETCH_PENDING_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const fetchPendingOrdersFailure = (error) => {
  return {
    type: types.FETCH_PENDING_ORDERS_FAILURE,
    payload: error,
  };
};

export const fetchCompletedOrdersRequest = () => {
  return {
    type: types.FETCH_PENDING_ORDERS_REQUEST,
  };
};

export const fetchCompletedOrdersSuccess = (orders) => {
  return {
    type: types.FETCH_PENDING_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const fetchCompletedOrdersFailure = (error) => {
  return {
    type: types.FETCH_PENDING_ORDERS_FAILURE,
    payload: error,
  };
};

export const fetchOrderRequest = () => {
  return {
    type: types.FETCH_ORDER_REQUEST,
  };
};

export const fetchOrderSuccess = (data) => {
  return {
    type: types.FETCH_ORDER_SUCCESS,
    payload: data, // Assuming action.payload contains the fetched order
  };
};

export const fetchOrderFailure = (error) => {
  return {
    type: types.FETCH_ORDER_FAILURE,
    payload: error,
  };
};

export const updateOrderStatusSuccess = (data) => {
  return {
    type: types.UPDATE_ORDER_STATUS_SUCCESS,
    payload: data, // Assuming action.payload contains the fetched order
  };
};

export const updateOrderStatusFailure = (error) => {
  return {
    type: types.UPDATE_ORDER_STATUS_FAIL,
    payload: error,
  };
};

export const createOrderRequest = () => ({
  type: types.CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = (order) => ({
  type: types.CREATE_ORDER_SUCCESS,
  payload: order,
});

export const createOrderFailure = (error) => ({
  type: types.CREATE_ORDER_FAIL,
  payload: error,
});

export const fetchOrders = (status = "", page = 1) => {
  return async (dispatch) => {
    dispatch(fetchOrdersRequest());
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `/api/v1/admin/orders?status=${status}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchOrdersSuccess(data));
    } catch (error) {
      dispatch(
        fetchOrdersFailure(error.response.data.message || error.message)
      );
    }
  };
};

export const fetchPendingOrders = () => {
  return async (dispatch) => {
    dispatch(fetchPendingOrdersRequest());
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("/api/v1/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: "PENDING", // Include the status query parameter
        },
      });

      dispatch(fetchPendingOrdersSuccess(data));
    } catch (error) {
      dispatch(
        fetchPendingOrdersFailure(error.response.data.message || error.message)
      );
    }
  };
};

export const fetchCompletedOrders = () => {
  return async (dispatch) => {
    dispatch(fetchCompletedOrdersRequest());
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get("/api/v1/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: "COMPLETED", // Include the status query parameter
        },
      });

      dispatch(fetchCompletedOrdersSuccess(data));
    } catch (error) {
      dispatch(
        fetchCompletedOrdersFailure(
          error.response.data.message || error.message
        )
      );
    }
  };
};

export const fetchOrderById = (id) => {
  return async (dispatch) => {
    dispatch(fetchOrderRequest());
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`/api/v1/order/getUserOrder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(fetchOrderSuccess(data));
    } catch (error) {
      dispatch(
        fetchOrdersFailure(error.response.data.message || error.message)
      );
    }
  };
};

export const updateOrderStatus = (orderId, statusData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    console.log(`token: ${token}`, statusData);
    const { data } = await axios.put(
      `/api/v1/order/${orderId}/update-status`,
      { status: statusData.status, paymentStatus: statusData.paymentStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(
      `qwertyuiopoiuytrewqwertyuiuytrewwerfg=======================>`,
      data.message
    );
    if (data?.message) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
    dispatch(updateOrderStatusSuccess(data));
  } catch (error) {
    dispatch(
      updateOrderStatusFailure(error.response.data.message || error.message)
    );
  }
};

export const createAdminOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/api/v1/admin/order/create",
        orderData,
        config
      );
      console.log(`data is inside action`, data);
      if (data?.message) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
      console.log(`order data is here`, data);
      dispatch(createOrderSuccess(data.orderCode));
    } catch (error) {
      dispatch(
        createOrderFailure(error.response.data.message || error.message)
      );
    }
  };
};

// Get All Orders Count and Recent Orders

export const getAllOrdersCountAndRecentOrdersAction =
  (page = 1) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let link = `/api/v1/admin/orders/count/all/kind?page=${page}`;
      dispatch({ type: GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_REQUEST });

      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({
        type: GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_FAIL,
        payload: errorMessage,
      });
    }
  };
