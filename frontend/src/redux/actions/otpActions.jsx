import axios from "axios";
import { useContext } from "react";

import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  CLEAR_ERROR,
} from "../constants/otpConstants";
import { toast } from "react-toastify";
import { TheContextApi } from "../../contextApi/TheContext";

export const sendOtpToMail =
  (email, setOtp1Loading, setSentOtpAtOnes, setResentOtp, b = "") =>
  async (dispatch) => {
    // const { setResentOtp } = useContext(TheContextApi);
    try {
      // const { setContextLoading } = useContext(TheContextApi);
      setOtp1Loading(true);
      dispatch({ type: SEND_OTP_REQUEST });

      const { data } = await axios.post(`/api/v1/send/otp/email`, { email });
      if (data?.message) {
        dispatch({ type: SEND_OTP_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setSentOtpAtOnes(true);
        setOtp1Loading(false);

        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
        if (b === true) {
          setResentOtp(true);
        }
      }
    } catch (error) {
      setOtp1Loading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({ type: SEND_OTP_FAIL, payload: errorMessage });
      }
      if (errorMessage) {
        setOtp1Loading(false);
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
