import { Actions } from "react-native-router-flux";
import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import {
  getSapCodeSuccess,
  getChangePassSuccess,
  resetOTPFlag,
} from "../Redux/Actions/ResetPassword-Action";
import { showMessage } from "../Redux/Actions/ApplicationStateAction";
import ApplicationConstants from "../Constants/ApplicationContants";
import ApplicationConfiguration from "../Config/env";

export const getSapCodeSearchSuccess = request => dispatch => {
  let response = null;
  // console.log("request from the reset password API", request);
  invokeApi(dispatch, ApiEndpoints.authentication.changePassword, request)
    .then(result => {
      response = result;
      // console.log("Response from the reset password API", response);
      dispatch(getSapCodeSuccess());
      dispatch(
        showMessage(
          response.data.message,
          ApplicationConstants.messageType.SUCCESS,
          "Reset Password",
        ),
      );
    })
    .catch(error => {
      // console.log("ERROR from the reset password API");
    });
};

export const getChangePasswordSuccess = request => dispatch => {
  let response = null;
  // console.log("request from the reset password API", request);
  invokeApi(dispatch, ApiEndpoints.authentication.changePassword, request)
    .then(result => {
      response = result;
      // console.log("Response from the reset password API", response);
      // dispatch(getChangePassSuccess(response.data, request));
      dispatch(resetOTPFlag());
      Actions[ApplicationConfiguration.scene.LOGIN]();
      dispatch(
        showMessage(
          response.data.message,
          ApplicationConstants.messageType.SUCCESS,
          "Reset Password",
        ),
      );
    })
    .catch(error => {
      // console.log("ERROR from the reset password API");
    });
};
