import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import styles from './Styles';
import { IMG_ICON_ERROR } from '../../Assets/images';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import { getText } from '../../I18n/Lang';

const DeviceWarningComponent = (props) => {
  const {
    isVisible, closePopUp, proceedDashboard, loggingHelp,
  } = props;
  return (
    <Popover isVisible= {isVisible} >
      <View style={[styles.parentView, styles.showBorder]}>
        <View style={[styles.imgErrorContainer]}>
          <Image style={[styles.imgError]} source={IMG_ICON_ERROR} />
        </View>
        <Text style={[styles.txtStyle, styles.messageStyle]}>{getText(I18N_CONSTANTS.LOGIN.REGISTRATION_FOUND)}</Text>
        <Text style={[styles.txtStyle, styles.messageStyle]}>{getText(I18N_CONSTANTS.LOGIN.REGISTRATION_CONFIRM)}</Text>
        <Divider style={styles.dividerStyle} />
        <Text
          style={[styles.txtStyle, styles.subMessageStyle]}
        >
          {getText(I18N_CONSTANTS.LOGIN.REGISTER_DEVICE_NOTE)}
        </Text>

        <View style={[styles.btnViewContainer]}>
          <Button
            containerStyle={styles.btnContainerStyle}
            titleStyle={styles.btnCancelTextStyle}
            buttonStyle={styles.btnCancelStyles}
            title={getText(I18N_CONSTANTS.COMMON.CANCEL)}
            onPress={closePopUp}
          />
          <Button
            containerStyle={styles.btnContainerStyle}
            titleStyle={styles.btnProceedTextStyle}
            buttonStyle={styles.btnProceedStyles}
            title={getText(I18N_CONSTANTS.COMMON.PROCEED)}
            onPress={proceedDashboard}
          />
        </View>
        <View style={[styles.troubleLogin]}>
          <TouchableOpacity onPress={loggingHelp}>
            <Text style={styles.loginHelp}>
              {getText(I18N_CONSTANTS.LOGIN.TROUBLE_LOGGING_IN)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Popover>
  );
};

DeviceWarningComponent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closePopUp: PropTypes.func.isRequired,
  proceedDashboard: PropTypes.func.isRequired,
  loggingHelp: PropTypes.func.isRequired,
};

export default DeviceWarningComponent;
