import { ODREQUEST_ACTION } from "../Actions/Constants";


const OdRuleEngineReducer = (
    state ={
        OdRuleEngineInfo:{},
        OdTypeInfo:{},
        OdReasonInfo:{}
    },
    action
) =>{
    switch (action.type) {
        case ODREQUEST_ACTION.GET_ODRULE_ENGINE_SUCCESS:
            return{
                ...state,
                OdRuleEngineInfo :action.data
            }
            case ODREQUEST_ACTION.GET_OD_TYPE_SUCCESS:
                return{
                    ...state,
                    OdTypeInfo :action.data
                }
            case ODREQUEST_ACTION.GET_OD_REASON_SUCCESS:
                return{
                    ...state,
                    OdReasonInfo :action.data
                }
            default:
                return {...state}
    }
};

export default OdRuleEngineReducer;