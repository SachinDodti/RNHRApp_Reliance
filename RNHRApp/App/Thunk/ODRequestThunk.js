import invokeApi from '../Network';
import ApiEndpoints from '../Config/ApiEndpoints';
import {
    getODRuleEnginInfoSuccess,
    getODTypeInfoSuccess,
    getODReasonInfoSuccess
  } from "../Redux/Actions/ODRequestAction";

  import {
    errorOccured,
    showMessage
  } from "../Redux/Actions/ApplicationStateAction";
  
  import ApplicationConstants from "../Constants/ApplicationContants";
export const getODRuleEnginInfo = request => dispatch => {
    let currentResponse = null;
    invokeApi(
        dispatch,
        ApiEndpoints.odRequest.getODRuleEngine,
        request
    )
    .then(successResponse =>{
        currentResponse = successResponse;
        dispatch(getODRuleEnginInfoSuccess(currentResponse.data));
    })
    .catch(error =>{
        console.log("getODRuleEnginInfo within currentResponse fail");
    })

}

export const getODTypeInfo = request => dispatch =>{
    let currentResponse = null;
    invokeApi(
        dispatch,
        ApiEndpoints.odRequest.getODType,
        request
    )
    .then(
        successResponse =>{
            currentResponse = successResponse;
            dispatch(getODTypeInfoSuccess(currentResponse.data))
        })
    .catch(error =>{
        console.log("getODTypeInfo within currentResponse fail" );
    })
}

export const getODReasonInfo = request => dispatch=>{
    let currentResponse = null ;
    invokeApi(
        dispatch,
        ApiEndpoints.odRequest.getODReason,
        request
    )
    .then(
        successResponse =>{
            currentResponse = successResponse;
            dispatch(getODReasonInfoSuccess(currentResponse.data))
        }
    )
    .catch(error =>{
        console.log("getODResponseInfo within currentResponse fail");
    })
}


export const applyODRequestInfo = request =>  dispatch=>{
    let currentResponse = null ;
    invokeApi(
        dispatch,
        ApiEndpoints.odRequest.applyOD,
        request
    )
    .then(
        successResponse =>{
           
            
            currentResponse = successResponse;

             dispatch(
        showMessage(
          currentResponse.data.Message,
          ApplicationConstants.messageType.SUCCESS,
          "Query Registered"
        )
      );
        }
    )
    .catch(
        error =>{

            console.log('applyODRequestInfo within currentResponse fail')
        }
    )
}


