import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Styles';
import { IMG_ICON_BACK_NEW } from '../../../Assets/images';

const BackButton = ({ onPress }) => (
  <View>
    <TouchableOpacity style={styles.backButtonContainer} onPress={onPress}>
      <Image source={IMG_ICON_BACK_NEW} style={styles.backBtnImgStyle} />
    </TouchableOpacity>
  </View>
);

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
