import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // showBorder: {
  //   borderWidth: 1,
  //   borderColor: '#ff0000',
  // },
  collapseHeaderContainer: { flex: 1, flexDirection: "row" },
  collapseHeaderChild: {
    flex: 1,
    flexDirection: "column",
  },
  iconContainer: {
    justifyContent: "center",
    alignContent: "center",
    // marginTop: 2,
  },
  icon: {
    resizeMode: "contain",
    height: 20,
    alignItems: "flex-start",
    width: 20,
    margin: 5,
    marginRight: 20,
  },
});
export default styles;
