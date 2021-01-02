import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headingContainer: {
    backgroundColor: colors.tabBackground,
    height: 55,
    flexDirection: "row",
  },
  imgView: {
    marginRight: 115,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
  },
  scrollViewButtom: {
    paddingBottom: height / 9.5,
  },
  imgPosition: {
    resizeMode: "contain",
    height: 30,
    marginRight: 0,
    alignItems: "flex-start",
    width: 70,
  },
  textView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textHeader: {
    textAlign: "left",
    paddingRight: 10,
    fontSize: 25,
    color: colors.white,
  },
  listView: {
    // backgroundColor: colors.white,
    height: 55,
    flexDirection: "row",
    marginTop: 2,
  },
  headerDetail: {
    // backgroundColor: colors.tabBackground,
    height: 55,
    flexDirection: "row",
    paddingBottom: 20,
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  columnL: {
    flex: 1.3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  columnR: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  columnBodyL: {
    flex: 1.3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  columnBodyR: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  textId: {
    textAlign: "center",
    paddingLeft: 20,
    // fontWeight: 'bold',
    fontFamily: "VAGRoundedStd-Light",
    color: colors.placeHolderTextColor,
  },
  nameText: {
    textAlign: "left",
    // fontWeight: "bold",
    fontFamily: "VAGRoundedStd-Light",
    color: colors.placeHolderTextColor,
    width: 200,
  },
  textIdWished: {
    textAlign: "center",
    paddingLeft: 20,
    // fontWeight: 'bold',
    fontFamily: "VAGRoundedStd-Light",
    color: colors.black,
  },
  nameTextWished: {
    textAlign: "left",
    // fontWeight: "bold",
    fontFamily: "VAGRoundedStd-Light",
    color: colors.black,
    width: 200,
  },
  dropdownImgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dropdownImgPos: {
    marginRight: 0,
    resizeMode: "contain",
    height: 10,
    marginTop: 15,
    justifyContent: "flex-end",
    position: "absolute",
  },
  scrollViewParent: { flex: 1 },
  rootView: {
    flex: 1,
    backgroundColor: colors.notificationColor,
  },
  backgroundImageStyle: {
    flex: 1,
    resizeMode: "cover",
    height: 770,
  },
  wishedBackgroundColor: {
    backgroundColor: colors.gray,
    // opacity: 0.6,
  },
});

export default styles;
