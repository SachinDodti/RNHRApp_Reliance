import { connect } from "react-redux";
import { compose } from "recompose";
import HrHelpDesk from "./HelpDeskComponent";
import ApplicationHoc from "../../../HOC/ApplicationHoc";
import {
  errorOccured,
  showMessage
} from "../../../Redux/Actions/ApplicationStateAction";

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showError: (uiError, otherInfo) =>
      dispatch(errorOccured(uiError, false, otherInfo)),
    showMessage: (message, title, type) =>
      dispatch(showMessage(message, title, type))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc
)(HrHelpDesk);
