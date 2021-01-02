import React, { Component } from "react";
import { View, TextInput, Alert, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-elements";
import { getText } from "../../I18n/Lang";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import styles from "./Styles";
import { IMG_INFO } from "../../Assets/images";
import ApplicationConstants from "../../Constants/ApplicationContants";

class ResetPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Otp: "",
      password: ""
    };
  }

  submitDetails = () => {
    const { searchValue, showError } = this.props;
    const { Otp, password } = this.state;
    if (
      password.match(/[0-9]/g) &&
      password.match(/[^a-zA-Z\d]/g) &&
      password.length > 7
    ) {
      if (Otp.length > 3) {
        const authReq = {
          sapCode: searchValue,
          newPassword: password,
          otp: Otp
        };
        const { submitOtpPassDetails } = this.props;
        submitOtpPassDetails(authReq);
        // console.log("submitOtpPassDetails", submitOtpPassDetails);
      } else showError("Otp must be of 4 digit");
    } else showError("Password is not as per Password policy");
  };

  updatePassword = val1 => {
    this.state.password = val1;
  };

  updateotpValue1 = val2 => {
    this.state.Otp = val2;
  };

  showAlert = () => {
    const { showMessage } = this.props;
    showMessage(
      "- Minimum 8 characters of length\n- Use letters, numbers and special character to increase security\n- 6 historical passwords not allowed",
      ApplicationConstants.messageType.INFO,
      "Password Policy"
    );
  };

  render() {
    return (
      <View>
        <View style={styles.searchBarComponentStyles}>
          <View style={styles.searchTextContainer}>
            <TextInput
              secureTextEntry
              style={styles.itemStylePass}
              placeholder={getText(I18N_CONSTANTS.LOGIN.NEW_PASSWORD)}
              placeholderTextColor="#72a8e2"
              onChangeText={this.updatePassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            style={styles.imgSearchContainer}
            onPress={this.showAlert}
          >
            <Image source={IMG_INFO} style={styles.imgPosition} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBarComponentStylesOTP}>
          <View style={styles.searchTextContainer}>
            <TextInput
              style={styles.itemStylePass}
              placeholder={getText(I18N_CONSTANTS.RESET_PASSWORD.ENTER_OTP)}
              placeholderTextColor="#72a8e2"
              onChangeText={this.updateotpValue1}
              numeric
              value
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </View>

        <Button
          title={getText(I18N_CONSTANTS.COMMON.SUBMIT)}
          containerStyle={styles.btnSubmitOTPContainer}
          titleStyle={styles.btnSubmitText}
          buttonStyle={styles.btnSubmitOTPStyles}
          onPress={this.submitDetails}
        />
      </View>
    );
  }
}

export default ResetPasswordComponent;
