import { connect } from "react-redux";

import NavBarComponent from "./NavBarComponent";

import {
  errorOccured,
  showMessage
} from "../../Redux/Actions/ApplicationStateAction";

import {
  getNotification,
  updateNotification,
  deleteNotificationAction,
  undoDeleteNotificationAction
} from "../../Thunk/Notification-Thunk";
import { hideNetworkError } from "../../Redux/Actions/NotificationAction";
import logWebActivity from "../../Thunk/WebActivity-Thunk";

function mapStateToProps(state) {
  console.log("State in navbar component is ", state);
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    updateNotification: notificationId =>
      dispatch(updateNotification(notificationId)),
    deleteNotification: notificationId =>
      dispatch(deleteNotificationAction(notificationId)),
    getAllNotifications: () => dispatch(getNotification()),
    undoDelete: notificationId =>
      dispatch(undoDeleteNotificationAction(notificationId)),
    logActivity: activityRequest => dispatch(logWebActivity(activityRequest)),
    hideErrorSnack: () => dispatch(hideNetworkError())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
