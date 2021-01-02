import { Actions } from "react-native-router-flux";
import {
  getAuthenticateSuccess,
  getAuthenticateFaliure,
  hideDeviceWarning
} from "../Redux/Actions/Authentication-Action";
import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import { sendOTPValue } from "./OTP-Thunk";
import ApplicationContants from "../Constants/ApplicationContants";
import syncStoreToState from "./LocalStorageThunk";
import HrAppUtil from "../Util/HrAppUtil";

import ApplicationConfiguration from "../Config/env";
import {
  errorOccured,
  showMessage
} from "../Redux/Actions/ApplicationStateAction";
import { getText } from "../I18n/Lang";
import I18N_CONSTANTS from "../I18n/LanguageConstants";


import MandatLearnEnabUtil from "../Util/MandatoryLearningEnablementUtil";

import ForcedNotificationEnabUtil from "../Util/ForcedNotificationEnablementUtil"

const getAuthenticate = (authReq, localStore, isrememberLogin) => dispatch => {
  console.log("inside auth thunk", authReq);
  // API  CALL
  if (!authReq) {
    throw Error("Empty request not allowed");
  }
  let response = null;
  let multiStore = [];
  let bypassEnablement = false;
  const isCandidate = !HrAppUtil.getBooleanValue(
    localStore[STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE]
  );
  if (isCandidate && ApplicationConfiguration.bypassCandidateEnablement) {
    bypassEnablement = true;
  }

  if (isrememberLogin) {
    if (authReq.isCandidate) {
      multiStore.push([
        STORAGE_KEY.USER_PREFERENCE.PANNUMBER,
        authReq.panNumber
      ]);
      multiStore.push([STORAGE_KEY.USER_PREFERENCE.SAPCODE, ""]);

      // LocalStorageUtil.store(STORAGE_KEY.USER_PREFERENCE.PANNO, authreq.panNumber);
    } else {
      multiStore.push([STORAGE_KEY.USER_PREFERENCE.SAPCODE, authReq.sapCode]);
      multiStore.push([STORAGE_KEY.USER_PREFERENCE.PANNUMBER, ""]);
      // LocalStorageUtil.store(STORAGE_KEY.USER_PREFERENCE.SAPCODE, authreq.sapCode);
    }
  } else {
    multiStore.push([STORAGE_KEY.USER_PREFERENCE.PANNUMBER, ""]);
    multiStore.push([STORAGE_KEY.USER_PREFERENCE.SAPCODE, ""]);
  }
  multiStore.push([
    STORAGE_KEY.USER_PREFERENCE.REMEMBER_ME,
    isrememberLogin ? "true" : "false"
  ]);
  multiStore.push([
    STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE,
    !authReq.isCandidate ? "true" : "false"
  ]);
  //
  // console.log('Multi store value array ', multiStore);
  LocalStorageUtil.storeMultiple(multiStore)
    .then(() => HrAppUtil.getFcmToken(dispatch))
    .then(fcmToken => {
      /* */
      if (HrAppUtil.isNullOrEmpty(fcmToken)) {
        dispatch(
          showMessage(
            "Unable to register for push notifications, please try again"
          )
        );
        throw new Error(
          "Unable to register for push notifications, please try again"
        );
      }
      authReq.fcmToken = fcmToken;
      return true;
    })
    .then(() =>
      invokeApi(dispatch, ApiEndpoints.authentication.authentication, authReq)
    )

    .then(result => {
      response = result;
      console.log("Response from the authenticate API", response);
      multiStore = [];

      // check whether same user logged in or not

      multiStore.push([
        STORAGE_KEY.USER.LAST_LOGGED_IN,
        HrAppUtil.getDateString()
      ]);
      multiStore.push([
        STORAGE_KEY.USER.LOGGEDIN_USER,
        JSON.stringify(response.data.userInfo)
      ]);

      // check whether this is a new user information than previous user

      const lastUser = HrAppUtil.parse(
        localStore[STORAGE_KEY.USER.LOGGEDIN_USER]
      );

      multiStore.push([STORAGE_KEY.APPLICATION.INVALID_APPS, ""]);
      multiStore.push([STORAGE_KEY.APPLICATION.MANDATORY_APPS, ""]);
      multiStore.push([STORAGE_KEY.APPLICATION.OPTIONAL_APPS, ""]);

      if (!HrAppUtil.isEmptyObject(lastUser)) {
        if (lastUser.mobileNo !== response.data.userInfo.mobileNo) {
          multiStore.push([STORAGE_KEY.USER.VERIFIED_MOBILE_NUMBER, ""]);
          multiStore.push([STORAGE_KEY.USER.MOBILE_NUMBER_VERIFIED, "false"]);
          multiStore.push([STORAGE_KEY.APPLICATION.INSTALLATION_STATUS, ""]);
          multiStore.push([
            STORAGE_KEY.APPLICATION.INSTALLATION_STATUS_SYNCED,
            "false"
          ]);
        }
      }

      return LocalStorageUtil.storeMultiple(multiStore);
    })
    .then(() => {
      // console.log('Dispatch evet', response);
      dispatch(syncStoreToState());
      dispatch(
        getAuthenticateSuccess(
          response.data.token,
          response.data.userInfo,
          response.data.deviceRegInfo
        )
      );

      return true;
    })
    .then(() =>
      LocalStorageUtil.store(STORAGE_KEY.USER.AUTH_TOKEN, response.data.token)
    )
    .then(() => {
      if (
        (response.data.deviceRegInfo.allowed &&
          !response.data.deviceRegInfo.alreadyRegistered &&
          !response.data.deviceRegInfo.registerdWithOtherDevice) ||
        response.data.deviceRegInfo.sapCodeUpdated
      ) {
        return HrAppUtil.clearMobileVerificationInformation();
      }
      return true;
    })
    .then(() => {
      if (
        (response.data.deviceRegInfo.allowed &&
          !response.data.deviceRegInfo.alreadyRegistered &&
          !response.data.deviceRegInfo.registerdWithOtherDevice) ||
        response.data.deviceRegInfo.sapCodeUpdated
      ) {
        return HrAppUtil.clearEnablementInformation();
      }
      return true;
    })
    .then(() => {
      if (
        (response.data.deviceRegInfo.allowed &&
          !response.data.deviceRegInfo.alreadyRegistered &&
          !response.data.deviceRegInfo.registerdWithOtherDevice) ||
        response.data.deviceRegInfo.sapCodeUpdated
      ) {
        return HrAppUtil.clearAttendanceInformation();
      }
      return true;
    })
    .then(() => {
      // if (response.data.deviceRegInfo.sapCodeUpdated) {
      //   return DeviceRegistrationUtil.registerDevice(dispatch);
      // }
      if (response.data.deviceRegInfo.registerdWithOtherDevice) {
        return false;
      }
      return true;
    })
    .then(redirection => {
      console.log('SHOULD SEND OTP >>>> ', redirection);
      // check the verified mobile number and logged in user mobile number
      if (redirection) {
        if (response.data.firstTimeLogin) {
          Actions[ApplicationConfiguration.scene.RESET_PASSWORD]();
        } else if (
          localStore[STORAGE_KEY.USER.MOBILE_NUMBER_VERIFIED] !== "true" ||
          localStore[STORAGE_KEY.USER.VERIFIED_MOBILE_NUMBER] !==
          response.data.userInfo.mobileNo
        ) {
          // console.log('within auhtentication thunk success');
          const otpReq = {
            action: ApplicationContants.sendOtpACTION
          };
          dispatch(sendOTPValue(otpReq));
          Actions[ApplicationConfiguration.scene.OTP]();
        } else {
          // no otp screen... where to go? mandatory Learning, Mandatory Apps or Dashboard
          //Actions[ApplicationConfiguration.scene.DASHBOARD](); //need to revert
          //return dispatch(mandatoryEnablementUpdate());
          if (!bypassEnablement) {
            MandatLearnEnabUtil.updateMandatoryLearningStatus(dispatch)
              .then(learningStatus => {
                console.log("Authentication thunk learningStatus: ", learningStatus);
                if (!bypassEnablement && learningStatus && learningStatus === "true") {
                  ForcedNotificationEnabUtil.updateForcedNotificationStatus(dispatch)
                    .then(forcedNotificationStatus => {
                      console.log("Authentication thunk forcedNotification: ", forcedNotificationStatus);
                      if (!bypassEnablement && forcedNotificationStatus && forcedNotificationStatus === "false") {
                        if (ApplicationConfiguration.scene.FORCED_NOTIFICATION != Actions.currentScene)
                          Actions[ApplicationConfiguration.scene.FORCED_NOTIFICATION]();
                      } else {
                        if (ApplicationConfiguration.scene.DASHBOARD != Actions.currentScene) {
                          HrAppUtil.getInitialScene(
                            ApplicationConfiguration.scene.DASHBOARD,
                            true
                          ).then(initialScene => {
                            if (initialScene) {
                              Actions[initialScene]();
                            }
                          });
                        }
                      }
                    })
                } else {
                  if (ApplicationConfiguration.scene.MANDATORY_LEARNING != Actions.currentScene)
                    Actions[ApplicationConfiguration.scene.MANDATORY_LEARNING]();
                }
              });
          } else {
            if (ApplicationConfiguration.scene.DASHBOARD != Actions.currentScene) {
              HrAppUtil.getInitialScene(
                ApplicationConfiguration.scene.DASHBOARD,
                true
              ).then(initialScene => {
                if (initialScene) {
                  Actions[initialScene]();
                }
              });
            }
          }
        }
      }
    })
    .catch(error => {
      console.log("::: Error in authentication thunk", error);
      // Alert.alert(error.errorMessage || error.message || error);
      dispatch(getAuthenticateFaliure(error));
      return LocalStorageUtil.clear([
        STORAGE_KEY.USER.AUTH_TOKEN,
        STORAGE_KEY.USER.LOGGEDIN_USER
      ]);
    })
    .finally(() => {
      dispatch(syncStoreToState());
    });

  // Actions.MandatoryLearning();
};

