import { connect } from "react-redux";
import { compose } from "recompose";
import ApplicationHoc from "../../HOC/ApplicationHoc";

import ApplicationUpgrade from "./ApplicationUpgradeComponent";
import { errorOccured } from "../../Redux/Actions/ApplicationStateAction";

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    showError: (uiError, otherInfo) =>
      dispatch(errorOccured(uiError, false, otherInfo))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc
)(ApplicationUpgrade);
