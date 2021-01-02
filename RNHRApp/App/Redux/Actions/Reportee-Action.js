import { REPORTEE_ACTION } from "./Constants";

export function getSelfDetailsSuccess(data, request) {
  return {
    type: REPORTEE_ACTION.GET_SELF_DETAILS_SUCCESS,
    data,
    request,
  };
}

export function getSelfDetailsError(error) {
  return {
    type: REPORTEE_ACTION.GET_SELF_DETAILS_ERROR,
    error,
  };
}

export function resetReporteeList() {
  return {
    type: REPORTEE_ACTION.RESET_REPORTEE,
  };
}
