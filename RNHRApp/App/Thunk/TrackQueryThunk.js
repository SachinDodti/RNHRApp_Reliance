import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import {
    errorOccured,
    showMessage
} from "../Redux/Actions/ApplicationStateAction";
import syncStoreToState from "./LocalStorageThunk";
import invokeApi from "../Network";
import ApiEndpoints from "../Config/ApiEndpoints";

import ApplicationConstants from "../Constants/ApplicationContants";

import {
    getTrackQuerySuccess,
    viewQueryStatusSuccess,
    getQueryStatusSuccess,
    getTrackQueryFailure
} from "../Redux/Actions/TrackQuery-Action";

export const getTrackQuery = request => dispatch => {
    let currentResponse = null;
    let tempRequest;// to refresh Track query search in back navigation
    if (request === undefined) {
        tempRequest = {
            "fromDate": "",
            "toDate": "",
            "otherSapIdName": "",
            "queryNo": "",
            "queryStatusId": "",
            "queryGroupId": "",
            "queryTypeId": ""
        }
    }
    invokeApi(
        dispatch,
        ApiEndpoints.employeeTrackQuery.trackQuery,
        request ? request : tempRequest
    )
        .then(successResponse => {
            currentResponse = successResponse;
            console.log("getTrackQuery currentResponse", currentResponse);
            // need to store data
            dispatch(getTrackQuerySuccess(currentResponse.data.trackQueryData));
        })
        .catch(error => {
            dispatch(getTrackQueryFailure(error));
            console.log("getTrackQuery within currentResponse fail");
        });
};

export const getQueryStatus = () => dispatch => {
    let currentResponse = null;
    invokeApi(
        dispatch,
        ApiEndpoints.employeeTrackQuery.getQueryStatus,
        null
    )
        .then(successResponse => {
            currentResponse = successResponse;
            console.log("getQueryStatus currentResponse", currentResponse);
            dispatch(getQueryStatusSuccess(currentResponse.data.queryStatus));
        })
        .catch(error => {
            console.log("getQueryStatus within currentResponse fail");
        });
};

export const viewQueryStatus = request => dispatch => {
    let currentResponse = null;
    invokeApi(
        dispatch,
        ApiEndpoints.employeeTrackQuery.viewQueryStatus,
        request
    )
        .then(successResponse => {
            currentResponse = successResponse;
            console.log("viewQueryStatus currentResponse", currentResponse);
            dispatch(viewQueryStatusSuccess(currentResponse.data));
        })
        .catch(error => {
            console.log("viewQueryStatus within currentResponse fail");
        });
};

export const submitFeedBack = (request) => dispatch => {
    let currentResponse = null;
    invokeApi(
        dispatch,
        ApiEndpoints.employeeTrackQuery.submitFeedBack,
        request
    )
        .then(successResponse => {
            currentResponse = successResponse;
            console.log("submitFeedBack currentResponse", currentResponse);
            // dispatch(registerQuerySuccess(currentResponse.data));
            dispatch(
                showMessage(
                    currentResponse.data.message,
                    ApplicationConstants.messageType.SUCCESS,
                    "Submit FeedBack"
                )
            );
        })
        .catch(error => {
            console.log("submitFeedBack within currentResponse fail", error);
        });
};
