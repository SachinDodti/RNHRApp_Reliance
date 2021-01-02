import { connect } from "react-redux";
import { compose } from "recompose";
import TrackQuerySearch from "./TrackQuerySearchComponent";
import ApplicationHoc from "../../../HOC/ApplicationHoc";
import { getTrackQuery, getQueryStatus } from "../../../Thunk/TrackQueryThunk";
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
        getTrackQuery: request => dispatch(getTrackQuery(request)),
        getQueryStatus: () => dispatch(getQueryStatus()),
        showError: (uiError, otherInfo) =>
            dispatch(errorOccured(uiError, false, otherInfo)),
        showMessage: (message, title, type) =>
            dispatch(showMessage(message, title, type))
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    ApplicationHoc
)(TrackQuerySearch);
