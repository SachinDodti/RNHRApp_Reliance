import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./Styles";
import {
  IMG_ICON_DATE_DROPUP,
  IMG_ICON_DATE_DROPDOWN,
  IMG_ICON_LIST,
  IMG_ICON_CALENDAR
} from "../../Assets/images";

import HrAppUtil from "../../Util/HrAppUtil";
import { STORAGE_KEY } from "../../Util/LocalStorage";
// import months from '../../Lib/commonFunctions';
// const MonthToolBar = params => (
//   <View style={styles.toolBarParent}>
//     <View style={styles.monthToolBarStyles}>
//       <TouchableOpacity onPress={params.openYearMonthPopOver}>
//         <Text style={styles.txtStyle}>
//           {params.month.shortName}
//           -
//           {params.year.value}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={params.onNextMonth}>
//         <Image source={IMG_ICON_DATE_DROPDOWN} style={styles.dropUpDownStyles} />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={params.onPreviousMonth}>
//         <Image source={IMG_ICON_DATE_DROPUP} style={styles.dropUpDownStyles} />
//       </TouchableOpacity>
//     </View>
//     <View style={styles.listImgContainer}>
//       <TouchableOpacity onPress={params.onToggleWeekMonth}>
//         <Image
//           source={params.monthView ? IMG_ICON_LIST : IMG_ICON_CALENDAR}
//           style={styles.monthWeekSwitch}
//         />
//       </TouchableOpacity>
//     </View>
//   </View>
// );

const keyLoggedInUser = STORAGE_KEY.USER.LOGGEDIN_USER;

class MonthToolBar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  getYearMonth = (year, month, Months) => ({
    year,
    month: Months[month].shortName
  });

  render() {
    const {
      monthView,
      openYearMonthPopOver,
      month,
      year,
      onNextMonth,
      onPreviousMonth,
      onToggleWeekMonth,
      Months,
      showForReportee,
      reporteeSapCode,
      reporteeName,
      auth,
      localStore,
      showMyCalendar
    } = this.props;
    // console.log(">>>>> Passed Rendered: ", year, month);
    const yearMonthValues = this.getYearMonth(year, month, Months);
    // console.log("Show My Calendar : ", showMyCalendar);

    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[keyLoggedInUser])
        ? HrAppUtil.parse(localStore[keyLoggedInUser])
        : null);
    const sapCode = loggedInUser
      ? loggedInUser.sapCode || loggedInUser.panNo
      : "DUMMY";
    const fullName = loggedInUser
      ? `${loggedInUser.firstName} ${loggedInUser.middleName || ""} ${
          loggedInUser.lastName
        }`
      : "DUMMY";
    // console.log("My Detail", sapCode, fullName);
    // console.log("Reportee Detail", reporteeSapCode, reporteeName);
    // console.log('month in toolbar', month);
    // console.log('year in toolbar', year);
    // console.log('yearMonthValues', yearMonthValues);

    return (
      <View style={styles.toolBarParent}>
        <View style={styles.monthToolBarStyles}>
          <TouchableOpacity onPress={openYearMonthPopOver}>
            <Text style={styles.txtStyle}>
              {yearMonthValues.month}-{yearMonthValues.year}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextMonth}>
            <Image
              source={IMG_ICON_DATE_DROPDOWN}
              style={styles.dropUpDownStylesL}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPreviousMonth}>
            <Image
              source={IMG_ICON_DATE_DROPUP}
              style={styles.dropUpDownStylesR}
            />
          </TouchableOpacity>

          {!showMyCalendar ? (
            <View style={[styles.reporteeDetail]}>
              <Text style={styles.reporteeLabel}>{reporteeSapCode}</Text>
              <Text numberOfLines={2} style={styles.reporteeLabel}>
                {reporteeName}
              </Text>
            </View>
          ) : (
            <View style={[styles.reporteeDetail]}>
              <Text style={styles.reporteeLabel}>{sapCode}</Text>
              <Text numberOfLines={2} style={styles.reporteeLabel}>
                {fullName}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.listImgContainer}>
          <TouchableOpacity onPress={onToggleWeekMonth}>
            <Image
              source={monthView ? IMG_ICON_LIST : IMG_ICON_CALENDAR}
              style={styles.monthWeekSwitch}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MonthToolBar;
