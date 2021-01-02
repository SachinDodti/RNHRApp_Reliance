import { REPORTEE_ACTION } from "../Actions/Constants";
import HrAppUtil from "../../Util/HrAppUtil";

const ReporteeRuducer = (state = { reportee: [], supervisor: [] }, action) => {
  switch (action.type) {
  case REPORTEE_ACTION.RESET_REPORTEE:
    return {
      ...state,
      reportee: [],
      error: null,
    };
  case REPORTEE_ACTION.GET_SELF_DETAILS_SUCCESS:
    if (!action.request.isHierarchyUp) {
      if (HrAppUtil.isNullOrEmpty(action.request.managerSapCode)) {
        state.supervisor.length = 0;
      } else {
        state.supervisor.push(action.request);
      }
    }

    return {
      ...state,
      reportee: action.data ? action.data : [],
      error: null,
    };
  case REPORTEE_ACTION.GET_SELF_DETAILS_ERROR:
    return {
      ...state,
      error: action.error.errorMessage,
      reportee: [],
    };
  default:
    return { ...state };
  }
};

export default ReporteeRuducer;
