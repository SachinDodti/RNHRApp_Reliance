import {Actions} from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import {Platform, Linking} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {getAppstoreAppVersion} from 'react-native-appstore-version-checker';
// import { App } from "react-native-firebase";
// import { retry } from "@redux-saga/core/effects";
// import { Item } from "native-base";
//import firebase from 'react-native-firebase';

import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import ApplicationConfiguration, {
  COMMUNICATION_APPS,
  ApplicationGroup,
} from '../Config/env';
import {LocalStorageUtil, STORAGE_KEY} from './LocalStorage';
import {errorOccured} from '../Redux/Actions/ApplicationStateAction';

// import AlertPopover from "../Components/AlertPop/AlertPopoverComponent";

const moment = require('moment');
const CryptoJS = require('crypto-js');
// Subscribe
let unsubscribe = null;
const secretKey = 'yuybrtRhHoPN9xHz';

export default class HrAppUtil {
  static encrypt(plainText) {
    const result = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    return result;
  }

  static openInBrowserEnabled(appName) {
    switch (appName) {
      case 'financeChatBot':
        return false;
      case 'iBelong':
        return false;
      default:
        return true;
    }
  }

  static log() {
    if (ApplicationConfiguration.enableLog) {
      console.log(`Called From ${this.log.caller.name} : `, arguments);
    }
  }

  static logError() {
    if (ApplicationConfiguration.enableLog) {
      console.log(`Error Log `, arguments);
    }
  }

  static async checkForAutoLogout() {
    const loggedInUser = await LocalStorageUtil.get(
      STORAGE_KEY.USER.LOGGEDIN_USER,
    );
    const lastLoggedIn = await LocalStorageUtil.get(
      STORAGE_KEY.USER.LAST_LOGGED_IN,
    );
    const verifiedMobileNumber = await LocalStorageUtil.get(
      STORAGE_KEY.USER.MOBILE_NUMBER_VERIFIED,
    );
    if (
      this.isNullOrEmpty(loggedInUser) ||
      lastLoggedIn !== this.getDateString() ||
      !this.getBooleanValue(verifiedMobileNumber)
    ) {
      // // console.log('No logged in user found ');
      // initialScene = ApplicationConfiguration.scene.LOGIN;
      // //console.log("Will be redirected to initial scene : ", initialScene);
      // this.redirectToScene(initialScene, true);
      await this.doLogout();
    }
    return false;
  }

  static async doLogout() {
    // clear user detail
    const multiStore = [];
    multiStore.push([STORAGE_KEY.USER.AUTH_TOKEN, '']);
    multiStore.push([STORAGE_KEY.USER.LAST_LOGGED_IN, '']);
    multiStore.push([STORAGE_KEY.USER.TOPICS_SUBSCRIBED, '']);
    multiStore.push([STORAGE_KEY.USER.LOGGEDIN_USER, '']);
    await LocalStorageUtil.storeMultiple(multiStore);
    Actions[ApplicationConfiguration.scene.LOGIN]();
  }

  static isNullOrEmpty(param) {
    return param == null || undefined === param || param === '';
  }

  static maskMobileNo(mobileNo) {
    const firstPartMaskedNo = mobileNo.substr(0, 2);
    const secondPartMaskedNo = mobileNo.substr(8, 10);
    return `${firstPartMaskedNo}XXXXXX${secondPartMaskedNo}`;
  }

  static getDefaultApplications = (groupId) => {
    switch (groupId) {
      case ApplicationGroup.COMMUNICATION:
        return COMMUNICATION_APPS;
      default:
        return null;
    }
  };

  static isEmptyObject(obj) {
    if (!obj) {
      return true;
    }
    if (obj === '') {
      return true;
    }
    if (JSON.stringify(obj) === JSON.stringify({})) {
      return true;
    }

    return false;
  }

  // if null has been passed will return thr new date
  static getDate(dt, format) {
    if (this.isNullOrEmpty(dt)) {
      return null;
    }
    return moment(dt, format).isValid() ? moment(dt, format) : null;
  }


