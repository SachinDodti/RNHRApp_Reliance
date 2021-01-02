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
    fontSize: getDeviceFontSize(13),
    marginTop: -20,
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
    // marginBottom: 13,
    flex: 1,
  },
  closeButton: {
    // marginLeft: 270,
    flex: 1,
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
    // width: 360,
    height: height / 2,
    padding: 10,
    paddingRight: 20,
    paddingBottom: 30,
  },
  contactView: {
    flexDirection: "column",
    // marginTop: 20,
    marginLeft: 20,
    // borderWidth: 1,
    flex: 1,
    marginTop: -5,
  },
  emailView: {
    flexDirection: "row",
    marginTop: 80,
    marginLeft: 20,
  },
  phoneImg: {
    height: 35,
    width: 35,
  },
  phoneNumberContainer: {
    flex: 1,
    flexDirection: "row",
  },
  phoneNumberContainerMobile: {
    // flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
  phoneNoText: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    color: colors.proceedBorder,
    fontSize: getDeviceFontSize(13),
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
    marginTop: 45,
    marginRight: 30,
  },
  orText: {
    marginLeft: 25,
    marginTop: 31,
    height: 28,
    fontSize: getDeviceFontSize(13),
  },
  showBorder: {
    borderColor: colors.cancelBorder,
    borderWidth: 1,
  },
  contactViewDouble: {
    flex: 1,
    marginTop: 10,
  },
});

export default styles;
