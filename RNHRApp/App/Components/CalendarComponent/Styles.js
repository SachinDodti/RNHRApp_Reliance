import { StyleSheet, Dimensions } from 'react-native';

const colors = require('../../Config/config');

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  yearMonthParent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.btnLoginBackground,
  },
  yearNavigate: {
    // backgroundColor: colors.monthToolBarBackground,
    flex: 1,
    flexDirection: 'row',
    width,
    justifyContent: 'space-between',
    backgroundColor: colors.btnLoginBackground,
  },
  yearTxtStyle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'VAGRoundedStd-Light',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: colors.placeHolderTextColor,
    paddingTop: 15,
  },
  yearContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  prevYearStyle: {
    padding: 10,
  },
  nextYearStyle: {
    padding: 10,
    marginRight: 20,
  },
  arrowStyle: {
    width: 16,
    height: 20,
    marginTop: 6,
  },
  quarterListStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 5,
    backgroundColor: colors.btnLoginBackground,
  },
  monthStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    width: Math.round(width / 6),
    height: Math.round(width / 6),
    borderRadius: Math.round(width / 6 / 2),
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.monthToolBarBackground,
  },
  selectedMonthStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    width: Math.round(width / 6),
    height: Math.round(width / 6),
    borderRadius: Math.round(width / 6 / 2),
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.placeHolderTextColor,
  },
  monthTextStyle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'VAGRoundedStd-Light',
  },
  selectedMonthtextStyle: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'VAGRoundedStd-Light',
  },
  underLine: {
    borderBottomWidth: 0.4,
    borderBottomColor: colors.white,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
});

export default styles;
