import axios from "axios";
import {
  GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_FAIL,
  GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_REQUEST,
  GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_SUCCESS,
  SELECT_SHIPPING_ADDRESS_FOR_LOGIN_USER_FAIL,
  SELECT_SHIPPING_ADDRESS_FOR_LOGIN_USER_REQUEST,
  SELECT_SHIPPING_ADDRESS_FOR_LOGIN_USER_SUCCESS,
} from "../constants/shippingAddressConstants";
import { toast } from "react-toastify";

export const selectSippingAddressForLoginUser =
  (addressId, addressState, setAddressState) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "checkout Token");
      // setUserCLoading(true);
      dispatch({ type: SELECT_SHIPPING_ADDRESS_FOR_LOGIN_USER_REQUEST });

      const { data } = await axios.put(
        `/api/v1/users/addresses/setShipAddress/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: SELECT_SHIPPING_ADDRESS_FOR_LOGIN_USER_SUCCESS,
        payload: data,
      });

      // localStorage.setItem("token", data?.token);
      if (data?.message) {
        // localStorage.setItem("user", JSON.stringify(data?.user));
        // setAuthUser(data?.user);
        //   setUserCLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
        setAddressState(!addressState);
      }
    } catch (error) {
      // setUserCLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({
        type: SELECT_SHIPPING_ADDRESS_FOR_LOGIN_USER_FAIL,
        payload: errorMessage,
      });
      if (errorMessage) {
        //   setUserCLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
        setAddressState(!addressState);
      }
    }
  };

// Get Selected Sipping Address For Login User

export const getSelectedSippingAddressForLoginUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_REQUEST });
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `/api/v1/users/addresses/getDefaultAddress`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SELECTED_SHIPPING_ADDRESS_FOR_LOGIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
