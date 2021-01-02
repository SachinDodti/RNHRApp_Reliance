import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { monthDescription, dayNames } from "../../../Lib/commonFunctions";
import DayComponent from "../DayComponent";
import { SummaryComponentForWeekView } from "../SummaryComponent";

class WeekViewComponent extends Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = item => item.key + Math.random().toString();

  renderDays = dayData => (
    <DayComponent
      month={false}
      dayName={dayNames[dayData.index].dayShortName}
      day={dayData.item}
      status="P"
    />
  );

  renderWeek = weekData => (
    <FlatList
      horizontal={false}
      data={weekData.item}
      renderItem={item => this.renderDays(item)}
      ItemSeparatorComponent={Divider}
      keyExtractor={this.keyExtractor}
    />
  );

  getWeekView = datesDescription => (
    <View>
      <FlatList
        data={datesDescription}
        renderItem={item => this.renderWeek(item)}
        ItemSeparatorComponent={Divider}
        key={Math.random().toString()}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );

  render() {
    const { year, month, attendanceData } = this.props;
    const datesDescription = monthDescription(year, month, attendanceData);
    return (
      <ScrollView indicatorStyle="white">
        {this.getWeekView(datesDescription)}
        <SummaryComponentForWeekView />
      </ScrollView>
    );
  }
}

export default WeekViewComponent;

WeekViewComponent.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};
