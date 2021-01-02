import { StyleSheet } from 'react-native';

const colors = require('../../Config/config');

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: colors.headerBackgroundColor,
    flexDirection: 'row',
    flex: 1,
  },
  leftSwitchView: {
    marginTop: 20,
    flex: 1,
  },
  switchView: {
    marginTop: 20,
    flex: 1,
  },
  switchStyle: {
    marginRight: '37%',
    marginLeft: '30%',
    transform: [{ scaleX: 1.45 }, { scaleY: 1.3 }],
    marginBottom: 15,
  },
  imgLeftUpper: {
    marginRight: 30,
    resizeMode: 'contain',
    height: 40,
    marginTop: 15,
    justifyContent: 'flex-start',
  },
  midText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'center',
    lineHeight: 70,
    alignItems: 'center',
    flex: 1,
    paddingRight: 50,
  },
  imgRightUpper: {
    marginRight: 20,
    resizeMode: 'contain',
    height: 40,
    marginTop: 15,
    justifyContent: 'flex-end',
  },
  lowerTile: {
    height: 60,
    // backgroundColor: colors.backgroundColor,
    marginTop: 25,
  },
  textI: {
    color: colors.placeHolderTextColor,
    textAlign: 'center',
  },
  textWish: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  switchtext: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: colors.placeHolderTextColor,
    paddingLeft: '34.5%',
  },
  textView: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.white,
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    marginLeft: 90,
    marginRight: 90,
    marginBottom: 10,
    backgroundColor: colors.backgroundColor,
  },
  imgView: {
    borderColor: 'black',
    borderWidth: 5,
    marginRight: 115,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 5,
  },
  imgPosition: {
    resizeMode: 'contain',
    height: 13,
    marginRight: 0,
    alignItems: 'center',
    width: 70,
    marginTop: 5,
    alignSelf: 'center',
  },
  disable: {
    opacity: 0.2,
  },
  blueBackground: {
    backgroundColor: colors.attendanceDayWiseBackground,
  },
});

export default styles;
