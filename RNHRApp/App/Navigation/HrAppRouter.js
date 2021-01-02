import React, { Component } from "react";
import { AppState } from "react-native";
import PropTypes from "prop-types";
import { Router, Scene, Actions } from "react-native-router-flux";

// import firebase from "react-native-firebase";
import Login from "../Screens/Login";
import OTP from "../Screens/OTP";
import Dashboard from "../Screens/Dashboard";
import GroupTileDetail from "../Screens/GroupTileDetail";
import Attendance from "../Screens/Attendance";
import Birthday from "../Screens/Birthday";
import Anniversary from "../Screens/Anniversary";
import Reportee from "../Screens/Reportee";
import LocationDirectory from "../Screens/LocationDirectory";
import NoticeBoard from "../Screens/NoticeBoard";
import ResetPassword from "../Screens/ResetPassword";
import MandatoryLearning from "../Screens/MandatoryLearnings";
import ApplicationUpgrade from "../Screens/ApplicationUpgrade";
import WebViewer from "../Screens/WebViewer";
import I18N_CONSTANTS from "../I18n/LanguageConstants";
import { getText } from "../I18n/Lang";
import { STORAGE_KEY } from '../Util/LocalStorage';
import ApplicationConfiguration from "../Config/env";
import HrAppUtil from "../Util/HrAppUtil";
import MandatoryAppEnablement from "../Screens/MandatoryAppEnablement";
// import NotificationUtil from "../Util/NotificationUtil";
// import ApplicationConstants from "../Constants/ApplicationContants";

import EmployeeHelpDesk from "../Screens/EmployeeHelpDesk";
import HrHelpDesk from "../Screens/EmployeeHelpDesk/HelpDesk";
import TrackQuerySearch from "../Screens/Trackquery/TrackQuerySearch";

import ODRequest from "../Screens/ODRequest";
import QueryDetailList from "../Screens/Trackquery/QueryDetail/QueryDetailList";
import ViewQueryStatus from "../Screens/Trackquery/ViewQuery";
import ProductCorner from "../Screens/ProductCorner";
import ProductCornerDetails from "../Screens/ProductCorner/ProductCornerDetail";
import MandatoryForcedNotifications from "../Screens/ForcedNotification"
import SplashScreen from "react-native-splash-screen";
class HrAppRouter extends Component {
  constructor(props) {
    HrAppUtil.log("<<----------- ROUTER : CONSTRUCTOR ----------->>>");

    super(props);
    this.state = {
      // navigationDecided: false,
      appState: AppState.currentState
    };
  }

  async componentDidMount() {
    HrAppUtil.log("this.props", Actions.currentScene);
    const {
      syncStoreToState,
      enablementCheck,
      localStore,
      updateHelpInformation,
      updateLinkedApplicationConfiguration,
      getAllNotifications
    } = this.props;
    // await LocalStorageUtil.clearAll();
    HrAppUtil.subscribeNetworkStatusUpdate();
    await HrAppUtil.checkForAutoLogout();
    AppState.addEventListener("change", this.handleAppStateChange);

    await syncStoreToState();
    HrAppUtil.log(">>>>> Local store synced");
    await updateLinkedApplicationConfiguration(localStore);
    await enablementCheck();

    HrAppUtil.log("Enablement checked");
    updateHelpInformation(localStore);
    HrAppUtil.log(
      "Calling from router --- Initial Scene",
      Actions.currentScene
    );

    const initialPage = await HrAppUtil.getInitialScene(Actions.currentScene);
    const { currentScene } = Actions;
    // if (this.skipDeviceRegistrationCheck()) {
    //   return null;
    // }
    HrAppUtil.log("HrAppRouter.js componentDidMount initialPage", initialPage);
    if (
      !currentScene ||
      // currentScene === ApplicationConfiguration.scene.LOGIN ||
      currentScene === ApplicationConfiguration.scene.OTP ||
      currentScene === ApplicationConfiguration.scene.RESET_PASSWORD
    ) {
      HrAppUtil.log("::: Router - initial scene change not required");
    } else if (initialPage === ApplicationConfiguration.scene.DASHBOARD) {
      const allForcedNotificationCompleted = HrAppUtil.getBooleanValue(
        localStore[STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_COMPLETED
        ]
      );
      const isEmployee = HrAppUtil.getBooleanValue(
        localStore[STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE]
      );
      if (isEmployee && !allForcedNotificationCompleted) {
        
        Actions[ApplicationConfiguration.scene.FORCED_NOTIFICATION]();
      } else {
       
        Actions[ApplicationConfiguration.scene.DASHBOARD]();
        //   await this.createNotificationListeners(); // add this line
      }
      getAllNotifications();
    }
    SplashScreen.hide();
  }

