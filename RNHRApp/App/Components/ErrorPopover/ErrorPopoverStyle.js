import { StyleSheet, Dimensions } from 'react-native';
import ApplicationConfiguration from '../../Config/env';
import { getDeviceFontSize } from '../../Util/Resolution';

const colors = require('../../Config/config');

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  popOver: {
    borderRadius: 25,
  },
  btnContainerStyle: {
    margin: 10,
    marginBottom: 20,
    width: 150,
    // flex: 1,
  },
  btnProceedTextStyle: { fontFamily: 'VAGRoundedStd-Black', color: colors.proceedBorder },
  btnCancelTextStyle: { fontFamily: 'VAGRoundedStd-Black', color: colors.cancelBorder },
  btnCancelStyles: {
    borderColor: colors.cancelBorder,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnProceedStyles: {
    borderColor: colors.proceedBorder,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  // txtStyleNote: {
  //   paddingTop: 20,
  //   fontFamily: 'VAGRoundedStd-Light',
  //   color: colors.alertTextColor,
  //   paddingLeft: 5,
  //   paddingRight: 5,
  // },
  dividerStyle: {
    backgroundColor: colors.lineColor,
    paddingLeft: 5,
    paddingRight: 5,
  },
  txtStyle: {
    margin: 10,
    color: colors.alertTextColor,
    fontFamily: ApplicationConfiguration.font.DEFAULT,
    fontSize: getDeviceFontSize(12),
  },
  header: {
    // alignItems: 'center',
    // paddingTop: 25,
    // paddingBottom: 40,
    flex: 1,
    margin: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 10,
    fontFamily: ApplicationConfiguration.font.DEFAULT,
    fontSize: getDeviceFontSize(16),
    color: colors.alertTextColor,
  },
  parentView: {
    flex: 1,
    width,
    paddingRight: 20,
  },
  showBorder: {
    borderColor: colors.installedColor,
    borderWidth: 1,
  },
});

export default styles;
