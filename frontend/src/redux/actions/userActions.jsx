import axios from "axios";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAIL,
  GET_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_SUCCESS,
  DELETE_USER_ADDRESS_FAIL,
} from "../constants/userConstants";
import { toast } from "react-toastify";

// Register User

export const registerUserAction =
  ({ ...options }, setLoginSignUpLoading) =>
  async (dispatch) => {
    try {
      setLoginSignUpLoading(true);
      dispatch({ type: REGISTER_USER_REQUEST });

      const { data } = await axios.post(`/api/v1/user/register`, {
        firstName: options.firstName,
        lastName: options.lastName,
        email: options.email,
        mobileNumber: options.mobileNumber,
        otp: options.otp,
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      localStorage.setItem("token", data?.token);
      if (data?.message) {
        localStorage.setItem("user", JSON.stringify(data?.user));
        // setAuthUser(data?.user);
        setLoginSignUpLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setLoginSignUpLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({ type: REGISTER_USER_FAIL, payload: errorMessage });
      if (errorMessage) {
        setLoginSignUpLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Login User

export const loginUserAction =
  ({ ...options }, setLoginSignUpLoading) =>
  async (dispatch) => {
    try {
      setLoginSignUpLoading(true);
      dispatch({ type: LOGIN_USER_REQUEST });

      const { data } = await axios.post(`/api/v1/user/login`, {
        email: options.email,
        otp: options.otp,
      });

      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

      localStorage.setItem("token", data?.token);

      if (data?.message) {
        localStorage.setItem("user", JSON.stringify(data?.user));
        // setAuthUser(data?.user);
        setLoginSignUpLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setLoginSignUpLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({ type: LOGIN_USER_FAIL, payload: errorMessage });
      if (errorMessage) {
        setLoginSignUpLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Get User Details

export const getUserDetails = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: GET_USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/user/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create User Address

export const createUserAddressAction =
  ({ ...options }, setUserCLoading) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      setUserCLoading(true);
      dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

      const { data } = await axios.post(
        `/api/v1/user/address/add`,
        {
          options,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });
      // localStorage.setItem("token", data?.token);
      if (data?.message) {
        // localStorage.setItem("user", JSON.stringify(data?.user));
        // setAuthUser(data?.user);
        setUserCLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setUserCLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({ type: UPDATE_USER_DETAILS_FAIL, payload: errorMessage });
      if (errorMessage) {
        setUserCLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Update User Profile

export const updateUserProfileAction =
  ({ ...options }, setUserCLoading) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      setUserCLoading(true);
      dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

      const { data } = await axios.put(
        `/api/v1/user/update`,
        {
          firstName: options?.firstName,
          lastName: options?.lastName,
          mobileNumber: options?.mobileNumber,
          email: options?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });
      // localStorage.setItem("token", data?.token);
      if (data?.message) {
        // localStorage.setItem("user", JSON.stringify(data?.user));
        // setAuthUser(data?.user);
        setUserCLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setUserCLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({ type: UPDATE_USER_DETAILS_FAIL, payload: errorMessage });
      if (errorMessage) {
        setUserCLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Get User Particular Address

export const getUserAddressById = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: GET_USER_ADDRESS_REQUEST });

    const { data } = await axios.get(
      `/api/v1/user/address/getParticularAddress?addressId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User Profile

export const updateUserAddressAction =
  (addressId, { ...options }, setUserCLoading) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      setUserCLoading(true);
      dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

      const { data } = await axios.put(
        `/api/v1/user/address/update`,
        {
          addressId,
          firstName: options?.firstName,
          lastName: options?.lastName,
          phone: options?.phone,
          zipCode: options?.zipCode,
          country: options?.country,
          state: options?.state,
          city: options?.city,
          street: options?.street,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data });
      // localStorage.setItem("token", data?.token);
      if (data?.message) {
        // localStorage.setItem("user", JSON.stringify(data?.user));
        // setAuthUser(data?.user);
        setUserCLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setUserCLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      dispatch({ type: UPDATE_USER_DETAILS_FAIL, payload: errorMessage });
      if (errorMessage) {
        setUserCLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Delete Address by Id from wishlist by login User

export const deleteSelectedUserAddress =
  (addressId, setLoginSignUpLoading) => async (dispatch) => {
    try {
      setLoginSignUpLoading(true);
      const token = localStorage.getItem("token");
      console.log(token, "address token");

      dispatch({ type: DELETE_USER_ADDRESS_REQUEST });

      const { data } = await axios.delete(
        `/api/v1/user/address/delete/?addressId=${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({ type: DELETE_USER_ADDRESS_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setLoginSignUpLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setLoginSignUpLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({ type: DELETE_USER_ADDRESS_FAIL, payload: errorMessage });
      }
      if (errorMessage) {
        setLoginSignUpLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Clearing Errors

export const clearError = () => async (dispatch) => {
  dispatch({ CLEAR_ERROR });
};
