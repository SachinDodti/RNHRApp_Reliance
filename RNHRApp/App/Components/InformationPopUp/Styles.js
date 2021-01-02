import { StyleSheet, Dimensions } from "react-native";

const colors = require("../../Config/config");

const { height, width } = Dimensions.get("screen");

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
    margin: 15,
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
    borderBottomWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  imgRightUpper: {
    resizeMode: "contain",
    height: 28,
    marginTop: 8.7,
    // marginLeft: -21,
  },
  headerTextLeft: {
    marginTop: 15,
    fontSize: 16,
    color: colors.black,
    // fontWeight: "bold",
    alignSelf: "flex-start",
    // paddingLeft: 15,
  },
  headerTextRight: {
    // marginTop: 10,
    marginBottom: 8,
    fontSize: 16,
    color: colors.black,
    // fontWeight: "bold",
    alignSelf: "flex-start",
    // paddingLeft: 15,
    // paddingRight: 30,
    paddingLeft: 20,
  },
  headerTextName: {
    marginTop: 10,
    fontSize: 24,
    // fontWeight: 'bold',
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  birthdayText: {
    marginTop: 30,
    fontSize: 16,
    color: colors.tabBackground,
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
    // marginRight: 10,
  },
  headerSection: {
    flex: 0.1,
    flexDirection: "row",
    height: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  headerDirection: {
    flexDirection: "row",
    flex: 0.1,
  },
  closeButton: {
    // marginLeft: 124,
    flex: 1.25,
  },
  popUpBackgroundColor: {
    backgroundColor: colors.white,
    marginTop: height * 0.09,
  },
  parentView: {
    width: width - 20,
    height: height * 0.75,
  },
  leftSapMargin: {
    flex: 1,
    marginLeft: 20,
  },
  titleHeader: {
    flex: 4,
    marginTop: 2,
  },
});

export default styles;
