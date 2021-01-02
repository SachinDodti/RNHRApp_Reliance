import messaging from '@react-native-firebase/messaging';

function getDeviceToken() {
  return new Promise((resolve, reject) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          resolve(fcmToken);
        } else {
          reject();
        }
      });
  });
}

async function getFirebaseNotificationPermissionStatus() {
  return messaging().hasPermission();
}

async function getFirebaseToken() {
  return messaging().getToken();
}

export {
  getDeviceToken,
  getFirebaseNotificationPermissionStatus,
  getFirebaseToken,
};
