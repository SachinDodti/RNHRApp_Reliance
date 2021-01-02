import { StyleSheet } from 'react-native';
import { getDeviceFontSize } from '../../Util/Resolution';

const colors = require('../../Config/config');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 40,
  },
  label: {
    fontSize: getDeviceFontSize(18),
    color: colors.white,
    flex: 1,
  },
  showBorder: {
    borderColor: colors.groupTileHeader,
    textAlign: 'center',
  },
});

export default styles;
