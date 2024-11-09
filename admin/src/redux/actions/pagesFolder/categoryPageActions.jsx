import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY_PAGE_FAIL,
  CREATE_CATEGORY_PAGE_REQUEST,
  CREATE_CATEGORY_PAGE_SUCCESS,
  GET_CATEGORY_PAGE_DETAILS_REQUEST,
  GET_CATEGORY_PAGE_DETAILS_SUCCESS,
  GET_CATEGORY_PAGE_DETAILS_FAIL,
  UPDATE_CATEGORY_PAGE_DETAILS_REQUEST,
  UPDATE_CATEGORY_PAGE_DETAILS_SUCCESS,
  UPDATE_CATEGORY_PAGE_DETAILS_FAIL,
} from "../../constants/pagesFolder/categoryPageConstants";

// Digital Marketing Category Page

export const createCategoryPageAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/categoriesPagePage";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_CATEGORY_PAGE_REQUEST });

    console.log(
      object,
      "productObject.........................//////after request"
    );
    const { data } = await axios.post(
      url,
      {
        sliderBannerImageUrl: object?.sliderBannerImageUrl
          ? object?.sliderBannerImageUrl
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: object?.category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_CATEGORY_PAGE_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.href = "/pagecategoriespage";
      }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: CREATE_CATEGORY_PAGE_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};

// Digital Marketing Category Page

export const getCategoryPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_PAGE_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/categoriesPagePage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_CATEGORY_PAGE_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_PAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing Category Page

export const updateCategoryPageAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/categoriesPagePage/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_CATEGORY_PAGE_DETAILS_REQUEST });

    const { data } = await axios.put(
      url,
      {
        sliderBannerImageUrl: object?.sliderBannerImageUrl
          ? object?.sliderBannerImageUrl
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: object?.category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: UPDATE_CATEGORY_PAGE_DETAILS_SUCCESS, payload: data });
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
        type: UPDATE_CATEGORY_PAGE_DETAILS_FAIL,
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
