import { ATTENDANCE_ACTIONS as Actions } from "../Actions/Constants";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const years = [
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021,
];
const months = [
  {
    index: 1,
    shortName: "Jan",
    fullName: "January",
    value: "Jan",
  },
  {
    index: 2,
    shortName: "Feb",
    fullName: "February",
    value: "Feb",
  },
  {
    index: 3,
    shortName: "Mar",
    fullName: "March",
    value: "Mar",
  },
  {
    index: 4,
    shortName: "Apr",
    fullName: "April",
    value: "Apr",
  },
  {
    index: 5,
    shortName: "May",
    fullName: "May",
    value: "May",
  },
  {
    index: 6,
    shortName: "Jun",
    fullName: "June",
    value: "Jun",
  },
  {
    index: 7,
    shortName: "Jul",
    fullName: "July",
    value: "Jul",
  },
  {
    index: 8,
    shortName: "Aug",
    fullName: "August",
    value: "Aug",
  },
  {
    index: 9,
    shortName: "Sep",
    fullName: "September",
    value: "Sep",
  },
  {
    index: 10,
    shortName: "Oct",
    fullName: "October",
    value: "Oct",
  },
  {
    index: 11,
    shortName: "Nov",
    fullName: "November",
    value: "Nov",
  },
  {
    index: 12,
    shortName: "Dec",
    fullName: "December",
    value: "Dec",
  },
];

const legends = [
  {
    color: "#ff4040",
    text: "Absent",
  },
  {
    color: "#bada55",
    text: "Present",
  },
  {
    color: "#8a2be2",
    text: "Outdoor / OD Training",
  },
  {
    color: "#ff7373",
    text: "Leave",
  },

  {
    color: "#ff80ed",
    text: "Public Holiday / Optional Holiday",
  },
  {
    color: "#ffff66",
    text: "Saturday Off",
  },
  {
    color: "#999999",
    text: "WL Leave / Waiting OD",
  },
  {
    color: "#ffff66",
    text: "Sunday",
  },
  {
    color: "#CCCCCC",
    text: "Unpaid Leave / Suspension Period",
  },
  {
    color: "#CCCCCC",
    text: "Unpaid Leave - CCE",
  },
];

// const legends = [
//   {
//     color: '#c46568',
//     text: 'Absent',
//   },
//   {
//     color: '#4d8f6d',
//     text: 'Present',
//   },
//   {
//     color: '#a9934e',
//     text: 'Outdoor / Travel Meeting',
//   },
//   {
//     color: '#b47d5b',
//     text: 'OD Training',
//   },
//   {
//     color: '#c16f8e',
//     text: 'Leave',
//   },
//   {
//     color: '#b680bb',
//     text: 'Public Holiday',
//   },
//   {
//     color: '#4a6c90',
//     text: 'Sunday',
//   },
//   {
//     color: '#00a9a8',
//     text: 'Waiting For Approval',
//   },
//   {
//     color: '#7d86ce',
//     text: 'ESS Leave Waiting For Approval',
//   },
// ];

const AttendanceReducer = (
  state = {
    currentYear,
    currentMonth,
    years,
    months,
    legends,
  },
  action,
) => {
  // console.log('action type', action.type);
  switch (action.type) {
  case Actions.NEXT_YEAR:
    return {
      ...state,
      currentYear: action.data.year,
      currentMonth,
    };
  case Actions.PREVIOUS_YEAR:
    return {
      ...state,
      currentYear: action.data.year,
      currentMonth,
    };
  case Actions.CURRENT_MONTH:
    return {
      ...state,
      currentYear,
      currentMonth,
      data: action.data.attendance,
    };
  case Actions.GO_TO_MONTH:
    // console.log('GO_TO_MONTH', action.data.year, action.data.month);
    const dateObj = new Date(
      action.data.year,
      parseInt(action.data.month, 10) - 1,
    );
    return {
      ...state,
      currentYear: dateObj.getFullYear(),
      currentMonth: dateObj.getMonth(),
      data: action.data.attendance,
    };
  default:
    return {
      ...state,
      currentYear,
      currentMonth,
    };
  }
};

export default AttendanceReducer;
