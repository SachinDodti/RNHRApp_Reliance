import { StyleSheet, Dimensions } from 'react-native';

const colors = require('../../Config/config');

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  rootView: {
    height: 50,
    width,
    backgroundColor: colors.navBarBackground,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  profileButtonStyle: { paddingRight: 35 },
  profileNotificationButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  notificationButtonStyle: { paddingRight: 10 },
});

export default styles;
