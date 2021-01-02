import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import {
  IMG_APP_BACKGROUND,
  IMG_MY_TEAM,
  IMG_PROFILE,
} from "../../Assets/images";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
import CalendarComponent from "../../Components/CalendarComponent/index";
import styles from "./AttendanceStyles";
import appStyles from "../appStyles";
import MonthToolBar from "../../Components/MonthToolBar";
import DayWiseComponent from "../../Components/DayWiseAttendance";
import Legends from "../../Components/LegendsComponent";
import { STORAGE_KEY } from "../../Util/LocalStorage";
import HrAppUtil from "../../Util/HrAppUtil";
import ApplicationConfiguration from "../../Config/env";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";

class Attendance extends Component {
  constructor(props) {
    super(props);
    const { auth } = this.props;
    // console.log("auth in attendance", auth);
    this.state = {
      isPopOverOpen: false,
      showMonthView: true,
      showMyCalendar: true,
    };
    this.loadYearMonthCalendar = this.loadYearMonthCalendar.bind(this);
    this.getEncryptedSignature = this.getEncryptedSignature.bind(this);
  }

  async componentDidMount() {
    const { attendance } = this.props;
    const { currentYear, currentMonth, months } = attendance;
    const { loadCalendar } = this.props;
    const monthValue = months[currentMonth].index;
    const sapCode = this.getSapCode();
    const signature = this.getEncryptedSignature(
      currentYear,
      monthValue,
      sapCode,
    );
    const apiReq = {
      year: currentYear,
      month: monthValue,
      sapCode,
      signature,
    };
    await loadCalendar(apiReq);
  }

  getEncryptedSignature = (year, month, sapCode) => {
    const plainText = `${year}_${month}_${sapCode}`;
    const sEncryptedSignature = HrAppUtil.encrypt(plainText);
    return sEncryptedSignature;
  };

  getSapCode = myCalendar => {
    // console.log("Attendance Props : ", this.props);
    const { auth, localStore, showForReportee, reporteeSapCode } = this.props;
    if (!showForReportee || myCalendar) {
      const loggedInUser =
        auth.userProfile ||
        (!HrAppUtil.isNullOrEmpty(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
          ? HrAppUtil.parse(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
          : null);
      return loggedInUser
        ? loggedInUser.sapCode || loggedInUser.panNo
        : "DUMMY";
    }
    this.setState({ showMyCalendar: false });
    return reporteeSapCode;
  };

  onBackPress = () => {
    Actions[ApplicationConfiguration.scene.DASHBOARD]();
  };

  getNavBarProps = () => ({
    includeBack: true,
    includeProfile: true,
    includeNotification: true,
    onBackPress: this.onBackPress,
    includeVersion: true,
  });

  getMonthToolBarProps = (
    showMonthView,
    Year,
    Month,
    Months,
    showForReportee,
    reporteeSapCode,
    reporteeName,
    auth,
    localStore,
    showMyCalendar,
  ) => ({
    monthView: showMonthView,
    month: Month,
    year: Year,
    onToggleWeekMonth: this.toggleWeekMonthView,
    onNextMonth: this.goToNextMonth,
    onPreviousMonth: this.goToPreviousMonth,
    openYearMonthPopOver: this.openPopOver,
    Months,
    showForReportee,
    reporteeSapCode,
    reporteeName,
    auth,
    localStore,
    showMyCalendar,
  });

  getTeamDetail(hasReportee) {
    // const { showForReportee, reporteeSapCode, reporteeName } = this.props;
    const { showForReportee } = this.props;
    // console.log("Props in team detail ", showForReportee);
    if (hasReportee) {
      return (
        <View style={styles.flexDirection}>
          <View style={[styles.teamDetailContainerL]}>
            <TouchableOpacity
              onPress={this.goToMyAttendance}
              style={styles.myTeamView}
            >
              <Image style={styles.imgPositionMyProfile} source={IMG_PROFILE} />
              <Text style={styles.myTeamText}>My Calendar</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.teamDetailContainer]}>
            <TouchableOpacity
              onPress={this.goToReportee}
              style={styles.myTeamView}
            >
              <Image style={styles.imgPosition} source={IMG_MY_TEAM} />
              <Text style={styles.myTeamText}>
                {getText(I18N_CONSTANTS.ATTENDANCE.MY_TEAM)}
              </Text>
            </TouchableOpacity>
            {/* {showForReportee ? (
            <View style={[styles.reporteeDetail]}>
              <Text style={styles.reporteeLabel}>{reporteeSapCode}</Text>
              <Text style={styles.reporteeLabel}>{reporteeName}</Text>
            </View>
          ) : null} */}
          </View>
        </View>
      );
    }

    return null;
  }

  goToPreviousMonth = () => {
    const { showMyCalendar } = this.state;
    const { prevMonth, attendance } = this.props;
    const { currentYear, currentMonth, months } = attendance;
    const prevMonthDateObj = new Date(currentYear, currentMonth - 1);
    const year = prevMonthDateObj.getFullYear();
    const prevMonthValue = prevMonthDateObj.getMonth();
    const sapCode = this.getSapCode(showMyCalendar);
    const monthValue = months[prevMonthValue].index;
    const signature = this.getEncryptedSignature(year, monthValue, sapCode);
    const apiReq = {
      year,
      month: monthValue,
      sapCode,
      signature,
    };
    prevMonth(apiReq);
  };

