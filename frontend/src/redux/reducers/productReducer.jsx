import {
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAIL,
  GET_ALL_BEST_SELLERS_PRODUCT_REQUEST,
  GET_ALL_BEST_SELLERS_PRODUCT_SUCCESS,
  GET_ALL_BEST_SELLERS_PRODUCT_FAIL,
  GET_ALL_BEST_OFFERS_PRODUCT_REQUEST,
  GET_ALL_BEST_OFFERS_PRODUCT_SUCCESS,
  GET_ALL_BEST_OFFERS_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_ALL_FEATURED_PRODUCTS_REQUEST,
  GET_ALL_FEATURED_PRODUCTS_SUCCESS,
  GET_ALL_FEATURED_PRODUCTS_FAIL,
  GET_SHOP_ALL_META_DATA_REQUEST,
  GET_SHOP_ALL_META_DATA_SUCCESS,
  GET_SHOP_ALL_META_DATA_FAIL,
  CLEAR_ERROR,
} from "../constants/productConstants";

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

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
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
        loading: true,
        product: {},
      };

    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };

    case GET_PRODUCT_DETAILS_FAIL:
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

export const getAllBestSellerProductReducer = (
  state = { bestSellerProducts: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BEST_SELLERS_PRODUCT_REQUEST:
      return {
        loading: true,
        bestSellerProducts: [],
      };

    case GET_ALL_BEST_SELLERS_PRODUCT_SUCCESS:
      return {
        loading: false,
        bestSellerProducts: action.payload.bestSellersProducts,
      };

    case GET_ALL_BEST_SELLERS_PRODUCT_FAIL:
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

export const getAllBestOffersProductReducer = (
  state = { bestOffersProducts: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BEST_OFFERS_PRODUCT_REQUEST:
      return {
        loading: true,
        bestOffersProducts: [],
      };

    case GET_ALL_BEST_OFFERS_PRODUCT_SUCCESS:
      return {
        loading: false,
        bestOffersProducts: action.payload.bestOffersProducts,
      };

    case GET_ALL_BEST_OFFERS_PRODUCT_FAIL:
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

export const getAllFeaturedProductsReducer = (
  state = { featuredProducts: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_FEATURED_PRODUCTS_REQUEST:
      return {
        loading: true,
        featuredProducts: [],
      };

    case GET_ALL_FEATURED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        featuredProducts: action.payload.featuredProducts,
      };

    case GET_ALL_FEATURED_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
        featuredProducts: [],
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

// Get Shop All Meta Details

export const getShopAllMetaPageDetailsReducer = (
  state = { shopAll: {} },
  action
) => {
  switch (action.type) {
    case GET_SHOP_ALL_META_DATA_REQUEST:
      return {
        shopAllLoading: true,
        shopAll: {},
      };

    case GET_SHOP_ALL_META_DATA_SUCCESS:
      return {
        shopAllLoading: false,
        shopAll: action.payload.shopAll,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_SHOP_ALL_META_DATA_FAIL:
      return {
        shopAllLoading: false,
        shopAllError: action.payload,
        shopAll: {},
      };

    default:
      return state;
  }
};
