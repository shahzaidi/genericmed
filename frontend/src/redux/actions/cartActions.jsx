import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_PRODUCT_ITEM_IN_CART_FAIL,
  ADD_PRODUCT_ITEM_IN_CART_REQUEST,
  ADD_PRODUCT_ITEM_IN_CART_SUCCESS,
  GET_ALL_CART_PRODUCT_ITEMS_FAIL,
  GET_ALL_CART_PRODUCT_ITEMS_REQUEST,
  GET_ALL_CART_PRODUCT_ITEMS_SUCCESS,
  DELETE_PRODUCT_ITEM_IN_CART_REQUEST,
  DELETE_PRODUCT_ITEM_IN_CART_SUCCESS,
  DELETE_PRODUCT_ITEM_IN_CART_FAIL,
  EMPTY_CART_REQUEST,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
} from "../constants/cartConstants";

// Add Product Item in Cart by Login User

export const addProductItemInCart =
  (productId, productName, variants, setCartLoading) => async (dispatch) => {
    try {
      setCartLoading(true);
      const token = localStorage.getItem("token");
      let url = `/api/v1/cart/add`;
      if (token) {
        url;
      } else {
        url = `/api/v1/guest/cart/add`;
      }

      dispatch({ type: ADD_PRODUCT_ITEM_IN_CART_REQUEST });

      const { data } = await axios.post(
        url,
        { productId, productName, variants },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({ type: ADD_PRODUCT_ITEM_IN_CART_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setCartLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setCartLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        setCartLoading(false);
        dispatch({
          type: ADD_PRODUCT_ITEM_IN_CART_FAIL,
          payload: errorMessage,
        });
      }
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Get Product Items from Cart

export const getCartItems = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/cart/get`;
    if (token) {
      url;
    } else {
      url = `/api/v1/guest/cart/get`;
    }
    dispatch({ type: GET_ALL_CART_PRODUCT_ITEMS_REQUEST });

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ALL_CART_PRODUCT_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CART_PRODUCT_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add Product Item in Cart by Login User

export const updateProductItemQuantityInCart =
  (productId, variants, setCartLoading) => async (dispatch) => {
    try {
      setCartLoading(true);
      const token = localStorage.getItem("token");
      let url = `/api/v1/cart/add`;
      if (token) {
        url;
      } else {
        url = `/api/v1/guest/cart/add`;
      }

      dispatch({ type: ADD_PRODUCT_ITEM_IN_CART_REQUEST });

      const { data } = await axios.post(
        url,
        { productId, variants },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.message) {
        dispatch({ type: ADD_PRODUCT_ITEM_IN_CART_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setCartLoading(false);
        // toast.success(data?.message, {
        //   position: "top-right",
        //   autoClose: 5000,
        // });
      }
    } catch (error) {
      setCartLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        setCartLoading(false);
        dispatch({
          type: ADD_PRODUCT_ITEM_IN_CART_FAIL,
          payload: errorMessage,
        });
      }
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Delete Product Item from Cart

export const deleteProductIteFromCart =
  (productId, id, setCartLoading) => async (dispatch) => {
    try {
      setCartLoading(true);
      const token = localStorage.getItem("token");

      let url = `/api/v1/cart/item/${id}`;
      if (token) {
        url;
      } else {
        url = `/api/v1/guest/cart/item/${id}`;
      }

      dispatch({ type: DELETE_PRODUCT_ITEM_IN_CART_REQUEST });

      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          productId: productId,
        },
      });
      if (data?.message) {
        dispatch({ type: DELETE_PRODUCT_ITEM_IN_CART_SUCCESS, payload: data });
      }

      if (data?.success === true) {
        setCartLoading(false);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setCartLoading(true);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (errorMessage) {
        dispatch({
          type: DELETE_PRODUCT_ITEM_IN_CART_FAIL,
          payload: errorMessage,
        });
      }
      if (errorMessage) {
        setCartLoading(false);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

// Empty Cart

export const emptyCartAction = () => async (dispatch) => {
  try {
    // setCartLoading(true);
    const token = localStorage.getItem("token");

    let url = `/api/v1/cart/empty`;
    if (token) {
      url;
    } else {
      url = `/api/v1/guest/cart/empty`;
    }

    dispatch({ type: EMPTY_CART_REQUEST });

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: EMPTY_CART_SUCCESS, payload: data });
    }

    // if (data?.success === true) {
    // setCartLoading(false);
    // toast.success(data?.message, {
    //   position: "top-right",
    //   autoClose: 5000,
    // });
    // }
  } catch (error) {
    // setCartLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: EMPTY_CART_FAIL,
        payload: errorMessage,
      });
      return errorMessage;
    }
    // if (errorMessage) {
    //   // setCartLoading(false);
    //   toast.error(errorMessage, {
    //     position: "top-right",
    //     autoClose: 5000,
    //   });
    // }
  }
};
