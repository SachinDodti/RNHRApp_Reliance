const ApplicationConfiguration = {
  environemnt: "DEV",
  baseUrl: "http://hrconnectdev.reliancenipponlife.com",
  firebaseUrl: "",
  otpTimeout: "3",
  appleId: "1477953329",
  appName: "eKonnect",
  androidPackage: "com.rnhrapp",
  androidStoreUrl: `market://details?id=com.rnhrapp`,
  appleStoreUrl: `https://apps.apple.com/in/app/eKonnect/id1477953329`,
  banca: "banca",
  enableLog: true,
  otpActions: {
    validateMobile: "Mobile_varification",
  },
  contact: {
    mobileNumber: "022-28555240",
    emailId: "helpdesk@rnlic.com",
  },
  scene: {
    LOGIN: "login",
    OTP: "OTP",
    MANDATORY_LEARNING: "MandatoryLearning",
    MANDATORY_APPS: "mandatoryApps",
    DASHBOARD: "dashboard",
    ATTENDANCE: "attendance",
    BIRTHDAY: "birthday",
    ANNIVERSARY: "anniversary",
    NOTICE_BOARD: "noticeBoard",
    GROUP_DETAIL: "groupDetail",
    WEB_VIEWER: "webViewer",
    REPORTEE: "reportee",
    LOCATION_DIRECTORY: "localtionDirectory",
    RESET_PASSWORD: "resetPassword",
    AUTO_UPGRADE: "autoUpgrade",
  },
  font: {
    DEFAULT: "VAGRoundedStd-Light",
  },
  bypassLearning: false,
  bypassAppEnablement: true,
  bypassCandidateEnablement: true,
  iosAllAppOptional: false,
  bypassForceUpgrade: true,
  dateFormat: {
    DEFAUL_FORMAT: "YYYY-MM-DD",
    RESPONSE_TIME_FORMAT: "HH:mm:ss",
    TIME_FORMAT: "hh:mm:ss A",
    SHORT_TIME_FORMAT: "hh:mm A",
    ATTENDANCE_FORMAT: "Do MMMM",
    DETAIL_FORMAT: "Do MMMM YYYY",
    DETAIL_SHORT_FORMAT: "D MMM YYYY",
    NOTICE_BOARD_FORMAT: "DD/MM/YYYY",
    NAVBAR_FORMAT: "DD.MM.YY",
  },
  locationAccuracy: {
    ios: "whenInUse", // or 'always'
    android: {
      detail: "fine", // or 'fine'
    },
  },
};

export const ApplicationGroup = {
  COMMUNICATION: "COMMUNICATIONS",
  HELPDESK: "HELPDESK",
};

export const COMMUNICATION_APPS = [
  {
    title: "Notice Board & Announcement",
    icon:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACGCAYAAABaOoEGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA3LTExVDE3OjExOjU2KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA3LTExVDE3OjExOjU2KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNy0xMVQxNzoxMTo1NiswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphYmQxODZhOS1jNGE1LTE0NGUtOTk1Ny01M2IwMDA2ZTY1NDYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0YTM1ZTZiMi01MzQ2LWZmNDYtOWM0Mi1lZDNkYTgwMDYxZTMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZTBjYmM5Zi0wMTUwLWVlNDEtYjg2Yy1jOTlkMTVlNDQ1NjgiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphZTBjYmM5Zi0wMTUwLWVlNDEtYjg2Yy1jOTlkMTVlNDQ1NjgiIHN0RXZ0OndoZW49IjIwMTktMDctMTFUMTc6MTE6NTYrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWJkMTg2YTktYzRhNS0xNDRlLTk5NTctNTNiMDAwNmU2NTQ2IiBzdEV2dDp3aGVuPSIyMDE5LTA3LTExVDE3OjExOjU2KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNl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",
    navigateTo: ApplicationConfiguration.scene.NOTICE_BOARD,
    showAsRow: true,
  },
];

export default ApplicationConfiguration;
