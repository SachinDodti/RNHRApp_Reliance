import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import styles from './Styles';
import {
  IMG_ICON_CLOSE,
  IMG_ICON_CALL,
  IMG_ICON_MAIL,
} from '../../Assets/images';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import {getText} from '../../I18n/Lang';
import ApplicationConfiguration from '../../Config/env';
import HrAppUtil from '../../Util/HrAppUtil';

class TroubleLoggedInPopUp extends Component {
  constructor(props) {
    super(props);
    this.openDialPad = this.openDialPad.bind(this);
    this.openEmail = this.openEmail.bind(this);
  }

  openDialPad(contactNumberItem) {
    // const { contactNumber } = this.props;
    const linkUrl = `tel:${contactNumberItem}`;
    Linking.openURL(linkUrl);
  }

  openEmail() {
    const {contactEmail} = this.props;
    const emailSubject = getText(I18N_CONSTANTS.COMMON.LOGIN_ISSUE_MAIL_SUBJET);
    const emailBody = getText(I18N_CONSTANTS.COMMON.LOGIN_ISSUE_MAIL_BODY);
    const linkUrl = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    // console.log('Email Link url : ', linkUrl);

    Linking.openURL(linkUrl);
  }

  getIndividualContact(contactNumber) {
    return (
      <TouchableOpacity
        style={[styles.phoneNumberContainerMobile]}
        onPress={() => this.openDialPad(contactNumber)}>
        <Image style={styles.phoneImg} source={IMG_ICON_CALL} />

        <Text style={styles.phoneNoText}>{contactNumber}</Text>
      </TouchableOpacity>
    );
  }

  getContactNumbers(contactNumbers) {
    if (contactNumbers) {
      const contactObject = contactNumbers.split(',');
      // console.log("hjhjh : ", contactObject);
      return (
        <View style={styles.contactViewDouble}>
          <View style={[styles.contactView]}>
            {contactObject.map((contactNumber) =>
              this.getIndividualContact(contactNumber),
            )}
          </View>
        </View>
      );
    }
    return null;
  }

  render() {
    const {
      isTroublePopUpVisible,
      closeIsTroublePopUp,
      contactNumber,
      contactEmail,
      message,
    } = this.props;
    // console.log("Contact Number", contactNumber);
    return (
      <Popover
        isVisible={isTroublePopUpVisible}
        popoverStyle={styles.popUpBackgroundColor}>
        <View style={styles.parentView}>
          <View style={styles.headerDirection}>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={closeIsTroublePopUp}>
                <Image style={styles.imgRightUpper} source={IMG_ICON_CLOSE} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={[styles.notificationText]}>{message}</Text>
          </View>
          {this.getContactNumbers(contactNumber)}
          <View style={styles.deviderView}>
            <View style={styles.deviderFlex}>
              <Text style={[styles.orText]}>Or</Text>
              <View style={styles.deviderBorder} />
            </View>
          </View>
          <View style={styles.emailView}>
            <TouchableOpacity
              style={[styles.phoneNumberContainer]}
              onPress={this.openEmail}>
              <Image style={styles.phoneImg} source={IMG_ICON_MAIL} />
              <Text style={styles.phoneNoText}>{contactEmail}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Popover>
    );
  }
}

TroubleLoggedInPopUp.propTypes = {
  isTroublePopUpVisible: PropTypes.bool.isRequired,
  closeIsTroublePopUp: PropTypes.func.isRequired,
  contactEmail: PropTypes.string,
  contactNumber: PropTypes.string,
  message: PropTypes.string,
};

TroubleLoggedInPopUp.defaultProps = {
  contactEmail: ApplicationConfiguration.contact.emailId,
  contactNumber: ApplicationConfiguration.contact.mobileNumber,
  message: getText(I18N_CONSTANTS.COMMON.LOGIN_HELP),
};

export default TroubleLoggedInPopUp;
