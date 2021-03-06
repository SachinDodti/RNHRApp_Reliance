import { StyleSheet } from "react-native";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainerLeft: {
    flex: 1,
    height: 50,
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: colors.navBarBackground,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderColor: colors.white,
    borderWidth: 1,
  },
  buttonContainerRight: {
    flex: 1,
    height: 50,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: colors.navBarBackground,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderColor: colors.white,
    borderWidth: 1,
  },
  buttonText: {
    paddingRight: 0,
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 47,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.2,
  },
  buttonContainer: {
    flex: 1,
  },
  AttenUpperTile: {
    margin: 10,
    marginTop: 0,
    marginBottom: 0.5,
    height: 70,
    backgroundColor: colors.navBarBackground,
    flexDirection: "row",
  },
  AttenUpperTileScrollView: {
    margin: 10,
    marginBottom: -5,
    // marginBottom: 0.5,
    height: 30,
    backgroundColor: colors.navBarBackground,
    flexDirection: "row",
  },
  imgLeftUpper: {
    marginRight: 30,
    resizeMode: "contain",
    height: 35,
    marginTop: 15,
    justifyContent: "flex-start",
    width: 40,
    marginLeft: 20,
  },
  midText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 25,
    justifyContent: "center",
    lineHeight: 70,
    alignItems: "center",
    flex: 1,
    paddingRight: 25,
  },
  imgRightUpper: {
    marginRight: 20,
    resizeMode: "contain",
    height: 30,
    marginTop: 20,
    justifyContent: "flex-end",
    width: 40,
  },
  lowerTile: {
    margin: 10,
    marginTop: 0,
    height: 120,
    backgroundColor: colors.navBarBackground,
  },
  textI: {
    color: colors.placeHolderTextColor,
    textAlign: "center",
  },
  buttonContainerLeftCheckIn: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.white,
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  informationIcon: {
    marginLeft: 5,
    resizeMode: "contain",
    height: 18,
  },
  buttonContainerCheckIn: {
    flex: 1,
    marginRight: 42,
  },
  textScroll: {
    // paddingBottom: 10,
    color: colors.white,
    paddingTop: 5,
  },
});

export default styles;
