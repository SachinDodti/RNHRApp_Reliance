import { REGISTER_QUERY_ACTION } from "../Actions/Constants";

const RegisterQueryReducer = (
  state = {
    registerSapInfo: {},
    queryGroup: [],
    registerQuerySuccessMsg: undefined
  },
  action
) => {
  switch (action.type) {
    case REGISTER_QUERY_ACTION.GET_REGISTER_SAP_INFO_SUCCESS:
      console.log("RegisterQueryReducer sap info action.data: ", action.data);
      return {
        ...state,
        registerSapInfo: action.data
      };

    case REGISTER_QUERY_ACTION.GET_REGISTER_SAP_INFO_ERROR:
      return {
        ...state,
        error: action.error.errorMessage
      };

    case REGISTER_QUERY_ACTION.GET_QUERY_GROUP_TYPE_SUCCESS:
      console.log("RegisterQueryReducer action.data: ", action.data);
      return {
        ...state,
        queryGroup: action.data ? action.data : [],
        error: null
      };
    case REGISTER_QUERY_ACTION.GET_QUERY_GROUP_TYPE_ERROR:
      return {
        ...state,
        error: action.error,
        queryGroup: []
      };

    case REGISTER_QUERY_ACTION.REGISTER_QUERY_SUCCESS:
      console.log("RegisterQueryReducer action.data: ", action.data);
      return {
        ...state,
        registerQuerySuccessMsg: action.data ? action.data : undefined,
        error: null
      };

    default:
      return { ...state };
  }
};

export default RegisterQueryReducer;
