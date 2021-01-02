import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('screen');

const colors = require('../../Config/config');

const styles = StyleSheet.create({
  legendContainer: {
    padding: 10,
    backgroundColor: colors.transparent,
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    marginBottom: Platform.OS === 'ios' ? 80 : 10,
  },
  legendComponent: { flexDirection: 'row', marginRight: 20, marginTop: 10 },
  legendColorComponent: {
    width: 20, height: 20, marginRight: 10, borderRadius: width / 9,
  },
  legendTextStyle: {
    fontFamily: 'VAGRoundedStd-Light',
    color: colors.placeHolderTextColor,
    paddingTop: 3,
  },
});

export default styles;
