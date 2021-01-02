import { connect } from "react-redux";
import { compose } from "recompose";
import EmployeeHelpDesk from "./EmployeeHelpDeskComponent";
import ApplicationHoc from "../../HOC/ApplicationHoc";
import {
  getRegisterSapInfo,
  getRegisterQueryGroupType,
  submitRegisterQuery,
  clearRegisterQuerySuccessMsg
} from "../../Thunk/RegisterQueryThunk";
import {
  errorOccured,
  showMessage
} from "../../Redux/Actions/ApplicationStateAction";

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRegisterSapData: request => dispatch(getRegisterSapInfo(request)),
    //getRegQueryGroupTypeMaster: () => dispatch(getRegisterQueryGroupType()),
    employeeRegisterQuery: regQueryRequest =>
    dispatch(submitRegisterQuery(regQueryRequest)),
      showError: (uiError, otherInfo) =>
      dispatch(errorOccured(uiError, false, otherInfo)),
    showMessage: (message, title, type) =>
      dispatch(showMessage(message, title, type)),
    clearRegisterQuerySuccessMsg: () => dispatch(clearRegisterQuerySuccessMsg())
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc
)(EmployeeHelpDesk);
