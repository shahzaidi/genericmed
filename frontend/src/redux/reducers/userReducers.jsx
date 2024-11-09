import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  CLEAR_ERROR,
  GET_USER_ADDRESS_REQUEST,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAIL,
} from "../constants/userConstants";

export const userRegisterReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        message: action.payload.user,
      };

    case REGISTER_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Get User Details

export const getUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_REQUEST:
      return {
        userLoading: true,
        user: {},
      };

    case GET_USER_DETAILS_SUCCESS:
      return {
        userLoading: false,
        user: action.payload.user,
      };

    case GET_USER_DETAILS_FAIL:
      return {
        userLoading: false,
        userError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Get User Details

export const getUserAddressReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case GET_USER_ADDRESS_REQUEST:
      return {
        addressLoading: true,
        address: {},
      };

    case GET_USER_ADDRESS_SUCCESS:
      return {
        addressLoading: false,
        address: action.payload.address,
      };

    case GET_USER_ADDRESS_FAIL:
      return {
        addressLoading: false,
        addressError: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
