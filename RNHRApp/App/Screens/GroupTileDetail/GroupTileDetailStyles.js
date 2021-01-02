import { StyleSheet } from "react-native";
import { getDeviceFontSize } from "../../Util/Resolution";

const colors = require("../../Config/config");

const styles = StyleSheet.create({
  groupTitle: {
    // backgroundColor: colors.groupTitleBackgroup,
    borderBottomWidth: 1,
    borderBottomColor: colors.groupTileHeader,
  },
  textFormat: {
    color: colors.groupTileHeader,
    textAlign: "center",
    fontSize: getDeviceFontSize(20),
    // fontWeight: 'bold',
    // alignItems: 'flex-start',
    //  flex: 100,
    lineHeight: 60,
  },
  rowFlexDirection: {
    flexDirection: "row",
  },
  appContainer: {
    marginTop: 10,
  },
  textScroll: {
    // paddingBottom: 10,
    color: colors.white,
    paddingTop: 5,
  },
});

export default styles;
