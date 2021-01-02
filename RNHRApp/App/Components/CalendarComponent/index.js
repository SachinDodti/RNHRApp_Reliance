import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view';
import {
  View, TouchableOpacity, Image, Text,
  FlatList,
} from 'react-native';
import { months } from '../../Lib/commonFunctions';
import styles from './Styles';
import {
  IMG_ICON_ATTENDANCE_ARROW_LEFT, IMG_ICON_ATTENDANCE_ARROW_RIGHT,
} from '../../Assets/images';

class CalendarComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  keyExtractor = item => item.key + Math.random().toString();

  yearMonthSelected = (month) => {
    const { selectYearMonth } = this.props;
    selectYearMonth(month);
  }

  printMonth = (monthItem) => {
    const { Month } = this.props;
    const monthStyle = Month === monthItem.item.index
      ? styles.selectedMonthStyle : styles.monthStyle;
    const monthTextStyle = Month === monthItem.item.index
      ? styles.selectedMonthtextStyle : styles.monthTextStyle;
    return (
      <TouchableOpacity
        style={monthStyle}
        onPress={() => this.yearMonthSelected(monthItem.item.index)}
      >
        <View>
          <Text style={monthTextStyle}>{monthItem.item.shortName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  printQuarter = quarter => (
    <FlatList
      horizontal
      data={quarter.item}
      contentContainerStyle={styles.quarterListStyle}
      renderItem={item => this.printMonth(item)}
      keyExtractor={this.keyExtractor}
    />
  );

  getMonths = () => {
    const { isVisible } = this.props;
    if (isVisible) {
      return (
        <FlatList
          data={months}
          renderItem={item => this.printQuarter(item)}
          keyExtractor={this.keyExtractor}
        />
      );
    }
    return null;
  };

  previousYear = () => {
    const { previousYear, Year } = this.props;
    // console.log('Calendar component previousYear', Year, Year - 1);
    previousYear(Year - 1);
  };

  nextYear = () => {
    const { nextYear, Year } = this.props;
    // console.log('Calendar component nextYear', Year, Year + 1);
    nextYear(Year + 1);
  }

  yearNavigate = Year => (
    <View style={styles.yearNavigate}>
      <TouchableOpacity style={styles.prevYearStyle} onPress={this.previousYear}>
        <Image source={IMG_ICON_ATTENDANCE_ARROW_LEFT} style={styles.arrowStyle} />
      </TouchableOpacity>
      <View style={styles.yearContainer}>
        <Text style={styles.yearTxtStyle}>{Year}</Text>
      </View>
      <TouchableOpacity style={styles.nextYearStyle} onPress={this.nextYear}>
        <Image source={IMG_ICON_ATTENDANCE_ARROW_RIGHT} style={styles.arrowStyle} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { isVisible, Year } = this.props;
    return (
      <Popover isVisible={isVisible}>
        <View style={styles.yearMonthParent}>
          <View>
            {this.yearNavigate(Year)}
          </View>
          <View style={styles.underLine} />
          <View>
            {this.getMonths()}
          </View>
        </View>
      </Popover>
    );
  }
}

CalendarComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  selectYearMonth: PropTypes.func.isRequired,
  Year: PropTypes.number.isRequired,
  Month: PropTypes.number.isRequired,
  previousYear: PropTypes.func.isRequired,
  nextYear: PropTypes.func.isRequired,
};

export default CalendarComponent;
