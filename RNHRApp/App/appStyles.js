import { StyleSheet, Dimensions } from 'react-native';
import { getDeviceFontSize } from './Util/Resolution';

const { height } = Dimensions.get('screen');

const colors = require('./Config/config');

const appStyles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
    /* please do not update border and margin information below.
    This has been the fix provided by facebook for bold text truncate issue
    */
    borderWidth: 2,
    borderColor: colors.transparent,
    marginBottom: -4,
  },
  margin05: {
    margin: 5,
  },
  margin10: {
    margin: 10,
  },
  marginRight10: {
    marginRight: 10,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  margin15: {
    margin: 15,
  },
  margin20: {
    margin: 20,
  },
  padding05: {
    padding: 5,
  },
  padding10: {
    padding: 10,
  },
  padding15: {
    padding: 15,
  },
  padding20: {
    padding: 20,
  },
  font06: {
    fontSize: getDeviceFontSize(6),
  },
  font08: {
    fontSize: getDeviceFontSize(8),
  },
  font10: {
    fontSize: getDeviceFontSize(10),
  },
  font12: {
    fontSize: getDeviceFontSize(12),
  },
  font14: {
    fontSize: getDeviceFontSize(14),
  },
  font16: {
    fontSize: getDeviceFontSize(16),
  },
  font18: {
    fontSize: getDeviceFontSize(18),
  },
  font20: {
    fontSize: getDeviceFontSize(20),
  },
  font22: {
    fontSize: getDeviceFontSize(22),
  },
  scrollViewParent: { flex: 1 },
  rootView: {
    flex: 1,
    backgroundColor: colors.notificationColor,
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
    height,
  },
  dividerStyle: {
    backgroundColor: colors.lineColor,
    height: 2,
    marginLeft: 0,
    marginRight: 0,
  },
  centreAlignedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonWarning: {
    borderColor: colors.warning,
  },
  buttonSuccess: {
    borderColor: colors.success,
  },
  buttonDisbaled: {
    borderColor: colors.disabled,
  },
  txtSuccess: {
    color: colors.success,
  },
  txtDisabled: {
    color: colors.disabled,
  },
  txtWarning: {
    color: colors.warning,
  },
});

export default appStyles;
