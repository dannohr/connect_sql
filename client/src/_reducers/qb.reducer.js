import { qbConstants } from "../_constants";

const initialState = {
  qbConnected: false,
  companyData: {}
};

export function qb(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case qbConstants.LOGIN_REQUEST:
      return {
        isLoading: true,
        qbConnected: false
      };

    case qbConstants.LOGIN_SUCCESS:
      return {
        isLoading: false,
        ...action.data,
        companyData: {}
      };

    case qbConstants.LOGIN_FAILURE:
      return { isLoading: false, qbConnected: false };

    case qbConstants.LOGOUT:
      return {
        qbConnected: false
      };

    case qbConstants.GETCOMPANY_REQUEST:
      return {
        loading: true
      };

    case qbConstants.GETCOMPANY_SUCCESS:
      console.log(action);
      return {
        isLoading: false,
        qbConnected: true,
        companyData: action.data
      };

    case qbConstants.GETCOMPANY_FAILURE:
      console.log("in failing in reducer");
      return {
        isLoading: false,
        qbConnected: false
      };

    default:
      return state;
  }
}
