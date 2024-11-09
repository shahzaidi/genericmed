import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_HOME_PAGE_BANNERS_REQUEST,
  CREATE_HOME_PAGE_BANNERS_SUCCESS,
  CREATE_HOME_PAGE_BANNERS_FAIL,
  GET_HOME_PAGE_BANNERS_DETAILS_REQUEST,
  GET_HOME_PAGE_BANNERS_DETAILS_SUCCESS,
  GET_HOME_PAGE_BANNERS_DETAILS_FAIL,
  UPDATE_HOME_PAGE_BANNERS_DETAILS_REQUEST,
  UPDATE_HOME_PAGE_BANNERS_DETAILS_SUCCESS,
  UPDATE_HOME_PAGE_BANNERS_DETAILS_FAIL,
} from "../../constants/pagesFolder/homePagePageConstants";

// Pages Home Page Banners

export const createHomePageBannersAction = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/homepagePage";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_HOME_PAGE_BANNERS_REQUEST });

    console.log(
      object,
      "productObject.........................//////after request"
    );
    const { data } = await axios.post(
      url,
      {
        sliderBannerImageUrl: object?.sliderBannerImageUrl,
        imageUrlOne: object?.imageUrlOne,
        imageUrlTwo: object?.imageUrlTwo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_HOME_PAGE_BANNERS_SUCCESS, payload: data });
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
      dispatch({ type: CREATE_HOME_PAGE_BANNERS_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};

// Pages Home Page Banners

export const getHomePageBannersDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HOME_PAGE_BANNERS_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/homepagePage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_HOME_PAGE_BANNERS_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_HOME_PAGE_BANNERS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Pages Home Page Banners

export const updateHomePageBannerAction = (id, object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/homepagePage/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPDATE_HOME_PAGE_BANNERS_DETAILS_REQUEST });

    const { data } = await axios.put(
      url,
      {
        sliderBannerImageUrl: object?.sliderBannerImageUrl,
        imageUrlOne: object?.imageUrlOne,
        imageUrlTwo: object?.imageUrlTwo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({
        type: UPDATE_HOME_PAGE_BANNERS_DETAILS_SUCCESS,
        payload: data,
      });
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
        type: UPDATE_HOME_PAGE_BANNERS_DETAILS_FAIL,
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
