import axios from "axios";
import {
  GET_SHOP_ALL_PAGE_BANNERS_DETAILS_REQUEST,
  GET_SHOP_ALL_PAGE_BANNERS_DETAILS_SUCCESS,
  GET_SHOP_ALL_PAGE_BANNERS_DETAILS_FAIL,
} from "../constants/shopAllPageImagesConstants";

// Pages Home Page Banners

export const getShopAllPageBannersDetailsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOP_ALL_PAGE_BANNERS_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/shopAllPage/gm`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_SHOP_ALL_PAGE_BANNERS_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data, "homePageImageData");
  } catch (error) {
    dispatch({
      type: GET_SHOP_ALL_PAGE_BANNERS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
