import { Actions } from "react-native-router-flux";
import getAttendanceAction from "../Redux/Actions/Dashboard-Action";
import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import { loadCalendar, goToMonth } from "../Redux/Actions/Attendance-Action";
import syncStoreToState from "./LocalStorageThunk";
import HrAppUtil from "../Util/HrAppUtil";
import { showMessage } from "../Redux/Actions/ApplicationStateAction";
import ApplicationConstants from "../Constants/ApplicationContants";
// import { getText } from '../I18n/Lang';
// import I18N_CONSTANTS from '../I18n/LanguageConstants';

export const getAttendance = () => dispatch => {
  dispatch(getAttendanceAction());
  Actions.attendance();
  // Actions.MandatoryLearning();
};

export const updateAttendanceInfo = localStore => dispatch => {
  // console.log('updateAttendanceInfo in thunk', localStore);
  const multiStore = [];

  if (
    !HrAppUtil.isNullOrEmpty(
      localStore[STORAGE_KEY.CHECKINOUT.LASTCHECKINDATE],
    ) &&
    localStore[STORAGE_KEY.CHECKINOUT.LASTCHECKINDATE] !==
      HrAppUtil.getDateString()
  ) {
    multiStore.push([STORAGE_KEY.CHECKINOUT.LASTCHECKINDATE, ""]);
    multiStore.push([STORAGE_KEY.CHECKINOUT.CHECKINTIME, ""]);
    multiStore.push([STORAGE_KEY.CHECKINOUT.LASTCHECKOUTDATE, ""]);
    multiStore.push([STORAGE_KEY.CHECKINOUT.CHECKOUTTIME, ""]);
    LocalStorageUtil.storeMultiple(multiStore).then(() =>
      dispatch(syncStoreToState()),
    );
  }
};
export const performCheckIn = request => dispatch => {
  // console.log('check in thunk', request);
  //   //API  CALL
  let response = null;
  const multiStore = [];
  invokeApi(dispatch, ApiEndpoints.attendance.checkIn, request)
    .then(result => {
      response = result;
      // console.log('Response from the check in API', result);
      // console.log('Response from the check in API', response.data.date);
      const alreadyCheckedIn = !!(
        result.data.status && result.data.status.toUpperCase() === "FAILED"
      );
      multiStore.push([
        STORAGE_KEY.CHECKINOUT.LASTCHECKINDATE,
        response.data.date ? response.data.date : HrAppUtil.getDateString(),
      ]);
      multiStore.push([
        STORAGE_KEY.CHECKINOUT.CHECKINTIME,
        response.data.time ? response.data.time : "",
      ]);
      // multiStore.push([STORAGE_KEY.CHECKINOUT.LASTCHECKOUTDATE, ""]);
      // multiStore.push([STORAGE_KEY.CHECKINOUT.CHECKOUTTIME, ""]);
      dispatch(
        showMessage(
          result.data.message,
          alreadyCheckedIn
            ? ApplicationConstants.messageType.WARNING
            : ApplicationConstants.messageType.SUCCESS,
          "Check-in",
        ),
      );

      LocalStorageUtil.storeMultiple(multiStore);
    })
    .catch(error => {
      // console.log('within check in fail');
      // console.log(error);
      // dispatch(getAuthenticateFaliure(error));
    })
    .finally(() => {
      dispatch(syncStoreToState());
    });

  // Actions.MandatoryLearning();
};

