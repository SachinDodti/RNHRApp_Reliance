import { NOTIFICATION_ACTION } from "./Constants";

export function notificationReceivedAction(
  showNotificationFlag,
  notificationData
) {
  return {
    type: NOTIFICATION_ACTION.NOTIFICATION_RECEIVED,
    data: notificationData,
    showNotification: showNotificationFlag
  };
}

export function getNotificationSuccess(data) {
  return {
    type: NOTIFICATION_ACTION.GET_NOTIFICATION_SUCCESS,
    data
  };
}

export function notificationReset() {
  return {
    type: NOTIFICATION_ACTION.NOTIFICATION_RESET
  };
}

export function updateNotificationStatus(notificationId) {
  return {
    type: NOTIFICATION_ACTION.UPDATE_NOTIFICATION_STATUS,
    notificationId
  };
}

export function showNetworkError() {
  return {
    type: NOTIFICATION_ACTION.SHOW_NETWORK_ERROR
  };
}

export function hideNetworkError() {
  return {
    type: NOTIFICATION_ACTION.HIDE_NETWORK_ERROR
  };
}

export function undoDeleteNotificationStatus(notificationId) {
  return {
    type: NOTIFICATION_ACTION.DELETE_NOTIFICATION_STATUS,
    notificationId,
    notificationStatus: true
  };
}

export function deleteNotificationStatus(notificationId) {
  return {
    type: NOTIFICATION_ACTION.DELETE_NOTIFICATION_STATUS,
    notificationId,
    notificationStatus: false
  };
}

export function clearAllNotification() {
  return {
    type: NOTIFICATION_ACTION.CLEAR_ALL_NOTIFICATION
  };
}
