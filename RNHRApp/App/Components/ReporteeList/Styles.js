import { StyleSheet } from "react-native";
import { colors } from "react-native-elements";

const headerBackgroundColor = "#81c04d";

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: headerBackgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 770,
  },
  scrollViewButtom: {
    paddingBottom: 70,
  },
  yearMonthContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  yearContainer: {
    padding: 1,
    margin: 1,
    borderWidth: 2,
    flex: 1,
  },
  monthContainer: {
    padding: 1,
    margin: 1,
    borderWidth: 2,
    flex: 1,
  },
  tileIcon: {
    width: 35,
    marginLeft: 20,
    resizeMode: "contain",
    height: 30,
    marginTop: 10,
  },
  arrowIcon: {
    width: 35,
    resizeMode: "contain",
    height: 22,
    marginTop: 0,
  },
  arrowIconHide: {
    opacity: 0,
  },
  listView: {
    flex: 1,
    backgroundColor: colors.white,
    marginRight: 10,
    marginLeft: 10,
  },
  listViewinside: {
    flexDirection: "row",
    width: "68%",
    flex: 1,
  },
  keyMargin: {
    marginLeft: 10,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headingText: {
    paddingLeft: 65,
    paddingTop: 10,
    fontSize: 25,
  },
  titleText: {
    flex: 1,
    marginTop: 20,
    margin: 10,
  },
  dataView: {
    flexDirection: "row",
    marginBottom: 10,
  },
  sapCodeText: {
    width: "47%",
    fontWeight: "bold",
    fontSize: 17,
  },
  keyText: {
    width: "50%",
    fontWeight: "bold",
    fontSize: 17,
  },
  borderStyle: {
    borderBottomColor: colors.black,
    borderBottomWidth: 0.3,
    margin: 10,
    marginRight: 0,
    marginLeft: 0,
  },
  listDataView: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  dataTextSapCode: {
    fontSize: 17,
  },
  datatextKey: {
    fontSize: 17,
  },
});

export default styles;
