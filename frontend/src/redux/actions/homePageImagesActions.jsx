import axios from "axios";

import {
  GET_HOME_PAGE_BANNERS_DETAILS_REQUEST,
  GET_HOME_PAGE_BANNERS_DETAILS_SUCCESS,
  GET_HOME_PAGE_BANNERS_DETAILS_FAIL,
} from "../constants/homePageImagesConstants";

// Pages Home Page Banners

export const getHomePageBannersDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_HOME_PAGE_BANNERS_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/homepagePage/gm`;

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
