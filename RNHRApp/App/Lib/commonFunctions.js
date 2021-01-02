import _ from 'lodash';
import { AppInstalledChecker } from 'react-native-check-app-install';
import { getAppstoreAppVersion } from 'react-native-appstore-version-checker';

function _getWeeksInAMonth(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0);
  return Math.ceil((lastDay.getDate() + firstDay) / 7);
}

function initCurrentMonthArray(year, month) {
  const numberOfWeeks = _getWeeksInAMonth(year, month);
  const currentMonthArray = [];
  for (let iWeek = 0; iWeek < numberOfWeeks; iWeek += 1) {
    currentMonthArray.push(new Array(7).fill({ day: '0', data: null }, 0, 7));
  }
  return currentMonthArray;
}

export function getWeeksInAMonth(year, month) {
  return _getWeeksInAMonth(year, month);
}

function getFormattedDate(year, month, day, seperator) {
  const dateObj = new Date(year, month, day);
  const yearValue = dateObj.getFullYear();
  const monthValue = dateObj.getMonth() + 1;
  // monthValue = monthValue < 10 ? `0${monthValue}` : monthValue;
  const dayValue = dateObj.getDate();
  // dayValue = dayValue < 10 ? `0${dayValue}` : dayValue;
  return {
    dateObj,
    formattedDate: yearValue + seperator + monthValue + seperator + dayValue,
  };
}

function getAttendanceData(attendanceData, dateValue) {
  return _.filter(attendanceData, attendanceDataItem => attendanceDataItem.date === dateValue);
}

export function monthDescription(year, month, attendanceData) {
  // console.log('MonthDescription', attendanceData);
  let iWeekStart = 0;
  const currentMonthArray = initCurrentMonthArray(year, month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let iDay = 1; iDay <= daysInMonth; iDay += 1) {
    const dateOfMonth = getFormattedDate(year, month, iDay, '-');
    const attendanceValues = getAttendanceData(attendanceData, dateOfMonth.formattedDate);
    const dayDateInfo = dateOfMonth.dateObj.getDay();
    iWeekStart = (dayDateInfo === 0 && iDay > 1) ? (iWeekStart + 1) : iWeekStart;
    const attendanceValuesObject = {
      day: iDay < 10 ? `0${iDay}` : iDay.toString(),
      data: attendanceValues.length > 0 ? attendanceValues[0] : null,
    };
    currentMonthArray[iWeekStart][dayDateInfo] = attendanceValuesObject;
  }
  // console.log('currentMonthArray', currentMonthArray);
  return currentMonthArray;
}


export function getSelectedYear(years, selectedYear) {
  return _.filter(years, yearItem => yearItem.value === selectedYear)[0];
}

export const dayNames = [
  { dayShortName: 'S', dayFullName: 'Sunday' },
  { dayShortName: 'M', dayFullName: 'Monday' },
  { dayShortName: 'T', dayFullName: 'Tuesday' },
  { dayShortName: 'W', dayFullName: 'Wednesday' },
  { dayShortName: 'T', dayFullName: 'Thursday' },
  { dayShortName: 'F', dayFullName: 'Friday' },
  { dayShortName: 'S', dayFullName: 'Saturday' },
];

export function checkAppInstalledAndGetVersion(appId) {
  AppInstalledChecker.isAppInstalledAndroid(appId).then((isInstalled) => {
    if (isInstalled) {
      getAppstoreAppVersion(appId).then((appVersion) => {
        // console.log('clashofclans android app version on playstore', appVersion);
      }).catch((err) => {
        // console.log('error occurred', err);
      });
    }
  });
}

export const months = [
  [
    { index: 0, shortName: 'Jan', fullName: 'January' },
    { index: 1, shortName: 'Feb', fullName: 'February' },
    { index: 2, shortName: 'Mar', fullName: 'March' },
  ],
  [
    { index: 3, shortName: 'Apr', fullName: 'April' },
    { index: 4, shortName: 'May', fullName: 'May' },
    { index: 5, shortName: 'Jun', fullName: 'June' },
  ],
  [
    { index: 6, shortName: 'Jul', fullName: 'July' },
    { index: 7, shortName: 'Aug', fullName: 'August' },
    { index: 8, shortName: 'Sep', fullName: 'September' },
  ],
  [
    { index: 9, shortName: 'Oct', fullName: 'October' },
    { index: 10, shortName: 'Nov', fullName: 'November' },
    { index: 11, shortName: 'Dec', fullName: 'December' },
  ],
];
