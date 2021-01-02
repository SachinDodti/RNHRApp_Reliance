import { LOCATION_DIRECTORY_ACTION } from "./Constants";

export function getStateCityMasterSuccess(data) {
  return {
    type: LOCATION_DIRECTORY_ACTION.GET_STATE_CITY_MASTER_SUCCESS,
    data,
  };
}

export function getStateCityMasterError(error) {
  return {
    type: LOCATION_DIRECTORY_ACTION.GET_STATE_CITY_MASTER_ERROR,
    error,
  };
}

export function getBranchDetailsSuccess(data) {
  return {
    type: LOCATION_DIRECTORY_ACTION.GET_BRANCH_DETAILS_SUCCESS,
    data,
  };
}

export function getStateCityMasterErrorgetStateCityMasterError(error) {
  return {
    type: LOCATION_DIRECTORY_ACTION.GET_BRANCH_DETAILS_ERROR,
    error,
  };
}

export function shareBranchDetailsSuccess(data) {
  return {
    type: LOCATION_DIRECTORY_ACTION.SHARE_BRANCH_DETAILS_SUCCESS,
    data,
  };
}

export function clearBranchDetails() {
  return {
    type: LOCATION_DIRECTORY_ACTION.CLEAR_BRANCH_DETAILS,
  };
}

export function shareBranchDetailsError(error) {
  return {
    type: LOCATION_DIRECTORY_ACTION.SHARE_BRANCH_DETAILS_ERROR,
    error,
  };
}