  static getDateFormat(dt, format, noDefaultValue) {
    // let dateObj = dt;
    // let separator = sp;
    // if (!dateObj) {
    //   dateObj = new Date();
    // }
    // if (!separator) {
    //   separator = '-';
    // }
    // return dateObj.getFullYear()
    //   + separator
    //   + HrAppUtil.getTwoDigitedString(dateObj.getMonth() + 1)
    //   + separator
    //   + HrAppUtil.getTwoDigitedString(dateObj.getDate());

    let dayObj = null;
    if (noDefaultValue) {
      dayObj = dt ? moment(dt) : null;

    } else {
      dayObj = dt ? moment(dt) : moment(new Date());
    }

    return dayObj
      ? dayObj.format(
          this.isNullOrEmpty(format)
            ? ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
            : format,
        )
      : '';
  }




  static getDateString(dt, format, noDefaultValue) {
    // let dateObj = dt;
    // let separator = sp;
    // if (!dateObj) {
    //   dateObj = new Date();
    // }
    // if (!separator) {
    //   separator = '-';
    // }
    // return dateObj.getFullYear()
    //   + separator
    //   + HrAppUtil.getTwoDigitedString(dateObj.getMonth() + 1)
    //   + separator
    //   + HrAppUtil.getTwoDigitedString(dateObj.getDate());

    let dayObj = null;
    if (noDefaultValue) {
      dayObj = dt ? moment(dt) : null;
    } else {
      dayObj = dt ? moment(dt) : moment(new Date());
    }

    return dayObj
      ? dayObj.format(
          this.isNullOrEmpty(format)
            ? ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
            : format,
        )
      : '';
  }

  static getTwoDigitedString(number) {
    if (!number) {
      return '00';
    }
    return `${number < 10 ? `0${number}` : number}`;
  }

  static getBooleanValue(str) {
    
    return str && str.toLowerCase() === 'true';
  }

