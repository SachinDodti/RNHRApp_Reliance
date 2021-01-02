
import { ATTENDANCE_ACTIONS } from './Constants';

export function goToMonth(attendanceData) {
  return {
    type: ATTENDANCE_ACTIONS.GO_TO_MONTH,
    data: attendanceData,
  };
}

export function goToday() {
  return {
    type: ATTENDANCE_ACTIONS.GO_TODAY,
    data: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    },
  };
}

export function loadCalendar(attendanceData) {
  return {
    type: ATTENDANCE_ACTIONS.CURRENT_MONTH,
    data: attendanceData,
  };
}

export function loadPreviousYear(year) {
  return {
    type: ATTENDANCE_ACTIONS.PREVIOUS_YEAR,
    data: {
      year,
    },
  };
}

export function loadNextYear(year) {
  return {
    type: ATTENDANCE_ACTIONS.NEXT_YEAR,
    data: {
      year,
    },
  };
}
