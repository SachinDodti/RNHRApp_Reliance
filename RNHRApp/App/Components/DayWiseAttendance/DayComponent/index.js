import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Collapse, CollapseHeader, CollapseBody } from "../../Collapsible";
import styles from "./Styles";
import { SummaryComponentForWeekView } from "../SummaryComponent";
import ApplicationConfiguration from "../../../Config/env";
import HrAppUtil from "../../../Util/HrAppUtil";

class DayComponent extends Component {
  constructor(props) {
    super(props);

    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress = dayValue => {
    const { month } = this.props;
    if (month) {
      const { showDayDetails } = this.props;
      showDayDetails(dayValue);
    }
  };

  getDayStyling = dayValue => {
    switch (dayValue) {
      // absent
      case "A":
        return styles.absentStyles;
      // present
      case "P":
        return styles.presentStyles;
      // outdoor/travel meeting
      case "OT":
        return styles.outDoorTravelMeetingStyles;
      // On Duty
      case "OD":
        return styles.onDutyStyles;
      case "OD-Auto":
        return styles.onDutyStyles;
      case "OD-HR":
        return styles.onDutyStyles;
      // leave
      case "L":
        return styles.leaveStyles;
      // public holiday
      case "H":
        return styles.holidayStyles;
      // sunday
      case "S":
        return styles.weekendStyles;
      case "SO":
        return styles.weekendStyles;
      // Waiting for approval
      case "WL":
        return styles.waitingForApprovalStyles;
      // ESS waiting for approval
      case "ESS":
        return styles.essWaitingForApprovalStyles;
      case "UL-CCE":
      case "UC":
        return styles.ulcssUnpaidLeaveStyles;
      default:
        return styles.defaultDayStyles;
    }
  };

  getDayTextStyle = dayValue => {
    switch (dayValue) {
      // absent
      case "A":

      // present
      case "P":

      // outdoor/travel meeting
      case "OT":

      // On Duty
      case "OD":

      // leave
      case "L":

      // public holiday
      case "H":
      // Waiting for approval
      case "WL":
      // ESS waiting for approval
      case "ESS":
      // return styles.whiteDayText;
      // sunday
      case "S":
      case "SO":
      case "UC":
      case "UL-CCE":
        return styles.blackDayText;

      default:
        return styles.whiteDayText;
    }
  };

  dayYTD = (day, data, selectedDate) => {
    // console.log(`selectedDate=${selectedDate} === ${data.date}`, selectedDate === data.date);
    return (
      <TouchableOpacity
        onPress={() => this.onDayPress(data)}
        style={
          selectedDate === data.date
            ? [styles.pressedImpact, styles.daysContainer]
            : [this.getDayStyling(data.attendanceCode), styles.daysContainer]
        }
        key={Math.random().toString()}
      >
        <Text
          style={[
            styles.daysTextDate,
            this.getDayTextStyle(data.attendanceCode)
          ]}
        >
          {day}
        </Text>
        <Text
          style={[
            styles.daysTextDate,
            this.getDayTextStyle(data.attendanceCode)
          ]}
        >
          {data.attendanceCode}
        </Text>
      </TouchableOpacity>
    );
  };

  dayPrevNextMonth = () => (
    <TouchableOpacity
      style={[styles.previousNextMonthStyles, styles.daysContainer]}
      key={Math.random().toString()}
    />
  );

  DayComponentForMonthView = params => {
    const { selectedDate } = params;
    const { day, data } = params.day;
    let dayView = null;
    if (day !== 0 && data != null) {
      dayView = this.dayYTD(day, data, selectedDate);
    } else if (day === "0") {
      dayView = this.dayPrevNextMonth();
    } else {
      dayView = (
        <TouchableOpacity
          opacity={0.3}
          style={[styles.defaultDayStyles, styles.daysContainer]}
          key={Math.random().toString()}
        >
          <Text style={styles.daysText}>{day}</Text>
        </TouchableOpacity>
      );
    }
    return dayView;
  };

  DayComponentForWeekView = params => {
    const { data } = params.day;
    // console.log("in dropdown data", data);
    if (data && data.attendanceCode === "P") {
      return (
        <Collapse>
          <CollapseHeader>
            <View style={styles.weekViewParentHeader}>
              <Text style={styles.daysTextWeek}>{params.dayName}</Text>
              {this.DayComponentForMonthView(params)}
              <View style={styles.weekDayStatus}>
                <Text style={styles.daysText}>
                  {data && data.checkIn
                    ? HrAppUtil.getDateString(
                        HrAppUtil.getDate(
                          data.checkIn,
                          ApplicationConfiguration.dateFormat
                            .RESPONSE_TIME_FORMAT
                        ),
                        ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT
                      )
                    : ""}
                  {"\t"}
                  {data.checkInBranch === "" ||
                  data.checkInBranch === null ||
                  data.checkInBranch === undefined
                    ? ""
                    : data.checkInBranch}
                </Text>
                {/* <Text style={styles.daysText}>{data ? data.checkOut : ''}</Text> */}
                <Text style={styles.daysText}>
                  {data && data.checkOut
                    ? HrAppUtil.getDateString(
                        HrAppUtil.getDate(
                          data.checkOut,
                          ApplicationConfiguration.dateFormat
                            .RESPONSE_TIME_FORMAT
                        ),
                        ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT
                      )
                    : ""}
                  {"\t"}
                  {data.checkOutBranch === "" ||
                  data.checkOutBranch === null ||
                  data.checkOutBranch === undefined
                    ? ""
                    : data.checkOutBranch}
                </Text>
              </View>
              {/* <View style={styles.locationWeekStyles}>
                <Text style={styles.checkInBranch}>
                  {data && data.attendanceCode === "P" ? data.branch : ""}
                </Text>
              </View> */}
            </View>
          </CollapseHeader>
          <CollapseBody>
            {/* <SummaryComponentForWeekView {...params} /> */}
          </CollapseBody>
        </Collapse>
      );
    }
    if (data && data.discription !== "") {
      return (
        <Collapse showIcons>
          <CollapseHeader>
            <View style={styles.weekViewParentHeader}>
              <Text style={styles.daysTextWeek}>{params.dayName}</Text>
              {this.DayComponentForMonthView(params)}
              <View style={styles.weekDayStatus}>
                <Text style={styles.daysText}>
                  {data && data.checkIn
                    ? HrAppUtil.getDateString(
                        HrAppUtil.getDate(
                          data.checkIn,
                          ApplicationConfiguration.dateFormat
                            .RESPONSE_TIME_FORMAT
                        ),
                        ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT
                      )
                    : ""}
                </Text>
                {/* <Text style={styles.daysText}>{data ? data.checkOut : ''}</Text> */}
                <Text style={styles.daysText}>
                  {data && data.checkOut
                    ? HrAppUtil.getDateString(
                        HrAppUtil.getDate(
                          data.checkOut,
                          ApplicationConfiguration.dateFormat
                            .RESPONSE_TIME_FORMAT
                        ),
                        ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT
                      )
                    : ""}
                </Text>
              </View>
              <View style={styles.locationWeekStyles}>
                <Text style={styles.checkInBranch}>
                  {data && data.attendanceCode === "P" ? data.branch : ""}
                </Text>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <SummaryComponentForWeekView {...params} />
          </CollapseBody>
        </Collapse>
      );
    }
    if (data && data.attendanceCode !== "P") {
      return (
        <View style={styles.weekViewParentHeader}>
          <Text style={styles.daysTextWeek}>{params.dayName}</Text>
          {this.DayComponentForMonthView(params)}
          <View style={styles.weekDayStatus}>
            <Text style={styles.daysText}>
              {data && data.checkIn
                ? HrAppUtil.getDateString(
                    HrAppUtil.getDate(
                      data.checkIn,
                      ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT
                    ),
                    ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT
                  )
                : ""}
            </Text>
            <Text style={styles.daysText}>
              {data && data.checkOut
                ? HrAppUtil.getDateString(
                    HrAppUtil.getDate(
                      data.checkOut,
                      ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT
                    ),
                    ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT
                  )
                : ""}
            </Text>
          </View>
          <View style={styles.locationWeekStyles}>
            <Text style={styles.checkInBranch}>
              {data && data.attendanceCode === "P" ? data.branch : ""}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.weekViewParentHeader}>
        <Text style={styles.daysTextWeek}>{params.dayName}</Text>
        {this.DayComponentForMonthView(params)}
      </View>
    );
  };

  DayComponentParameterised = params => {
    if (params.month) {
      return this.DayComponentForMonthView(params);
    }
    return this.DayComponentForWeekView(params);
  };

  render() {
    const { props } = this;
    // console.log('Day Component', this.props);
    return this.DayComponentParameterised(props);
  }
}

DayComponent.propTypes = {
  showDayDetails: PropTypes.func,
  month: PropTypes.bool
};

DayComponent.defaultProps = {
  showDayDetails: null,
  month: true
};

export default DayComponent;