export const removeDeviceWarning = () => dispatch => {
  dispatch(hideDeviceWarning());
};

export const postLoginProceed = () => dispatch => {
  const otpReq = {
    action: ApplicationContants.sendOtpACTION
  };

  // reset mobile verification flag

  HrAppUtil.clearMobileVerificationInformation()
    .then(() => HrAppUtil.clearAttendanceInformation())
    .then(() => HrAppUtil.clearEnablementInformation())
    .then(() => {
      dispatch(sendOTPValue(otpReq));
      Actions[ApplicationConfiguration.scene.OTP]();
    })
    .finally(() => {
      dispatch(syncStoreToState());
    });
};

export const updateHelpInformation = localStore => dispatch => {
  if (
    !localStore ||
    localStore[STORAGE_KEY.APPLICATION.HELP_MESSAGE_UPDATED_ON] !==
      HrAppUtil.getDateString()
  ) {
    // invoke API
    // console.log('>>>> Check for help message');
    invokeApi(dispatch, ApiEndpoints.authentication.loginHelp)
      .then(response => {
        const multiStore = [];
        multiStore.push([
          STORAGE_KEY.APPLICATION.HELP_MESSAGE_UPDATED_ON,
          HrAppUtil.getDateString()
        ]);
        multiStore.push([
          STORAGE_KEY.APPLICATION.HELP_MESSAGE,
          response.data.helpMessage
        ]);
        multiStore.push([
          STORAGE_KEY.APPLICATION.HELP_CONTACT_NUMBER,
          response.data.contactNumber
        ]);
        multiStore.push([
          STORAGE_KEY.APPLICATION.HELP_CONTACT_EMAIL,
          response.data.contactEmail
        ]);
        LocalStorageUtil.storeMultiple(multiStore);
      })
      .catch(error => {
        // console.log(error);
      })
      .finally(() => {
        dispatch(syncStoreToState());
      });
  }
};

