import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_ALL_WISHLISTS_PRODUCTS_REQUEST,
  GET_ALL_WISHLISTS_PRODUCTS_SUCCESS,
  GET_ALL_WISHLISTS_PRODUCTS_FAIL,
  ADD_WISHLIST_PRODUCT_REQUEST,
  ADD_WISHLIST_PRODUCT_SUCCESS,
  ADD_WISHLIST_PRODUCT_FAIL,
  DELETE_WISHLIST_ITEM_REQUEST,
  DELETE_WISHLIST_ITEM_SUCCESS,
  DELETE_WISHLIST_ITEM_FAIL,
  CLEAR_ERROR,
} from "../constants/wishListConstants";
// Get All Reviews

export const getWishlist =
  (currentPage = 1) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch({ type: GET_ALL_WISHLISTS_PRODUCTS_REQUEST });

      const { data } = await axios.get(`/api/v1/wishlist?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_WISHLISTS_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_WISHLISTS_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Add Product in wishlist by login user

export const addProductInWishlist = (productId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    dispatch({ type: ADD_WISHLIST_PRODUCT_REQUEST });

    const { data } = await axios.post(
      `/api/v1/wishlist/add`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: ADD_WISHLIST_PRODUCT_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: ADD_WISHLIST_PRODUCT_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Delete Product from wishlist by login User

export const deleteItemFromWishlist =
  (id, setLoginSignUpLoading) => async (dispatch) => {
    try {
      setLoginSignUpLoading(true);
      const token = localStorage.getItem("token");

      dispatch({ type: DELETE_WISHLIST_ITEM_REQUEST });

      const { data } = await axios.delete(`/api/v1/wishlist/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data?.message) {
        dispatch({ type: DELETE_WISHLIST_ITEM_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setLoginSignUpLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setLoginSignUpLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({ type: DELETE_WISHLIST_ITEM_FAIL, payload: errorMessage });
      }
      if (errorMessage) {
        setLoginSignUpLoading(false);
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
