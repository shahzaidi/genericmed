import axios from "axios";
import {
  GET_HOMES_META_DATA_REQUEST,
  GET_HOMES_META_DATA_SUCCESS,
  GET_HOMES_META_DATA_FAIL,
} from "../constants/homePageConstants";
// Digital Marketing Home Page

export const getHomePageDetails = () => async (dispatch) => {
  try {
    console.log(12345, "ccatData");
    dispatch({ type: GET_HOMES_META_DATA_REQUEST });
    const token = localStorage.getItem("token");
    let link = `/api/v1/homePage`;

    const { data } = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_HOMES_META_DATA_SUCCESS, payload: data });
    console.log(data, "ccccatData");
  } catch (error) {
    dispatch({
      type: GET_HOMES_META_DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};
