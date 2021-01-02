import { StyleSheet } from "react-native";
import { getDeviceFontSize } from "../../Util/Resolution";

const headerBackgroundColor = "#81c04d";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: headerBackgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  yearMonthContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  yearContainer: {
    padding: 1,
    margin: 1,
    borderWidth: 2,
    flex: 1,
  },
  monthContainer: {
    padding: 1,
    margin: 1,
    borderWidth: 2,
    flex: 1,
  },
  imgPosition: {
    resizeMode: "contain",
    height: 30,
    marginRight: 0,
    alignItems: "flex-start",
    width: 60,
  },
  imgPositionMyProfile: {
    resizeMode: "contain",
    height: 30,
    marginRight: -8,
    alignItems: "flex-start",
    width: 60,
  },
  myTeamView: {
    margin: 10,
    flexDirection: "row",
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  myTeamText: {
    textAlign: "left",
    marginTop: 3,
    fontSize: 18,
    color: colors.white,
  },
  teamDetailContainer: {
    // justifyContent: "flex-end",
    flexDirection: "row-reverse",
    marginLeft: 8,
    flex: 1,
  },
  teamDetailContainerL: {
    flexDirection: "row",
    flex: 1.3,
  },
  reporteeDetail: {
    flexDirection: "column",
    padding: 10,
    margin: 5,
    borderLeftWidth: 0.5,
    borderLeftColor: colors.white,
  },

  reporteeLabel: {
    fontSize: getDeviceFontSize(10),
    color: colors.groupTileHeader,
  },

  showBorder: {
    borderColor: colors.white,
    borderWidth: 2,
  },
  flexDirection: {
    flexDirection: "row",
  },
});

export default styles;
