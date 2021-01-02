import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  Alert,
} from 'react-native';

import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';

import messaging from '@react-native-firebase/messaging';
import styles from './DashboardStyles';
import AttendanceComponent from '../../Components/AttendanceComponent';
import DashboardItem from '../../Components/DashboardItem';
import HeaderComponent from '../../Components/HeaderComponent';
import NavBarComponent from '../../Components/NavBarComponent';
import UserProfile from '../../Components/UserProfile';
import {IMG_APP_BACKGROUND} from '../../Assets/images';
import appStyles from '../../appStyles';
import {STORAGE_KEY} from '../../Util/LocalStorage';
import ApplicationConfiguration from '../../Config/env';
import HrAppUtil from '../../Util/HrAppUtil';
import PushNotification from "react-native-push-notification"
const keyAppInstallation = STORAGE_KEY.APPLICATION.INSTALLATION_STATUS;
const keyAppConfig = STORAGE_KEY.APPLICATION.APPLICATION_CONFIG;
const keyLoggedInUser = STORAGE_KEY.USER.LOGGEDIN_USER;
const keyLastCheckInDate = STORAGE_KEY.CHECKINOUT.LASTCHECKINDATE;
const keyLastCheckOutDate = STORAGE_KEY.CHECKINOUT.LASTCHECKOUTDATE;
const keyCheckInTime = STORAGE_KEY.CHECKINOUT.CHECKINTIME;
const keyCheckOutTime = STORAGE_KEY.CHECKINOUT.CHECKOUTTIME;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationAlertShowing: false,
    };
    this.generateDashboardItems = this.generateDashboardItems.bind(this);
    // this.actionOnDismiss = this.actionOnDismiss.bind(this);
    // this.getSnackBarParams = this.getSnackBarParams.bind(this);
    // this.showDeleteSnackBar = this.showDeleteSnackBar.bind(this);
    // this.getSnackBarAction = this.getSnackBarAction.bind(this);
  }

  async componentDidMount() {
    // console.log("<<<<<< DID Mount : ", new Date().toString());
    const {updateLinkedApplicationConfiguration, localStore} = this.props;
    await updateLinkedApplicationConfiguration(localStore);
    await this.createNotificationListeners(); // add this line
    // HrAppUtil.getInitialScene();
  }

  shouldComponentUpdate(nextProps) {
    // console.log("<<<<<<< Shoup update : ", new Date().toString());
    const {updateAttendanceInfo, localStore, auth} = nextProps;

    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[keyLoggedInUser])
        ? HrAppUtil.parse(localStore[keyLoggedInUser])
        : null);

    if (!loggedInUser) {
      return false;
    }
    // const { updateAttendanceInfo, localStore } = this.props;
    // console.log(
    //   "Calling from dashboard --- Initial Scene",
    //   Actions.currentScene,
    // );
    HrAppUtil.getInitialScene();
    updateAttendanceInfo(localStore);

    return true;
  }

  _keyExtractor = (item) => item.length + Math.random().toString();


  managePushNotification = (data, notificationId, foreground) => {

   // console.table('backgroundData',data)
    const {
      setNotificationReceived,
      getAllNotifications,
      logActivity,
    } = this.props;
    setNotificationReceived(true, data);
    if (foreground) {
      getAllNotifications();
    } else {
      HrAppUtil.actionableNotificationNavigation(
        data.notificationType,
        logActivity,
        data.notifiedByName, //queryId
      );
    }
  };



  // showNotification = (data) =>{

  // PushNotification.localNotification({   


  // id: 0, 
  // title: data.title,
  // message: data.body,
  //  });
  // }


  
  async createNotificationListeners() {

    PushNotification.configure({
 
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      onNotification: function (notification) {     
       // console.log("NOTIFICATION:", notification);
       // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
     
        // process the action
      },
     
      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
        console.error(err.message, err);
      },
     
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: true,
      },
     
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
     
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    }
    
    );

    PushNotification.createChannel(
      {
        channelId: "Default", // (required)
        channelName: "Default", // (required)
        importance: 4, 
      },
    (created) => console.warn(`createChannel returned '${created}'`) 
    );

      this.messageListener = messaging().onMessage(async notification => {
       console.log("onMessage called with ", JSON.stringify(notification));

      //const {data, notificationId} = notification;
     // this.showNotification(notification.data);

       
       this.managePushNotification(notification.data,"",true);

     });


     //If your App is in background, you can listen for when a notification is clicked /
     this.notificationOpenedListener = messaging().onNotificationOpenedApp(notificationOpen => {
      
       const {data} = notificationOpen;
     //  console.log("notificationOpenedListener ", JSON.stringify(notificationOpen));
     
       this.managePushNotification(notificationOpen.data,"")
    });

    const notificationOpen =  messaging()
    .getInitialNotification()
    .then(notificationOpen => {

      console.warn('getInitialNotification',notificationOpen)
      if (notificationOpen) {
      
       // const {data} = notificationOpen.data;
       // const {appNotificationId} = data
  
      // notificationOpen.messageId
      this.managePushNotification(notificationOpen.data,notificationOpen.messageId)
      }
  
    });


  }


  openRespectiveScreen = () => {
    const {attendance} = this.props;
    attendance();
  };

  chekinCheckoutWarning = (message) => {
    // throw error to show error message
    const {showError} = this.props;
    showError(Error(message), 'Dashboard: check-in/check-out error');
  };

  getGroupAnnouncement(groupName) {
    const {announcements} = this.props;
    switch (groupName) {
      case 'Communications':
        return announcements.Campaign;
      // return announcements.Campuing;
      default:
        return null;
    }
  }

  checkIfApplicableForUser(appGroup, isCandidate) {
    if (isCandidate) {
      return appGroup.isForCandidate;
    }
    return !appGroup.isForCandidate;
  }

  generateDashboardItems(appConfig, loggedInUser) {
    // console.log(
    //   "<<<<<<< generate dashboard item...finally",
    //   new Date().toString()
    // );

    const {localStore, logActivity} = this.props;
    // console.log("localStore", localStore);

    // need to ask Arnab
    // if (
    //   !HrAppUtil.getBooleanValue(
    //     localStore[STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE],
    //   )
    // ) {
    //   return null;
    // }
    // till here
    const currentStatus = HrAppUtil.parse(
      HrAppUtil.isNullOrEmpty(localStore[keyAppInstallation])
        ? '{}'
        : localStore[keyAppInstallation],
    );
    if (appConfig) {
      const appGroups = HrAppUtil.parse(appConfig).applicationGroups;
      const userRoles =
        loggedInUser && loggedInUser.userRole ? [loggedInUser.userRole] : [];
      const dashBoardRowArray = [];
      let dashRow = [];
      let dashItemIndex = 0;
      let showAsDark = true;

      const isCandidate = !HrAppUtil.getBooleanValue(
        localStore[STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE],
      );
      // const skip = false;
      for (let i = 0; i < appGroups.length; i += 1) {
        const appGrp = appGroups[i];
        if (!this.checkIfApplicableForUser(appGrp, isCandidate)) {
          continue;
        }
        if (appGrp.showAsTile) {
          // check whether applicable ... since roles configured are not available showing all
          if (!HrAppUtil.checkIfApplicable(userRoles, appGrp.applicableFor)) {
            // continue;
            // do nothing
          } else {
            if (appGrp.showAsRow) {
              if (dashItemIndex > 0) {
                dashBoardRowArray.push(dashRow);
                dashItemIndex = 0;
                dashRow = [];
                if (
                  dashBoardRowArray[dashBoardRowArray.length - 1].length > 1
                ) {
                  showAsDark = !showAsDark;
                }
              }
            }

            showAsDark = !showAsDark;
            const dashItem = {
              key: appGrp.groupName,
              title: appGrp.groupTitle,
              icon: appGrp.groupIcon,
              darkTheme: showAsDark,
              // need to
              childrenApps: appGrp.applications,
              groupId: appGrp.groupName,
              isApp: false,
              showAsRow: appGrp.showAsRow,
              notInstalled: false,
              navigateTo: ApplicationConfiguration.scene.GROUP_DETAIL,
              groupAnnouncement: this.getGroupAnnouncement(appGrp.groupName),
              webActivity: logActivity,
            };
            dashRow.push(dashItem);
            dashItemIndex += 1;
            if (dashItemIndex % 2 === 0 || appGrp.showAsRow) {
              dashBoardRowArray.push(dashRow);
              dashItemIndex = 0;
              dashRow = [];
              if (dashBoardRowArray[dashBoardRowArray.length - 1].length > 1) {
                showAsDark = !showAsDark;
              }
            }
          }
        } else {
          for (let j = 0; j < appGrp.applications.length; j += 1) {
            const app = appGrp.applications[j];
            let skip = false;
            switch (Platform.OS) {
              case 'ios':
                if (app.isApp && HrAppUtil.isNullOrEmpty(app.ios.storeUrl)) {
                  skip = true;
                }
                break;
              case 'android':
                if (
                  app.isApp &&
                  HrAppUtil.isNullOrEmpty(app.android.storeUrl)
                ) {
                  skip = true;
                }
                break;
              default:
              // Do nothing
            }
            if (
              !HrAppUtil.checkIfApplicable(userRoles, app.applicableFor) ||
              skip
            ) {
              // continue;
              // do nothig
            } else {
              // check for which applicable for
              if (app.showAsRow) {
                if (dashItemIndex > 0) {
                  dashBoardRowArray.push(dashRow);
                  dashItemIndex = 0;
                  dashRow = [];
                  if (
                    dashBoardRowArray[dashBoardRowArray.length - 1].length > 1
                  ) {
                    showAsDark = !showAsDark;
                  }
                }
              }

              // update the application infomration
              showAsDark = !showAsDark;
              let appHasBeenInstalled = false;
              if (app.isApp) {
                if (!HrAppUtil.isEmptyObject(currentStatus)) {
                  if (
                    currentStatus[app.name] &&
                    currentStatus[app.name].currentStatus
                  ) {
                    appHasBeenInstalled = true;
                  }
                }
              } else {
                appHasBeenInstalled = true;
              }
              const dashItem = {
                key: app.name,
                appId: app.name,
                title: app.title,
                icon: app.icon,
                darkTheme: showAsDark,
                isApp: app.isApp,
                httpLink: app.link,
                iosUriScheme: app.ios.uriScheme,
                iosBundleId: app.ios.bundleId,
                iosStoreUrl: app.ios.storeUrl,
                androidPackageId: app.android.packageId,
                androidScheme: app.android.androidScheme,
                androidStoreUrl: app.android.storeUrl,
                showAsRow: app.showAsRow,
                notInstalled: !appHasBeenInstalled,
                groupAnnouncement: null,
                webActivity: logActivity,
                navigateTo: app.navigateTo, // Arnab : new prop for page navigation
              };
              if (isCandidate) {
                console.log('navigate to ', app.navigateTo);
              } else {
                console.log('navigate to ');
              }
              dashItemIndex += 1;
              dashRow.push(dashItem);
              if (dashItemIndex % 2 === 0 || app.showAsRow) {
                dashBoardRowArray.push(dashRow);
                dashItemIndex = 0;
                dashRow = [];
                if (
                  dashBoardRowArray[dashBoardRowArray.length - 1].length > 1
                ) {
                  showAsDark = !showAsDark;
                }
              }
            }
          }
        }
      }

      if (dashRow && dashRow.length > 0) {
        dashBoardRowArray.push(dashRow);
        dashRow = [];
      }
      if (!isCandidate) {
        showAsDark = !showAsDark;
        const bdayItem = {
          key: 'TodayBirthDay',
          title: 'Say Happy Birthday',
          darkTheme: showAsDark,
          isApp: false,
          showAsRow: false,
          navigateTo: ApplicationConfiguration.scene.BIRTHDAY,
          notInstalled: false,
          icon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAABmCAYAAAD23RLkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA3LTExVDE2OjU2OjMwKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA3LTExVDE2OjU2OjMwKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNy0xMVQxNjo1NjozMCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMGU0NWZmNi03OTJmLTQxNDgtODdhNy0yMmZiNDY4ZWVhYTAiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxOWQwOTBhNi01ZjBmLTUxNGQtODQ5ZS01MGU1Y2ExMDdkODEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0NzBkNGM3Ny00NDczLTk3NGItOTdiMi1kODljMGE2ODI1NjciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NzBkNGM3Ny00NDczLTk3NGItOTdiMi1kODljMGE2ODI1NjciIHN0RXZ0OndoZW49IjIwMTktMDctMTFUMTY6NTY6MzArMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjBlNDVmZjYtNzkyZi00MTQ4LTg3YTctMjJmYjQ2OGVlYWEwIiBzdEV2dDp3aGVuPSIyMDE5LTA3LTExVDE2OjU2OjMwKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNl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',
        };
        dashRow.push(bdayItem);

        showAsDark = !showAsDark;
        const anniversaryItem = {
          key: 'TodayAnniversary',
          title: 'Say Congrats',
          darkTheme: showAsDark,
          isApp: false,
          showAsRow: false,
          navigateTo: ApplicationConfiguration.scene.ANNIVERSARY,
          notInstalled: false,
          icon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABmCAYAAAAAuFU5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA3LTExVDE2OjU4OjE0KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA3LTExVDE2OjU4OjE0KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNy0xMVQxNjo1ODoxNCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMjZiMGFkYi0zOTcxLTAxNGQtYTY5ZC02NzlmNGNjOGY5NDgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1MDkzMDA3OC1hYjdlLWUwNDUtODY4Zi04YTgxMjY0NGRmMWMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2YWRlNzE4MS0yMWFhLWI3NGItYmVlYS1jYzQ4ZWYyMDA3ZjEiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2YWRlNzE4MS0yMWFhLWI3NGItYmVlYS1jYzQ4ZWYyMDA3ZjEiIHN0RXZ0OndoZW49IjIwMTktMDctMTFUMTY6NTg6MTQrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjI2YjBhZGItMzk3MS0wMTRkLWE2OWQtNjc5ZjRjYzhmOTQ4IiBzdEV2dDp3aGVuPSIyMDE5LTA3LTExVDE2OjU4OjE0KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNl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',
        };
        dashRow.push(anniversaryItem);
        showAsDark = !showAsDark;
      }

      dashBoardRowArray.push(dashRow);
      dashRow = [];

      const dashItem = {
        key: 'LocationDirectory',
        title: 'RNLIC Branch Locator',
        darkTheme: !showAsDark,
        isApp: false,
        showAsRow: true,
        navigateTo: ApplicationConfiguration.scene.LOCATION_DIRECTORY,
        notInstalled: false,
        icon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAACWCAYAAAD39ldZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTE3VDEyOjQwOjI0KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTE3VDEyOjQwOjI0KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0xN1QxMjo0MDoyNCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MmZmZGUzMi00Y2U3LWMwNGItODgwNy1jNTU4MjVmYWM2NjYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjNDAyMTNkNC1lN2M2LTAwNDEtYjg1Yy0yNzUzYTM4ZTZhMmIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZjAxZWU3Ny1iOGJhLTJjNDctYWQ3Yi1lOGI4MjliMzU0YzUiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphZjAxZWU3Ny1iOGJhLTJjNDctYWQ3Yi1lOGI4MjliMzU0YzUiIHN0RXZ0OndoZW49IjIwMTktMDYtMTdUMTI6NDA6MjQrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTJmZmRlMzItNGNlNy1jMDRiLTg4MDctYzU1ODI1ZmFjNjY2IiBzdEV2dDp3aGVuPSIyMDE5LTA2LTE3VDEyOjQwOjI0KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNl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',
      };

      dashBoardRowArray.push(dashRow);
      dashRow = [];
      dashRow.push(dashItem);
      dashBoardRowArray.push(dashRow);

      dashRow = [];

      //OD
      // const odItem = {
      //   key: 'ODRequest',
      //   title: 'OD REQUEST',
      //   darkTheme: showAsDark,
      //   isApp: false,
      //   showAsRow: true,
      //   navigateTo: ApplicationConfiguration.scene.OD_REQUEST,
      //   notInstalled: false,
      //   icon:
      //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAACWCAYAAAD39ldZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTE3VDEyOjQwOjI0KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTE3VDEyOjQwOjI0KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0xN1QxMjo0MDoyNCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MmZmZGUzMi00Y2U3LWMwNGItODgwNy1jNTU4MjVmYWM2NjYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjNDAyMTNkNC1lN2M2LTAwNDEtYjg1Yy0yNzUzYTM4ZTZhMmIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZjAxZWU3Ny1iOGJhLTJjNDctYWQ3Yi1lOGI4MjliMzU0YzUiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphZjAxZWU3Ny1iOGJhLTJjNDctYWQ3Yi1lOGI4MjliMzU0YzUiIHN0RXZ0OndoZW49IjIwMTktMDYtMTdUMTI6NDA6MjQrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTJmZmRlMzItNGNlNy1jMDRiLTg4MDctYzU1ODI1ZmFjNjY2IiBzdEV2dDp3aGVuPSIyMDE5LTA2LTE3VDEyOjQwOjI0KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNl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',
      // };

      // dashBoardRowArray.push(dashRow);
      // dashRow = [];
      // dashRow.push(odItem);
      // dashBoardRowArray.push(dashRow);

      dashRow = [];
      // console.log("dashBoardRowArray", dashBoardRowArray);
      // iterate over the
      const itemList = dashBoardRowArray.map((rowItem, index) => {
        const items = rowItem.map((_item) => (
          <DashboardItem
            key={_item.key}
            appId={_item.appId}
            title={_item.title}
            groupId={_item.groupId}
            icon={_item.icon}
            darkTheme={_item.darkTheme}
            childrenApps={_item.childrenApps}
            isApp={_item.isApp}
            httpLink={_item.httpLink}
            iosUriScheme={_item.iosUriScheme}
            iosBundleId={_item.iosBundleId}
            iosStoreUrl={_item.iosStoreUrl}
            androidPackageId={_item.androidPackageId}
            androidScheme={_item.androidScheme}
            androidStoreUrl={_item.androidStoreUrl}
            showAsRow={_item.showAsRow}
            notInstalled={_item.notInstalled}
            navigateTo={_item.navigateTo}
            announcement={_item.groupAnnouncement}
            webActivity={logActivity}
          />
        ));

        if (rowItem.length > 0) {
          return (
            <View key={`K${index}`} style={[styles.rowFlexDirection]}>
              {items}
            </View>
          );
        }
        return (
          <View key={`K${index}`} style={[]}>
            {items}
          </View>
        );
      });
      return <View>{itemList}</View>;
    }
    return null;
  }

  showNotificationAlert = (notificationData) => {
    const {notificationAlertShowing} = this.state;
    if (!notificationAlertShowing) {
      this.state.notificationAlertShowing = true;
      // this.setState({
      //   notificationAlertShowing: true
      // });
    }
  };

  render() {
    // console.log("<<<<<< Render : ", new Date().toString());
    // console.log("Props in dashboard", this.props);
    const {
      localStore,
      auth,
      doCheckIn,
      doCheckOut,
      announcements,
      appState,
      performAttendance,
      notification,
    } = this.props;
    // console.log('props in dasboard render', localStore);
    HrAppUtil.log(' Announcements : ', announcements);

    const configString = localStore[keyAppConfig];
    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[keyLoggedInUser])
        ? HrAppUtil.parse(localStore[keyLoggedInUser])
        : null);

    const sapCode = loggedInUser
      ? loggedInUser.sapCode || loggedInUser.panNo
      : 'DUMMY';
    const fullName = loggedInUser
      ? `${loggedInUser.firstName} ${loggedInUser.middleName || ''} ${
          loggedInUser.lastName
        }`
      : 'DUMMY';
    let checkInDate = localStore[keyLastCheckInDate];
    let checkOutDate = localStore[keyLastCheckOutDate];
    let checkInTime = HrAppUtil.getDate(
      localStore[keyCheckInTime],
      ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT,
    );
    let checkOutTime = HrAppUtil.getDate(
      localStore[keyCheckOutTime],
      ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT,
    );
    let isCheckInEnabled = true;
    let isCheckOutEnabled = false;
    const date = HrAppUtil.getDateString();
    // console.log('todays date', date);
    // console.log('checkindate', checkInDate, checkInTime);
    // console.log('checkoutdate', checkOutDate, checkOutTime);
    if (checkInDate === date) {
      // console.log('check in date & todays date are same');
      isCheckInEnabled = false;
    } else {
      checkInDate = '';
      checkOutDate = '';
      checkInTime = '';
      checkOutTime = '';
      isCheckInEnabled = true;
    }

    if (!isCheckInEnabled && checkOutDate !== date) {
      isCheckOutEnabled = true;
    }

    // check for banca
    // console.log("Logged in User ::::: ", loggedInUser);
    // if (
    //   loggedInUser.channel &&
    //   loggedInUser.channel
    //     .toLowerCase()
    //     .includes(ApplicationConfiguration.banca)
    // ) {
    //   isCheckOutEnabled = true;
    //   isCheckInEnabled = true;
    // }

    // if (checkInDate !== null && checkInDate !== 'undefined') {
    // console.log('got the check in date');
    checkInDate = !HrAppUtil.isNullOrEmpty(checkInDate)
      ? HrAppUtil.getDateString(
          checkInDate,
          ApplicationConfiguration.dateFormat.ATTENDANCE_FORMAT,
        )
      : checkInDate;
    // }
    // if (checkOutDate !== null && checkOutDate !== 'undefined') {
    checkOutDate = !HrAppUtil.isNullOrEmpty(checkOutDate)
      ? HrAppUtil.getDateString(
          checkOutDate,
          ApplicationConfiguration.dateFormat.ATTENDANCE_FORMAT,
        )
      : checkOutDate;
    // }
    checkInTime = !HrAppUtil.isNullOrEmpty(checkInTime)
      ? HrAppUtil.getDateString(
          checkInTime,
          ApplicationConfiguration.dateFormat.TIME_FORMAT,
        )
      : checkInTime;
    checkOutTime = !HrAppUtil.isNullOrEmpty(checkOutTime)
      ? HrAppUtil.getDateString(
          checkOutTime,
          ApplicationConfiguration.dateFormat.TIME_FORMAT,
        )
      : checkOutTime;
    // console.log(checkInDate);
    // console.log(checkOutDate);

    // this will be a two dimensional array
    // const dashboarItemCollection = null;

    // the below call should return two dimensional array
    // const dashboardItems = LinkedApplicationUtil.generateLinkedAppsFoUser([],
    // HrAppUtil.parse(localStore[keyAppConfig]));

    const attendanceCompProps = {
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      onCheckIn: doCheckIn,
      onCheckOut: doCheckOut,
      isCheckInEnabled,
      isCheckOutEnabled,
      onCheckinCheckoutNotAllowed: this.chekinCheckoutWarning,
      announcement: announcements.Attendance,
      performAttendance,
    };

    // console.log('Attendance Properties : ', attendanceCompProps);

    const isCandidate = !HrAppUtil.getBooleanValue(
      localStore[STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE],
    );

    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={styles.backgroundImageStyle}>
          <HeaderComponent disableRedirection />
          <NavBarComponent
            includeBack={false}
            includeVersion
            includeProfile
            includeNotification
            showNotificationBadge={notification.notificationReceived}
          />
          <UserProfile id={sapCode} name={fullName} />
          <View style={{flex: 1}}>
            <ScrollView style={styles.marginButtom} indicatorStyle="white">
              {notification.notificationReceived
                ? this.showNotificationAlert(notification.notificationData)
                : null}
              {isCandidate ? (
                <View style={[styles.candidateContainer]}>
                  <Text style={[styles.candidateText]}> </Text>
                </View>
              ) : null}
              {!isCandidate ? (
                <AttendanceComponent {...attendanceCompProps} />
              ) : null}
              {this.generateDashboardItems(configString, loggedInUser)}
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.shape({root: PropTypes.string}).isRequired,
  attendance: PropTypes.func.isRequired,
  doCheckIn: PropTypes.func.isRequired,
  doCheckOut: PropTypes.func.isRequired,
  updateLinkedApplicationConfiguration: PropTypes.func.isRequired,
  updateAttendanceInfo: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  logActivity: PropTypes.func.isRequired,
  localStore: PropTypes.shape({
    keyAppInstallation,
    keyAppConfig,
    keyLoggedInUser,
    keyLastCheckInDate,
    keyLastCheckOutDate,
    keyCheckInTime,
    keyCheckOutTime,
  }).isRequired,
};

export default Dashboard;
