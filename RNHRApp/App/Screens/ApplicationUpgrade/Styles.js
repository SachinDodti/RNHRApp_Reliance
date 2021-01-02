import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    marginBottom: 200,
  },
  confMessage: {
    fontSize: 22,
    color: "white",
    // marginLeft: 20,
    // margin: 5
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    // marginTop: 50,
    margin: 20,
    marginBottom: 0,
    textAlign: "center",
    // marginBottom: 100
  },
  showBorder: {
    borderColor: colors.groupTileHeader,
    borderWidth: 2,
  },
  btnContainerStyle: {
    margin: 10,
    width: 150,
    backgroundColor: colors.white,
  },
  btnProceedTextStyle: {
    alignSelf: "center",
    padding: 25,
    borderColor: colors.OTPText,
    width: 250,
    paddingTop: 20,
    fontFamily: "VAGRoundedStd-Black",
  },
  btnProceedStyles: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnViewContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
    // height: 60,
  },
});

export default styles;
