import { RESET_PASSWORD_ACTION } from "../Actions/Constants";

const resetPasswordReducer = (
  state = {
    // sapCodeSuccess: [],
    // changePasswordSuccess: [],
    otpSent: false,
  },
  action,
) => {
  switch (action.type) {
  case RESET_PASSWORD_ACTION.GET_SAP_CODE_SUCCESS:
    return {
      ...state,
      otpSent: true,
      error: null,
    };
    // case RESET_PASSWORD_ACTION.GET_SAP_CODE_ERROR:
    //   return {
    //     ...state,
    //     error: action.error,
    //     otpSent: false,
    //   };
  case RESET_PASSWORD_ACTION.RESET_OTP_FLAG:
    return {
      ...state,
      error: action.error,
      otpSent: false,
    };
    // case RESET_PASSWORD_ACTION.GET_CHANGE_PASSWORD_SUCCESS:
    //   return {
    //     ...state,
    //     changePasswordSuccess: action.data ? action.data : [],
    //     error: null,
    //   };
    // case RESET_PASSWORD_ACTION.GET_CHANGE_PASSWORD_ERROR:
    //   return {
    //     ...state,
    //     error: action.error,
    //     changePasswordSuccess: [],
    //   };
  default:
    return { ...state };
  }
};

export default resetPasswordReducer;
