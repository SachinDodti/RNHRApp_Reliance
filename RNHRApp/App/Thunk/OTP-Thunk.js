import { Actions } from "react-native-router-flux";
import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import syncStoreToState from "./LocalStorageThunk";
import DeviceRegistrationUtil from "../Util/DeviceRegistrationUtil";
import HrAppUtil from "../Util/HrAppUtil";
import {
  errorOccured,
  showMessage,
} from "../Redux/Actions/ApplicationStateAction";
import ApplicationConfiguration from "../Config/env";
import ApplicationConstants from "../Constants/ApplicationContants";
// import I18N_CONSTANTS from "../I18n/LanguageConstants";
// import { getText } from "../I18n/Lang";

export const sendOTPValue = (request, showSuccessMessage) => dispatch => {
  invokeApi(dispatch, ApiEndpoints.authentication.sendOtp, request).then(() => {
    if (showSuccessMessage) {
      // dispatch(
      //   showMessage(
      //     getText(I18N_CONSTANTS.OTP.RESEND_OTP_SUCCESS),
      //     ApplicationConstants.messageType.SUCCESS,
      //     "OTP Request",
      //   ),
      // );
    }
  });
};

export const validateOTPValue = (otpRequest, mobileNo) => dispatch => {
  // console.log("validate OTP Thunk");
  if (!otpRequest) {
    throw Error("Empty request not allowed");
  }
  const response = null;
  let checkResponse =null;
  DeviceRegistrationUtil.registerDevice(dispatch, otpRequest)

    .then(result => {
      checkResponse = result

      if (result) {
        // console.log('local storage updated with MOBILE_NUMBER_VERIFIED');
        multiStore = [];
        multiStore.push([STORAGE_KEY.USER.MOBILE_NUMBER_VERIFIED, "true"]);
        multiStore.push([
          STORAGE_KEY.USER.VERIFIED_MOBILE_NUMBER,
          `${mobileNo}`,
        ]);
        return LocalStorageUtil.storeMultiple(multiStore);
      }
      return true;
    })
    .then(() => {
      dispatch(syncStoreToState());
      return LocalStorageUtil.get(STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE);
    })
    .then(isEmployeeStr => {
      // console.log('OTP Validated : ');
      // Actions[ApplicationConfiguration.scene.DASHBOARD]();
      // Actions.dashboard();
      // redirect to mandatory app

      if(checkResponse !== undefined){
        const isEmployee = HrAppUtil.getBooleanValue(isEmployeeStr);
        isEmployee
          ? Actions[ApplicationConfiguration.scene.MANDATORY_APPS]()
          : Actions[ApplicationConfiguration.scene.DASHBOARD]();
      }

    })
    .catch(error => {
      // console.log(error);
      dispatch(
        errorOccured(
          error,
          false,
          "validateOTPValue",
        ),
      );
    });
};
