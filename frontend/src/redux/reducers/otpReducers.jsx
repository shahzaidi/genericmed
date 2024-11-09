import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  CLEAR_ERROR,
} from "../constants/otpConstants";

export const sendOtpToMailReducer = (state = { otpMessage: {} }, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
      return {
        otpLoading: true,
        ...state,
      };

    case SEND_OTP_SUCCESS:
      return {
        otpLoading: false,
        otpMessage: action.payload.message,
      };

    case SEND_OTP_FAIL:
      return {
        otpLoading: false,
        otpError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        otpError: null,
      };

    default:
      return state;
  }
};
