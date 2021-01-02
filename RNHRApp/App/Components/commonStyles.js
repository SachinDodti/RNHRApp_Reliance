import { StyleSheet } from 'react-native';

const colors = require('../Config/config');



const commonStyles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: colors.lineColor,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default commonStyles;
