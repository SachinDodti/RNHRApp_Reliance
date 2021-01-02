import { APP_STATE_ACTION } from "./Constants";
import HrAppUtil from "../../Util/HrAppUtil";

// export function notificationReceivedAction(
//   showNotificationFlag,
//   notificationData,
// ) {
//   return {
//     type: APP_STATE_ACTION.NOTIFICATION_RECEIVED,
//     data: notificationData,
//     showNotification: showNotificationFlag,
//   };
// }

export function initiateLoding() {
  // console.log('incrase loading count');
  return {
    type: APP_STATE_ACTION.START_LOADING,
  };
}

export function endLoading() {
  // console.log('decrease loading count');
  return {
    type: APP_STATE_ACTION.END_LOADING,
  };
}

export function errorOccured(error, isNetworkError, otherInfo) {
  // console.log('update error');
  HrAppUtil.logError(error, isNetworkError);
  return {
    type: APP_STATE_ACTION.APPLICATION_ERROR,
    error,
    isNetworkError,
    otherInfo,
  };
}

export function showMessage(message, type, title) {
  // console.log('update error');
  return {
    type: APP_STATE_ACTION.APPLICATION_SUCCESS,
    message,
    title,
    messageType: type,
  };
}

export function reset() {
  // console.log('reset error');
  return {
    type: APP_STATE_ACTION.RESET_MESSAGE,
  };
}

export function showMessageWithoutHeader(message, type) {
  // console.log('update error');
  return {
    type: APP_STATE_ACTION.APPLICATION_SUCCESS,
    message,
    // title,
    messageType: type,
  };
}
