import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";

import syncStoreToState from "./LocalStorageThunk";
import invokeApi from "../Network";
import ApiEndpoints from "../Config/ApiEndpoints";
import {
  errorOccured,
  showMessage
} from "../Redux/Actions/ApplicationStateAction";

import ApplicationConstants from "../Constants/ApplicationContants";

import {
  getQueryGroupTypeSuccess,
  getRegisterSapInfoSuccess,
  registerQuerySuccess
} from "../Redux/Actions/RegisteryQuery-Action";

export const getRegisterSapInfo = request => dispatch => {
  let currentResponse = null;
  const tempRequest = {
    sapCode: "70104379"
  };
  invokeApi(
    dispatch,
    ApiEndpoints.employeeRegisterQuery.getRegisterSapInfo,
    request
  )
    .then(successResponse => {
      currentResponse = successResponse;
      // console.log("getRegisterSapInfo currentResponse", currentResponse);
      // need to store data
      dispatch(getRegisterSapInfoSuccess(currentResponse.data));
    })
    .catch(error => {
      console.log("getRegisterSapInfo within currentResponse fail");
    });
  /*

  */
};

export const getRegisterQueryGroupType = () => dispatch => {
  let currentResponse = null;
  invokeApi(
    dispatch,
    ApiEndpoints.employeeRegisterQuery.getQueryGroupType,
    null
  )
    .then(successResponse => {
      currentResponse = successResponse;
      // console.log("getRegisterQueryGroupType currentResponse", currentResponse);
      dispatch(getQueryGroupTypeSuccess(currentResponse.data.queryData));
    })
    .catch(error => {
      console.log("getRegisterQueryGroupType within currentResponse fail");
    });
};

export const submitRegisterQuery = regQueryRequest => dispatch => {
  let currentResponse = null;
  invokeApi(
    dispatch,
    ApiEndpoints.employeeRegisterQuery.sendRegisterQuery,
    regQueryRequest
  )
    .then(successResponse => {
      currentResponse = successResponse;
      // console.log("submitRegisterQuery currentResponse", currentResponse);
      dispatch(registerQuerySuccess(currentResponse.data.message));
      // dispatch(
      //   showMessage(
      //     currentResponse.data.message,
      //     ApplicationConstants.messageType.SUCCESS,
      //     "Query Registered"
      //   )
      // );
    })
    .catch(error => {
      console.log("submitRegisterQuery within currentResponse fail", error);
    });
};

export const clearRegisterQuerySuccessMsg = () => dispatch => {
  dispatch(registerQuerySuccess());
}
