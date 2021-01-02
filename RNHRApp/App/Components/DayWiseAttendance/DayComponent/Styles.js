import { StyleSheet, Dimensions } from "react-native";

const width = Math.round(Dimensions.get("screen").width);
const colors = require("../../../Config/config");

const styles = StyleSheet.create({
  pressedImpact: {
    backgroundColor: colors.placeHolderTextColor,
  },
  locationWeekStyles: {
    flex: 1,
    paddingRight: 5,
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingTop: 7,
  },
  weekDayStatus: {
    flexDirection: "column",
    paddingLeft: 10,
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  weekViewParentHeader: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
  },
  presentStyles: {
    backgroundColor: colors.presentColor,
  },
  absentStyles: { backgroundColor: colors.absentColor },
  leaveStyles: { backgroundColor: colors.leaveColor },
  holidayStyles: { backgroundColor: colors.holidayColor },
  onDutyStyles: { backgroundColor: colors.onDutyColor },
  outDoorTravelMeetingStyles: { backgroundColor: colors.outDoorTMColor },
  previousNextMonthStyles: { backgroundColor: colors.previousNextMonthColor },
  weekendStyles: { backgroundColor: colors.weekendColor },
  offStyles: { backgroundColor: colors.offColor },
  waitingForApprovalStyles: { backgroundColor: colors.waitingForApprovalColor },
  essWaitingForApprovalStyles: {
    backgroundColor: colors.essWaitingForApprovalColor,
  },
  ulcssUnpaidLeaveStyles: {
    backgroundColor: colors.unpaidLeaveCCCColor
  },
  defaultDayStyles: {
    backgroundColor: colors.defaultDayColor,
    borderWidth: 0.5,
    borderColor: colors.checkBackground,
  },
  daysContainer: {
    justifyContent: "center",
    alignContent: "center",
    width: Math.round(width / 9),
    height: Math.round(width / 9),
    borderRadius: Math.round(width / 9 / 2),
    padding: 10,
    flexDirection: "column",
    marginTop: 5,
  },
  daysTextWeek: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "VAGRoundedStd-Light",
    color: colors.placeHolderTextColor,
    paddingLeft: 5,
    paddingRight: 5,
    width: 50,
  },
  daysText: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "VAGRoundedStd-Light",
    color: colors.placeHolderTextColor,
  },
  daysTextDate: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "VAGRoundedStd-Light",
    color: colors.white,
  },
  checkInBranch: {
    color: colors.placeHolderTextColor,
  },
  blackDayText: {
    color: colors.black,
  },
  whiteDayText: {
    color: colors.white,
  },
});

export default styles;
