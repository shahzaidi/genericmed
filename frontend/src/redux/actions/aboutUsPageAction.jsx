import axios from "axios";
import {
  GET_ABOUT_US_PAGE_DETAILS_REQUEST,
  GET_ABOUT_US_PAGE_DETAILS_SUCCESS,
  GET_ABOUT_US_PAGE_DETAILS_FAIL,
  GET_ABOUT_US_META_DATA_REQUEST,
  GET_ABOUT_US_META_DATA_SUCCESS,
  GET_ABOUT_US_META_DATA_FAIL,
} from "../constants/aboutUsPageConstants";

// Digital Marketing About Us Page

export const getAboutUsPageDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ABOUT_US_PAGE_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/page/aboutUsPage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ABOUT_US_PAGE_DETAILS_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_ABOUT_US_PAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing About Us Page

export const getAboutUsPageMetaDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ABOUT_US_META_DATA_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/aboutUs`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_ABOUT_US_META_DATA_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_ABOUT_US_META_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};
