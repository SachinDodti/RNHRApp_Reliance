import { connect } from "react-redux";
import { compose } from "recompose";
import ApplicationHoc from "../../HOC/ApplicationHoc";
import {
  getSapCodeSearchSuccess,
  getChangePasswordSuccess
} from "../../Thunk/ResetPassword-Thunk";
import {
  errorOccured,
  showMessage
} from "../../Redux/Actions/ApplicationStateAction";

import ResetPassword from "./ResetPasswordComponent";

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    sapCodeSearch: authReq => dispatch(getSapCodeSearchSuccess(authReq)),
    submitOtpPassDetails: authReq =>
      dispatch(getChangePasswordSuccess(authReq)),
    showError: (uiError, otherInfo) =>
      dispatch(errorOccured(uiError, false, otherInfo)),
    showMessage: (message, title, type) =>
      dispatch(showMessage(message, title, type))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc
)(ResetPassword);
