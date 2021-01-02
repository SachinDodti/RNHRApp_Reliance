import { REGISTER_QUERY_ACTION } from "./Constants";

export function getRegisterSapInfoSuccess(data) {
  return {
    type: REGISTER_QUERY_ACTION.GET_REGISTER_SAP_INFO_SUCCESS,
    data
  };
}
export function getRegisterSapInfoFailure(error) {
  return {
    type: REGISTER_QUERY_ACTION.GET_REGISTER_SAP_INFO_ERROR,
    error
  };
}

export function getQueryGroupTypeSuccess(data) {
  return {
    type: REGISTER_QUERY_ACTION.GET_QUERY_GROUP_TYPE_SUCCESS,
    data
  };
}

export function getQueryGroupTypeFailure(error) {
  return {
    type: REGISTER_QUERY_ACTION.GET_QUERY_GROUP_TYPE_ERROR,
    error
  };
}

export function registerQuerySuccess(data) {
  return {
    type: REGISTER_QUERY_ACTION.REGISTER_QUERY_SUCCESS,
    data
  };
}

export function registerQueryFailure(error) {
  return {
    type: REGISTER_QUERY_ACTION.REGISTER_QUERY_ERROR,
    error
  };
}
