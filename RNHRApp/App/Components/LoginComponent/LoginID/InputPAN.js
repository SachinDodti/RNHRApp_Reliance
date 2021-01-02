import React from 'react';
import { View, TextInput } from 'react-native';
import I18N_CONSTANTS from '../../../I18n/LanguageConstants';
import { getText } from '../../../I18n/Lang';
import styles from '../Styles';

const InputPAN = ({ onChange, loginId }) => (
  <View>
    <TextInput
      style={styles.itemStyle}
      placeholder={getText(I18N_CONSTANTS.LOGIN.PAN_NUMBER)}
      placeholderTextColor="#72a8e2"
      onChangeText={onChange}
      autoCapitalize="none"
      autoCorrect={false}
      value={loginId}
      maxLength={10}
    />
  </View>
);

export default InputPAN;
