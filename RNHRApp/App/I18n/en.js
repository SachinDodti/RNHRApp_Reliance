import ApplicationConfiguration from "../Config/env";

export default {
  common: {
    cancel: "Cancel",
    ok: "OK",
    submit: "Submit",
    error: "Error",
    close: "Close",
    next: "Next",
    exception: "Exception",
    proceed: "Proceed",
    installed: "Installed",
    installNow: "Install Now",
    helpMailSubject: "Help required for log-in issue.",
    helpMailBody: "Please find the below detail of the issue : ",
    helpMessage:
      "If you are facing any issue to login to the application, request to please connect at ",
    noResultFound: "No Records Found",
    warning: "Warning",
    reset: "Reset",
    upgrade: "Upgrade Now",
  },
  router: {
    login: "Login",
    otp: "OTP",
    dashboard: "Dashboard",
    attendance: "Attendance",
    mandatoryLearning: "Mandatory Learning",
    birthday: "Birthday",
    anniversary: "Anniversary",
    webViewer: "Web View",
    reportee: "Reportee",
    mandatoryApps: "Mandatory App Enablement",
    locationDirectory: "Location Directory",
    noticeBoard: "Notice Board",
    resetPassword: "Reset Password",
    autoUpgrade: "Auto Upgrade",
  },
  login: {
    employee: "Employee",
    candidate: "Candidate",
    sapCode: "SAP Code",
    domainPassword: "Domain Password",
    phonePassword: "Registered Mobile Number",
    panNumber: "Pan Number",
    login: "Login",
    rememberMe: "Remember me",
    troubleLoggingIn: "Having trouble in logging ?",
    registrationFound: "Your Login is already registered to the other device",
    registrationConfirm:
      "Do you wish to Register this device, if Yes please tap on 'Proceed'",
    registerDeviceNote:
      "Note: Register to new device will De-register your login credentials from previous device",
    emplpoyeeWarning: "Please ensure you have provided correct credential",
    candidateWarning:
      "Please ensure you have provided both Pan Number and Mobile Number",
    deviceWarning:
      "This device is not registered with you. Please login again.",
    minSapCodeWarning: "Kindly update your 8 digit SAP code",
    newDomainPassword: "New Password",
  },
  otp: {
    registered: "Mobile number registered with us",
    getOTP: "Get OTP",
    resendOTP: "Resend OTP",
    resendOTPSuccess: "OTP has been sent successfully",
    enterOTP: "Enter OTP *",
    validText: `This OTP is valid only for the next ${ApplicationConfiguration.otpTimeout} minutes`,
    submitOTP: "Submit OTP",
    minOtpWarning: "Kindly provide your 4 digit OTP",
    warningService:
      "In case you have not received the OTP on your registered number contact your mobile service provider",
  },
  attendance: {
    searchBar: "Enter your Search",
    myTeam: "My Team",
    simulatorNotAllowed: "Check-in/Check-out not allowed from a simulator",
    mockLocationNotAllowed:
      "Check-in/Check-out not allowed for mock location. Please uninstall mock location provider application(s)",
  },
  mandatoryApps: {
    info:
      "Please install below mentioned list of mandatory applications assigned by your buisness unit",
    requiredHeader: "Mandatory Applications",
    optionalHeader: "Other Linked Applications",
    cancelMessage:
      "On selecting 'Proceed' you will be redirected to the login page.",
  },
  reportee: {
    header: " Direct Reportees: Click on the name to view",
  },
  wishes: {
    birthdayHeader: "Today's Birthday List",
    birthdaySearchResult: "Search Result",
    anniversaryHeader: "Today's Anniversary List",
    empSearch: "Enter Full Name",
    sapSearch: "Enter SAP Code",
    defaultSearch: "Please select from dropdown",
  },
  switch: {
    sendWish: "Send Wishes",
    inApp: "In App",
    sms: "SMS",
    email: "Email",
  },
  noticeBoard: {
    headerText:
      "Please make sure you have appropriate application installed to have optimum view of document available for download",
  },
  mandatoryLearnings: {
    agree: "I have read",
    next: "Next",
  },
  locationDirectory: {
    loadingText: "Find a Branch near you",
  },
  dashboard: {
    iosVersion: `IOS Version - ${ApplicationConfiguration.verision}`,
    androidVersion: `Android Version - ${ApplicationConfiguration.verision}`,
  },
  resetPassword: {
    headerText: "Reset password",
    enterSapCode: "Enter SAP Code",
    enterNewPassword: "Enter New Password",
    enterOtp: "Enter OTP",
  },
};