  goToMyAttendance = () => {
    const { attendance } = this.props;
    const { currentYear, currentMonth, months } = attendance;
    const { prevMonth, loadCalendar } = this.props;
    const monthValue = months[currentMonth].index;
    const sapCode = this.getSapCode(true);
    const signature = this.getEncryptedSignature(
      currentYear,
      monthValue,
      sapCode,
    );
    const apiReq = {
      year: currentYear,
      month: monthValue,
      sapCode,
      signature,
    };
    this.setState({ showMyCalendar: true });
    //   console.log('::::::LOAD CALENDAR');
    prevMonth(apiReq);
  };

  goToNextMonth = () => {
    const { showMyCalendar } = this.state;
    const { nextMonth, attendance } = this.props;
    const { currentYear, currentMonth, months } = attendance;
    const nextMonthDateObj = new Date(currentYear, currentMonth + 1);
    const year = nextMonthDateObj.getFullYear();
    const nextMonthValue = nextMonthDateObj.getMonth();
    const sapCode = this.getSapCode(showMyCalendar);
    const monthValue = months[nextMonthValue].index;
    const signature = this.getEncryptedSignature(year, monthValue, sapCode);
    const apiReq = {
      year,
      month: monthValue,
      sapCode,
      signature,
    };
    nextMonth(apiReq);
  };

  toggleWeekMonthView = () => {
    const { showMonthView } = this.state;
    this.setState({
      showMonthView: !showMonthView,
    });
  };

  openPopOver = () => {
    this.setState({ isPopOverOpen: true });
  };

  checkMonth = month => {
    const { attendance } = this.props;
    const { months } = attendance;
    return months[month];
  };

  checkYear = year => year;

  goToReportee = () => {
    const { searchReportee, localStore, auth } = this.props;
    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        ? HrAppUtil.parse(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        : null);
    const authReq = {
      sapCode: loggedInUser.sapCode,
    };
    searchReportee(authReq);
    Actions.reportee();
  };

  getDayWiseCompProps = (showMonthView, currentYear, currentMonth, data) => ({
    showMonth: showMonthView,
    currentYear,
    currentMonth,
    data,
  });

  setPreviousYear = year => {
    const { previousYear } = this.props;
    previousYear(year);
  };

  setNextYear = year => {
    const { nextYear } = this.props;
    nextYear(year);
  };

  getCalendarCompProps = (Year, Month) => {
    const { isPopOverOpen } = this.state;
    return {
      isVisible: isPopOverOpen,
      Year,
      Month,
      selectYearMonth: this.loadYearMonthCalendar,
      previousYear: this.setPreviousYear,
      nextYear: this.setNextYear,
    };
  };

  async loadYearMonthCalendar(month) {
    const { goToYearMonth, attendance } = this.props;
    const { months, currentYear } = attendance;
    const { showMyCalendar } = this.state;
    const sapCode = this.getSapCode(showMyCalendar);
    const monthValue = months[month].index;
    const signature = this.getEncryptedSignature(
      currentYear,
      monthValue,
      sapCode,
    );
    const apiReq = {
      year: currentYear,
      month: monthValue,
      sapCode,
      signature,
    };
    await goToYearMonth(apiReq);
    this.setState({ isPopOverOpen: false });
  }

  render() {
    const { showMonthView } = this.state;
    // console.log("showForReportee", this.props);
    const { attendance, localStore, auth } = this.props;
    const { showForReportee, reporteeSapCode, reporteeName } = this.props;
    const { showMyCalendar } = this.state;
    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        ? HrAppUtil.parse(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        : null);

    const { currentMonth, currentYear, legends, data } = attendance;
    const navBarProps = this.getNavBarProps();
    const monthToolBarProps = this.getMonthToolBarProps(
      showMonthView,
      currentYear,
      currentMonth,
      attendance.months,
      showForReportee,
      reporteeSapCode,
      reporteeName,
      auth,
      localStore,
      showMyCalendar,
    );

    // console.log(">>>>> Passed : ", currentMonth, currentYear);
    const dayWiseCompProps = this.getDayWiseCompProps(
      showMonthView,
      currentYear,
      currentMonth,
      data,
    );
    const calendarCompProps = this.getCalendarCompProps(
      currentYear,
      currentMonth,
    );
    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={appStyles.backgroundImageStyle}
        >
          <HeaderComponent />
          <NavBarComponent {...navBarProps} />

          <ScrollView
            contentContainerStyle={appStyles.scrollViewParent}
            indicatorStyle="white"
          >
            {this.getTeamDetail(
              loggedInUser ? loggedInUser.hasReportee : false,
            )}
            <View style={styles.yearMonthContainer}>
              <MonthToolBar {...monthToolBarProps} />
              <CalendarComponent {...calendarCompProps} />
            </View>
            <ScrollView
              style={appStyles.scrollViewParent}
              indicatorStyle="white"
            >
              <DayWiseComponent {...dayWiseCompProps} />
              <Legends legend={legends} />
            </ScrollView>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

Attendance.propTypes = {
  auth: PropTypes.shape({}),
  attendance: PropTypes.shape({
    currentYear: PropTypes.number,
    currentMonth: PropTypes.number,
    years: PropTypes.array,
    months: PropTypes.array,
  }).isRequired,
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  loadCalendar: PropTypes.func.isRequired,
  goToYearMonth: PropTypes.func.isRequired,
  previousYear: PropTypes.func.isRequired,
  nextYear: PropTypes.func.isRequired,
};

export default Attendance;
