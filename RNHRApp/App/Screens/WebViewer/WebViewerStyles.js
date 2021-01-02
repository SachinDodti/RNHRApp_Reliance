import { StyleSheet } from 'react-native';
import { getDeviceFontSize } from '../../Util/Resolution';

const colors = require('../../Config/config');

const styles = StyleSheet.create({
  groupTitle: {
    // backgroundColor: colors.groupTitleBackgroup,
    borderBottomWidth: 1,
    borderBottomColor: colors.groupTileHeader,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFormat: {
    color: colors.groupTileHeader,
    textAlign: 'center',
    fontSize: getDeviceFontSize(20),
    // fontWeight: 'bold',
    // alignItems: 'flex-start',
    flex: 100,
    lineHeight: 60,
    marginLeft: 40,
  },
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    fontSize: getDeviceFontSize(16),
  },
});

export default styles;
