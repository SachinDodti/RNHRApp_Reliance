import { connect } from "react-redux";
import { compose } from "recompose";
import ApplicationHoc from "../../HOC/ApplicationHoc";
import {
  birthdaySearch,
  birthdayWish,
  resetWish,
  wishShow,
  closeWishTemplate
} from "../../Thunk/Birthday-Thunk";
import {
  errorOccured,
  showMessage
} from "../../Redux/Actions/ApplicationStateAction";

import Birthday from "./BirthdayComponent";

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    closeWishTemplate: () => dispatch(closeWishTemplate()),
    wishShowTemplate: (wishReq, employee) =>
      dispatch(wishShow(wishReq, employee)),
    birthdaySear: authReq => dispatch(birthdaySearch(authReq)),
    birthdayWish: authReq => dispatch(birthdayWish(authReq)),
    resetWish: () => dispatch(resetWish()),
    showError: (uiError, otherInfo) =>
      dispatch(errorOccured(uiError, false, otherInfo)),
    showMessage: (message, title, type) =>
      dispatch(showMessage(message, title, type))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc
)(Birthday);
