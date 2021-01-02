import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import PropTypes from "prop-types";
import styles from "./Styles";
import { monthDescription, dayNames } from "../../../Lib/commonFunctions";
import DayComponent from "../DayComponent";
import { SummaryComponentForMonthView } from "../SummaryComponent";

export default class MonthComponent extends Component {
  constructor(props) {
    super(props);
    const week = dayNames;
    this.state = {
      week,
      showDetails: false,
      dayData: null,
      selectedDate: "",
      showDescription: false,
    };
  }

  keyExtractor = item => item.key + Math.random().toString();

  updateDayView = dayDetails => {
    // console.log('updateDayView', dayDetails);
    this.setState({
      showDetails: dayDetails.attendanceCode === "P",
      showDescription: dayDetails.discription !== "",
      dayData: dayDetails,
      selectedDate: dayDetails.date,
    });
  };

  renderWeeks = dayData => {
    const { selectedDate } = this.state;
    return (
      <DayComponent
        month
        day={dayData.item}
        showDayDetails={this.updateDayView}
        selectedDate={selectedDate}
      />
    );
  };

  renderInlineFlatList = dayItem => (
    <FlatList
      horizontal
      data={dayItem.item}
      renderItem={this.renderWeeks}
      contentContainerStyle={[styles.weekStyling, styles.weekPadding]}
      keyExtractor={this.keyExtractor}
    />
  );

  renderWeekDays = ({ item }) => (
    <View style={styles.daysContainer}>
      <Text key={item.key} style={styles.daysText}>
        {item.dayShortName}
      </Text>
    </View>
  );

  renderWeekDayNames = week => (
    <FlatList
      horizontal
      data={week}
      contentContainerStyle={styles.weekStyling}
      renderItem={this.renderWeekDays}
      keyExtractor={this.keyExtractor}
    />
  );

  renderMonthData = datesDescription => (
    <FlatList
      data={datesDescription}
      renderItem={item => this.renderInlineFlatList(item)}
      keyExtractor={this.keyExtractor}
    />
  );

  getSummaryParams = () => {
    const { showDetails, dayData, showDescription } = this.state;
    // console.log("state in attendance", this.state);
    return {
      show: showDetails,
      showDescription,
      dayData,
    };
  };

  render() {
    // console.log('Month Component', this.props);
    const { week } = this.state;
    const { year, month, attendanceData } = this.props;
    // console.log("state in attendance", attendanceData);
    const datesDescription = monthDescription(year, month, attendanceData);
    const summaryParams = this.getSummaryParams();
    return (
      <View>
        <View>{this.renderWeekDayNames(week)}</View>
        <View>{this.renderMonthData(datesDescription)}</View>
        <SummaryComponentForMonthView {...summaryParams} />
      </View>
    );
  }
}

MonthComponent.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  attendanceData: PropTypes.arrayOf(
    PropTypes.shape({
      attendanceCode: PropTypes.string,
      branch: PropTypes.string,
      branchAddress: PropTypes.string,
      checkIn: PropTypes.string,
      checkOut: PropTypes.string,
      date: PropTypes.string,
      dayOfWeek: PropTypes.string,
    }),
  ),
};

MonthComponent.defaultProps = {
  attendanceData: null,
};
