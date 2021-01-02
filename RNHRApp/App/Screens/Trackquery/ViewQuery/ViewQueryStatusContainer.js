import { connect } from "react-redux";
import { compose } from "recompose";
import ViewQueryStatus from "./ViewQueryStatusComponent";
import ApplicationHoc from "../../../HOC/ApplicationHoc";
import { viewQueryStatus, submitFeedBack } from "../../../Thunk/TrackQueryThunk";

function mapStateToProps(state) {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        viewQueryStatus: (request) => dispatch(viewQueryStatus(request)),
        submitTrackQueryFeedback: request => dispatch(submitFeedBack(request)),
        showError: (uiError, otherInfo) =>
            dispatch(errorOccured(uiError, false, otherInfo)),
        showMessage: (message, title, type) =>
            dispatch(showMessage(message, title, type))
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    ApplicationHoc
)(ViewQueryStatus);
