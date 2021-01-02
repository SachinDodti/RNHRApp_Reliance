import { connect } from "react-redux";
import { compose } from "recompose";
import ApplicationHoc from "../../HOC/ApplicationHoc";
import { birthdaySearch } from "../../Thunk/Birthday-Thunk";
import {
  anniversaryWish,
  resetWish,
  closeWishTemplateAnniversary,
  wishShowAnniversaryTemplate
} from "../../Thunk/Anniversary-Thunk";
import {
  errorOccured,
  showMessage
} from "../../Redux/Actions/ApplicationStateAction";
import Anniversary from "./AnniversaryComponent";

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    closeWishTemplateAnniversary: () =>
      dispatch(closeWishTemplateAnniversary()),
    showWishTemplateAnniversary: (wishReq, employee) =>
      dispatch(wishShowAnniversaryTemplate(wishReq, employee)),
    birthdaySear: authReq => dispatch(birthdaySearch(authReq)),
    anniversaryWish: authReq => dispatch(anniversaryWish(authReq)),
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
)(Anniversary);
