import _ from 'lodash';
import { LocalStorageUtil, STORAGE_KEY } from './LocalStorage';

export default class NotificationUtil {
  static async addNotification(notificationData, notificationId, callBack) {
    let timeStamp = new Date();
    timeStamp = timeStamp.getTime();
    let notificationArray = [];
    console.log('!@#Notification that should save', notificationData);
    const notificationModified = notificationData;
    notificationModified.notificationId = notificationId;
    notificationModified.timeStamp = timeStamp;
    // get existing notifications saved
    let existingNotifications = await LocalStorageUtil.getObject(STORAGE_KEY.APPLICATION.NOTIFICATIONS);
    // if existing notifications exists
    if (existingNotifications !== null) {
      console.log('!@#Existing notifications', existingNotifications);
      existingNotifications.push(notificationModified);
      existingNotifications = _.sortBy(existingNotifications, 'timeStamp').reverse();
      console.log('!@#Added notification', existingNotifications);
      await LocalStorageUtil.store(STORAGE_KEY.APPLICATION.NOTIFICATIONS, JSON.stringify(existingNotifications));
    } else {
      notificationArray.push(notificationModified);
      notificationArray = _.sortBy(notificationArray, 'timeStamp').reverse();
      console.log('!@#Notification modified data', notificationModified);
      await LocalStorageUtil.store(STORAGE_KEY.APPLICATION.NOTIFICATIONS, JSON.stringify(notificationArray));
    }
    await callBack();
    // await LocalStorageUtil.clear(STORAGE_KEY.APPLICATION.NOTIFICATIONS);
  }

  static async getAllNotifications() {
    let allNotifications = null;
    allNotifications = await LocalStorageUtil.get(STORAGE_KEY.APPLICATION.NOTIFICATIONS);
    if (allNotifications !== null && allNotifications.length > 0) {
      allNotifications = JSON.parse(allNotifications);
    }
    return allNotifications;
  }

  static showNotification(notificationId) {}
}
