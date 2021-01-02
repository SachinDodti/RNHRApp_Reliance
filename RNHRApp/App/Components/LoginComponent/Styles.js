import { StyleSheet } from 'react-native';

const colors = require('../../Config/config');

const backgroundColor = '#F5FCFF';

const styles = StyleSheet.create({
  segmentStyles: {
    margin: 10,
    padding: 10,
  },
  btnTabStyles: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
  },
  contentContainerStyle: {
    flex: 1,
    padding: 10,
  },
  itemStyle: {
    // marginRight: 5,
    borderColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 10,
    fontFamily: 'VAGRoundedStd-Light',
    fontSize: 14,
    height: 50,
    paddingLeft: 12,
    color: colors.white,
  },
  itemStylePass: {
    // marginRight: 5,
    borderColor: colors.white,
    // borderWidth: 0.5,
    borderRadius: 10,
    fontFamily: 'VAGRoundedStd-Light',
    fontSize: 14,
    height: 50,
    paddingLeft: 12,
    color: colors.white,
  },
  textStyle: {
    fontFamily: 'VAGRoundedStd-Light',
  },
  btnLoginStyle: { alignSelf: 'center', margin: 30 },
  searchTextContainer: {
    // paddingLeft:10,
    flex: 1,
    justifyContent: 'center',
  },
  searchBarComponentStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  imgSearchContainer: {
    // paddingLeft:100,
    alignSelf: 'center',
  },
  imgPosition: {
    flex: 1,
    flexDirection: 'row',
    // padding: 12,
    width: 22,
    height: 26,
    marginLeft: '4%',
    marginTop: '15%',
    marginBottom: '20%',
    resizeMode: 'contain',
  },
});

export default styles;
