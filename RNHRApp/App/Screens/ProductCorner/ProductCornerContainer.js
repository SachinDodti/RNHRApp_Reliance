import { connect } from "react-redux";
import { compose } from "recompose";
import ProductCorner from "./ProductCornerComponent";
import ApplicationHoc from "../../HOC/ApplicationHoc";
import {
    errorOccured,
    showMessage
} from "../../Redux/Actions/ApplicationStateAction";

import { getProductDetails } from "../../Thunk/ProductCorner-Thunk";


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
            dispatch(showMessage(message, title, type)),
        getProductDetails: () => dispatch(getProductDetails()),
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    ApplicationHoc
)(ProductCorner);
