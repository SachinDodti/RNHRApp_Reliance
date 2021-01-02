import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./Styles";
import ApplicationConfiguration from "../../../Config/env";
import HrAppUtil from "../../../Util/HrAppUtil";

const SummaryComponentForMonthView = params => {
  // console.log("param in chh", params);
  // HrAppUtil.printDebugLog("Printing debug logs" + JSON.stringify(params));
  if (params.show && !params.showDescription) {
    return (
      <View style={styles.checkStylesIn}>
        <View style={styles.checkDetails}>
          <View style={styles.flex}>
            <Text>Check In : </Text>
          </View>
          <View style={styles.flex}>
            <Text>
              {HrAppUtil.getDateString(
                HrAppUtil.getDate(
                  params.dayData.checkIn,
                  ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT
                ),
                ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT,
                true
              )}
            </Text>
          </View>

          <View style={styles.flex2}>
            <Text numberOfLines={2}>
              {params.dayData.checkInBranch === "" ||
              params.dayData.checkInBranch === null ||
              params.dayData.checkInBranch === undefined
                ? ""
                : params.dayData.checkInBranch}
            </Text>
          </View>
        </View>
        <View style={styles.checkDetails}>
          <View style={styles.flex}>
            <Text>Check Out : </Text>
          </View>
          <View style={styles.flex}>
            <Text>
              {HrAppUtil.getDateString(
                HrAppUtil.getDate(
                  params.dayData.checkOut,
                  ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT
                ),
                ApplicationConfiguration.dateFormat.SHORT_TIME_FORMAT,
                true
              )}
            </Text>
          </View>

          <View style={styles.flex2}>
            <Text numberOfLines={2}>
              {params.dayData.checkOutBranch === "" ||
              params.dayData.checkOutBranch === null ||
              params.dayData.checkOutBranch === undefined
                ? ""
                : params.dayData.checkOutBranch}
            </Text>
          </View>
        </View>
        {/* <View style={styles.checkDetails}>
          <Text>Location</Text>
          <Text>{params.dayData.checkInBranch}</Text>
        </View> */}
      </View>
    );
  }
  if (params.showDescription) {
    return (
      <View style={styles.checkStylesInDescription}>
        <View style={styles.checkDetailsDescription}>
          <Text style={styles.descriptionText}>
            {params.dayData.discription}
          </Text>
        </View>
      </View>
    );
  }
  return null;
};

const SummaryComponentForWeekView = params => {
  // HrAppUtil.printDebugLog("Week view component" + JSON.stringify(params));
  if (params.day && params.day.data.discription === "") {
    // console.log("SummaryComponentForWeekView", params.day.data);
    return (
      <View style={styles.checkStyles}>
        <View style={styles.checkDetails}>
          <Text style={styles.textColor}>
            {params.day.data.checkOutBranchAddress}
          </Text>
        </View>
      </View>
    );
  }
  if (params.day) {
    if (params.day.data.discription !== "") {
      // console.log("SummaryComponentForWeekView", params.day.data);
      return (
        <View style={styles.checkStylesDesc}>
          <View style={styles.checkDetails}>
            <Text style={[styles.textColor, styles.descriptionText]}>
              {params.day.data.discription}
            </Text>
          </View>
        </View>
      );
    }
  }

  return null;
};

export { SummaryComponentForMonthView, SummaryComponentForWeekView };
