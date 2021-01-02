export const ANNOUNCEMENT_ACTIONS = {
  GET_ANNOUNCEMENT_SUCCESS: "getAnnouncementSuccess"
};
export const AUTH_ACTIONS = {
  AUTHENTICATE: "authenticate",
  AUTHENTICATION_SUCCESS: "authentication-success",
  AUTHENTICATION_ERROR: "authentication-error",
  HIDE_DEVICE_WARNING: "hideDeviceWarning"
};
export const OTP_ACTIONS = {
  SEND_OTPSUCCESS: "sendOTPSuccess",
  SEND_OTPFALIURE: "sendOTPFaliure",
  VALIDATE_OTPSUCCESS: "validateotp-success",
  VALIDATE_OTPFALIURE: "validateotp-faliure"
};

export const LOCATION_ACTIONS = {
  LOCATION_ACCESS_SUCCESS: "locationAccessSuccess",
  LOCATION_ACCESS_ERROR: "locationAccessError"
};

export const ATTENDANCE_ACTIONS = {
  NEXT_YEAR: "goToNextYear",
  PREVIOUS_YEAR: "goToPreviousYear",
  GO_TO_MONTH: "goToMonth",
  GO_TODAY: "goToday",
  CURRENT_MONTH: "current_month"
};

export const CALENDAR_ACTIONS = {
  CHANGE_YEAR: "change_year",
  CHANGE_MONTH: "change_month",
  GET_YEARS: "get_year"
};

export const LOCAL_STORAGE_ACTION = {
  SYNC_TO_STATE: "sync_store_to_state"
};

export const WISH_ACTION = {
  GET_TODAY_BIRTHDAY_SUCCESS: "getTodayBirthdaySuccess",
  GET_TODAY_BIRTHDAY_ERROR: "getTodayBirthdayError",
  GET_TODAY_ANNIVERSARY_SUCCESS: "getTodayAnniversarySuccess",
  GET_TODAY_ANNIVERSARY_ERROR: "getTodayAnniversaryError",
  SEARCH_SUCCESS: "searchBirthdayOrAnniversarySuccess",
  SEARCH_ERROR: "searchBirthdayOrAnniversaryError",
  BIRTHDAY_WISH_SUCCESS: "birthdayWishSuccess",
  BIRTHDAY_WISH_ERROR: "birthdayWishError",
  ANNIVERSARY_WISH_SUCCESS: "anniversaryWishSuccess",
  ANNIVERSARY_WISH_ERROR: "anniversaryWishError",
  RESET_WISH_ACTION: "resetWish",
  WISH_TEMPLATE: "wishTemplate",
  CLOSE_WISH_TEMPLATE: "closeTemplate",
  RESET_WISH_SEARCH: "resetWishSearch"
};

export const REPORTEE_ACTION = {
  GET_SELF_DETAILS_SUCCESS: "getSelfDetailsSuccess",
  GET_SELF_DETAILS_ERROR: "getSelfDetailsError",
  GET_SEARCH_SAP_CODE_SUCCESS: "getSearchSapCodeSuccess",
  GET_SEARCH_NAME_SUCCESS: "getSearchNameSuccess",
  GET_MANAGER_SAP_CODE_SUCCESS: "getManagerSapCodeSuccess",
  GET_MANAGER_NAME_SUCCESSS: "getManagerNameSuccess",
  GET_SEARCH_SAP_CODE_ERROR: "getSearchSapCodeError",
  GET_SEARCH_NAME_ERROR: "getSearchNameError",
  GET_MANAGER_SAP_CODE_ERROR: "getManagerSapCodeError",
  GET_MANAGER_NAME_ERROR: "getManagerNameError",
  RESET_REPORTEE: "resetReportee"
};

export const APP_STATE_ACTION = {
  START_LOADING: "loadingStarted",
  END_LOADING: "loadingEnd",
  APPLICATION_ERROR: "applicationError",
  RESET_MESSAGE: "resetErrorDetail",
  APPLICATION_SUCCESS: "applicationSuccess"
};

export const MANDATORY_ENABLEMENT = {
  CHECK_MANDATORY_ENABLEMENT: "checkForManadatoryEnablement"
};