export const checkDeviceRegistration = () => dispatch => {
  // console.log("::::: Device Registration Check ------ ");
  LocalStorageUtil.get(STORAGE_KEY.USER.AUTH_TOKEN)
    .then(token => {
      if (!HrAppUtil.isNullOrEmpty(token)) {
        return invokeApi(
          dispatch,
          ApiEndpoints.deviceInformation.checkDeviceAvailability
        );
      }

      return false;
    })

    .then(deviceInfo => {
      // console.log("Device Info : ", deviceInfo);
      if (
        deviceInfo &&
        (!deviceInfo.data.allowed ||
          !deviceInfo.data.alreadyRegistered ||
          deviceInfo.data.registerdWithOtherDevice ||
          deviceInfo.data.deviceRegisterWithOthers ||
          deviceInfo.data.mobileNumberUpdated ||
          deviceInfo.data.sapCodeUpdated)
      ) {
        // console.log(
        //   "::::: Logged in information needs to be cleared",
        //   deviceInfo,
        // );
        return HrAppUtil.clearUserInformation();
      }
      return false;
    })
    .then(result => {
      if (result) {
        // console.log(
        //   "From device check Thunk --- Initial Scene",
        //   Actions.currentScene,
        // );

        HrAppUtil.getInitialScene();
        dispatch(
          errorOccured(
            new Error(getText(I18N_CONSTANTS.LOGIN.DEVICE_WARNING)),
            false,
            "authentication-thunk"
          )
        );
      }
    })
    .finally(() => {
      dispatch(syncStoreToState());
    });
};
export default getAuthenticate;
