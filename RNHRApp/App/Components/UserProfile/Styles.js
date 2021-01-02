import { StyleSheet } from 'react-native';

const colors = require('../../Config/config');

const styles = StyleSheet.create({
  border: {
    borderBottomColor: colors.placeHolderTextColor,
    borderBottomWidth: 1,
  },
  informationBar: {
    height: 40,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.placeHolderTextColor,
    borderBottomWidth: 1.2,
  },
  textStyle: {
    padding: 10,
    color: colors.white,
  },
});

export default styles;
