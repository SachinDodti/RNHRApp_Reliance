import { StyleSheet, Dimensions, Platform } from "react-native";

const { height } = Dimensions.get("screen");

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  fileIcon: {
    width: 25,
    height: 27,
    resizeMode: "contain",
    marginRight: 10,
  },
  marginButtom: {
    marginBottom: Platform.OS === "ios" ? height / 9.5 : 12,
  },
  noticeView: {
    flex: 1,
  },
  notice: {
    flex: 1,
    backgroundColor: colors.white,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  heading1: {
    paddingLeft: 20,
    paddingRight: 40,
    paddingTop: 15,
    fontSize: 15,
  },
  heading2: {
    flex: 1,
    marginLeft: 20,
    marginTop: 20,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    marginTop: 18,
    marginRight: 20,
    marginBottom: 5,
  },
  content: {
    width: "65%",
    fontWeight: "bold",
    fontSize: 17,
  },
  content2: {
    flex: 1,
    flexDirection: "row",
  },
  borderLine: {
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    margin: 10,
    marginLeft: -10,
  },
  files: {
    flex: 1,
    width: "65%",
    fontSize: 15,
  },
  dates: {
    flex: 0.5,
    width: "50%",
    fontSize: 15,
  },
  noDateFound: {
    marginTop: 10,
    fontSize: 20,
  },
  webContainerStyle: {
    flex: 1,
    padding: 1,
    margin: 1,
    borderColor: colors.lineColor,
    borderWidth: 2,
  },
  opacityView: {
    flex: 1,
    marginLeft: 20,
  },
});

export default styles;
