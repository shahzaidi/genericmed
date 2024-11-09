// reducers/otpReducer.js
// import * as types from "../actions/otpActions";
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
} from "../constants/otpConstants";

const initialState = {
  sendingOtp: false,
  error: null,
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
      return {
        ...state,
        sendingOtp: true,
        error: null,
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        sendingOtp: false,
        error: null,
      };
    case SEND_OTP_FAILURE:
      return {
        ...state,
        sendingOtp: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default otpReducer;
