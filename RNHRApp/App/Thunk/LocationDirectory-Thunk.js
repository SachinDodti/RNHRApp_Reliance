import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import {
  getStateCityMasterSuccess,
  getBranchDetailsSuccess,
  shareBranchDetailsSuccess,
  clearBranchDetails,
} from "../Redux/Actions/LocationDirectory-Action";
import { showMessage } from "../Redux/Actions/ApplicationStateAction";
import ApplicationConstants from "../Constants/ApplicationContants";

export const getStateCityMaster = () => dispatch => {
  // console.log('get StateCityMaster Thunk');
  //   //API  CALL
  let response = null;
  invokeApi(dispatch, ApiEndpoints.location.getStateCityMaster, null)
    .then(result => {
      response = result;
      // console.log('Response from the StateCityMaster API', response);
      // check device registration
      dispatch(getStateCityMasterSuccess(response.data.states));
    })
    .catch(() => {
      // console.log('within StateCityMaster fail');
      // console.log(error);
      // dispatch(getAuthenticateFaliure(error));
    });
};

export const getBranchDetails = request => dispatch => {
  // console.log('get getBranchDetails Thunk');
  //   //API  CALL
  let response = null;
  dispatch(clearBranchDetails());
  invokeApi(dispatch, ApiEndpoints.location.getBranches, request)
    .then(result => {
      response = result;
      // console.log('Response from the getBranchDetails API', response);
      // check device registration
      dispatch(getBranchDetailsSuccess(response.data.branches));
    })
    .catch(() => {
      // console.log('within StateCityMaster fail');
      // console.log(error);
      // dispatch(getAuthenticateFaliure(error));
    });
};

export const shareBranchDetails = request => dispatch => {
  let response = null;
  invokeApi(dispatch, ApiEndpoints.location.shareBranchInformation, request)
    .then(result => {
      response = result;
      // console.log("response shared location", response);
      // dispatch(shareBranchDetailsSuccess(response.data.branches));
      dispatch(
        showMessage(
          result.data.message,
          ApplicationConstants.messageType.BLANK,
          "Information Shared",
        ),
      );
    })
    .catch(() => {
      // console.log('within StateCityMaster fail');
      // console.log(error);
      // dispatch(getAuthenticateFaliure(error));
    });
};
