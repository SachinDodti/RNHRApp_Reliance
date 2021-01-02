import { StyleSheet, Dimensions } from 'react-native';
import { getDeviceFontSize } from '../../Util/Resolution';

const colors = require('../../Config/config');

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  btnContainerStyle: {
    padding: 10,
    width: 150,
  },
  btnProceedTextStyle: { fontFamily: 'VAGRoundedStd-Black', color: colors.proceedBorder },
  btnCancelTextStyle: { fontFamily: 'VAGRoundedStd-Black', color: colors.cancelBorder },
  btnCancelStyles: {
    borderColor: colors.cancelBorder,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnProceedStyles: {
    borderColor: colors.proceedBorder,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: colors.transparent,
  },
  btnViewContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 20,
    // height: 60,
  },
  dividerStyle: {
    backgroundColor: colors.lineColor,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
  },
  txtStyle: {
    padding: 20,
    fontFamily: 'VAGRoundedStd-Light',
    color: colors.alertTextColor,
    marginLeft: 5,
    marginRight: 10,
    paddingBottom: 10,
  },

  messageStyle: {
    fontSize: getDeviceFontSize(16),
  },
  subMessageStyle: {
    fontSize: getDeviceFontSize(14),
  },


  imgErrorContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  imgError: {
    height: 40,
    width: 45,
    margin: 2,
  },
  parentView: {
    flex: 1,
    width,
    // padding: 10,
    // marginRight: 10,
    height: height * 0.8,
  },
  showBorder: {
    borderColor: colors.success,
    borderWidth: 1,
  },
  troubleLogin: {
    // paddingTop: 29,
    // marginLeft: 80,
    // marginRight: 80,
  },
  loginHelp: {
    alignSelf: 'center',
    fontFamily: 'VAGRounded',
    color: colors.proceedBorder,
    fontSize: getDeviceFontSize(12),
  },
});

export default styles;
