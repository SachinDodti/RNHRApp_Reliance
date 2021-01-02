import { StyleSheet, Dimensions } from "react-native";
import { getDeviceFontSize } from "../../Util/Resolution";

const { height } = Dimensions.get("screen");

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  appContainer: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    flexDirection: "column",
    marginBottom: height / 9.5,
    marginTop: 0,
  },
  marginUnderkine: {
    marginTop: 40,
  },
  viewContainer: {
    margin: 25,
    marginBottom: 0,
  },
  disclaimer: {
    // fontFamily: ApplicationConfiguration.font.DEFAULT,
    fontSize: getDeviceFontSize(12),
    color: colors.alertTextColor,
    paddingRight: 40,
    // flexWrap: 'wrap',
  },
  collapseHeader: {
    // paddingTop: 20,
    paddingBottom: 10,
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
  appDetailContainer: { flex: 1, flexDirection: "row" },
  headerText: { flex: 10, flexDirection: "row" },
  expandIcon: { height: 10, width: 20 },
  collapse: { paddingTop: 5 },
  showBorder: {
    borderWidth: 1,
    // borderColor: '#ff0000',
  },
  mobileText: {
    marginTop: 10,
    borderColor: colors.proceedBorder,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "VAGRoundedStd-Black",
    color: colors.OTPText,
    fontSize: 14,
    height: 40,
    paddingLeft: 12,
  },
  middletext: {
    paddingTop: 10,
    fontSize: 15,
    textAlign: "center",
  },
  emailText: {
    marginTop: 10,
    marginBottom: 15,
    borderColor: colors.proceedBorder,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "VAGRoundedStd-Black",
    color: colors.OTPText,
    fontSize: 14,
    height: 40,
    paddingLeft: 12,
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  contactView: {
    flex: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  phoneImg: {
    height: 35,
    width: 35,
  },
  phoneNoText: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 20,
    color: colors.proceedBorder,
  },
  flex: {
    flex: 1,
  },
  noDataFound: {
    margin: 10,
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
  },
  container: {
    flex: 1,
  },
});

export default styles;
