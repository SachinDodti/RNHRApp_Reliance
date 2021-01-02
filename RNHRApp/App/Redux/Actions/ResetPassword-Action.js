import { RESET_PASSWORD_ACTION } from "./Constants";

export function getSapCodeSuccess() {
  return {
    type: RESET_PASSWORD_ACTION.GET_SAP_CODE_SUCCESS,
  };
}

export function resetOTPFlag() {
  return {
    type: RESET_PASSWORD_ACTION.RESET_OTP_FLAG,
  };
}
