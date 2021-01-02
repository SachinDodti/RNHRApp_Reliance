import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './Styles';
import { IMG_LOGO_BAND } from '../../Assets/images';
import ApplicationConfiguration from '../../Config/env';


const HeaderComponent = ({ disableRedirection }) => (
  <TouchableOpacity
    disabled={disableRedirection}
    onPress={() => Actions[ApplicationConfiguration.scene.DASHBOARD]()}
  >
    <Image source={IMG_LOGO_BAND} style={styles.headerStyle} />
  </TouchableOpacity>
);

export default HeaderComponent;