export const performCheckOut = request => dispatch => {
  // console.log('check out thunk', request);
  //   //API  CALL
  let response = null;
  const multiStore = [];
  invokeApi(dispatch, ApiEndpoints.attendance.checkOut, request)
    .then(result => {
      response = result;
      const alreadyCheckedOut = !!(
        result.data.status && result.data.status.toUpperCase() === "FAILED"
      );
      // console.log('Response from the check in API', response);
      multiStore.push([
        STORAGE_KEY.CHECKINOUT.LASTCHECKOUTDATE,
        response.data.date ? response.data.date : HrAppUtil.getDateString(),
      ]);
      multiStore.push([
        STORAGE_KEY.CHECKINOUT.CHECKOUTTIME,
        response.data.time ? response.data.time : "NA",
      ]);
      dispatch(
        showMessage(
          result.data.message,
          alreadyCheckedOut
            ? ApplicationConstants.messageType.WARNING
            : ApplicationConstants.messageType.SUCCESS,
          "Check-out",
        ),
      );
      LocalStorageUtil.storeMultiple(multiStore);

      // check device registration
    })
    .catch(error => {
      // console.log('within check out fail');
      // console.log(error);
      // dispatch(getAuthenticateFaliure(error));
    })
    .finally(() => {
      dispatch(syncStoreToState());
    });

  // Actions.MandatoryLearning();
};

// export default getAttendance;

// async function getAttendanceData(dispatch, request) {
//   const apiResponse = await invokeApi(dispatch, request);
//   return apiResponse;
// }

export const loadCalendarAPI = request => dispatch => {
  // console.log('loadCalendarAPI', request);
  // const url = `${ApiEndpoints.attendance.attendanceDetail.url
  //   + request.sapCode}/${request.year}/${request.month}`;
  // const attendanceAPIParams = {
  //   url,
  //   httpMethod: 'GET',
  //   authenticationRequired: true,
  // };
  // const attendanceData = getAttendanceData(dispatch, attendanceAPIParams);
  // attendanceData.then(x => dispatch(loadCalendar(x.data)));
  invokeApi(dispatch, ApiEndpoints.attendance.attendanceDetail, request)
    .then(attendanceData => dispatch(loadCalendar(attendanceData.data)))
    .catch(() => console.log("exception while calling attendance api"));
};

export const loadPreviousMonthAPI = request => dispatch => {
  // const url = `${ApiEndpoints.attendance.attendanceDetail.url
  //   + request.sapCode}/${request.year}/${request.month}`;
  // const attendanceAPIParams = {
  //   url,
  //   httpMethod: 'GET',
  //   authenticationRequired: true,
  // };
  // const attendanceData = getAttendanceData(dispatch, attendanceAPIParams);
  // attendanceData.then(x => dispatch(goToMonth(x.data)));
  // console.log("loadPreviousMonthAPI", request);
  invokeApi(dispatch, ApiEndpoints.attendance.attendanceDetail, request)
    .then(attendanceData => dispatch(goToMonth(attendanceData.data)))
    .catch(() => console.log("exception while calling attendance api"));
};

export const loadNextMonthAPI = request => dispatch => {
  // console.log("loadNextMonthAPI", request);
  // const url = `${ApiEndpoints.attendance.attendanceDetail.url
  //   + request.sapCode}/${request.year}/${request.month}`;
  // const attendanceAPIParams = {
  //   url,
  //   httpMethod: 'GET',
  //   authenticationRequired: true,
  // };
  // const attendanceData = getAttendanceData(dispatch, attendanceAPIParams);
  // attendanceData.then(x => dispatch(goToMonth(x.data)));
  invokeApi(dispatch, ApiEndpoints.attendance.attendanceDetail, request)
    .then(attendanceData => dispatch(goToMonth(attendanceData.data)))
    .catch(() => console.log("exception while calling attendance api"));
};

export const loadYearMonthAPI = request => dispatch => {
  // console.log("loadYearMonthAPI", request);
  // console.log('loadYearMonthAPI', request);
  // const url = `${ApiEndpoints.attendance.attendanceDetail.url
  //   + request.sapCode}/${request.year}/${request.month}`;
  // const attendanceAPIParams = {
  //   url,
  //   httpMethod: 'GET',
  //   authenticationRequired: true,
  // };
  // const attendanceData = getAttendanceData(dispatch, attendanceAPIParams);
  // attendanceData.then(x => dispatch(goToMonth(x.data)));
  invokeApi(dispatch, ApiEndpoints.attendance.attendanceDetail, request)
    .then(attendanceData => dispatch(goToMonth(attendanceData.data)))
    .catch(() => console.log("exception while calling attendance api"));
};
