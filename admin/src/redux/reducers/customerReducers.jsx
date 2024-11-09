import {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
} from "../constants/customerConstants.jsx";

const initialState = {
  loading: false,
  customers: [],
  error: "",
};

export const customerReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload.users,
        customersCount: action.payload.customersCount,
      };
    case FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
