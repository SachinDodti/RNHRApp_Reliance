import { AUTH_ACTIONS } from './Constants';

export function getAuthenticateSuccess(jwtToken, userInfo, deviceRegInfo) {
  return {
    type: AUTH_ACTIONS.AUTHENTICATION_SUCCESS,
    userProfile: userInfo,
    authToken: jwtToken,
    deviceRegistrationInfo: deviceRegInfo,
  };
}
export function getAuthenticateFaliure(errorObj) {
  return {
    type: AUTH_ACTIONS.AUTHENTICATION_ERROR,
    error: errorObj,
  };
}

export function hideDeviceWarning() {
  return {
    type: AUTH_ACTIONS.HIDE_DEVICE_WARNING,
  };
}
