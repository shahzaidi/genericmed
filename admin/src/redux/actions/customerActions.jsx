import axios from "axios";
import * as types from "../constants/customerConstants";
import { toast } from "react-toastify";

export const fetchCustomersRequest = () => {
  return {
    type: types.FETCH_CUSTOMERS_REQUEST,
  };
};

export const fetchCustomersSuccess = (customers) => {
  return {
    type: types.FETCH_CUSTOMERS_SUCCESS,
    payload: customers,
  };
};

export const fetchCustomersFailure = (error) => {
  return {
    type: types.FETCH_CUSTOMERS_FAILURE,
    payload: error,
  };
};

export const fetchCustomers = (page = 1) => {
  return async (dispatch) => {
    dispatch(fetchCustomersRequest());
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`/api/v1/users/get?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`data inside action`, data);
      dispatch(fetchCustomersSuccess(data));
    } catch (error) {
      dispatch(
        fetchCustomersFailure(error.response.data.message || error.message)
      );
    }
  };
};

// Delete User

export const deleteUser = (id) => async (dispatch) => {
  try {
    // setLoginSignUpLoading(true);
    const token = localStorage.getItem("token");

    dispatch({ type: types.DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: types.DELETE_USER_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      // setLoginSignUpLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      dispatch(fetchCustomers());
    }
  } catch (error) {
    // setLoginSignUpLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: types.DELETE_USER_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      // setLoginSignUpLoading(false);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};
