import _ from "lodash";
import { LocalStorageUtil, STORAGE_KEY } from "./LocalStorage";
import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network/index";
import HrAppUtil from "./HrAppUtil";
import syncStoreToState from "../Thunk/LocalStorageThunk";


import ApplicationConfiguration from "../Config/env";

//FN - Forced Notification

class ForcedNotificationEnabUtil {
    static async getForcedNotificationList(dispatch) {
        return invokeApi(
            dispatch,
            ApiEndpoints.forcedNotificationEnablement.getForcedNotificaionList,
            {},
        );
    }

    static checkForKeyInObject(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }

    static checkIfKeyExistsInResponse(response, key) {
        const keyExists = ForcedNotificationEnabUtil.checkForKeyInObject(response, key);
        return keyExists
            ? {
                length: response[key].listForcedNotifications.length,
                data: response[key].listForcedNotifications,
            }
            : 0;
    }

    static async updateForcedNotificationStatus(dispatch) {

        // get all Forced Notification list
        const allForcedNotifications = await ForcedNotificationEnabUtil.getForcedNotificationList(dispatch);

        const allForcedNotificationExists = ForcedNotificationEnabUtil.checkIfKeyExistsInResponse(
            allForcedNotifications,
            "data",
        );
        const forcedNotificationStatus = allForcedNotifications.data.forcedNotificationStatus;
        const forcedNotificationCount = allForcedNotifications.data.forcedNotificationCount;
        const checkPending = forcedNotificationStatus === "incomplete" ? true : false;
        //const checkPending = forcedNotificationStatus === "completed" ? true : false;
        let forcedNotificationCompleted = "true";
        if (checkPending) {
            forcedNotificationCompleted = "false";
        }

        // get all Forced Notification data
        const allFNData = allForcedNotificationExists.data;
        //let testData = LocalStorageUtil.getKeysData([STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_DATA]);
        const forcedNotificationStore = [];
        forcedNotificationStore.push([
            STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_COMPLETED,
            forcedNotificationCompleted,
        ]);
        forcedNotificationStore.push([
            STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_DATA,
            JSON.stringify(allFNData),
        ]);

        LocalStorageUtil.storeMultiple(forcedNotificationStore)
            .then(() => {
                dispatch(syncStoreToState());
            });
        return forcedNotificationCompleted;
    }

    static async updateForcedNotificationData(dispatch, callbackFunction) {
        // get all Forced Notification list
        const allForcedNotifications = await ForcedNotificationEnabUtil.getForcedNotificationList(dispatch);
        //let testFNData = [];

        const datVal = await LocalStorageUtil.get(STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_COMPLETED);
        const allForcedNotificationCompleted =
            ApplicationConfiguration.bypassForcedNotification ||
            HrAppUtil.getBooleanValue(datVal);
        const allForcedNotificationExists = ForcedNotificationEnabUtil.checkIfKeyExistsInResponse(
            allForcedNotifications,
            "data",
        );
        const forcedNotificationStatus = allForcedNotifications.data.forcedNotificationStatus;
        const forcedNotificationCount = allForcedNotifications.data.forcedNotificationCount;
        const checkPending = forcedNotificationStatus === "incomplete" ? true : false;
        let forcedNotificationCompleted = "true";
        if (checkPending) {
            forcedNotificationCompleted = "false";
        }

        // get all Forced Notification data
        const allFNData = allForcedNotificationExists.data;
        //let testData = LocalStorageUtil.getKeysData([STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_DATA]);
        const forcedNotificationStore = [];
        forcedNotificationStore.push([
            STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_COMPLETED,
            forcedNotificationCompleted,
        ]);
        forcedNotificationStore.push([
            STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_DATA,
            JSON.stringify(allFNData),
        ]);

        LocalStorageUtil.storeMultiple(forcedNotificationStore)
            .then(() => {
                dispatch(syncStoreToState());
                if (callbackFunction !== undefined)
                    callbackFunction(forcedNotificationCompleted);

                return;
            });
    }
}
let forcedNotificationTest = true;

export default ForcedNotificationEnabUtil;
