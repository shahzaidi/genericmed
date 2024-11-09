import {
  GET_ALL_PRODUCT_FAIL,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
} from "../constants/productsConstants";

export const getAllProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case GET_ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        productCountWithApiFeatures: action.payload.productCountWithApiFeatures,
      };

    case GET_ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Get Product Details

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        productLoading: true,
        product: {},
      };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        productLoading: false,
        product: action.payload.product,
      };

    case GET_PRODUCT_DETAILS_FAIL:
      return {
        productLoading: false,
        productError: action.payload,
      };

    default:
      return state;
  }
};