  shouldComponentUpdate() {
    HrAppUtil.log(
      "<<----------- ROUTER : SHOULD COMPONENT UPDATE ----------- >>>",
      this.props,
      Actions.currentScene
    );

    HrAppUtil.log(
      "Local store check form props >>>>>>>>>>>>>>>>>>> : ",
      this.props
    );
    return false; // should return true by default
  }

  componentWillUnmount() {
    HrAppUtil.log(
      "<<----------- ROUTER : COMPONENT WILL UNMOUNT ----------- >>>",
      this.props,
      Actions.currentScene
    );
    // HrAppUtil.unsubscribeNetworkStatusUpdate();
    AppState.removeEventListener("change", this.handleAppStateChange);
    HrAppUtil.log("<< App state listener removed >>");
  }

  // managePushNotification = (data, notificationId) => {
  //   const { syncStoreToState, setNotificationReceived } = this.props;
  //   NotificationUtil.addNotification(data, notificationId, syncStoreToState);
  //   setNotificationReceived(true, data);
  //   // HrAppUtil.printDebugLogs(`title=${data.title} body=${data.body} notificationId=${notificationId}`);
  // };

  handleAppStateChange = nextAppState => {
    HrAppUtil.log(
      "<<----------- ROUTER : APP STATE CHANGE ----------- >>>",
      this.props,
      Actions.currentScene,
      nextAppState
    );
    const { appState } = this.state;
    const {
      localStore,
      enablementCheck,
      updateHelpInformation,
      checkDeviceRegistration,
      getAllNotifications
    } = this.props;
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      HrAppUtil.log(
        "App has come to the foreground >> check application status"
      );
      // HrAppUtil.log("App state changed to active... chcek enablement");
      if (!HrAppUtil.skipDeviceRegistrationCheck()) {
        HrAppUtil.checkForAutoLogout().then(() => {
          checkDeviceRegistration();
          enablementCheck();
          getAllNotifications();
        });
      }
      updateHelpInformation(localStore);
    }
    this.setState({ appState: nextAppState });
  };

  //   timeOutInterval = () => {
  //     const { showMessage } = this.props;
  //     setTimeout(function() {
  //       showMessage(
  //         getText(I18N_CONSTANTS.OTP.OTP_WARNING_SERVICE),
  //         ApplicationConstants.messageType.INFO,
  //         "OTP Warning",
  //       );
  //     }, 120000);
  //   };

  render() {
    const {
      todayBirthday,
      getStateCityMaster,
      getNoticeBoard,
      todayAnniversary,
      enablementCheck,
      checkDeviceRegistration,
      resetChangePassword,
      announcements,
      getTrackQuery,
      getRegQueryGroupTypeMaster,
      getForcedNotification
    } = this.props;
    return (
      <Router>
        <Scene key="root" hideNavBar on={() => HrAppUtil.log("ROOT SCENE")}>
          <Scene
            key={ApplicationConfiguration.scene.LOGIN}
            component={Login}
            title={getText(I18N_CONSTANTS.ROUTER.LOGIN)}
            type="reset"
          />
          <Scene
            key={ApplicationConfiguration.scene.OTP}
            component={OTP}
            title={getText(I18N_CONSTANTS.ROUTER.OTP)}
          // onEnter={this.timeOutInterval}
          // onExit={() => {
          // 	if (this.timeOutInterval) {
          // 		clearTimeout(this.timeOutInterval);
          // 		this.timeOutInterval = 0;
          // 	}
          // }}
          />
          <Scene
            key={ApplicationConfiguration.scene.MANDATORY_APPS}
            component={MandatoryAppEnablement}
            title={getText(I18N_CONSTANTS.ROUTER.MANDATORY_APPS)}
            onEnter={() => {
              enablementCheck();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.DASHBOARD}
            component={Dashboard}
            title={getText(I18N_CONSTANTS.ROUTER.DASHBOARD)}
            type="replace"
            onEnter={() => {
              enablementCheck();
              announcements();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.ATTENDANCE}
            component={Attendance}
            title={getText(I18N_CONSTANTS.ROUTER.ATTENDANCE)}
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
           <Scene
            key={ApplicationConfiguration.scene.GROUP_DETAIL}
            component={GroupTileDetail}
            title={getText(I18N_CONSTANTS.ROUTER.GROUP_DETAIL)}
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.WEB_VIEWER}
            component={WebViewer}
            title={getText(I18N_CONSTANTS.ROUTER.WEB_VIEWER)}
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />

          <Scene
            key={ApplicationConfiguration.scene.LOCATION_DIRECTORY}
            component={LocationDirectory}
            title={getText(I18N_CONSTANTS.ROUTER.LOCATION_DIRECTORY)}
            onEnter={() => {
              checkDeviceRegistration();
              getStateCityMaster();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.REPORTEE}
            component={Reportee}
            title={getText(I18N_CONSTANTS.ROUTER.REPORTEE)}
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
            <Scene
            key={ApplicationConfiguration.scene.MANDATORY_LEARNING}
            component={MandatoryLearning}
            title={getText(I18N_CONSTANTS.ROUTER.MANDATORY_LEARNING)}
            onEnter={() => {
              checkDeviceRegistration();
              enablementCheck();
            }}
          />

<Scene
            key={ApplicationConfiguration.scene.BIRTHDAY}
            component={Birthday}
            title={getText(I18N_CONSTANTS.ROUTER.BIRTHDAY)}
            onEnter={() => {
              checkDeviceRegistration();
              todayBirthday();
            }}
          />

<Scene
            key={ApplicationConfiguration.scene.ANNIVERSARY}
            component={Anniversary}
            title={getText(I18N_CONSTANTS.ROUTER.ANNIVERSARY)}
            onEnter={() => {
              checkDeviceRegistration();
              todayAnniversary();
            }}
          />

<Scene
            key={ApplicationConfiguration.scene.NOTICE_BOARD}
            component={NoticeBoard}
            title={getText(I18N_CONSTANTS.ROUTER.NOTICE_BOARD)}
            onEnter={() => {
              checkDeviceRegistration();
              getNoticeBoard();
            }}
          />
           <Scene
            key={ApplicationConfiguration.scene.RESET_PASSWORD}
            component={ResetPassword}
            title={getText(I18N_CONSTANTS.ROUTER.RESET_PASSWORD)}
            onEnter={() => resetChangePassword()}
          />

<Scene
            key={ApplicationConfiguration.scene.AUTO_UPGRADE}
            component={ApplicationUpgrade}
            title={getText(I18N_CONSTANTS.ROUTER.AUTO_UPGRADE)}
            type="reset"
          />


<Scene
            key={ApplicationConfiguration.scene.HR_HELP_DESK}
            component={HrHelpDesk}
            title="HR HelpDesk"
            onEnter={() => {
              checkDeviceRegistration();
              getRegQueryGroupTypeMaster();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.REGISTER_QUERY}
            component={EmployeeHelpDesk}
            title="Register Query"
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.TRACK_QUERY}
            component={TrackQuerySearch}
            title="Track Query"
            onEnter={() => {
              checkDeviceRegistration();
              getTrackQuery();
            }}

          />

<Scene
            key={ApplicationConfiguration.scene.QUERY_DETAIL_LIST}
            component={QueryDetailList}
            title="Query Detail"
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.VIEW_QUERY_STATUS}
            component={ViewQueryStatus}
            title="View Query Status"
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
          <Scene
            key={ApplicationConfiguration.scene.PRODUCT_CORNER}
            component={ProductCorner}
            title="Product Corner"
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
           <Scene
            key={ApplicationConfiguration.scene.PRODUCT_CORNER_DETAILS}
            component={ProductCornerDetails}
            title="Product Corner Details"
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />
             <Scene
            key={ApplicationConfiguration.scene.FORCED_NOTIFICATION}
            component={MandatoryForcedNotifications}
            title={getText(I18N_CONSTANTS.ROUTER.FORCED_NOTIFICATION)}
            onEnter={() => {
              checkDeviceRegistration();
              enablementCheck()
            }}
            
          />

        <Scene
            key={ApplicationConfiguration.scene.OD_REQUEST}
            component={ODRequest}
            title="OD Request"
            onEnter={() => {
              checkDeviceRegistration();
            }}
          />

          
        </Scene>
      </Router>
    );
  }
}

HrAppRouter.propTypes = {
  syncStoreToState: PropTypes.func.isRequired,
  enablementCheck: PropTypes.func.isRequired,
  localStore: PropTypes.objectOf(PropTypes.string).isRequired,
  updateHelpInformation: PropTypes.func.isRequired,
  todayBirthday: PropTypes.func.isRequired,
  todayAnniversary: PropTypes.func.isRequired,
  getStateCityMaster: PropTypes.func.isRequired,
  getNoticeBoard: PropTypes.func.isRequired,
  updateLinkedApplicationConfiguration: PropTypes.func.isRequired,
  checkDeviceRegistration: PropTypes.func.isRequired,
  announcements: PropTypes.func.isRequired,
  resetChangePassword: PropTypes.func.isRequired,
  getAllNotifications: PropTypes.func.isRequired,
};

export default HrAppRouter;
