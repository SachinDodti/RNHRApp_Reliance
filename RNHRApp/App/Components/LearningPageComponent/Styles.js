import { Platform, StyleSheet } from "react-native";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  courseNameStyle: {
    fontFamily: "VAGRounded",
    color: colors.placeHolderTextColor,
    alignSelf: "center",
    padding: 10,
  },
  courseNameContainer: {
    backgroundColor: colors.monthToolBarBackground,
  },
  courseContainer: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: Platform.OS === "ios" ? 50 : 20,
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
    fontFamily: "VAGRoundedStd-Black",
    color: colors.placeHolderTextColor,
  },
  textStyleInfo: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.warning,
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
  },
  btnNextEnableStyle: {
    borderColor: colors.white,
    width: 168,
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: colors.btnLoginBackground,
    justifyContent: "center",
  },
  btnNextDisabledStyle: {
    opacity: 0.4,
  },

  txtNextStyle: {
    fontFamily: "VAGRoundedStd-Black",
    color: colors.white,
  },
  pdfContainerStyle: { flex: 1 },
});

export default styles;
