import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = {
  DEVICE: {
    IMEI: 'rnlic.hrapp.device.imei',
    UID: 'rnlic.hrapp.device.uid',
    FCM_TOKEN: 'rnlic.hrapp.device.fcmToken',
  },
  APPLICATION: {
    APPLICATION_CONFIG_VERSION: 'rnlic.hrapp.appConfigVersion',
    APPLICATION_CONFIG: 'rnlic.hrapp.appConfig',
    MANDATORY_APPS: 'rnlic.hrapp.mandatoryApps',
    ALL_MANDATORY_APPS_INSTALLED: 'rnlic.hrapp.allMandatoryAppsInstalled',
    OPTIONAL_APPS: 'rnlic.hrapp.optionalApps',
    INSTALLATION_STATUS: 'rnlic.hrapp.installationStatus',
    INSTALLATION_STATUS_SYNCED: 'rnlic.hrapp.installationStatusSynced',
    INVALID_APPS: 'rnlic.hrapp.invalidApps',
    HELP_MESSAGE_UPDATED_ON: 'rnlic.hrapp.help.updatedOn',
    HELP_MESSAGE: 'rnlic.hrapp.help.message',
    HELP_CONTACT_NUMBER: 'rnlic.hrapp.help.contactNumber',
    HELP_CONTACT_EMAIL: 'rnlic.hrapp.help.contactEmail',
    NOTIFICATIONS: 'rnlic.hrapp.notifications',
  },
  MANDATORY_LEARNING: {
    ALL_MANDATORY_LEARNING_COMPLETED:
      'rnlic.hrapp.allMandatoryLearningCompleted',
    ALL_MANDATORY_DATA: 'rnlic.hrapp.allMandatoryLearningData',
  },
  USER: {
    LAST_LOGGED_IN: 'rnlic.hrapp.user.lastLoggedIn',
    MOBILE_NUMBER_VERIFIED: 'rnlic.hrapp.user.mobileVerified',
    VERIFIED_MOBILE_NUMBER: 'rnlic.hrapp.user.mobileNo',
    TOPICS_SUBSCRIBED: 'rnlic.hrapp.user.subscription',
    LOGGEDIN_USER: 'rnlic.hrapp.user.loggedin',
    AUTH_TOKEN: 'rnlic.hrapp.user.authToken',
    BIRTHDAY_WISHED: 'rnlic.hrapp.user.birthdayWishedArray',
    ANNIVERSARY_WISHED: 'rnlic.hrapp.user.anniversaryWishedArray',
  },
  CHECKINOUT: {
    LASTCHECKINDATE: 'rnlic.hrapp.checkInOut.lastCheckInDate',
    LASTCHECKOUTDATE: 'rnlic.hrapp.checkInOut.lastCheckOutDate',
    CHECKINTIME: 'rnlic.hrapp.checkInOut.checkInTime',
    CHECKOUTTIME: 'rnlic.hrapp.checkInOut.checkOutTime',
  },
  USER_PREFERENCE: {
    REMEMBER_ME: 'rnlic.hrapp.user.pref.remember',
    SAPCODE: 'rnlic.hrapp.user.pref.sapCode',
    PANNUMBER: 'rnlic.hrapp.user.pref.panNumber',
    IS_EMPLOYEE: 'rnlic.hrapp.user.pref.isEmployee',
  },
  NETWORK: {
    TYPE: 'rnlic.hrapp.network.type',
    CONNECTED: 'rnlic.hrapp.network.connected',
  },
  FORCED_NOTIFICATION: {
    //FN- FORCED NOTIFICATION
    ALL_MANDATORY_FN_COMPLETED:
      'rnlic.hrapp.allMandatoryForcedNotificationCompleted',
    ALL_MANDATORY_FN_DATA: 'rnlic.hrapp.allMandatoryForcedNotificationData',
  },
};

const getPropertyArray = (jsonObject) => {
  let properties = [];
  const jsonKeys = Object.keys(jsonObject);
  jsonKeys.forEach((key) => {
    const propertyCheck = Object.prototype.hasOwnProperty.call(jsonObject, key);
    if (propertyCheck) {
      // check if the value is String
      const type = typeof jsonObject[key];
      switch (type.toLowerCase()) {
        case 'string':
          properties.push(jsonObject[key]);
          break;
        case 'object':
          properties = properties.concat(getPropertyArray(jsonObject[key]));
          break;
        default:
      }
    }
  });

  return properties;
};
export class LocalStorageUtil {
  static async store(storageKey, data) {
    if (data == null || typeof data !== 'string') {
      throw new Error('Only not null string value can be stored');
    }
    return AsyncStorage.setItem(storageKey, data);
  }

  static async storeMultiple(twoDimensionalStringArray) {
    return AsyncStorage.multiSet(twoDimensionalStringArray);
  }

  static async storeObject(storageKey, jsonObj) {
    if (jsonObj != null) {
      return LocalStorageUtil.store(storageKey, JSON.stringify(jsonObj));
    }
    throw new Error('Can not store null value');
  }

  static async get(storageKey) {
    return AsyncStorage.getItem(storageKey);
  }

  static async getObject(storageKey) {
    const storedValue = await AsyncStorage.getItem(storageKey);
    return JSON.parse(storedValue);
  }

  static async getAll() {
    const keys = getPropertyArray(STORAGE_KEY);
    const multiValue = await AsyncStorage.multiGet(keys);
    const valueObj = {};
    for (let i = 0; i < multiValue.length; i += 1) {
      const mapKey = multiValue[i][0];
      const mapValue = multiValue[i][1];
      valueObj[mapKey] = mapValue;
    }
    return valueObj;
  }

  static async clear(storageKeys) {
    return AsyncStorage.multiRemove(storageKeys);
  }

  static async clearAll() {
    return AsyncStorage.multiRemove(getPropertyArray(STORAGE_KEY));
  }
  static async getKeysData(keys) {
    const stores = await AsyncStorage.multiGet(keys);
    return stores.map(([key, value]) => ({[key]: value}));
  }
}
