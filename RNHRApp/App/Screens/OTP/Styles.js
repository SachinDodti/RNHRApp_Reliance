import { StyleSheet, Dimensions, Platform } from "react-native";

import { getDeviceFontSize } from "../../Util/Resolution";

const { height } = Dimensions.get("screen");
const colors = require("../../Config/config");

const styles = StyleSheet.create({
  receivedOTPStyle: {
    alignSelf: "center",
    fontFamily: "VAGRoundedStd-Light",
    fontSize: 20,
    color: colors.placeHolderTextColor,
    padding: 5,
  },
  txtInputContainer: {
    padding: 20,
  },
  txtInputOTP: {
    // fontFamily: 'VAGRoundedStd-Black',
    // color: colors.OTPText,
    // borderColor: colors.white,
    // borderRadius: 5,
    // borderWidth: 2,
    marginRight: 5,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: "VAGRoundedStd-Light",
    color: colors.white,
    fontSize: 14,
    height: 40,
    paddingLeft: 12,
  },
  btnContainerStyle: {
    padding: 10,
    width: 200,
  },
  btnOTPContainerStyle: {
    padding: 10,
    width: 150,
    borderColor: colors.OTPText,
  },
  btnGetOTPStyle: { fontFamily: "VAGRounded-Black", color: colors.OTPText },
  btnOTPStyles: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnResendOTPStyle: {
    fontFamily: "VAGRounded-Black",
    color: colors.white,
  },

  otpButtonContainers: {
    flexDirection: "row",
    alignSelf: "center",
  },
  imgRight: {
    width: 30,
    height: 30,
  },
  phContainer: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  txtPhStyle: {
    alignSelf: "center",
    fontFamily: "VAGRoundedStd-Light",
    fontSize: 25,
    padding: 10,
    paddingTop: 20,
    color: colors.placeHolderTextColor,
  },
  txtStyle: {
    alignSelf: "center",
    fontFamily: "VAGRoundedStd-Light",
    fontSize: getDeviceFontSize(13),
    color: colors.placeHolderTextColor,
  },
  txtStyleS: {
    alignSelf: "center",
    fontFamily: "VAGRoundedStd-Light",
    fontSize: 12,
    color: colors.placeHolderTextColor,
    textAlign: "center",
    paddingRight: 40,
    paddingLeft: 40,
  },
  imgPhContainer: {
    alignItems: "center",
    padding: 15,
  },
  imgPh: {
    width: 150,
    height: 150,
  },
  otpContainer: {
    flex: 1,
  },
  rootContainer: {
    // flex: (Platform.OS === 'ios') ? null : 1,
    flex: 1,
    resizeMode: "cover",
    height,
  },
  btnSubmitOTPContainer: {
    alignSelf: "center",
    padding: 25,
    borderColor: colors.OTPText,
    width: 200,
  },
  btnSubmitOTPText: {
    fontFamily: "VAGRoundedStd-Black",
  },
  btnSubmitOTPStyles: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.btnLoginBackground,
  },
  troubleLogin: {
    // paddingTop: 29,
    // marginLeft: 80,
    // marginRight: 80,
    marginBottom: 29,
  },
  loginHelp: {
    alignSelf: "center",
    // fontFamily: "VAGRounded",
    color: colors.white,
    fontFamily: "VAGRoundedStd-Light",
    fontSize: getDeviceFontSize(13),
  },
});

export default styles;
