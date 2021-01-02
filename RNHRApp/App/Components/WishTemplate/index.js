import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Popover from 'react-native-popover-view';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
import styles from './Styles';
import { IMG_ICON_CLOSE } from '../../Assets/images';

class WishTemplate extends Component {
  constructor(props) {
    super(props);
    this.getPopOverView = this.getPopOverView.bind(this);
    this.getSMSTemplate = this.getSMSTemplate.bind(this);
    this.getEmailTemplate = this.getEmailTemplate.bind(this);
  }

  getSMSTemplate(templateMsg) {
    return <Text style={styles.smsTemplateStyle}>{templateMsg}</Text>;
  }

  getEmailTemplate(templateMsg, employee) {
    // console.log('templateMsg', templateMsg);
    const { loggedInUser } = this.props;
    // console.log('employee', employee);
    let modifiedWish = templateMsg ? templateMsg.replace('@@EmployeeName', employee ? employee.name : '') : templateMsg;
    modifiedWish = modifiedWish ? modifiedWish.replace('@@SenderName', `${loggedInUser.firstName} ${loggedInUser.lastName}`) : modifiedWish;
    const htmlString = "<html xmlns='http://www.w3.org/1999/xhtml'>";
    const responsiveHTMLString =
      '<html xmlns=\'http://www.w3.org/1999/xhtml\'><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    modifiedWish = modifiedWish ? modifiedWish.replace(htmlString, responsiveHTMLString) : modifiedWish;
    return <WebView originWhitelist={['*']} automaticallyAdjustContentInsets source={{ html: modifiedWish }} />;
  }

  getPopOverView(type, templateMsg, employee) {
    return type === 'SMS' ? this.getSMSTemplate(templateMsg) : this.getEmailTemplate(templateMsg, employee);
  }

  render() {
    const { wishType, show, templateText, onClosePopUp, employee } = this.props;
    return (
      <Popover isVisible={show} popoverStyle={styles.popUpBackgroundColor}>
        <View style={styles.parentView}>
          <View style={styles.closeButton}>
            <TouchableOpacity onPress={() => onClosePopUp()}>
              <Image style={styles.imgRightUpper} source={IMG_ICON_CLOSE} />
            </TouchableOpacity>
          </View>
          {this.getPopOverView(wishType, templateText, employee)}
        </View>
      </Popover>
    );
  }
}

WishTemplate.propTypes = {
  wishType: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  templateText: PropTypes.string.isRequired,
  onClosePopUp: PropTypes.func.isRequired,
};

export default WishTemplate;
