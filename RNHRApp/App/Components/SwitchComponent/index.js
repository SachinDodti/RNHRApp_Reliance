import React, { Component } from "react";
import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import styles from "./Styles";
import colors from "../../Config/config";
import { IMG_ICON_VIEW } from "../../Assets/images";

class SwitchComponent extends Component {
  constructor() {
    super();
    this.state = {
      inApp: false,
      sms: false,
      email: false,
    };
    this.showSMSTemplate = this.showSMSTemplate.bind(this);
    this.showInAppTemplate = this.showInAppTemplate.bind(this);
    this.showEmailTemplate = this.showEmailTemplate.bind(this);
  }

  onClickHandler = () => {
    const { inApp } = this.state;
    const { sms } = this.state;
    const { email } = this.state;
    const { sendWishHandler, employee } = this.props;
    // console.log(`${inApp} ${sms} ${email} `);
    sendWishHandler(employee, { inApp, sms, email });
  };

  shouldButtonDisabled() {
    const { inApp, sms, email } = this.state;
    return !sms && !email && !inApp;
  }

  showInAppTemplate() {
    // console.log('Show in app template here');
    const { showWishTemplate, employee } = this.props;
    showWishTemplate("SMS", employee);
  }

  showEmailTemplate() {
    // console.log('Show in email template here');
    const { showWishTemplate, employee } = this.props;
    showWishTemplate("EMAIL", employee);
  }

  showSMSTemplate() {
    // console.log('Show in sms template here');
    const { showWishTemplate, employee } = this.props;
    showWishTemplate("SMS", employee);
  }

  render() {
    const { employee } = this.props;
    const { inApp, sms, email } = this.state;
    return (
      <View style={styles.blueBackground}>
        <View style={styles.container}>
          <View style={styles.switchView}>
            <Switch
              style={styles.switchStyle}
              value={inApp}
              onValueChange={val => this.setState({ inApp: val })}
              trackColor={{
                true: colors.placeHolderTextColor,
                false: colors.white,
              }}
              ios_backgroundColor={colors.white}
              thumbColor={colors.backgroundColor}
            />
            <Text style={styles.switchtext}>
              {getText(I18N_CONSTANTS.SWITCH.IN_APP)}
            </Text>
            <TouchableOpacity onPress={() => this.showInAppTemplate()}>
              <Image style={styles.imgPosition} source={IMG_ICON_VIEW} />
            </TouchableOpacity>
          </View>
          <View style={styles.switchView}>
            <Switch
              style={styles.switchStyle}
              value={sms}
              onValueChange={val => this.setState({ sms: val })}
              trackColor={{
                true: colors.placeHolderTextColor,
                false: colors.white,
              }}
              ios_backgroundColor={colors.white}
              thumbColor={colors.backgroundColor}
            />
            <Text style={styles.switchtext}>
              {getText(I18N_CONSTANTS.SWITCH.SMS)}
            </Text>
            <TouchableOpacity onPress={() => this.showSMSTemplate()}>
              <Image style={styles.imgPosition} source={IMG_ICON_VIEW} />
            </TouchableOpacity>
          </View>
          <View style={styles.switchView}>
            <Switch
              style={styles.switchStyle}
              value={email}
              onValueChange={val => this.setState({ email: val })}
              trackColor={{
                true: colors.placeHolderTextColor,
                false: colors.white,
              }}
              ios_backgroundColor={colors.white}
              thumbColor={colors.backgroundColor}
              disabled={employee.email === null || employee.email === ""}
            />
            <Text style={styles.switchtext}>
              {getText(I18N_CONSTANTS.SWITCH.EMAIL)}
            </Text>
            <TouchableOpacity onPress={() => this.showEmailTemplate()}>
              <Image style={styles.imgPosition} source={IMG_ICON_VIEW} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lowerTile}>
          <View style={styles.container}>
            <View style={styles.textView}>
              <TouchableOpacity
                onPress={this.onClickHandler}
                disabled={this.shouldButtonDisabled()}
                style={[this.shouldButtonDisabled() ? styles.disable : {}]}
              >
                <Text style={styles.textWish}>
                  {getText(I18N_CONSTANTS.SWITCH.SEND_WISH)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SwitchComponent;
