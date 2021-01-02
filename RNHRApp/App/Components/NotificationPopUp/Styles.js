import { StyleSheet, Dimensions } from "react-native";

const colors = require("../../Config/config");

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  notificationMessageContainer: {
    flex: 1,
  },
  notificationActionContainer: {
    alignItems: "flex-end",
    alignSelf: "center",
    marginRight: 10,
  },
  unReadStyle: {
    flexDirection: "row",
    backgroundColor: colors.unReadNotification,
  },
  readStyle: {
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  flatListStyle: {},
  clearButton: {},
  notificationContainer: {
    // height: height - 250,
    marginBottom: height / 22,
  },
  notificationText: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.proceedBorder,
  },
  notificationRowStyle: {
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 15,
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

  imgRightUpper: {
    resizeMode: "contain",
    height: 28,
    marginTop: 8.7,
    // marginLeft: -21,
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
    fontSize: 24,
    // fontWeight: 'bold',
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  clearNotification: {
    marginTop: 5,
    fontSize: 16,
    alignSelf: "flex-start",
    paddingLeft: 15,
    textDecorationLine: "underline",
  },
  notificationText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.tabBackground,
    alignSelf: "flex-start",
    paddingLeft: 20,
    marginBottom: 10,
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
  },
  headerText: {
    flex: 1,
  },
  textStyle: {
    alignSelf: "center",
    padding: 10,
  },

  closeButtonContainer: {
    flex: 1,
    flexDirection: "row-reverse",
  },

  // headerDirection: {
  //   flexDirection: "row",
  //   flex: 1,
  // },
  closeButton: {
    // marginLeft: 124,
    flex: 1.25,
  },
  popUpBackgroundColor: {
    backgroundColor: colors.white,
    marginTop: height * 0.09,
  },
  // parentView: {
  //   flexDirection: 'column',
  //   flex: 1,
  //   width: 360,
  //   height: 350,
  //   padding: 10,
  //   paddingRight: 20,
  //   paddingBottom: 30,
  // },
  parentView: {
    width: width - 20,
    height: height * 0.75,
    // arginBottom: height / 9.5,
  },
  titleHeader: {
    flex: 4,
    marginTop: 2,
  },
  hearderMargin: {
    flex: 0.4,
  },
  notificationMargin: {
    flex: 3,
  },
  clearButtonMargin: {
    marginBottom: 20,
  },
});

export default styles;
