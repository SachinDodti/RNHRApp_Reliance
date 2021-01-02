import React from "react";
import { Text, View, Platform } from "react-native";
import styles from "./Styles";
import I18N_CONSTANTS from "../../../I18n/LanguageConstants";
import { getText } from "../../../I18n/Lang";
import HrAppUtil from "../../../Util/HrAppUtil";
import ApplicationConfiguration from "../../../Config/env";

const date = new Date().getDate(); // Current Date
const month = new Date().getMonth() + 1; // Current Month
const year = new Date().getFullYear(); // Current Year
const hours = new Date().getHours(); // Current Hours
const min = new Date().getMinutes(); // Current Minutes
const sec = new Date().getSeconds(); // Current Seconds
const todayDateFormat = `${year}-${month}-${date} ${hours}:${min}:${sec}`;

const Version = () => (
  <View style={styles.view}>
    <Text style={styles.text}>{HrAppUtil.getApplicationVersionWithOs()}</Text>
    <Text style={styles.text}>
      {HrAppUtil.getDateString(
        HrAppUtil.getDate(
          todayDateFormat,
          ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT,
        ),
        ApplicationConfiguration.dateFormat.NAVBAR_FORMAT,
      )}
    </Text>
  </View>
);

export default Version;
