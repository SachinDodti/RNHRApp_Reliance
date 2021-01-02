import { connect } from 'react-redux';
import { compose } from 'recompose';
import ApplicationHoc from '../../HOC/ApplicationHoc';
import getAuthenticate, { removeDeviceWarning, postLoginProceed } from '../../Thunk/Authentication-Thunk';
import syncStoreToState from '../../Thunk/LocalStorageThunk';
import { errorOccured, showMessage } from '../../Redux/Actions/ApplicationStateAction';
import Login from './LoginComponent';

function mapStateToProps(state) {
  return {
    authData: state.auth,
    localStore: state.localStore,
    // appState: state.appState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateUser:
      (authReq, localStore, isrememberLogin) => dispatch(
        getAuthenticate(authReq, localStore, isrememberLogin),
      ),
    syncStoreToState: () => dispatch(syncStoreToState()),
    removeDeviceWarning: () => dispatch(removeDeviceWarning()),
    postLoginProceed:
      (localStore, mobileNumber) => dispatch(postLoginProceed(localStore, mobileNumber)),
    showError: uiError => dispatch(errorOccured(uiError, false)),
    showMessage: (message, title, type) => dispatch(showMessage(message, title, type)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc,
)(Login);
