import { StyleSheet } from "react-native";
import ApplicationConfiguration from "../../Config/env";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  appDetailContainer: { flex: 1, flexDirection: "row" },
  appName: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appNameText: {
    fontFamily: ApplicationConfiguration.font.DEFAULT,
    fontSize: 18,
    color: colors.alertTextColor,
    fontWeight: "bold",
  },
  appStatusDetail: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  appStatus: { flex: 1, flexDirection: "row" },
  appStatusText: {
    flex: 1,
    textAlign: "right",
    paddingRight: 5,
    fontFamily: ApplicationConfiguration.font.DEFAULT,
    fontSize: 18,
    fontWeight: "bold",
  },
  notInstalledColor: { color: colors.installNowColor },
  installedColor: { color: colors.installedColor },
  appStatusIcon: { height: 30, width: 30, margin: 5 },
});

export default styles;
