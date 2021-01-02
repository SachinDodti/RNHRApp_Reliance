import {APP_STATE_ACTION} from '../Actions/Constants';
import ApplicationConstants from '../../Constants/ApplicationContants';

const AppStateReducer = (
  state = {
    loadingCount: 0,
    message: null,
    messageType: '',
    errorType: '',
    showMessage: false,
    title: '',
    otherInfo: '',
    blockUI: false,
  },
  action,
) => {
  switch (action.type) {
    // case APP_STATE_ACTION.NOTIFICATION_RECEIVED:
    //   return { ...state, notificationReceived: action.showNotification, notificationData: action.data };
    case APP_STATE_ACTION.START_LOADING:
      return {...state, loadingCount: state.loadingCount + 1, blockUI: true};
    case APP_STATE_ACTION.END_LOADING:
      return {...state, loadingCount: state.loadingCount - 1, blockUI: false};
    case APP_STATE_ACTION.APPLICATION_ERROR:
      return {
        ...state,
         message: action.error,
        messageType: ApplicationConstants.messageType.ERROR,
        errorType: action.isNetworkError ? 'N' : 'A',
        showMessage: true,
        title: action.title,
        otherInfo: action.otherInfo,
      };
    case APP_STATE_ACTION.APPLICATION_SUCCESS:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
        errorType: '',
        showMessage: true,
        title: action.title,
        otherInfo: action.otherInfo,
      };
    case APP_STATE_ACTION.RESET_MESSAGE:
      return {
        ...state,
        message: null,
        messageType: '',
        errorType: '',
        showMessage: false,
        title: '',
        otherInfo: '',
      };
    default:
      return {...state};
  }
};

export default AppStateReducer;
