import { StyleSheet, Platform } from 'react-native';

const colors = require('../../Config/config');


const styles = StyleSheet.create({
  searchTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchTextContainer1: {
    flex: 1,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: colors.white,
    marginRight: 10,
  },
  pickerStyle: {
    fontSize: 15, paddingBottom: 12, paddingRight: 10, color: colors.white,
  },
  placeholderStyle: {
    color: colors.white, fontSize: 15, paddingBottom: 12,
  },
  selectHeight: {
    marginTop: Platform.OS === 'ios' ? 0 : -5,
  },
  searchBarStyles: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  transparentBackground: {
    backgroundColor: colors.transparentPopover,
  },
  imgSearchContainer: {
    paddingRight: 10,
    alignSelf: 'center',
  },
  disabled: {
    opacity: 0.2,
  },
  txtInputSearchStyles: {
    // color: colors.white,
    borderColor: colors.inputBorderColor,
    paddingLeft: 1,
    fontFamily: 'VAGRoundedStd-Light',
    paddingTop: 8,
    paddingBottom: 10,
    fontSize: 16,
    justifyContent: 'center',
    color: colors.white,
    alignItems: 'center',
    // paddingTop: 0,
    // borderColor: colors.white,
    // borderWidth: 1,
  },
  txtInputSearchStyles1: {
    color: colors.white,
    paddingLeft: 5,
    fontFamily: 'VAGRoundedStd-Light',
    fontSize: 14,
    justifyContent: 'center',
    borderColor: colors.white,
    borderRightWidth: 1,
  },
  searchBarComponentStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainer: {
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 5,
  },
  imgSearchStyles: {
    resizeMode: 'contain',
    width: 10,
    height: 10,
    padding: 10,
    margin: 1,
    alignSelf: 'center',
  },
});

export default styles;
