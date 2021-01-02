import { StyleSheet } from "react-native";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  txtStyle: {
    fontFamily: "VAGRoundedStd-Light",
    fontSize: 20,
    color: colors.white,
  },
  dropUpDownStylesL: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 10,
    margin: 10,
    marginRight: 5,
  },
  dropUpDownStylesR: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 10,
    margin: 10,
  },
  monthWeekSwitch: {
    width: 25,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  toolBarParent: {
    flex: 1,
    flexDirection: "row",
    height: 58,
    backgroundColor: colors.monthToolBarBackground,
  },
  monthToolBarStyles: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: 10,
  },
  listImgContainer: {
    flexDirection: "row",
    marginRight: 10,
    alignContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  reporteeDetail: {
    flexDirection: "column",
    // padding: 5,
    margin: 5,
    // borderLeftWidth: 0.5,
    borderLeftColor: colors.white,
    flex: 1,
  },

  reporteeLabel: {
    fontSize: 15,
    color: colors.white,
  },
});

export default styles;
