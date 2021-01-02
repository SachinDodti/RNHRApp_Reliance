import React from 'react';
import {
  View, TextInput, Image, TouchableOpacity,
} from 'react-native';
import { IMG_INFO } from '../../../Assets/images';
import I18N_CONSTANTS from '../../../I18n/LanguageConstants';
import { getText } from '../../../I18n/Lang';
import styles from '../Styles';

const InputPhonePassword = ({ onChange, onClickHandler }) => (
  <View style={styles.searchBarComponentStyles}>
    <View style={styles.searchTextContainer}>
      <TextInput
        secureTextEntry
        style={styles.itemStylePass}
        placeholder={getText(I18N_CONSTANTS.LOGIN.PHONE_PASSWORD)}
        placeholderTextColor="#72a8e2"
        onChangeText={onChange}
        autoCapitalize="none"
        autoCorrect={false}
        numeric
        keyboardType="number-pad"
        maxLength={10}
      />
    </View>
    {/* <TouchableOpacity style={styles.imgSearchContainer} onPress={onClickHandler}>
      <Image
        source={IMG_INFO}
        style={styles.imgPosition}
      />
    </TouchableOpacity> */}
  </View>
);

export default InputPhonePassword;
