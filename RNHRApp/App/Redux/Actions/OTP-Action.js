
import { OTP_ACTIONS } from './Constants';

export function validateOTPSuccess() {
  return {
    type: OTP_ACTIONS.VALIDATE_OTPSUCCESS,
  };
}
