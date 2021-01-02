import React from 'react';
import PropTypes from 'prop-types';
import MonthComponent from './MonthComponent';
import WeekViewComponent from './WeekViewComponent';

const DayWiseComponent = (props) => {
  const {
    showMonth, currentYear, currentMonth, data,
  } = props;
  if (showMonth && data) {
    return (
      <MonthComponent
        year={currentYear}
        month={currentMonth}
        attendanceData={data}
      />
    );
  }
  if (!showMonth && data) {
    return (
      <WeekViewComponent
        year={currentYear}
        month={currentMonth}
        attendanceData={data}
      />
    );
  }
  return null;
};

DayWiseComponent.propTypes = {
  showMonth: PropTypes.bool.isRequired,
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    branch: PropTypes.string.isRequired,
    branchAddress: PropTypes.string.isRequired,
    attendanceCode: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    dayOfWeek: PropTypes.string.isRequired,
  })),
};

DayWiseComponent.defaultProps = {
  data: null,
};

export default DayWiseComponent;
