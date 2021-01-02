import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import { errorOccured } from "../Redux/Actions/ApplicationStateAction";
import syncStoreToState from "./LocalStorageThunk";
import invokeApi from "../Network";
import ApiEndpoints from "../Config/ApiEndpoints";
import goToNextForcedNotification from "../Redux/Actions/ForcedNotification-Action";
import ForcedNotificationEnabUtil from "../Util/ForcedNotificationEnablementUtil";


//export const updateForcedNotification = (request, isLastPage, swiper) => dispatch => {
export const updateForcedNotification = (request, isLastPage, swiper, dataLength) => dispatch => {
  let currentResponse = null;
  invokeApi(
    dispatch,
    ApiEndpoints.forcedNotificationEnablement.updateForcedNotification,
    request
  )
    .then(successResponse => {
      // if (dataLength === 4) {// local testing
      //   currentResponse = require('../../App/Screens/ForcedNotification/testData3.json');
      // }
      // else if (dataLength === 3) {
      //   currentResponse = require('../../App/Screens/ForcedNotification/testData2.json');
      // }
      // else if (dataLength === 2) {
      //   currentResponse = require('../../App/Screens/ForcedNotification/testData1.json');
      // }
      // else if (dataLength === 1 || dataLength === 0) {
      //   currentResponse = require('../../App/Screens/ForcedNotification/testData0.json');
      // }
      currentResponse = successResponse;
      console.log("currentResponse", currentResponse);
      return ForcedNotificationEnabUtil.updateForcedNotificationStatus(dispatch, dataLength);
    })
    .then(() => {
      dispatch(goToNextForcedNotification(currentResponse, isLastPage));
    })
    .catch(error => {
      // console.log("within currentResponse fail");
    });
  /*

  */
};

export const getForcedNotification = callbackFunction => dispatch => {
  return ForcedNotificationEnabUtil.updateForcedNotificationData(dispatch, callbackFunction)

}


