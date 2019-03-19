import { customerConstants } from "../_constants";

const initialState = {
  isLoading: false,
  customers: {}
};

export function customer(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case customerConstants.GET_ALL_CUSTOMERS__REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case customerConstants.GET_ALL_CUSTOMERS__SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: action.data
      };

    case customerConstants.GET_ALL_CUSTOMERS__FAILURE:
      return {
        ...state,
        isLoading: false,
        customers: null
      };

    default:
      return state;
  }
}
