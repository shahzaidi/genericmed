import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_SHOP_ALL_PAGE_REQUEST,
  CREATE_SHOP_ALL_PAGE_SUCCESS,
  CREATE_SHOP_ALL_PAGE_FAIL,
  GET_SHOP_ALL_PAGE_DETAILS_REQUEST,
  GET_SHOP_ALL_PAGE_DETAILS_SUCCESS,
  GET_SHOP_ALL_PAGE_DETAILS_FAIL,
  UPDATE_SHOP_ALL_PAGE_DETAILS_REQUEST,
  UPDATE_SHOP_ALL_PAGE_DETAILS_SUCCESS,
  UPDATE_SHOP_ALL_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/shopAllPageConstants";

// Pages Shop All Page

export const createShopAllPagePageAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/shopAllPage";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_SHOP_ALL_PAGE_REQUEST });

    console.log(
      object,
      "productObject.........................//////after request"
    );
    const { data } = await axios.post(
      url,
      {
        sliderBannerImageUrl: object?.sliderBannerImageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_SHOP_ALL_PAGE_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      // setTimeout(() => {
      //   window.location.href = "/blogallblogs";
      // }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: CREATE_SHOP_ALL_PAGE_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};

// Pages Shop All Page

export const getShopAllPagePageDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOP_ALL_PAGE_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/shopAllPage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_SHOP_ALL_PAGE_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_SHOP_ALL_PAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Pages Shop All Page

export const updateShopAllPagePageAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/shopAllPage/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_SHOP_ALL_PAGE_DETAILS_REQUEST });

    const { data } = await axios.put(
      url,
      {
        sliderBannerImageUrl: object?.sliderBannerImageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: UPDATE_SHOP_ALL_PAGE_DETAILS_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      // setTimeout(() => {
      //   window.location.href = "/blogallblogs";
      // }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: UPDATE_SHOP_ALL_PAGE_DETAILS_FAIL,
        payload: errorMessage,
      });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};
