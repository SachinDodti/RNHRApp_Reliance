import { StyleSheet, Dimensions } from 'react-native';

const colors = require('../../Config/config');

const { height } = Dimensions.get('screen');

const headerBackgroundColor = '#81c04d';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: headerBackgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearMonthContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    width: 40,
    marginLeft: 10,
    resizeMode: 'contain',
    height: 40,
    marginTop: 10,
  },
  arrowIcon: {
    width: 30,
    resizeMode: 'contain',
    height: 30,
  },
  listView: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 10,
    marginBottom: height / 9.5,
  },
  listViewinside: {
    flexDirection: 'row',
    width: '68%',
    flex: 1,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  keyMargin: {
    marginLeft: 60, flex: 1,
  },
  flex: {
    flex: 1,
  },
  headingText: {
    paddingLeft: 10,
    paddingTop: 15,
    fontSize: 25,
  },
  titleText: {
    flex: 1,
    marginTop: 20,
    margin: 10,
    marginBottom: height / 13,
  },
  dataView: {
    flex: 1,
    flexDirection: 'row',
  },
  sapCodeText: {
    width: '55%',
    fontWeight: 'bold',
    fontSize: 17,
  },
  keyText: {
    width: '50%',
    fontWeight: 'bold',
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
    flexDirection: 'row',
    marginTop: 13,
  },
  dataTextSapCode: {
    fontSize: 17,
  },
  datatextKey: {
    fontSize: 17,
  },
});

export default styles;
