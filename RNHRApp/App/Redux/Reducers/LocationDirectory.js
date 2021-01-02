import { LOCATION_DIRECTORY_ACTION } from "../Actions/Constants";

const locationDirectoryReducer = (
  state = {
    stateCity: [],
    branches: [],
  },
  action,
) => {
  switch (action.type) {
  case LOCATION_DIRECTORY_ACTION.GET_STATE_CITY_MASTER_SUCCESS:
    return {
      ...state,
      stateCity: action.data ? action.data : [],
      error: null,
    };
  case LOCATION_DIRECTORY_ACTION.GET_STATE_CITY_MASTER_ERROR:
    return {
      ...state,
      error: action.error,
      stateCity: [],
    };
  case LOCATION_DIRECTORY_ACTION.GET_BRANCH_DETAILS_SUCCESS:
    return {
      ...state,
      branches: action.data ? action.data : [],
      error: null,
    };
  case LOCATION_DIRECTORY_ACTION.CLEAR_BRANCH_DETAILS:
    return {
      ...state,
      branches: [],
      error: null,
    };
  case LOCATION_DIRECTORY_ACTION.GET_BRANCH_DETAILS_ERROR:
    return {
      ...state,
      error: action.error,
      branches: [],
    };
  default:
    return { ...state };
  }
};

export default locationDirectoryReducer;
