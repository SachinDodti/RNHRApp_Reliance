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
    paddingLeft: 20,
    fontSize: 25,
    color: colors.white,
  },
  listView: {
    // backgroundColor: colors.tabBackground,
    height: 55,
    flexDirection: "row",
    marginTop: 2,
  },
  DropDownViewBday: {
    backgroundColor: colors.attendanceDayWiseBackground,
    height: 65,
    flexDirection: "row",
  },
  DropDownViewAnniversary: {
    backgroundColor: colors.attendanceDayWiseBackground,
    height: 65,
    flexDirection: "row",
    marginTop: 1,
  },
  headerDetail: {
    // backgroundColor: colors.tabBackground,
    height: 55,
    flexDirection: "row",
    paddingBottom: 20,
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
  },
  textId: {
    textAlign: "center",
    paddingLeft: 20,
    // fontWeight: 'bold',
    color: colors.placeHolderTextColor,
    flexWrap: "wrap",
    fontFamily: "VAGRoundedStd-Light",
  },
  columnBdayAnn: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bdayAnnTextId: {
    textAlign: "center",
    // fontWeight: "bold",
    color: colors.placeHolderTextColor,
    fontFamily: "VAGRoundedStd-Light",
  },
  nameText: {
    textAlign: "left",
    // fontWeight: "bold",
    color: colors.placeHolderTextColor,
    width: 200,
    fontFamily: "VAGRoundedStd-Light",
  },
  dropdownImgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  bdayImgView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'flex-start',
  },
  dropdownImgPos: {
    marginRight: 0,
    resizeMode: "contain",
    height: 10,
    marginTop: 15,
    justifyContent: "flex-end",
    position: "absolute",
  },
  bdayImgPos: {
    resizeMode: "contain",
    height: 32,
    marginLeft: -30,
  },
  anniversaryImgPos: {
    resizeMode: "contain",
    height: 32,
    marginLeft: -20,
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
  wishedBackgroundColor: {
    backgroundColor: colors.gray,
    // opacity: 0.6,
  },
});

export default styles;
