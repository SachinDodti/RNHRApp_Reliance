import { AUTH_ACTIONS } from '../Actions/Constants';


const AuthenticationReducer = (state = {}, action) => {
  switch (action.type) {
  case AUTH_ACTIONS.AUTHENTICATION_SUCCESS:
    return {
      ...state, authToken: action.authToken ? action.authToken : '', userProfile: action.userProfile, loginSuccess: true, deviceRegistrationInfo: action.deviceRegistrationInfo,
    };
  case AUTH_ACTIONS.AUTHENTICATION_ERROR:
    return {
      ...state, error: action.error.errorMessage, authToken: '', userProfile: null, loginSuccess: false, deviceRegistrationInfo: null,
    };
  case AUTH_ACTIONS.HIDE_DEVICE_WARNING:
    return {
      ...state, deviceRegistrationInfo: null,
    };
  default:
    return { ...state };
  }
};

export default AuthenticationReducer;
