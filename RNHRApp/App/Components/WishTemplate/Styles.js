import { StyleSheet, Dimensions } from "react-native";
import { getDeviceFontSize } from "../../Util/Resolution";
import ApplicationConfiguration from "../../Config/env";

const { height, width } = Dimensions.get("screen");

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  btnContainerStyle: {
    padding: 10,
    width: 150,
  },
  btnProceedTextStyle: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.proceedBorder,
  },
  btnCancelTextStyle: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.cancelBorder,
  },
  btnCancelStyles: {
    borderColor: colors.cancelBorder,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnProceedStyles: {
    borderColor: colors.proceedBorder,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnViewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
  txtStyleNote: {
    paddingTop: 20,
    fontFamily: "VAGRoundedStd-Light",
    color: colors.alertTextColor,
    paddingLeft: 5,
    paddingRight: 5,
  },
  dividerStyle: {
    backgroundColor: colors.lineColor,
    paddingLeft: 5,
    paddingRight: 5,
  },
  txtStyle: {
    paddingBottom: 20,
    fontFamily: "VAGRoundedStd-Light",
    color: colors.alertTextColor,
    paddingLeft: 5,
    paddingRight: 5,
  },
  imgErrorContainer: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 40,
  },
  border: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  buttonContainerLeftCheckIn11: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 130,
  },
  lowerBorder: {
    borderBottomColor: colors.black,
    borderBottomWidth: 0.5,
    marginLeft: 15,
    marginRight: 15,
    // paddingTop: 0,
    borderTopColor: colors.black,
    borderTopWidth: 0.5,
    borderLeftColor: colors.black,
    borderLeftWidth: 0.5,
  },
  imgRightUpper: {
    resizeMode: "contain",
    height: 28,
    // margin: 10,
    justifyContent: "flex-end",
    width: 28,
  },
  headerText: {
    marginTop: 10,
    fontSize: 18,
    color: colors.black,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  headerTextName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  notificationText: {
    // marginTop: 0,
    // fontSize: 20,
    // color: colors.black,
    // alignSelf: 'flex-start',
    // paddingLeft: 20,
    margin: 20,
    color: colors.alertTextColor,
    fontFamily: ApplicationConfiguration.font.DEFAULT,
    fontSize: getDeviceFontSize(12),
  },
  dateText: {
    marginTop: 13,
    fontSize: 16,
    color: colors.black,
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  bodyText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.tabBackground,
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  rightMargin: {
    marginLeft: 120,
  },
  headerSection: {
    marginTop: 20,
    flexDirection: "row",
  },
  headerDirection: {
    flexDirection: "row",
    marginBottom: 13,
  },
  closeButton: {
    // flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  popUpBackgroundColor: {
    backgroundColor: colors.white,
    marginTop: -100,
  },
  parentView: {
    flex: 1,
    width: width - 20,
    height: height / 2,
    padding: 10,
    paddingRight: 20,
    paddingBottom: 30,
  },
  contactView: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
  },
  emailView: {
    flexDirection: "row",
    marginTop: 80,
    marginLeft: 20,
  },
  phoneImg: {
    height: 40,
    width: 40,
  },
  phoneNumberContainer: {
    flex: 1,
    flexDirection: "row",
  },
  phoneNoText: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 20,
    color: colors.proceedBorder,
  },
  deviderView: {
    height: 0,
    flexDirection: "row",
  },
  deviderFlex: {
    flex: 1,
    flexDirection: "row",
  },
  deviderTextView: {
    margin: 20,
    // marginLeft: 20,
    // paddingBottom: 10,
    // flex: 1,
    // height: 40,
    // marginTop: 25,
  },
  deviderFontSize: {
    fontSize: 20,
  },
  deviderBorder: {
    marginLeft: 20,
    paddingBottom: 10,
    borderTopWidth: 0.3,
    flex: 10,
    marginTop: 38,
    marginRight: 30,
  },
  orText: {
    marginLeft: 25,
    marginTop: 23,
    height: 28,
    fontSize: getDeviceFontSize(12),
  },
  showBorder: {
    borderColor: colors.cancelBorder,
    borderWidth: 1,
  },
  smsTemplateStyle: {
    fontSize: getDeviceFontSize(12),
    fontFamily: ApplicationConfiguration.font.DEFAULT,
    textAlign: "center",
    padding: 10,
    alignSelf: "center",
  },
  emailTemplateStyles: {
    alignSelf: "center",
  },
});

export default styles;
