import { Platform, StyleSheet } from 'react-native';

const colors = require('../../Config/config');

const styles = StyleSheet.create({
  swiperStyle: {
    marginBottom: 50,
  },
  parentView: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 10,
    marginBottom: 100,
    backgroundColor: colors.white,
  },
  acceptEULA: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  dotStyles: {
    backgroundColor: colors.notificationColor,
    // opacity: 0.2,
    width: 50,
    height: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDotStyles: {
    backgroundColor: colors.defaultDayColor,
    width: 50,
    height: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  btnNextEnableStyle: {
    borderColor: colors.white,
    width: 168,
    alignSelf: 'center',
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: colors.btnLoginBackground,
    justifyContent: 'center',
  },
  btnNextEnableStyle: {
    opacity: 0.4,
  },
  txtNextStyle: {
    fontFamily: 'VAGRoundedStd-Black',
    color: colors.white,
  },
});

export default styles;
