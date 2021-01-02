import { StyleSheet, Dimensions } from "react-native";
import ApplicationConfiguration from "../../Config/env";
import { getDeviceFontSize } from "../../Util/Resolution";

const { height } = Dimensions.get("screen");

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  parentView: {
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: "column",
  },
  marginButtom: {
    marginBottom: height / 9.5,
  },
  rowContainerView: {
    margin: 5,
    padding: 5,
    flex: 1,
  },
  singleMenuParentView: {
    flex: 1,
    flexDirection: "column",
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "VAGRounded-Black",
    color: colors.black,
  },
  multipleMenuParentView: {
    flexDirection: "row",
    flex: 1,
  },
  profileImg: {
    marginRight: 30,
    resizeMode: "contain",
    height: 25,
    marginTop: 13,
  },
  notificationImg: {
    resizeMode: "contain",
    height: 25,
    marginTop: 13,
  },
  backgroundImageStyle: {
    resizeMode: "cover",
    height,
  },
  rowFlexDirection: {
    flexDirection: "row",
  },

  candidateContainer: {
    // flex: 1,
    // height: height - 280,
    // justifyContent: "center",
    // alignItems: "center",
    height: 10,
  },
  candidateText: {
    color: colors.white,
    fontSize: ApplicationConfiguration.font.DEFAULT,
    fontSize: getDeviceFontSize(16),
  },
});

export default styles;
