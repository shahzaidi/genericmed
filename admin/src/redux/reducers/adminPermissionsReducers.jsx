import {
  GET_ADMIN_PERMISSIONS_REQUEST,
  GET_ADMIN_PERMISSIONS_SUCCESS,
  GET_ADMIN_PERMISSIONS_FAIL,
} from "../constants/adminPermissionsConstants";

export const getAdminPermissionsReducer = (
  state = { permissions: [] },
  action
) => {
  switch (action.type) {
    case GET_ADMIN_PERMISSIONS_REQUEST:
      return {
        permissionsLoading: true,
        permissions: [],
      };

    case GET_ADMIN_PERMISSIONS_SUCCESS:
      return {
        permissionsLoading: false,
        permissions: action.payload.permissions,
        // categoryCount: action.payload.categoryCount,
      };

    case GET_ADMIN_PERMISSIONS_FAIL:
      return {
        permissionsLoading: false,
        permissionsError: action.payload,
      };

    default:
      return state;
  }
};
