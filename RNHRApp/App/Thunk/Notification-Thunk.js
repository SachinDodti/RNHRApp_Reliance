import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import {
  getNotificationSuccess,
  notificationReset,
  updateNotificationStatus,
  deleteNotificationStatus,
  clearAllNotification,
  undoDeleteNotificationStatus,
  showNetworkError
} from "../Redux/Actions/NotificationAction";
import { errorOccured } from "../Redux/Actions/ApplicationStateAction";

export const getNotification = () => dispatch => {
  let response = null;
  invokeApi(dispatch, ApiEndpoints.communication.getAllNotification, {})
    .then(result => {
      response = result;
      dispatch(getNotificationSuccess(response.data));
    })
    .catch(error => {
      // console.log("Error occured while getting all notifications", error);
    });
};
export const updateNotification = notificationId => dispatch => {
  let response = null;
  const request = {
    notificationId,
    isRead: "Y"
  };
  invokeApi(dispatch, ApiEndpoints.communication.updateNotification, request)
    .then(result => {
      response = result;
      dispatch(updateNotificationStatus(notificationId));
    })
    .catch(error => {});
};
export const clearNotification = () => dispatch => {
  let response = null;
  invokeApi(dispatch, ApiEndpoints.communication.clearNotification, null)
    .then(result => {
      response = result;
      dispatch(clearAllNotification(response.data));
    })
    .catch(error => {});
};

export const undoDeleteNotificationAction = notificationId => dispatch => {
  let response = null;
  const request = {
    notificationId,
    commit: false
  };
  invokeApi(dispatch, ApiEndpoints.communication.deleteNotification, request)
    .then(result => {
      response = result;
      dispatch(undoDeleteNotificationStatus(notificationId));
    })
    .catch(error => {
      dispatch(showNetworkError());
    });
};

export const deleteNotificationAction = notificationId => dispatch => {
  let response = null;
  const request = {
    notificationId,
    commit: true
  };
  invokeApi(dispatch, ApiEndpoints.communication.deleteNotification, request)
    .then(result => {
      response = result;
      dispatch(deleteNotificationStatus(notificationId));
    })
    .catch(error => {
      // console.log(error);
      dispatch(showNetworkError());
    });
};
