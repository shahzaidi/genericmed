// actions/authActions.js
import * as types from "../constants/otpConstants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// import { sendOtpEmail } from "../api/authApi";

export const sendOtpRequest = () => ({
  type: types.SEND_OTP_REQUEST,
});

export const sendOtpSuccess = () => ({
  type: types.SEND_OTP_SUCCESS,
});

export const sendOtpFailure = (error) => ({
  type: types.SEND_OTP_FAILURE,
  payload: error,
});

export const sendOtp = (email) => async (dispatch) => {
  dispatch(sendOtpRequest());
  try {
    const { data } = await axios.post(`/api/v1/send/otp/email`, { email });
    // console.log(`response`, data);
    dispatch(sendOtpSuccess());
    // return data;
    // You can handle success response here if needed
  } catch (error) {
    dispatch(sendOtpFailure(error));
  }
};
