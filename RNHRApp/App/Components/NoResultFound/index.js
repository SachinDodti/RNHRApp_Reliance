import React from 'react';
import { View, Text } from 'react-native';
import { getText } from '../../I18n/Lang';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import styles from './Styles';

const NoResultFound = () => (
  <View style={[styles.container]}>
    <Text style={[styles.label, styles.showBorder]}>
      {getText(I18N_CONSTANTS.COMMON.NO_RESULT_FOUND)}
    </Text>
  </View>
);

export default NoResultFound;
