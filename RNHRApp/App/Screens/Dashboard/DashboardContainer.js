import { connect } from "react-redux";
import { compose } from "recompose";
import ApplicationHoc from "../../HOC/ApplicationHoc";
import {
  getAttendance,
  performCheckIn,
  performCheckOut,
  updateAttendanceInfo
} from "../../Thunk/Attendance-Thunk";
import syncStoreToState from "../../Thunk/LocalStorageThunk";
import Dashboard from "./DashboardComponent";

import updateLinkedApplicationConfiguration from "../../Thunk/LinkedApplication-Thunk";
import {
  errorOccured,
  notificationRead
} from "../../Redux/Actions/ApplicationStateAction";
import { getCurrentLocationThunk } from "../../Thunk/LocationThunk";

import { notificationReceivedAction } from "../../Redux/Actions/NotificationAction";
import { getNotification } from "../../Thunk/Notification-Thunk";
import logWebActivity from "../../Thunk/WebActivity-Thunk";
import { getForcedNotification } from '../../Thunk/ForcedNotificationThunk'

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllNotifications: () => dispatch(getNotification()),
    setNotificationReceived: (notificationReceived, notificationData) =>
      dispatch(
        notificationReceivedAction(notificationReceived, notificationData)
      ),
    clearUnReadNotificationFlag: notificationReceived =>
      dispatch(notificationRead(notificationReceived)),
    syncStoreToState: () => dispatch(syncStoreToState()),
    attendance: () => dispatch(getAttendance()),
    doCheckIn: checkInReq => dispatch(performCheckIn(checkInReq)),
    doCheckOut: checkOutReq => dispatch(performCheckOut(checkOutReq)),
    updateLinkedApplicationConfiguration: localStore =>
      dispatch(updateLinkedApplicationConfiguration(localStore)),
    updateAttendanceInfo: store => dispatch(updateAttendanceInfo(store)),
    showError: (uiError, otherInfo) =>
      dispatch(errorOccured(uiError, false, otherInfo)),
    logActivity: activityRequest => dispatch(logWebActivity(activityRequest)),
    performAttendance: callbackFunction =>
      dispatch(getCurrentLocationThunk(callbackFunction)),
    getForcedNotificationOnPushNotification: callbackFunction =>
      dispatch(getForcedNotification(callbackFunction))
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc
)(Dashboard);
