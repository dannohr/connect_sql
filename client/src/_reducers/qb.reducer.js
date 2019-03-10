import { qbConstants } from "../_constants";

const initialState = {
  oauth2_token: {
    x_refresh_token_expires_in: 0,
    refresh_token: "",
    access_token: "",
    token_type: "",
    expires_in: 0
  }
};

export function qb(state = initialState, action) {
  switch (action.type) {
    case qbConstants.LOGIN_REQUEST:
      return {
        isLoading: true,
        user: action.user
      };

    case qbConstants.LOGIN_SUCCESS:
      return {
        ...action.user
      };

    case qbConstants.LOGIN_FAILURE:
      return {};

    case qbConstants.LOGOUT:
      return {
        ...action.user
      };

    case qbConstants.GETME_REQUEST:
      return {
        loading: true
      };

    case qbConstants.GETME_SUCCESS:
      return {
        ...action.users
      };

    case qbConstants.GETME_FAILURE:
      return {
        error: action.error
      };

    default:
      return state;
  }
}
