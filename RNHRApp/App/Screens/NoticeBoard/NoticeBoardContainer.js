import { connect } from "react-redux";
import { compose } from "recompose";
import ApplicationHoc from "../../HOC/ApplicationHoc";

import NoticeBoard from "./NoticeBoardComponent";

import { showMessage } from "../../Redux/Actions/ApplicationStateAction";

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    showMessage: (message, title, type) =>
      dispatch(showMessage(message, title, type)),
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  ApplicationHoc,
)(NoticeBoard);
