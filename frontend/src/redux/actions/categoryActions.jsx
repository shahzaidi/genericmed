import axios from "axios";
import {
  GET_ALL_CATEGORY_FAIL,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_CATEGORIES_META_DATA_REQUEST,
  GET_CATEGORIES_META_DATA_SUCCESS,
  GET_CATEGORIES_META_DATA_FAIL,
} from "../constants/categoryConstants";

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORY_REQUEST });

    const { data } = await axios.get("/api/v1/categories/gm");

    dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Digital Marketing Category Page

export const getCategoryMetaPageDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_META_DATA_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/categoryPage/gm`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_CATEGORIES_META_DATA_SUCCESS, payload: data });
    console.log(data, "catData");
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_META_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};
