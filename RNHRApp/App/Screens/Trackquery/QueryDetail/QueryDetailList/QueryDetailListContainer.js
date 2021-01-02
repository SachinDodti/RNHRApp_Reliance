import { connect } from "react-redux";
import { compose } from "recompose";
import QueryDetailList from "./QueryDetailListComponent";
import ApplicationHoc from "../../../../HOC/ApplicationHoc";

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
)(QueryDetailList);
