import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import {
    errorOccured,
    showMessage
} from "../Redux/Actions/ApplicationStateAction";
import invokeApi from "../Network";
import ApiEndpoints from "../Config/ApiEndpoints";

import ApplicationConstants from "../Constants/ApplicationContants";

import {
    getProductDetailSuccess,
    getProductDetailFailure,
} from "../Redux/Actions/ProductCorner-Action";

export const getProductDetails = () => dispatch => {
    let currentResponse = null;
    invokeApi(
        dispatch,
        ApiEndpoints.productCorner.getProductDetails,
        null
    )
        .then(successResponse => {
            currentResponse = successResponse;
            console.log("getProductDetails currentResponse", currentResponse);
            // need to store data
            dispatch(getProductDetailSuccess(currentResponse.data.productDetailsList));
        })
        .catch(error => {
            dispatch(getProductDetailFailure(error));
            console.log("getProductDetails within currentResponse fail");
        });
};

export const productViewService = (request) => dispatch => {
    invokeApi(
        dispatch,
        ApiEndpoints.productCorner.productViewService,
        request
    )
        .then(successResponse => {
            console.log("getProductDetails currentResponse", successResponse);
        })
        .catch(error => {
            console.log("getProductDetails within currentResponse fail");
        });
};