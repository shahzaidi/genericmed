import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_PENDING_ORDERS_REQUEST,
  FETCH_PENDING_ORDERS_SUCCESS,
  FETCH_PENDING_ORDERS_FAILURE,
  FETCH_COMPLETED_ORDERS_REQUEST,
  FETCH_COMPLETED_ORDERS_SUCCESS,
  FETCH_COMPLETED_ORDERS_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAILURE,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_REQUEST,
  GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_SUCCESS,
  GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_FAIL,
} from "../constants/orderConstants.jsx";

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "", // Clear error on request
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        allOrdersCount: action.payload.allOrdersCount, // Clear error on success
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const pendingOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case FETCH_PENDING_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "", // Clear error on request
      };
    case FETCH_PENDING_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        allOrdersCount: action.payload.allOrdersCount, // Clear error on success
      };
    case FETCH_PENDING_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const completedOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case FETCH_COMPLETED_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "", // Clear error on request
      };
    case FETCH_COMPLETED_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        allOrdersCount: action.payload.allOrdersCount,
      };
    case FETCH_COMPLETED_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        order: {},
        loading: true,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload.order,
      };
    case FETCH_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateOrderStatusReducer = (
  state = { order: null, error: null },
  action
) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        order: action.payload,
        error: null,
      };
    case UPDATE_ORDER_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createOrderReducer = (
  state = { order: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllOrdersCountAndRecentOrdersReducer = (
  state = { allKindOfOrdersCountAndRecentOrders: {} },
  action
) => {
  switch (action.type) {
    case GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_REQUEST:
      return {
        loading: true,
        allKindOfOrdersCountAndRecentOrders: {},
      };

    case GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_SUCCESS:
      return {
        loading: false,
        allKindOfOrdersCountAndRecentOrders: action.payload,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_ALL_KIND_ORDERS_COUNT_AND_RECENT_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
        allKindOfOrdersCountAndRecentOrders: {},
      };

    default:
      return state;
  }
};
