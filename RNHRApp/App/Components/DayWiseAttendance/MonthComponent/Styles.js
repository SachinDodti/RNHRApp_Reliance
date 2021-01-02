import { StyleSheet, Dimensions } from 'react-native';

const width = Math.round(Dimensions.get('screen').width);
const colors = require('../../../Config/config');

const styles = StyleSheet.create({
  weekPadding: { padding: 10 },
  weekStyling: { flex: 1, justifyContent: 'space-evenly' },
  daysContainer: {
    alignSelf: 'stretch',
    width: width / 8,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  daysText: {
    textAlign: 'center',
    fontFamily: 'VAGRoundedStd-Light',
    color: colors.placeHolderTextColor,
  },
});


export default styles;
