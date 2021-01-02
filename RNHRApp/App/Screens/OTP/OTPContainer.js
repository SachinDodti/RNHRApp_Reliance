import {connect} from 'react-redux';
import {compose} from 'recompose';
import ApplicationHoc from '../../HOC/ApplicationHoc';
import OTP from './OTPComponent';
import {sendOTPValue, validateOTPValue} from '../../Thunk/OTP-Thunk';
import {
  errorOccured,
  showMessage,
} from '../../Redux/Actions/ApplicationStateAction';

function mapStateToProps(state) {
  return {
    authData: state.auth,
    appState: state.appState,
    localStore: state.localStore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendOTP: (otpReq) => dispatch(sendOTPValue(otpReq)),
    validateOTP: (otpReq, mobileNo) =>
      dispatch(validateOTPValue(otpReq, mobileNo)),
    resendOTP: (otpReq) => dispatch(sendOTPValue(otpReq, true)),
    showError: (uiError, otherInfo) =>
      dispatch(errorOccured(uiError, false, otherInfo)),
    showMessage: (message, title, type) =>
      dispatch(showMessage(message, title, type)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc,
)(OTP);
