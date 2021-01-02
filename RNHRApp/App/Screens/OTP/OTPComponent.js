import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Content } from "native-base";
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import TroubleLoggedInPopUp from "../../Components/TroubleLoggedInPopUp";
import styles from "./Styles";
import appStyles from "../../appStyles";
import HeaderComponent from "../../Components/HeaderComponent";
import { IMG_RIGHT, IMG_APP_BACKGROUND, IMG_MOBILE } from "../../Assets/images";
import NavBarComponent from "../../Components/NavBarComponent";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import ApplicationConfiguration from "../../Config/env";
import ApplicationContants from "../../Constants/ApplicationContants";
import HrAppUtil from "../../Util/HrAppUtil";
import ApplicationConstants from "../../Constants/ApplicationContants";

import { STORAGE_KEY } from "../../Util/LocalStorage";

const keyContactNum = STORAGE_KEY.APPLICATION.HELP_CONTACT_NUMBER;
const keyContactEmail = STORAGE_KEY.APPLICATION.HELP_CONTACT_EMAIL;
const keyHelpMsg = STORAGE_KEY.APPLICATION.HELP_MESSAGE;

class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpValue: "",
      isTroublePopUpVisible: false,
    };
    this.updateotpValue = this.updateotpValue.bind(this);
  }

  componentDidMount() {
    // console.log('<< login componet DID MOUNT >>', this.state.sapCode);
    /* This should return a promise, to be resolved in the screen */
    // checkAppInstalledAndGetVersion('whatsapp');
    // // console.log('Login Component mounted ....');
    // console.log("This should place timeout alert");
    const { showMessage } = this.props;
    this.timerHandle = setTimeout(() => {
      if (Actions.currentScene === ApplicationConfiguration.scene.OTP) {
        showMessage(
          getText(I18N_CONSTANTS.OTP.OTP_WARNING_SERVICE),
          ApplicationConstants.messageType.INFO,
          "OTP Warning",
        );
      }
      this.timerHandle = 0;
    }, 120000);
  }

  componentWillUnmount() {
    // if (this.timeoutHandle) {                  // ***
    //   // Yes, clear it                     // ***
    //   clearTimeout(this.timeoutHandle);      // ***
    //   this.timeoutHandle = 0;                // ***
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.appState.messageType === ApplicationConstants.messageType.ERROR
    ) {
      nextState.otpValue = "";
    }
    return true;
  }

  onBackPress = () => {
    Actions.pop();
  };

  validateOTP = () => {
    if (this.timerHandle) {
      // ***
      // Yes, clear it                     // ***
      clearTimeout(this.timerHandle); // ***
      this.timerHandle = 0; // ***
    }
    const { otpValue } = this.state;
    const { showError } = this.props;
    const otpRequest = {
      action: ApplicationConfiguration.otpActions.validateMobile,
      otp: otpValue,
    };
    const { authData, validateOTP } = this.props;
    // const registerDeivceRequest = {
    //   appVersion: DeviceInfo.getVersion(),
    //   deviceType : Platform.OS,
    // };
    // console.log("validate otp request", otpValue.length);
    if (otpValue.length < 4) {
      showError(
        getText(I18N_CONSTANTS.OTP.MIN_OTP_WARNING),
        "OTP - Invalid Credential",
      );
    } else {
      validateOTP(otpRequest, authData.userProfile.mobileNo);
    }
    // validateOTP(otpRequest, authData.userProfile.mobileNo);
    // console.log(JSON.stringify('Move to dashboard'));
    // Actions.dashboard();
  };

  updateotpValue = otp => {
    this.setState({ otpValue: otp });
    // this.state.otpValue = otp;
  };

  resendOtp = () => {
    // console.log("within resend otp");
    const otpReq = {
      action: ApplicationContants.sendOtpACTION,
    };
    const { resendOTP } = this.props;
    resendOTP(otpReq);
  };

  troubleLoggedIn = () => {
    this.setState({ isTroublePopUpVisible: true });
  };

  hideIsTroublePopUp = () => {
    this.setState({ isTroublePopUpVisible: false });
  };

  render() {
    // console.log('OTP render', this.props.authData.authToken);
    // // console.log('sendotp config:',ApplicationConfiguration.sendOtpACTION);
    // const otpReq = {
    //   action:ApplicationConfiguration.sendOtpACTION,
    // };
    // this.props.sendOTP(otpReq);
    // console.log('auth data value in otp render',this.props.authData.userProfile);
    const { authData, localStore } = this.props;
    const contactNumber = localStore[keyContactNum];
    const contactEmail = localStore[keyContactEmail];
    const helpMessage = localStore[keyHelpMsg];
    const mobileMask = authData.userProfile
      ? authData.userProfile.mobileNo
      : "XXXXXXXXXX";
    const maskedNumber = HrAppUtil.maskMobileNo(mobileMask);
    const { isTroublePopUpVisible } = this.state;
    // console.log("OTP render", this.props.authData);
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
          <Content indicatorStyle="white">
            <View style={styles.imgPhContainer}>
              <Image style={styles.imgPh} source={IMG_MOBILE} />
            </View>
            <Text style={styles.txtStyle}>
              {getText(I18N_CONSTANTS.OTP.REGISTERED)}
            </Text>
            <View style={styles.phContainer}>
              <Image style={styles.imgRight} source={IMG_RIGHT} />
              <Text style={styles.txtPhStyle}>{maskedNumber}</Text>
            </View>
            <View style={styles.otpButtonContainers}>
              {/* <Button
              containerStyle={styles.btnOTPContainerStyle}
              titleStyle={styles.btnGetOTPStyle}
              buttonStyle={styles.btnOTPStyles}
              title={getText(I18N_CONSTANTS.OTP.GET_OTP)}
            /> */}
              <Button
                title={getText(I18N_CONSTANTS.OTP.RESEND_OTP)}
                containerStyle={styles.btnContainerStyle}
                titleStyle={styles.btnResendOTPStyle}
                buttonStyle={styles.btnOTPStyles}
                onPress={this.resendOtp}
              />
            </View>
            <View style={styles.txtInputContainer}>
              <TextInput
                style={styles.txtInputOTP}
                textContentType="oneTimeCode"
                returnKeyType="done"
                placeholderTextColor="#72a8e2"
                onChangeText={this.updateotpValue}
                placeholder={getText(I18N_CONSTANTS.OTP.ENTER_OTP)}
                numeric
                value={this.state.otpValue}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
            <View style={styles.receivedOTPStyle}>
              <Text style={styles.txtStyle}>
                {getText(I18N_CONSTANTS.OTP.VALID_TEXT)}
              </Text>
              {/* <TouchableOpacity onPress={this.ShowAlertWithDelay}>
                <Text style={styles.txtStyleS}>
                  {getText(I18N_CONSTANTS.OTP.OTP_WARNING_SERVICE)}
                </Text>
              </TouchableOpacity> */}
            </View>
            <Button
              title={getText(I18N_CONSTANTS.OTP.SUBMIT_OTP)}
              containerStyle={styles.btnSubmitOTPContainer}
              titleStyle={styles.btnSubmitOTPText}
              buttonStyle={styles.btnSubmitOTPStyles}
              onPress={this.validateOTP}
            />
            <View style={styles.troubleLogin}>
              <TouchableOpacity onPress={this.troubleLoggedIn}>
                <Text style={styles.loginHelp}>
                  {getText(I18N_CONSTANTS.LOGIN.TROUBLE_LOGGING_IN)}
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
        </ImageBackground>
        <TroubleLoggedInPopUp
          key={contactNumber}
          closeIsTroublePopUp={this.hideIsTroublePopUp}
          isTroublePopUpVisible={isTroublePopUpVisible}
          contactNumber={contactNumber}
          contactEmail={contactEmail}
          message={helpMessage}
        />
      </SafeAreaView>
    );
  }
}
export default OTP;
