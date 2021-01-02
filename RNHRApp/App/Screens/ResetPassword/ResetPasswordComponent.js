import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { Text, Content } from "native-base";
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import styles from "./Styles";
import appStyles from "../../appStyles";
import HeaderComponent from "../../Components/HeaderComponent";
import { IMG_APP_BACKGROUND } from "../../Assets/images";
import NavBarComponent from "../../Components/NavBarComponent";
import ResetPasswordComponent from "../../Components/ResetPasswordComponent";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import { showMessage } from "../../Redux/Actions/ApplicationStateAction";
import ApplicationConstants from "../../Constants/ApplicationContants";
import HrAppUtil from "../../Util/HrAppUtil";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  onBackPress = () => {
    Actions.pop();
  };

  submitSapCode = () => {
    const { searchValue } = this.state;
    const { showError } = this.props;

    let sapCode = "";
    if (HrAppUtil.isValidSapCode(searchValue)) {
      sapCode = searchValue;
      const authReq = {
        sapCode,
      };
      const { sapCodeSearch } = this.props;
      sapCodeSearch(authReq);
      // const { resetPassword } = this.props;
      // if (resetPassword && resetPassword.sapCodeSuccess.status === "Success") {
      //   this.setState({ TextInputDisableStatus: false }),
      //   this.setState({ flag: true });
      //   // console.log(
      //   //   "sapCodeSuccess props",
      //   //   resetPassword.sapCodeSuccess.status,
      //   // );
      // }
    } else {
      showError(
        getText(I18N_CONSTANTS.LOGIN.MIN_SAPCODE_WARNING),
        "Not a valid sapcode",
      );
    }
  };

  updateSearchValue = val => {
    // this.setState({ searchValue: val });
    this.state.searchValue = val;
    // console.log("update value", this.state.searchValue);
  };

  submitOtpPassDetails = authReq => {
    // console.log("submitOtpPassDetails", authReq);
    const { submitOtpPassDetails } = this.props;
    submitOtpPassDetails(authReq);
  };

  render() {
    const { resetPassword, showMessage, showError } = this.props;

    const { searchValue } = this.state;

    const flag = resetPassword.otpSent;

    // console.log("sapCodeSuccess props", resetPassword);
    return (
      <SafeAreaView style={appStyles.rootView}>
        <HeaderComponent disableRedirection />
        <NavBarComponent
          includeVersion
          includeBack
          // includeProfile
          // includeNotification
          onBackPress={this.onBackPress}
        />
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={styles.rootContainer}
        >
          <Content>
            <Text style={styles.txtStyle}>
              {getText(I18N_CONSTANTS.RESET_PASSWORD.HEADER_TEXT)}
            </Text>
            <View style={styles.horizontalline} />
            {!flag ? (
              <View>
                <View style={styles.searchBarComponentStylesOTP}>
                  <View style={styles.searchTextContainer}>
                    <TextInput
                      style={styles.itemStylePass}
                      placeholder={getText(
                        I18N_CONSTANTS.RESET_PASSWORD.ENTER_SAP_CODE,
                      )}
                      placeholderTextColor="#72a8e2"
                      onChangeText={this.updateSearchValue}
                      numeric
                      value
                      keyboardType="number-pad"
                      maxLength={8}
                    />
                  </View>
                </View>

                <Button
                  title={getText(I18N_CONSTANTS.COMMON.SUBMIT)}
                  containerStyle={styles.btnSubmitOTPContainer}
                  titleStyle={styles.btnSubmitText}
                  buttonStyle={styles.btnSubmitOTPStyles}
                  onPress={this.submitSapCode}
                />
              </View>
            ) : (
              <View>
                <View
                  pointerEvents="none"
                  opacity={0.3}
                  style={styles.searchBarComponentStylesOTP}
                >
                  <View style={styles.searchTextContainer}>
                    <TextInput
                      style={styles.itemStylePass}
                      placeholder={getText(
                        I18N_CONSTANTS.RESET_PASSWORD.ENTER_SAP_CODE,
                      )}
                      placeholderTextColor="#72a8e2"
                      onChangeText={this.updateSearchValue}
                      numeric
                      value
                      keyboardType="number-pad"
                      maxLength={8}
                    />
                  </View>
                </View>

                <Button
                  title={getText(I18N_CONSTANTS.OTP.RESEND_OTP)}
                  containerStyle={styles.btnSubmitOTPContainer}
                  titleStyle={styles.btnSubmitText}
                  buttonStyle={styles.btnSubmitOTPStyles}
                  onPress={this.submitSapCode}
                />
              </View>
            )}
            {flag ? (
              <ResetPasswordComponent
                submitOtpPassDetails={this.submitOtpPassDetails}
                searchValue={searchValue}
                showMessage={showMessage}
                showError={showError}
              />
            ) : null}
          </Content>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default ResetPassword;
