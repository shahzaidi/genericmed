import * as types from "../constants/adminUserConstants";
// import { login } from "../api/authApi";
import axios from "axios";
import { toast } from "react-toastify";

export const loginRequest = () => ({
  type: types.LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: types.LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (email, otp) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // const response = await login(email, otp); // Your API call to verify OTP and log in
    // const { data } = await axios.post(`/api/v1/user/login`, {
    //   email: email,
    //   otp: otp,
    // });
    const { data } = await axios.post(`/api/v1/user/login`, {
      email: email,
      otp: otp,
    });

    dispatch(loginSuccess(data));
    // You can handle success response here if needed
    localStorage.setItem("token", data?.token);

    if (data?.message) {
      localStorage.setItem("user", JSON.stringify(data?.user));
      // setAuthUser(data?.user);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      //   window.location.href = "/dashboard";
    }
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
