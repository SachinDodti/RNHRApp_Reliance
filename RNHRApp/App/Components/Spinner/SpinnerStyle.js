import { StyleSheet } from 'react-native';


const colors = require('../../Config/config');


const styles = StyleSheet.create({
  popOver: {
    borderRadius: 1,
    backgroundColor: colors.transparentPopover,
  },
  spinner: {
    color: colors.installedColor,
  },
});

export default styles;
