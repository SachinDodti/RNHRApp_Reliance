import { StyleSheet } from "react-native";

const colors = require("../../../Config/config");

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    paddingLeft: 13,
    color: colors.white,
  },
});

export default styles;
