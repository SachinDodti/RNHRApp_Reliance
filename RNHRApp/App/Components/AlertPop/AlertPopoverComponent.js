import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view';
import {View, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './AlertPopoverStyle';
import {
  IMG_ICON_SUCCESS,
  IMG_ICON_WARNING,
  IMG_ICON_ERROR,
} from '../../Assets/images';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import {getText} from '../../I18n/Lang';

export const AlertPopoverType = {
  ERROR: 'Error',
  WARNING: 'Warning',
  SUCCESS: 'Success',
  INFO: 'INFO',
};

const AlertPopover = (props) => {
  const {
    popOver,
    onCancel,
    onOk,
    message,
    cancelLabel,
    okLabel,
    showCancel,
    type,
    title,
  } = props;
  const IMG_WARNING_SUCCESS =
    type === AlertPopoverType.WARNING ? IMG_ICON_WARNING : IMG_ICON_SUCCESS;

  
    return (
    <Popover isVisible={popOver} style={[styles.popOver]}>
      <View style={[styles.parentView]}>
        <View style={[styles.header]}>
          <Image
            style={[styles.icon]}
            source={
              type === AlertPopoverType.ERROR
                ? IMG_ICON_ERROR
                : IMG_WARNING_SUCCESS
            }
          />
          <Text style={[styles.title]}>{title === '' ? type : title}</Text>
        </View>
        <Text style={[styles.txtStyle]}>{message}</Text>

        <View style={[styles.btnViewContainer]}>
          {showCancel ? (
            <Button
              containerStyle={styles.btnContainerStyle}
              titleStyle={styles.btnCancelTextStyle}
              buttonStyle={styles.btnCancelStyles}
              title={
                cancelLabel && cancelLabel !== ''
                  ? cancelLabel
                  : getText(I18N_CONSTANTS.COMMON.CANCEL)
              }
              onPress={onCancel}
            />
          ) : null}
          <Button
            containerStyle={styles.btnContainerStyle}
            titleStyle={styles.btnProceedTextStyle}
            buttonStyle={styles.btnProceedStyles}
            title={
              okLabel && okLabel !== ''
                ? okLabel
                : getText(I18N_CONSTANTS.COMMON.PROCEED)
            }
            onPress={onOk}
          />
        </View>
      </View>
    </Popover>
  );
};

AlertPopover.propTypes = {
  popOver: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func.isRequired,
  showCancel: PropTypes.bool,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
};

AlertPopover.defaultProps = {
  onCancel: () => 0,
  showCancel: true,
  cancelLabel: getText(I18N_CONSTANTS.COMMON.CANCEL),
  okLabel: getText(I18N_CONSTANTS.COMMON.PROCEED),
  type: AlertPopoverType.SUCCESS,
  title: '',
};

export default AlertPopover;
