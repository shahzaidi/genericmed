import axios from "axios";

import {
  GET_CATEGORIES_PAGE_BANNERS_DETAILS_REQUEST,
  GET_CATEGORIES_PAGE_BANNERS_DETAILS_SUCCESS,
  GET_CATEGORIES_PAGE_BANNERS_DETAILS_FAIL,
} from "../constants/categoriesPageImagesConstants";

// Pages Home Page Banners

export const getCategoriesPageBannersDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_PAGE_BANNERS_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/categoriesPagePage/gm`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_CATEGORIES_PAGE_BANNERS_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_PAGE_BANNERS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
