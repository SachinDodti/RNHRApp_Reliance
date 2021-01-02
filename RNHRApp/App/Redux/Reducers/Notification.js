import _ from "lodash";
import { NOTIFICATION_ACTION } from "../Actions/Constants";

const notificationReducer = (
  state = {
    deletedNotificationId: 0,
    notifications: [],
    unReadCount: 0,
    notificationReceived: false,
    showErrorSnack: false,
    showUndoSnack: false
  },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_ACTION.HIDE_NETWORK_ERROR:
      return {
        ...state,
        showErrorSnack: false
      };
    case NOTIFICATION_ACTION.SHOW_NETWORK_ERROR:
      return {
        ...state,
        showErrorSnack: true
      };
    case NOTIFICATION_ACTION.NOTIFICATION_RECEIVED:
      return {
        ...state,
        deletedNotificationId: 0,
        notificationReceived: action.showNotification,
        notificationData: action.data
      };
    case NOTIFICATION_ACTION.GET_NOTIFICATION_SUCCESS:
      const unReadTotal = _.filter(
        action.data.allNotificationList,
        notification => notification.notificationRead === "N"
      );

      const showActiveNotifications = action.data.allNotificationList.filter(
        notificationItem => {
          return notificationItem.isActive === true;
        }
      );

      return {
        ...state,
        deletedNotificationId: 0,
        notifications: action.data ? showActiveNotifications : [],
        unReadCount: unReadTotal.length > 0 ? unReadTotal.length : 0,
        notificationReceived: unReadTotal.length > 0,
        showUndoSnack: false
      };
    case NOTIFICATION_ACTION.NOTIFICATION_RESET:
      return {
        ...state,
        notifications: []
      };

    case NOTIFICATION_ACTION.DELETE_NOTIFICATION_STATUS:
      const updatedNotificationData = state.notifications.map(
        notificationItem => {
          if (notificationItem.appNotificationId !== action.notificationId) {
            return notificationItem;
          }
          return {
            ...notificationItem,
            isActive: action.notificationStatus
          };
        }
      );

      const unReadTotalAfterDelete = _.filter(
        updatedNotificationData,
        notification => notification.updatedNotificationData === "N"
      );
      return {
        ...state,
        showUndoSnack: !action.notificationStatus,
        deletedNotificationId: action.notificationId,
        notifications: updatedNotificationData,
        unReadCount:
          unReadTotalAfterDelete.length > 0 ? unReadTotalAfterDelete.length : 0
      };
    case NOTIFICATION_ACTION.UPDATE_NOTIFICATION_STATUS:
      const updatedNotifications = state.notifications.map(notificationItem => {
        if (notificationItem.appNotificationId !== action.notificationId) {
          return notificationItem;
        }
        return {
          showUndoSnack: false,
          ...notificationItem,
          notificationRead: "Y"
        };
      });
      const unReadTotalAfterUpdate = _.filter(
        updatedNotifications,
        notification => notification.notificationRead === "N"
      );
      return {
        ...state,
        deletedNotificationId: 0,
        notifications: updatedNotifications,
        unReadCount:
          unReadTotalAfterUpdate.length > 0 ? unReadTotalAfterUpdate.length : 0,
        notificationReceived: unReadTotalAfterUpdate.length > 0,
        showUndoSnack: false
      };
    case NOTIFICATION_ACTION.CLEAR_ALL_NOTIFICATION:
      return {
        ...state,
        notifications: []
      };
    default:
      return { ...state };
  }
};

export default notificationReducer;
