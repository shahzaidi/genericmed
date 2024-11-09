import axios from "axios";
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
} from "../../constants/productConstants";

export const getAllProducts =
  (
    keyword = "",
    price = [0, 25000],
    category,
    discount,
    rating,
    currentPage = 1
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products/gm?keyword=${keyword}&price[gte]=${
        price[0]
      }&price[lte]=${price[1]}&discount[gte]=${Number(
        discount
      )}&ratings[gte]=${rating}&page=${currentPage}`;
      if (category) {
        link = `/api/v1/products/gm?keyword=${keyword}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&category=${category}&discount[gte]=${Number(
          discount
        )}&ratings[gte]=${rating}&page=${currentPage}`;
      }

      const { data } = await axios.get(link);

      dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get Product Details

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/gm/${id}`);

    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllBestSellerProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BEST_SELLERS_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/products/bestSellers`);

    dispatch({ type: GET_ALL_BEST_SELLERS_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_BEST_SELLERS_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllBestOffersProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BEST_OFFERS_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/products/bestOffers`);

    dispatch({ type: GET_ALL_BEST_OFFERS_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_BEST_OFFERS_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllFeaturedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FEATURED_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/products/featuredProducts`);

    dispatch({ type: GET_ALL_FEATURED_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FEATURED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors

export const clearError = () => async (dispatch) => {
  dispatch({ CLEAR_ERROR });
};

// Digital Marketing Shop All Page

export const getShopAllMetaPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOP_ALL_META_DATA_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/shopAll/gm`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_SHOP_ALL_META_DATA_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_SHOP_ALL_META_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};