  static getAttendanceDateFormat(dt, sp) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    // console.log('getAttendanceDateFormat', dt);
    if (dt !== null && dt !== 'undefined' && dt !== '') {
      const dateObj = new Date(dt);
      if (!dateObj) {
        return '';
      }
      let separator = sp;
      if (!separator) {
        separator = ' - ';
      }
      const month = dateObj.getMonth();
      return (
        HrAppUtil.getTwoDigitedString(dateObj.getDate()) +
        separator +
        monthNames[month]
      );
    }
    return '';
  }

  static convertCheckInOutTime(time) {
    // console.log('convertCheckInOutTime', time);
    if (time !== null && time !== 'undefined' && time !== '') {
      let zone = '';
      const sp = ':';
      let strHour = time.substr(0, 2);
      const strMin = time.substr(3, 2);
      const strSec = time.substr(6, 2);

      if (parseInt(strHour, 10) < 12) {
        zone = ' a.m';
      } else {
        zone = ' p.m';
        strHour = `0${parseInt(strHour, 10) - 12}`;
      }
      return strHour + sp + strMin + sp + strSec + zone;
    }
    return '';
  }

  static getFullName(firstName, middleName, lastName, inUpperCase) {
    const fullName =
      firstName +
      (middleName ? ` ${middleName}` : '') +
      (lastName ? ` ${lastName}` : '');
    return inUpperCase ? fullName.toUpperCase : fullName;
  }

  static checkIfApplicable(userRoleArray, applicableArray) {
    // console.log('user roles : ', userRoleArray);
    // console.log('applicableArray roles : ', applicableArray);

    if (applicableArray.includes('*')) {
      // console.log('user roles : ', userRoleArray);
      // console.log('applicableArray roles : ', applicableArray);
      // console.log('Applicabe - true');
      return true;
    }
    if (userRoleArray && userRoleArray.length > 0) {
      for (let i = 0; i < userRoleArray.length; i += 1) {
        if (applicableArray.includes(userRoleArray[i])) {
          // console.log('user roles : ', userRoleArray);
          // console.log('applicableArray roles : ', applicableArray);
          // console.log('Applicabe - true');
          return true;
        }
      }
    }
    // console.log('user roles : ', userRoleArray);
    // console.log('applicableArray roles : ', applicableArray);
    // console.log('Applicabe - false');
    return false;
  }

  static async getInitialScene(lastScene, forced) {
    // console.log('Trying to find out which one will be the inital scene ....');
    // console.log('Last Scene was : ', lastScene);

    const {currentScene} = Actions;
    // if (this.skipDeviceRegistrationCheck()) {
    //   return null;
    // }

    // check for application update
    const versionInfo = await HrAppUtil.applicationUpdateAvailable();
    // console.log(":::::  Version : ", versionInfo);
    if (
      versionInfo &&
      versionInfo.updateAvailable &&
      versionInfo.latestVersion
    ) {
      this.redirectToScene(ApplicationConfiguration.scene.AUTO_UPGRADE, true);
      return null;
    }

    if (
      !currentScene ||
      // currentScene === ApplicationConfiguration.scene.LOGIN ||
      currentScene === ApplicationConfiguration.scene.OTP ||
      currentScene === ApplicationConfiguration.scene.RESET_PASSWORD ||
      currentScene === ApplicationConfiguration.scene.AUTO_UPGRADE
    ) {
      // console.log("initial scene change not required");
      return null;
    }

    const localStore = await LocalStorageUtil.getAll();
    // console.log("Local store object : ", localStore);
    let initialScene = lastScene;
    const isCandidate = !this.getBooleanValue(
      localStore[STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE],
    );
    const bypassEnablement =
      isCandidate && ApplicationConfiguration.bypassCandidateEnablement;

    const allAppsInstalled =
      this.getBooleanValue(
        localStore[STORAGE_KEY.APPLICATION.ALL_MANDATORY_APPS_INSTALLED],
      ) || bypassEnablement;
    
      const allLearningCompleted =    
      ApplicationConfiguration.bypassLearning ||
      this.getBooleanValue(
        localStore[
          STORAGE_KEY.MANDATORY_LEARNING.ALL_MANDATORY_LEARNING_COMPLETED
        ],
      ) ||
      bypassEnablement;

    const allForcedNotificationCompleted =
      ApplicationConfiguration.bypassForcedNotification ||
      this.getBooleanValue(
        localStore[STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_COMPLETED],
      ) ||
      bypassEnablement;

    // console.log(' >>>> All Apps installed : ', allAppsInstalled);
    // console.log(' >>>> All Mandatory Learning completed: ', allLearningCompleted);
    // Check 1 : If re-login is required
    if (
      this.isNullOrEmpty(localStore[STORAGE_KEY.USER.LOGGEDIN_USER]) ||
      localStore[STORAGE_KEY.USER.LAST_LOGGED_IN] !== this.getDateString() ||
      !this.getBooleanValue(localStore[STORAGE_KEY.USER.MOBILE_NUMBER_VERIFIED])
    ) {
      // // console.log('No logged in user found ');
      // initialScene = ApplicationConfiguration.scene.LOGIN;
      // //console.log("Will be redirected to initial scene : ", initialScene);
      // this.redirectToScene(initialScene, true);
      await this.doLogout();
      return null;
    }
    // console.log(
    //   "allAppsInstalled",
    //   allAppsInstalled,
    //   "allLearningCompleted",
    //   allLearningCompleted,
    // );
    if (!allAppsInstalled) {
      // check 2 : Check for mandatory application installation status   
      initialScene = ApplicationConfiguration.scene.MANDATORY_APPS;
      // console.log("Will be redirected to initial scene : ", initialScene);
      this.redirectToScene(initialScene, forced);
      return null;
    }
    if (!allLearningCompleted) {
      // check 3 : Check for mandatory learning installation status
      initialScene = ApplicationConfiguration.scene.MANDATORY_LEARNING;
      // console.log("Will be redirected to initial scene : ", initialScene);
      this.redirectToScene(initialScene, forced);
      return null;
    }
    if (!allForcedNotificationCompleted) {
      // check 4 : Check for mandatory forced notification
      initialScene = ApplicationConfiguration.scene.FORCED_NOTIFICATION;
      //console.log("Will be redirected to initial scene : ", initialScene);
      this.redirectToScene(initialScene, true);
      return null;
    }

    initialScene = ApplicationConfiguration.scene.DASHBOARD;
    // this.redirectToScene(initialScene);
    // return null;

    // console.log(" >>>>>>>>>>>>>> Calculated Initial Scene : ", initialScene);
    return initialScene;
  }

  static redirectToScene(sceneName, forced) {
    if (sceneName && Actions.currentScene !== sceneName) {
      // console.log("***Current Scene***", Actions.currentScene);
      // console.log("#@#@Scene Name#@#@", sceneName);
      if (
        // !forced ||
        Actions.currentScene ===
          ApplicationConfiguration.scene.MANDATORY_APPS ||
        Actions.currentScene ===
          ApplicationConfiguration.scene.MANDATORY_LEARNING ||
        Actions.currentScene ===
          ApplicationConfiguration.scene.FORCED_NOTIFICATION
      ) {
        if (!forced) {
          return;
        }
        // return;
      }
      // console.log('############ Redirect to ', sceneName);
      Actions[sceneName]();
   //Actions["odRequest"]();
    }
  }

  static getItem(propName, value, array) {
    if (array && array.length > 0) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][propName] === value) {
          return array[i];
        }
      }
    }
    return null;
  }

  static isRunningOnSimulator() {
    return DeviceInfo.isEmulator();
  }

  static async subscribeNetworkStatusUpdate() {
    if (!unsubscribe) {
      unsubscribe = NetInfo.addEventListener((state) => {
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        const multiStore = [];
        multiStore.push([STORAGE_KEY.NETWORK.TYPE, state.type]);
        multiStore.push([
          STORAGE_KEY.NETWORK.CONNECTED,
          `${state.isConnected}`,
        ]);
        LocalStorageUtil.storeMultiple(multiStore);
      });
      // console.log('Network state change has been subscribed: ');
      return true;
    }
    // console.log('Network state change has already been subscribed: ');
    return false;
  }

  static unsubscribeNetworkStatusUpdate() {
    if (unsubscribe) {
      unsubscribe();
      return true;
    }
    // console.log('Network Status Change Not Subscribed');
    return false;
  }

  // // please update when fcm integration done
  static async getFcmToken(dispatch) {
    const networkInfo = await NetInfo.fetch();
    let fcmToken = await LocalStorageUtil.get(STORAGE_KEY.DEVICE.FCM_TOKEN);
    // console.log(`FCM Token=${JSON.stringify(fcmToken)}`);
    if (!fcmToken) {
      this.log('Network Information : ', networkInfo);
      if (!networkInfo.isInternetReachable) {
        dispatch(
          errorOccured(
            'It seems there is no internet connectivity is available. Please check your internet connectivity.',
            true,
            'FCM Token Generation',
          ),
        );
      }
      fcmToken = await messaging().getToken();
      console.log(`Token Obtained=${JSON.stringify(fcmToken)}`);
      if (fcmToken) {
        await LocalStorageUtil.store(STORAGE_KEY.DEVICE.FCM_TOKEN, fcmToken);
        analytics().setUserProperty('DeviceToken', fcmToken);
      }
    } else {
      analytics().setUserProperty('DeviceToken', fcmToken);
    }
    return fcmToken;
  }

  static isHTTPSLink(url) {
    if (!this.isNullOrEmpty(url) && url.indexOf('https://') === 0) {
      return true;
    }
    return false;
  }

  static objectEquals(obj1, obj2) {
    const obj1Str = obj1 ? JSON.stringify(obj1) : '';
    const obj2Str = obj2 ? JSON.stringify(obj2) : '';
    return obj1Str === obj2Str;
  }

  static async clearUserInformation() {
    const multiStore = [];
    // clear user detail
    multiStore.push([STORAGE_KEY.USER.AUTH_TOKEN, '']);
    multiStore.push([STORAGE_KEY.USER.LAST_LOGGED_IN, '']);
    multiStore.push([STORAGE_KEY.USER.TOPICS_SUBSCRIBED, '']);
    multiStore.push([STORAGE_KEY.USER.LOGGEDIN_USER, '']);
    await LocalStorageUtil.storeMultiple(multiStore);
    await this.clearAttendanceInformation();
    await this.clearEnablementInformation();
    await this.clearMobileVerificationInformation();
    await this.clearWishInformation();
    return true;
  }

  static async clearWishInformation() {
    const multiStore = [];
    // clear user detail
    multiStore.push([STORAGE_KEY.USER.BIRTHDAY_WISHED, '']);
    multiStore.push([STORAGE_KEY.USER.ANNIVERSARY_WISHED, '']);
    return true;
  }

  static async clearMobileVerificationInformation() {
    const multiStore = [];
    // clear user detail
    multiStore.push([STORAGE_KEY.USER.MOBILE_NUMBER_VERIFIED, 'false']);
    multiStore.push([STORAGE_KEY.USER.VERIFIED_MOBILE_NUMBER, '']);

    await LocalStorageUtil.storeMultiple(multiStore);
    return true;
  }

  static async clearAttendanceInformation() {
    const multiStore = [];

    // clear chekc-in/check-out detail
    multiStore.push([STORAGE_KEY.CHECKINOUT.LASTCHECKINDATE, '']);
    multiStore.push([STORAGE_KEY.CHECKINOUT.LASTCHECKOUTDATE, '']);
    multiStore.push([STORAGE_KEY.CHECKINOUT.CHECKINTIME, '']);
    multiStore.push([STORAGE_KEY.CHECKINOUT.CHECKOUTTIME, '']);

    await LocalStorageUtil.storeMultiple(multiStore);
    return true;
  }

  static async clearEnablementInformation() {
    const multiStore = [];

    // enablement
    multiStore.push([
      STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_DATA,
      '',
    ]);
    multiStore.push([
      STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_COMPLETED,
      'false',
    ]);
    multiStore.push([STORAGE_KEY.MANDATORY_LEARNING.ALL_MANDATORY_DATA, '']);
    multiStore.push([
      STORAGE_KEY.MANDATORY_LEARNING.ALL_MANDATORY_LEARNING_COMPLETED,
      'false',
    ]);
    multiStore.push([
      STORAGE_KEY.APPLICATION.ALL_MANDATORY_APPS_INSTALLED,
      'false',
    ]);
    multiStore.push([
      STORAGE_KEY.APPLICATION.INSTALLATION_STATUS_SYNCED,
      'false',
    ]);

    await LocalStorageUtil.storeMultiple(multiStore);
    return true;
  }

  static skipDeviceRegistrationCheck() {
    switch (Actions.currentScene) {
      case ApplicationConfiguration.scene.LOGIN:
      case ApplicationConfiguration.scene.OTP:
      case ApplicationConfiguration.scene.RESET_PASSWORD:
        return true;
      default:
        return false;
    }
  }

  static parse(str) {
    try {
      if (this.isNullOrEmpty(str)) {
        return null;
      }
      return JSON.parse(str);
    } catch (ex) {
      throw new Error(`JSON parse error : ${str}`);
    }
  }

  static stringify(obj) {
    if (!this.isEmptyObject(obj)) {
      return JSON.stringify(obj);
    }
    return null;
  }

  static isValidSapCode(sapCode) {
    const numericOnly = /^\d+$/;
    if (this.isNullOrEmpty(sapCode)) {
      return false;
    }
    const isNumeric = numericOnly.test(sapCode);
    if (!isNumeric) {
      return false;
    }
    if (sapCode.length !== 8) {
      return false;
    }
    return true;
  }

  static isValidPassword(passwordText) {
    if (this.isNullOrEmpty(passwordText)) {
      return false;
    }

    if (passwordText.length < 8) {
      return false;
    }
    return true;
  }

  static getApplicationVersionWithOs() {
    const str = Platform.OS;
    return `${str
      .charAt(0)
      .toUpperCase()} - Ver: ${DeviceInfo.getVersion().substring(0, 5)}`;
  }

  static clone(obj) {
    if (obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    return null;
  }

  static isValidJSON(jsonString) {
    if (
      /^[\],:{}\s]*$/.test(
        jsonString
          .replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            ']',
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, ''),
      )
    ) {
      return true;
    }
    return false;
  }

  static async applicationUpdateAvailable() {
    if (ApplicationConfiguration.bypassForceUpgrade) {
      return null;
    }
    const bundleId = await DeviceInfo.getBundleId();
    // console.log("Bundle ID : ", bundleId);
    const notAvailable = false;
    const currentVersion = DeviceInfo.getVersion();
    let latestVersion = null;
    const result = {
      installedVersion: currentVersion,
    };
    try {
      switch (Platform.OS) {
        case 'android':
          latestVersion = await getAppstoreAppVersion(bundleId); // put any apps packageId here
          break;
        case 'ios':
          /* Get latest iOS version from localStore */
          const localStore = await LocalStorageUtil.getAll();
          const appConfiguration =
            localStore[STORAGE_KEY.APPLICATION.APPLICATION_CONFIG];
          latestVersion = this.isValidJSON(appConfiguration)
            ? JSON.parse(appConfiguration)
            : '';
          const versionExists = Object.prototype.hasOwnProperty.call(
            latestVersion,
            'applicationVersion',
          );
          if (versionExists) {
            latestVersion = latestVersion.applicationVersion;
          }
          break;
        default:
          throw new Error(`Invalid Platform : ${Platform.OS}`);
      }
    } catch (error) {
      // console.log("Error occured during version check : ", error);
      // Alert.alert('Warning', 'Application not available in Store');
      // latestVersion = "dummy";
    }
    result.latestVersion = latestVersion;
    // result.updateAvailable = latestVersion && latestVersion !== currentVersion;
    result.updateAvailable = this.compareApplicationVersions(
      currentVersion,
      latestVersion,
    );
    // console.log("Latest Version : ", result);
    return result;
  }

  static hasAlreadyWished(wishedArray, sapCode) {
    if (!this.isNullOrEmpty(wishedArray) && wishedArray.length > 0) {
      return wishedArray.indexOf(sapCode) > -1;
    }
    return false;
  }

  static async updateWishedInformation(sapCode, isBirthday) {
    let wishedArrayStr = null;
    if (isBirthday) {
      wishedArrayStr = await LocalStorageUtil.get(
        STORAGE_KEY.USER.BIRTHDAY_WISHED,
      );
    } else {
      wishedArrayStr = await LocalStorageUtil.get(
        STORAGE_KEY.USER.ANNIVERSARY_WISHED,
      );
    }
    const wishedArray = this.parse(wishedArrayStr)
      ? this.parse(wishedArrayStr)
      : [];
    wishedArray.push(sapCode);
    // console.log("bdayUtil", wishedArray);
    if (isBirthday) {
      return LocalStorageUtil.storeObject(
        STORAGE_KEY.USER.BIRTHDAY_WISHED,
        wishedArray,
      );
    }
    return LocalStorageUtil.storeObject(
      STORAGE_KEY.USER.ANNIVERSARY_WISHED,
      wishedArray,
    );
  }

  static convertVersionToNumber(version) {
    if (version) {
      const numberVersion = version.replace(/\./g, '');
      return parseInt(numberVersion, 10);
    }
    return '';
  }

  static openWebLinks(httpLink, title, appId, logWebActivity) {
    if (logWebActivity) {
      logWebActivity({
        channel: 'mobile',
        details: 'eKonnect',
        type: 'browse',
        subType: title,
        activityDetails: `${title} opened by user`,
        comments: '',
      });
    }

    if (HrAppUtil.isHTTPSLink(httpLink)) {
      let sceneProp = {};
      sceneProp = {
        ...sceneProp,
        title,
        link: httpLink,
        appId,
        openInBrowserEnabled: HrAppUtil.openInBrowserEnabled(appId),
      };
      // console.log("Generated Props for web view : ", sceneProp);
      if (Platform.OS === 'ios' || !HrAppUtil.openInBrowserEnabled(appId)) {
        Actions[ApplicationConfiguration.scene.WEB_VIEWER](sceneProp);
      } else {
        Linking.openURL(httpLink);
      }
    } else {
      Linking.openURL(httpLink);
    }
  }
  static openAdvantageApp = (title) => {
    //if (item.name === "rewardsRecognition") {
    //let scheme = Platform.OS === 'ios' ? "advantage://open" : "advantageclub://open";
    let scheme = 'advantageclub://open';
    let storeUrl =
      Platform.OS === 'ios'
        ? 'https://secure.workadvantage.in/relianceada'
        : 'https://onelink.to/shaeym';

    Linking.canOpenURL(scheme).then((supported) => {
      if (supported) {
        Linking.openURL(scheme).catch(() => {
          Alert.alert('Error', `Failed to launch application ${title}`);
        });
      } else {
        Linking.openURL(storeUrl).catch(() => {
          Alert.alert(
            'Error',
            `Failed to launch application store for : ${title}`,
          );
        });
      }
    });
  };

  //static actionableNotificationNavigation(notificationType, logActivity) {
  static actionableNotificationNavigation(
    notificationType,
    logActivity,
    notificationByName,
  ) {
    if (notificationType === 'Birthday Manager Notify')
      Actions[ApplicationConfiguration.scene.BIRTHDAY]();
    if (notificationType === 'Anniversary Manager Notify')
      Actions[ApplicationConfiguration.scene.ANNIVERSARY]();
    if (notificationType === 'NoticeBoard')
      Actions[ApplicationConfiguration.scene.NOTICE_BOARD]();
    if (notificationType === 'iBelong') {
      let sceneProp = {};
      sceneProp = {
        ...sceneProp,
        httpLink: 'https://saservices.reliancenipponlife.com/newsletter/',
        title: 'iBelong',
        appId: 'iBelong',
      };
      HrAppUtil.openWebLinks(
        sceneProp.httpLink,
        sceneProp.title,
        sceneProp.appId,
        logActivity,
      );
    }
    if (notificationType === 'EmployeeHelpDesk') {
      let sceneViewQueryProps = {};
      sceneViewQueryProps = {
        ...sceneViewQueryProps,
        queryId: notificationByName,
      };
      Actions[ApplicationConfiguration.scene.VIEW_QUERY_STATUS]({
        sceneViewQueryProps,
      });
    }
    if (notificationType === 'R&R') {
      HrAppUtil.openAdvantageApp('R&R');
    }
  }

  static compareApplicationVersions(currentVersion, updatedVersion) {
    const currentVersionNumber = this.convertVersionToNumber(currentVersion);
    const updatedVersionNumber = this.convertVersionToNumber(updatedVersion);
    const currentVersionIsNaN = Number.isNaN(currentVersionNumber);
    const updatedVersionIsNaN = Number.isNaN(updatedVersionNumber);
    if (
      !currentVersionIsNaN &&
      !updatedVersionIsNaN &&
      currentVersionNumber !== updatedVersionNumber
    ) {
      return true;
    }
    return false;
  }
}
