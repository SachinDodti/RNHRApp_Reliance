import {connect } from "react-redux";
import {compose } from "recompose";
import ODRequest from "./ODRequestComponent";
import {getODRuleEnginInfo , getODTypeInfo ,getODReasonInfo ,applyODRequestInfo} from "../../Thunk/ODRequestThunk";
import ApplicationHoc from "../../HOC/ApplicationHoc";

import {
    errorOccured,
    showMessage
}from "../../Redux/Actions/ApplicationStateAction"


function mapStateToProps(state){
    return{
        ...state
    };
}

function mapDispatchToProps(dispatch){
    return{
        getODRuleEngin: request =>dispatch(getODRuleEnginInfo(request)),
        getODType: request =>dispatch(getODTypeInfo(request)),
        getODReason: request =>dispatch(getODReasonInfo(request)),
        applyODRequest:request => dispatch(applyODRequestInfo(request)),
        showError: (uiError, otherInfo) =>
        dispatch(errorOccured(uiError, false, otherInfo)),
        showMessage: (message, title, type) =>
        dispatch(showMessage(message, title, type)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    ApplicationHoc
  )(ODRequest);
  