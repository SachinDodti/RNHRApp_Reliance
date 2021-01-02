import { StyleSheet } from "react-native";

const colors = require("../../../Config/config");

const styles = StyleSheet.create({
  checkTxtStyles: {
    color: colors.checkTxt,
    fontFamily: "VAGRoundedStd-Light",
  },
  checkDetails: {
    flexDirection: "row",
    // marginLeft: '12%',
    height: 35,
  },
  checkDetailsDescription: {
    flexDirection: "column",
    // marginLeft: '12%',
    height: 35,
  },
  descriptionText: {
    paddingTop: 7,
    paddingLeft: 10,
  },
  checkStyles: {
    padding: 10,
    backgroundColor: colors.attendanceDayWiseBackground,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
  checkStylesDesc: {
    padding: 10,
    backgroundColor: colors.attendanceDayWiseBackground,
    flexDirection: "row",
    // justifyContent: "space-evenly",
    borderRadius: 5,
  },
  checkStylesIn: {
    padding: 10,
    margin: 10,
    backgroundColor: colors.checkBackground,
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
  checkStylesInDescription: {
    padding: 10,
    margin: 10,
    backgroundColor: colors.checkBackground,
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    borderRadius: 5,
  },
  textColor: {
    color: colors.placeHolderTextColor,
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});

export default styles;
