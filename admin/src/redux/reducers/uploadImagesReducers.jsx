//   Upload Images

import {
  UPLOAD_IMAGES_FAIL,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from "../constants/imagesConstants";

// Upload Images

export const uploadImagesReducer = (state = { imageUrls: [] }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGES_REQUEST:
      return {
        imagesLoading: true,
        imageUrls: [],
      };

    case UPLOAD_IMAGES_SUCCESS:
      return {
        imagesLoading: false,
        imageUrls: action.payload.data.imageUrls,
        type: action.payload.type,
        // categoryCount: action.payload.categoryCount,
      };

    case UPLOAD_IMAGES_FAIL:
      return {
        imagesLoading: false,
        imagesError: action.payload,
        imageUrls: [],
      };

    default:
      return state;
  }
};
