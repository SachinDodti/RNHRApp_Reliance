import React, { Component } from "react";
import PropTypes from "prop-types";
import Popover from "react-native-popover-view";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import styles from "./ErrorPopoverStyle";
import {
  IMG_ICON_ERROR,
  IMG_ICON_SUCCESS,
  IMG_ICON_INFO,
} from "../../Assets/images";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import HrAppUtil from "../../Util/HrAppUtil";
import appStyles from "../../appStyles";
import ApplicationContants from "../../Constants/ApplicationContants";

class ErrorPopover extends Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }

  getTitle() {
    const { appState } = this.props;
    const messageType = !HrAppUtil.isNullOrEmpty(appState.messageType)
      ? `${appState.messageType}`
      : "";
    const tileString = !HrAppUtil.isNullOrEmpty(appState.title)
      ? `: ${appState.title}`
      : "";

    return messageType + tileString;
  }

  getIcon() {
    const { appState } = this.props;
    if (appState) {
      switch (appState.messageType) {
      case ApplicationContants.messageType.SUCCESS:
        return IMG_ICON_SUCCESS;
      case ApplicationContants.messageType.INFO:
        return IMG_ICON_INFO;
      case ApplicationContants.messageType.ERROR:
        return IMG_ICON_ERROR;
      case ApplicationContants.messageType.BLANK:
        return IMG_ICON_SUCCESS;
      default:
        return IMG_ICON_INFO;
      }
    }
    return IMG_ICON_INFO;
  }

  getMessage() {
    const { appState } = this.props;
    const defaultMessage = "Someting went wrong. Please try again later.";
    if (appStyles.messageType === ApplicationContants.messageType.ERROR) {
      return appState.message && appState.message.message
        ? appState.message.message
        : defaultMessage;
    }

    return appState.message && appState.message.message
      ? appState.message.message
      : appState.message;
  }

  closePopup() {
    const { clear } = this.props;
    clear();
  }

  render() {
    const { okLabel, appState } = this.props;

    return (
      <Popover
        isVisible={appState.showMessage}
        style={[styles.popOver]}
      
      >
        <View style={[styles.parentView]}>
          <View style={[styles.header]}>
            <Image style={[styles.icon]} source={this.getIcon()} />
            <Text style={[styles.title]}>{this.getTitle()}</Text>
          </View>
          <Text style={[styles.txtStyle]}>{this.getMessage()}</Text>

          <View style={[styles.btnViewContainer]}>
            <Button
              containerStyle={styles.btnContainerStyle}
              titleStyle={styles.btnProceedTextStyle}
              buttonStyle={styles.btnProceedStyles}
              title={
                okLabel && okLabel !== ""
                  ? okLabel
                  : getText(I18N_CONSTANTS.COMMON.OK)
              }
              onPress={this.closePopup}
            />
          </View>
        </View>
      </Popover>
    );
  }
}

ErrorPopover.propTypes = {
  appState: PropTypes.shape({
    loadingCount: PropTypes.number,
    error: PropTypes.objectOf(PropTypes.string),
    errorType: PropTypes.string,
    showMessage: PropTypes.bool,
    messageType: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  clear: PropTypes.func.isRequired,
  okLabel: PropTypes.string,
};

ErrorPopover.defaultProps = {
  okLabel: "",
};

export default ErrorPopover;
