import { StyleSheet } from 'react-native';

const headerBackgroundColor = '#81c04d';

const colors = require('../../Config/config');

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    backgroundColor: colors.tabBackground,
    height: 55,
    flexDirection: 'row',
  },
  imgView: {

    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imgPosition: {
    marginRight: 0,
    resizeMode: 'contain',
    height: 40,
    marginTop: 15,
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textHeader: {
    textAlign: 'left',
    paddingLeft: 65,
    fontSize: 25,
    color: colors.white,
  },
  listView: {
    backgroundColor: colors.tabBackground,
    height: 55,
    flexDirection: 'row',
    marginTop: 2,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textId: {
    textAlign: 'center',
    paddingLeft: 20,
    fontWeight: 'bold',
    color: colors.placeHolderTextColor,
  },
  nameText: {
    textAlign: 'left',
    paddingLeft: 20,
    fontWeight: 'bold',
    color: colors.placeHolderTextColor,
  },
  dropdownImgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dropdownImgPos: {
    marginRight: 0,
    resizeMode: 'contain',
    height: 10,
    marginTop: 15,
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  toastStyle: {
    backgroundColor: colors.blackBackground,
    borderWidth: 1,
    width: 375,
    height: 190,
    opacity: 0.8,
  },
  toastText: {
    color: colors.placeHolderTextColor,
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 70,
    fontWeight: 'bold',
  },
});

export default styles;
