import ApplicationConfiguration from "./env";

const ApiEndpoints = {
  common: {
    logWebActivity: {
      url: `${ApplicationConfiguration.baseUrl}/service/addActivity`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      skipError: true,
      apiName: "logWebActivity",
    },
    getAnnouncements: {
      url: `${ApplicationConfiguration.baseUrl}/getAnnouncements`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: false,
      skipError: true,
      apiName: "getAnnouncements",
    },
    getAppConfigVersion: {
      url: `${ApplicationConfiguration.baseUrl}/getApplicationConfigurationVersion`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: false,
      skipError: true,
      apiName: "getAppConfigVersion",
    },
    getAppConfig: {
      url: `${ApplicationConfiguration.baseUrl}/getLinkedApplicationConfiguration`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: false,
      skipError: true,
      apiName: "getAppConfig",
    },
  },
  authentication: {
    authentication: {
      url: `${ApplicationConfiguration.baseUrl}/authenticate`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: false,
      apiName: "authentication",
    },
    userDetail: {
      url: `${ApplicationConfiguration.baseUrl}/service/getEmployeeDetails`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "userDetail",
    },
    sendOtp: {
      url: `${ApplicationConfiguration.baseUrl}/service/sendOTP`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "sendOtp",
    },
    validateOtp: {
      url: `${ApplicationConfiguration.baseUrl}/service/validateOTP`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "validateOtp",
    },
    getSecurityQuestions: {
      url: "",
      httpMethod: "",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getSecurityQuestions",
    },
    forgetPassword: {
      url: "",
      httpMethod: "",
      showActivityIndicator: true,
      authenticationRequired: true,
    },
    getCaptch: {
      url: "",
      httpMethod: "",
      showActivityIndicator: true,
      authenticationRequired: true,
    },
    refreshCaptcha: {
      url: "",
      httpMethod: "",
      showActivityIndicator: true,
      authenticationRequired: true,
    },
    resetPassword: {
      url: "",
      httpMethod: "",
      showActivityIndicator: true,
      authenticationRequired: true,
    },
    loginHelp: {
      url: `${ApplicationConfiguration.baseUrl}/havingTroubleWithLogin`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: false,
      skipError: true,
      apiName: "loginHelp",
    },
    changePassword: {
      url: `${ApplicationConfiguration.baseUrl}/changePassword`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: false,
      apiName: "changePassword",
    },
    updatePassword: {
      url: "",
      httpMethod: "",
      showActivityIndicator: false,
      authenticationRequired: true,
    },
  },
  deviceInformation: {
    checkDeviceAvailability: {
      url: `${ApplicationConfiguration.baseUrl}/service/checkForDeviceRegistration`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      skipError: true,
      apiName: "checkDeviceAvailability",
    },
    registerDevice: {
      url: `${ApplicationConfiguration.baseUrl}/service/registerDevice`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "registerDevice",
    },
    registerDeviceWithOTP: {
      url: `${ApplicationConfiguration.baseUrl}/service/registerDeviceWithOtp`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "registerDeviceWithOTP",
    },
    updateLinkedAppInstallation: {
      url: `${ApplicationConfiguration.baseUrl}/service/updateLinkedApp`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      skipError: true,
      apiName: "updateLinkedAppInstallation",
    },
  },
  learningEnablement: {
    getLearningList: {
      url: `${ApplicationConfiguration.baseUrl}/getMandatoryLearning`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: false,
      skipError: true,
      apiName: "getLearningList",
    },
    getLearningStatus: {
      url: `${ApplicationConfiguration.baseUrl}/service/getMandatoryLearningStatus`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      skipError: true,
      apiName: "getLearningStatus",
    },
    updateLearningStatus: {
      url: `${ApplicationConfiguration.baseUrl}/service/updateLearningCompletionStatus`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "updateLearningStatus",
    },
  },
  attendance: {
    isCheckinAllowed: {
      url: `${ApplicationConfiguration.baseUrl}/service/getCheckInInformation`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "isCheckinAllowed",
    },
    checkIn: {
      url: `${ApplicationConfiguration.baseUrl}/service/employeeCheckInCheckOut`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "checkIn",
    },
    checkOut: {
      url: `${ApplicationConfiguration.baseUrl}/service/employeeCheckInCheckOut`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "checkOut",
    },
    attendanceDetail: {
      url: `${ApplicationConfiguration.baseUrl}/service/getAttendanceDetails/`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "attendanceDetail",
    },
    employeeSearch: {
      url: `${ApplicationConfiguration.baseUrl}/service/getReporteeList`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "employeeSearch",
    },
  },
  location: {
    getStateCityMaster: {
      url: `${ApplicationConfiguration.baseUrl}/service/getStateCityMaster`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getStateCityMaster",
    },
    getBranches: {
      url: `${ApplicationConfiguration.baseUrl}/service/locateBranch`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getBranches",
    },
    shareBranchInformation: {
      url: `${ApplicationConfiguration.baseUrl}/service/shareBranchInformation`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "shareBranchInformation",
    },
  },
  birthdayAndAnniversary: {
    wishTemplate: {
      url: `${ApplicationConfiguration.baseUrl}/service/messageTemplate`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "wishTemplate",
    },
    getTodayBirthdays: {
      url: `${ApplicationConfiguration.baseUrl}/service/getReporteeBirthday`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getTodayBirthdays",
    },
    getTodayAnniversaries: {
      url: `${ApplicationConfiguration.baseUrl}/service/getReporteeAnniversary`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getTodayAnniversaries",
    },
    wishBirthday: {
      url: `${ApplicationConfiguration.baseUrl}/service/wishEmployee`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "wishBirthday",
    },
    wishAnniversary: {
      url: `${ApplicationConfiguration.baseUrl}/service/wishEmployee`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "wishAnniversary",
    },
    searchBirthdayAnniversary: {
      url: `${ApplicationConfiguration.baseUrl}/service/searchBirthdayOrAnniversary`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "searchBirthdayAnniversary",
    },
  },
  communication: {
    getNotices: {
      url: `${ApplicationConfiguration.baseUrl}/service/getNotices`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getNotices",
    },

    getAllNotification: {
      url: `${ApplicationConfiguration.baseUrl}/service/getAllNotificaton`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      skipError: true,
      apiName: "getAllNotification",
    },
    updateNotification: {
      url: `${ApplicationConfiguration.baseUrl}/service/updateNotificatonDetails`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      skipError: true,
      apiName: "updateNotification",
    },
    deleteNotification: {
      url: `${ApplicationConfiguration.baseUrl}/service/deleteCurrentNotificatons`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      skipError: true,
      apiName: "deleteNotification",
    },
    clearNotification: {
      url: `${ApplicationConfiguration.baseUrl}/service/clearAllNotification`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "clearNotification",
    },
  },

  employeeRegisterQuery: {
    getRegisterSapInfo: {
      url: `${ApplicationConfiguration.baseUrl}/service/getRegisterSapInfo`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getRegisterSapInfo",
    },
    getQueryGroupType: {
      url: `${ApplicationConfiguration.baseUrl}/service/getQueryGroupType`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      apiName: "getQueryGroupType",
    },
    sendRegisterQuery: {
      url: `${ApplicationConfiguration.baseUrl}/service/registerQuery`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "sendRegisterQuery",
    },
  },

  employeeTrackQuery: {
    viewQueryStatus: {
      url: `${ApplicationConfiguration.baseUrl}/service/viewQueryStatus`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "viewQueryStatus",
    },
    submitFeedBack: {
      url: `${ApplicationConfiguration.baseUrl}/service/submitFeedBack`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "submitFeedBack",
    },
    trackQuery: {
      url: `${ApplicationConfiguration.baseUrl}/service/trackQuery`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "trackQuery",
    },
    getQueryStatus: {
      url: `${ApplicationConfiguration.baseUrl}/service/getQueryStatus`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getQueryStatus",
    },
  },
  productCorner: {
    getProductDetails: {
      url: `${ApplicationConfiguration.baseUrl}/service/getProductDetails`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "getProductDetails",
    },
    productViewService: {
      url: `${ApplicationConfiguration.baseUrl}/service/productViewService`,
      httpMethod: "POST",
      showActivityIndicator: false,
      authenticationRequired: true,
      apiName: "productViewService",
    },
  },
  forcedNotificationEnablement: {
    getForcedNotificaionList: {
      url: `${ApplicationConfiguration.baseUrl}/service/getForcedNotification`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      skipError: true,
      apiName: "getForcedNotification",
    },
    updateForcedNotification: {
      url: `${ApplicationConfiguration.baseUrl}/service/updateForcedNotification`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "updateForcedNotification",
    },
  },
  odRequest:{
    getODRuleEngine:{
      url: `${ApplicationConfiguration.baseUrl}/ODServices/GetODRuleEngin`,
      httpMethod: "POST",
      showActivityIndicator: true,
      authenticationRequired: true,
      apiName: "GetODRuleEngin"
    },
    getODType:{
      url:`${ApplicationConfiguration.baseUrl}/ODServices/GetODType`,
      httpMethod:"POST",
      showActivityIndicator:true,
      authenticationRequired:true,
      apiName:"GetODType"
    },
    getODReason:{
      url:`${ApplicationConfiguration.baseUrl}/ODServices/GetODReason`,
      httpMethod:"POST",
      showActivityIndicator:true,
      authenticationRequired:true,
      apiName:"GetODReason"
    },

    applyOD:{
      url :`${ApplicationConfiguration.baseUrl}/ODServices/ApplyOD`,
      httpMethod:"POST",
      showActivityIndicator:true,
      authenticationRequired:true,
      apiName:"ApplyOD"

    }
  

  }
};

export default ApiEndpoints;
