import {
  GET_ALL_ADMIN_FAIL,
  GET_ALL_ADMIN_REQUEST,
  GET_ALL_ADMIN_SUCCESS,
} from "../constants/adminsConstants";

export const getAllAdminReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ADMIN_REQUEST:
      return {
        loading: true,
        admins: [],
      };

    case GET_ALL_ADMIN_SUCCESS:
      return {
        loading: false,
        admins: action.payload.adminUsers,
        allAdminsCount: action.payload.allAdminsCount,
      };

    case GET_ALL_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
