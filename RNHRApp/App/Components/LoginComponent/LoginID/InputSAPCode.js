import React from 'react';
import { View, TextInput } from 'react-native';
import styles from '../Styles';
import I18N_CONSTANTS from '../../../I18n/LanguageConstants';
import { getText } from '../../../I18n/Lang';

const InputSAPCode = ({ onChange, loginId }) => (
  <View>
    <TextInput
      style={styles.itemStyle}
      placeholder={getText(I18N_CONSTANTS.LOGIN.SAP_CODE)}
      placeholderTextColor="#72a8e2"
      onChangeText={onChange}
      autoCapitalize="none"
      autoCorrect={false}
      value={loginId}
      numeric
      keyboardType="number-pad"
      maxLength={8}
    />
  </View>
);

export default InputSAPCode;
