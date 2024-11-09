//   Upload Images

import axios from "axios";
import {
  UPLOAD_IMAGES_FAIL,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from "../constants/imagesConstants";
import { toast } from "react-toastify";

export const uploadImagesAction = (formData, type) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/upload/multiple/image";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: UPLOAD_IMAGES_REQUEST });

    const { data } = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload: { data, type } });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      //   setTimeout(() => {
      //     window.location.href = "/blogallblogs";
      //   }, 5100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: UPLOAD_IMAGES_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};
