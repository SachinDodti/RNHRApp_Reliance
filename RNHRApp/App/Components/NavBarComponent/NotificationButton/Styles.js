import { StyleSheet } from 'react-native';

const colors = require('../../../Config/config');

const styles = StyleSheet.create({
  notificationDot: {
    // position: "absolute",
    // top: 0,
    // left: 10,
    // right: 0,
    // bottom: 30,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: colors.white,
    position: 'absolute',
    // flex: 1,
    height: 20,
    width: 20,
    marginLeft: 20,
    marginTop: -5,
    backgroundColor: colors.red,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  NotificationImgStyle: {
    position: 'relative',
    width: 22,
    height: 30,
  },
  profileButtonStyle: {
    paddingLeft: 5,
    paddingRight: 0,
  },
  view: {
    marginRight: 30,
  },
  dotStyles: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  flex: {
    flex: 0.3,
  },
});

export default styles;
