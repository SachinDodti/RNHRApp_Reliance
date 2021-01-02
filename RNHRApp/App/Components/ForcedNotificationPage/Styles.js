import { Platform, StyleSheet, Dimensions } from "react-native";

const colors = require("../../Config/config");

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  forcedNotifyNameStyle: {
    fontFamily: "VAGRounded",
    color: colors.placeHolderTextColor,
    alignSelf: "center",
    padding: 10,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10
  },
  forcedNotifyNameContainer: {
    backgroundColor: colors.navBarBackground,
  },
  forcedNotifyTextViewContainer: {
    backgroundColor: colors.navBarBackground,
    height: height,

  },
  forcedNotifyContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10
    //paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  checkBoxContainerStyle: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  textStyle: {
    fontFamily: "VAGRounded",
    color: colors.placeHolderTextColor,
    fontSize: 15
  },
  textStyleInfo: {
    fontFamily: "VAGRounded",
    color: colors.navBarBackground,
    marginLeft: 20,
    marginTop: 5,
    fontSize: 12,
  },
  webContainerStyle: {
    flex: 1,
    padding: 1,
    margin: 1,
    borderColor: colors.lineColor,
    borderWidth: 2,
  },
  toolsContainer: {
    marginBottom: 1,
    flex: 1
  },
  btnNextEnableStyle: {
    borderColor: colors.white,
    width: 175,
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: colors.btnLoginBackground,
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 25
  },
  btnNextDisabledStyle: {
    opacity: 0.4,
  },

  txtNextStyle: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.white,
  },
  pdfContainerStyle: {
    flex: 3
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    height: "20%",
    marginBottom: 2
  },
  buttonStyle: {
    padding: 8,
    alignSelf: "flex-start"
  },
  downloadBtnStyle: {
    padding: 4,
    marginRight: 20,
    marginTop: 10,
    alignSelf: "flex-end"
  },
  queryForStyle: {
    // marginRight: 5,
    borderColor: colors.gray,
    borderWidth: 0.5,
    borderRadius: 1,
    fontFamily: "VAGRoundedStd-Light",
    fontSize: 14,
    height: 50,
    paddingLeft: 12,
    color: "#5d8dc9"
  },
  likeStyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    height: 50
  },
  marginBottom: {
    marginBottom: height / 9.5
  },
  marginScrollBottom: {
    marginBottom: height / 9.5,
    height: "1%"
  },
  parentView: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
    // justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    // marginBottom: 200
    // marginTop: 30,
    borderColor: colors.lineColor,
    borderWidth: 2,
  },
  confMessage: {
    fontSize: 20,
    color: colors.white,
    // marginLeft: 20,
    // margin: 5
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    // marginTop: 50,
    margin: 20,
    marginBottom: 50,
    textAlign: "center",
    // marginBottom: 100
  },
  feedbackTextStyleInfo: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.placeHolderTextColor,
    marginLeft: 20,
    marginTop: 5,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  btnViewContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
    height: "100%",
  },
  bottomScrollStyle: {
    position: 'absolute',
    bottom: 20
  },
  dark: {
    backgroundColor: colors.navBarBackground,
  },
  checkBoxSurveyStyle: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    padding: 5
  },
});

export default styles;
