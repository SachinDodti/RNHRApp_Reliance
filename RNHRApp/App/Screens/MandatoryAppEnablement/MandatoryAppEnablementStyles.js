import { StyleSheet, Dimensions } from "react-native";
import {
  convertToDeviceResolution,
  getDeviceFontSize,
} from "../../Util/Resolution";
import ApplicationConfiguration from "../../Config/env";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  appContainer: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    flexDirection: "column",
  },

  viewContainer: {
    margin: 25,
  },
  disclaimer: {
    fontFamily: ApplicationConfiguration.font.DEFAULT,
    fontSize: 18,
    color: colors.alertTextColor,
  },
  collapseHeader: {
    // paddingTop: 20,
    paddingBottom: 20,
    // fontFamily: ApplicationConfiguration.font.DEFAULT,
    // fontSize: getDeviceFontSize(12),
    // color: colors.alertTextColor,
  },
  dropdownImgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: { flex: 1, flexDirection: "row" },
  headerText: { flex: 10, flexDirection: "row" },
  expandIcon: { height: 10, width: 20 },
  collapse: { paddingTop: 5 },
  showBorder: {
    borderWidth: 1,
    borderColor: colors.backgroundColor,
  },
});

export default styles;
