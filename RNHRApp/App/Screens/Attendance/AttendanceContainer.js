import { connect } from 'react-redux';
import { compose } from 'recompose';
import ApplicationHoc from '../../HOC/ApplicationHoc';
import Attendance from './AttendanceComponent';
import {
  goToMonth, loadPreviousYear, loadNextYear,
  getLegends,
} from '../../Redux/Actions/Attendance-Action';

import {
  loadCalendarAPI,
  loadPreviousMonthAPI,
  loadNextMonthAPI,
  loadYearMonthAPI,
} from '../../Thunk/Attendance-Thunk';

import { getReportee } from '../../Thunk/Reportee-Thunk';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCalendar: request => dispatch(loadCalendarAPI(request)),
    previousYear: year => dispatch(loadPreviousYear(year)),
    nextYear: year => dispatch(loadNextYear(year)),
    nextMonth: request => dispatch(loadPreviousMonthAPI(request)),
    prevMonth: request => dispatch(loadNextMonthAPI(request)),
    goToYearMonth: request => dispatch(loadYearMonthAPI(request)),
    searchReportee: reporteeReq => dispatch(getReportee(reporteeReq)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc,
)(Attendance);