export const MANDATORY_LEARNING = {
  GET_LEARNINGS: "getMandatoryLearning",
  UPDATE_LEARNINGS: "updateMandatoryLearning"
};

export const LOCATION_DIRECTORY_ACTION = {
  GET_STATE_CITY_MASTER_SUCCESS: "getStateCityMasterSuccess",
  GET_STATE_CITY_MASTER_ERROR: "getStateCityMasterError",
  GET_BRANCH_DETAILS_SUCCESS: "getBranchDetailsSuccess",
  GET_BRANCH_DETAILS_ERROR: "getBranchDetailsError",
  SHARE_BRANCH_DETAILS_SUCCESS: "shareBranchDetailsSuccess",
  SHARE_BRANCH_DETAILS_ERROR: "shareBranchDetailsError",
  CLEAR_BRANCH_DETAILS: "clearBranchAddress"
};

export const COMMUNICATION_ACTION = {
  GET_NOTICE_BOARD_SUCCESS: "getNoticeBoradSuccess",
  GET_NOTICE_BOARD_ERROR: "getNoticeBoardError"
};

export const RESET_PASSWORD_ACTION = {
  GET_SAP_CODE_SUCCESS: "getSapCodeSuccess",
  GET_SAP_CODE_ERROR: "getSapCodeError",
  GET_CHANGE_PASSWORD_SUCCESS: "getChangePasswordSuccess",
  GET_CHANGE_PASSWORD_ERROR: "getChangePasswordError",
  RESET_OTP_FLAG: "resetPasswordServiceCall"
};

export const NOTIFICATION_ACTION = {
  HIDE_NETWORK_ERROR: "hideNetworkError",
  SHOW_NETWORK_ERROR: "showNetworkError",
  NOTIFICATION_RECEIVED: "notificationReceived",
  GET_NOTIFICATION_SUCCESS: "getNotificationSuccess",
  NOTIFICATION_RESET: "notificationReset",
  UPDATE_NOTIFICATION_STATUS: "updateNotificationStatus",
  DELETE_NOTIFICATION_STATUS: "deleteNotificationStatus",
  CLEAR_ALL_NOTIFICATION: "clearAllNotification",
  UNDO_DELETE_NOTIFICATION: "undoDeleteNotification"
};

export const REGISTER_QUERY_ACTION = {
  GET_REGISTER_SAP_INFO_SUCCESS: "getRegisterSapInfoSuccess",
  GET_REGISTER_SAP_INFO_ERROR: "getRegisterSapInfoError",
  GET_QUERY_GROUP_TYPE_SUCCESS: "getQueryGroupTypeSuccess",
  GET_QUERY_GROUP_TYPE_ERROR: "getQueryGroupTypeError",
  REGISTER_QUERY: "registerQuery",
  REGISTER_QUERY_SUCCESS: "registerQuerySuccess",
  REGISTER_QUERY_ERROR: "registerQueryError"
};

export const ODREQUEST_ACTION ={
  GET_ODRULE_ENGINE_SUCCESS:"getOdRuleEngineSuccess",
  GET_OD_TYPE_SUCCESS:"getOdTypeSuccess",
  GET_OD_REASON_SUCCESS:"getOdReasonSuccess"
}

export const TRACK_QUERY_ACTION = {
  GET_TRACK_QUERY_SUCCESS: "getTrackQuerySuccess",
  GET_TRACK_QUERY_FAILURE: "getTrackQueryFailure",
  VIEW_STATUS_QUERY_SUCCESS: "viewStatusQuerySuccess",
  VIEW_STATUS_QUERY_FAILURE: "viewStatusQueryFailure",
  GET_QUERY_STATUS_SUCCESS: "getQueryStatusSuccees",
  GET_QUERY_STATUS_FAILURE: "getQueryStatusFailure"
};

export const PRODUCT_CORNER_ACTION = {
  GET_PRODUCT_CORNER_SUCCESS: "getProductDetailsSuccess",
  GET_PRODUCT_CORNER_FAILURE: "getTrackQueryFailure",
};

export const FORCED_NOTIFICATION = {
  GET_FORCED_NOTIFICATION: "getForcedNotification",
  UPDATE_FORCED_NOTIFICATION: "updateForcedNotification"
};
