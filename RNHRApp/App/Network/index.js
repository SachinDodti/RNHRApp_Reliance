import { Alert } from "react-native";
import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import {
  endLoading,
  initiateLoding,
  errorOccured,
} from "../Redux/Actions/ApplicationStateAction";
import HrAppUtil from "../Util/HrAppUtil";
import ApplicationConfiguration from "../Config/env";

/**
 * Request Wrapper with default success/error actions
 */

const invokeApi = async (dispatch, options, data, header) => {
  let reqHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (header) {
    reqHeader = { ...reqHeader, ...header };
  }

  if (options.authenticationRequired) {
    const accessToken = await LocalStorageUtil.get(STORAGE_KEY.USER.AUTH_TOKEN);
    if (!options.skipError && (!accessToken || accessToken === "")) {
      const error = new Error("You have been logged-out. Please login again");
      if (dispatch) {
        dispatch(errorOccured(error, false));
      } else {
        HrAppUtil.log("::::::: Error Occured For : ", options, error);
        throw error;
      }
    }

    // reqHeader = { ...reqHeader, 'Authorization': 'Bearer '+accessToken };
    reqHeader = { ...reqHeader, Authorization: `Bearer ${accessToken}` };
  }

  let invokeOption = {
    ...{ headers: reqHeader },
    method: options.httpMethod,
  };

  if (data) {
    switch (options.httpMethod) {
    case "GET":
      // generate the query param
      break;
    case "POST":
      invokeOption = { ...invokeOption, body: JSON.stringify(data) };
      break;
    case "PUT":
      break;
    case "PATCH":
      break;
    default:
    }
  }

  const onSuccess = async response => {
    if (response.error) {
      delete response.error.stackTrace;
      delete response.error.suppressed;
      response.error.apiUrl = options.url;
      if (response.error.errorCode === "CODE0000007") {
        // await HrAppUtil.clearUserInformation();
        if (dispatch) {
          dispatch(errorOccured(response.error, false));
        }
      }
      HrAppUtil.log("::::::: Error Occured For : ", options, response.error);

      return Promise.reject(response.error);
    }
    HrAppUtil.log("Request Successful!", response);
    if (options.showActivityIndicator) {
      dispatch(endLoading());
    }
    return response;
  };

  const onError = async (error, skip) => {
    if (dispatch) {
      if (options.showActivityIndicator) {
        dispatch(endLoading());
      }
      if (!skip) {
        if (error === "Unauthorized") {
          const authError = new Error(
            "Session has been expired. Please login again",
          );
          dispatch(errorOccured(authError, true));
        } else {
          dispatch(errorOccured(error, true));
        }
      }
    }
    return Promise.reject(error);
  };

  HrAppUtil.log("Request ", options.url, invokeOption);
  if (options.showActivityIndicator) {
    dispatch(initiateLoding());
  }
  HrAppUtil.log(":::::::::::: Service going to be invoked : ", options);
  return fetch(options.url, invokeOption)
    .then(response => {
      HrAppUtil.log(":::::::::::: Service RESPONSE: ", options, response);
      if (response.url !== options.url) {
        throw new Error(
          `It seems service call has been blocked by your ISP. Please connect with your service provider to allow : ${ApplicationConfiguration.baseUrl}`,
        );
      }
      try {
        return response.json();
      } catch (err) {
        throw new Error("Something went wrong. Please try after sometime.");
      }
    })
    .then(responseJson => {
      HrAppUtil.log(
        ":::::::::::: Service JSON RESPONSE: ",
        options,
        responseJson,
      );
      return onSuccess(responseJson);
    })
    .catch(error =>{
      console.log("Error",error)
      onError(error, options.skipError);
    }
    )
   
};

export default invokeApi;
