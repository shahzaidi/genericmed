import * as types from "../constants/adminUserConstants";

const initialState = {
  loggingIn: false,
  userData: null,
  error: null,
};

const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        userData: action.payload,
        error: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminUserReducer;
