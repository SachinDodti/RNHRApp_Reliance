import { StyleSheet } from "react-native";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  textFormat: {
    color: colors.white,
    textAlign: "left",
    fontSize: 16,
    lineHeight: 150,
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 15,
  },
  itemView: {
    margin: 10,
    marginBottom: 10,
    marginTop: 0,
    marginRight: 2,
    flexDirection: "row",
  },
  rowItemAppearence: {
    height: 70,
    width: "94.5%",
  },
  showBorder: {
    borderColor: colors.tileBorderColor,
    borderWidth: 1,
    borderRadius: 4,
  },
  disabled: {
    opacity: 0.2,
  },
  tileItemAppearence: {
    height: 100,
    width: "45.7%",
  },
  dark: {
    backgroundColor: colors.navBarBackground,
  },
  ligth: {
    backgroundColor: colors.tabBackground,
  },
  tileIcon: {
    resizeMode: "contain",
    width: 30,
    marginLeft: 15,
    justifyContent: "flex-start",
    // position: 'absolute',
  },
  tileIcon2: {
    resizeMode: "center",
    width: 30,
    marginLeft: 10,
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // position: 'absolute',
  },
  tileIconFlex: {
    flex: 9,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  textSingle: {
    paddingRight: 40,
    color: colors.white,
    textAlign: "left",

    fontSize: 18,
    // lineHeight: 72,

    flexWrap: "wrap",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 25,
    marginRight: 25,
  },
  titleContainer: {
    flexDirection: "column",
    width: "100%",
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
  },
  textContainerTile: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  textSingleRow: {
    paddingLeft: 10,
    color: colors.white,
    textAlign: "left",
    width: "98%",
    fontSize: 18,
    // lineHeight: 72,

    flexWrap: "wrap",
  },
});

export default styles;
