import { StyleSheet } from 'react-native';


const colors = require('../../Config/config');

const styles = StyleSheet.create({
  buttonViewL: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 10,
    borderWidth: 1.2,
    borderColor: colors.white,
    borderRadius: 7,
    width: 160,
  },
  blurBackground: {
    backgroundColor: colors.transparentPopover,
  },
  transparentView: {
    flex: 1, flexDirection: 'row', backgroundColor: colors.transparentPopover,
  },
  height: {
    height: 100,
  },
  placeholderStyle: {
    color: colors.locationDirectoryPopover, fontSize: 17,
  },
  whiteTextStyle: {
    color: colors.white,
  },
  buttonViewR: {
    flex: 1,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 20,
    borderWidth: 1.2,
    borderColor: colors.white,
    borderRadius: 7,
    width: 160,
  },
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


  imgPhContainer: {
    alignItems: 'center',
    padding: 15,
  },
  imgPh: {
    width: 150,
    height: 150,
  },
  txtStyle: {
    alignSelf: 'center',
    fontFamily: 'VAGRoundedStd-Light',
    fontSize: 23,
    color: colors.placeHolderTextColor,
    paddingTop: 16,
  },
  txtStyle1: {
    alignSelf: 'center',
    fontFamily: 'VAGRoundedStd-Light',
    fontSize: 23,
    color: colors.placeHolderTextColor,
    paddingTop: 11,
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default styles;
