import { ODREQUEST_ACTION } from "./Constants";



export function getODRuleEnginInfoSuccess(data) {
    return {
      type: ODREQUEST_ACTION.GET_ODRULE_ENGINE_SUCCESS,
      data
    };
  }

  export function getODTypeInfoSuccess(data){
    return {
      type:ODREQUEST_ACTION.GET_OD_TYPE_SUCCESS,
      data
    }
  }
  
  export function getODReasonInfoSuccess(data){
    return {
      type:ODREQUEST_ACTION.GET_OD_REASON_SUCCESS,
      data
    }
  }

