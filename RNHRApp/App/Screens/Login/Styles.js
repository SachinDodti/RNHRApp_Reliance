import { StyleSheet, Dimensions, Platform } from "react-native";

const { height } = Dimensions.get("screen");
const colors = require("../../Config/config");

const transparent = "transparent";

const styles = StyleSheet.create({
  loginHelp: {
    alignSelf: "center",
    fontFamily: "VAGRounded",
    color: colors.white,
  },

  candidateTextWarning: {
    alignSelf: "center",
    fontFamily: "VAGRounded",
    color: colors.white,
    marginTop: 20,
    textAlign: "center",
  },
  rootView: {
    flex: Platform.OS === "ios" ? null : 1,
    backgroundColor: colors.notificationColor,
    height,
  },
  rootContainer: {
    flex: 1,
    resizeMode: "cover",
    height: 770,
  },
  checkBoxStyle: {
    // margin: 0,
    // padding: 0,
    // fontFamily: 'VAGRoundedStd-Black',
    // fontSize: 14,
    marginRight: 0,
    paddingRight: 5,
    backgroundColor: transparent,
    textDecorationLine: "underline",
  },
  loginImage: {
    width: 150,
    height: 150,
  },
  passwordContainer: {
    padding: 25,
  },
  idContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  imgContainer: {
    alignItems: "center",
    padding: 35,
  },
  segmentStyles: {
    margin: 5,
    padding: 5,
  },
  btnTabStyles: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    flex: 1,
    // backgroundColor: colors.backgroundColor,
  },
  itemStyle: {},
  btnLoginStyle: {
    justifyContent: "center",
    width: 168,
    alignSelf: "center",
    borderRadius: 25,
    borderColor: colors.white,
    borderWidth: 1,
    backgroundColor: colors.btnLoginBackground,
  },
  rememberMeStyles: {
    fontSize: 14,

    textAlign: "left",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",
    fontFamily: "VAGRoundedStd-Black",
    color: colors.placeHolderTextColor,
  },
  textStyle: {
    // fontFamily: 'VAGRoundedStd-Black',
    // fontSize: 14,
    color: colors.placeHolderTextColor,
  },
  loginTextStyle: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.white,
  },
  tabStyle: {
    backgroundColor: colors.tabBackground,
  },
  tabTitle: {
    fontFamily: "VAGRounded-Black",
    fontSize: 14,
    color: colors.white,
  },
  loginView: {
    backgroundColor: colors.backgroundColor,
  },
  troubleLogin: {
    paddingTop: 29,
    // marginLeft: 80,
    // marginRight: 80,
    marginBottom: 29,
  },
  disabled: {
    opacity: 0.4,
  },
  resetPasswordView: {
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 70,
    flex: 1,
    // marginLeft: "15%",
  },
  resetPasswordtext: {
    // paddingBottom: 5,
    // textAlign: "right",
    // alignSelf: "stretch",
    color: colors.placeHolderTextColor,
    fontFamily: "VAGRoundedStd-Black",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  view: {
    flexDirection: "row",
    flex: 1,
  },
  checkboxFlex: {
    flex: 1.4,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default styles;
