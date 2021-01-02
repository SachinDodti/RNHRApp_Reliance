import React from 'react';
import { Image } from 'react-native';
import styles from './Styles';
import { IMG_ERROR_WHITE } from '../../Assets/images';

const InformationIcon = () => (
  <Image
    style={styles.informationIcon}
    source={IMG_ERROR_WHITE}
  />
);

export default InformationIcon;
