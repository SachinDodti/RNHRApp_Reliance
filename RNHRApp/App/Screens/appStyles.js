import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('screen');

const colors = require('../Config/config');

const appStyles = StyleSheet.create({
  scrollViewParent: { flex: 1 },
  rootView: {
    flex: 1,
    backgroundColor: colors.notificationColor,
  },
  backgroundImageStyle: {
    flex: (Platform.OS === 'ios') ? null : 1,
    resizeMode: 'cover',
    height,
  },
});

export default appStyles;
