import React, {Component} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Content, Text, Button, Tab, Tabs, TabHeading} from 'native-base';
import {CheckBox} from 'react-native-elements';
import PropTypes from 'prop-types';
import DeviceInfo, { isEmulator } from 'react-native-device-info';
import {Actions} from 'react-native-router-flux';
import styles from './Styles';
import LoginID from '../../Components/LoginComponent/LoginID';
import LoginPassword from '../../Components/LoginComponent/LoginPassword';
import HeaderComponent from '../../Components/HeaderComponent';
import TroubleLoggedInPopUp from '../../Components/TroubleLoggedInPopUp';
import {IMG_LOGIN, IMG_APP_BACKGROUND} from '../../Assets/images';
import DeviceWarningComponent from '../../Components/DeviceWarningComponent';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import {getText} from '../../I18n/Lang';
import {STORAGE_KEY} from '../../Util/LocalStorage';
import HrAppUtil from '../../Util/HrAppUtil';
import ApplicationConstants from '../../Constants/ApplicationContants';
import ErrorPopover from '../../Components/ErrorPopover';
const keyRememberMe = STORAGE_KEY.USER_PREFERENCE.REMEMBER_ME;
const keySAPCodePref = STORAGE_KEY.USER_PREFERENCE.SAPCODE;
const keyPanNum = STORAGE_KEY.USER_PREFERENCE.PANNUMBER;
const keyContactNum = STORAGE_KEY.APPLICATION.HELP_CONTACT_NUMBER;
const keyContactEmail = STORAGE_KEY.APPLICATION.HELP_CONTACT_EMAIL;
const keyHelpMsg = STORAGE_KEY.APPLICATION.HELP_MESSAGE;

class Login extends Component {
  constructor(props) {
    super(props);
    const rememberMe = props.localStore
      ? HrAppUtil.getBooleanValue(
          props.localStore[STORAGE_KEY.USER_PREFERENCE.REMEMBER_ME],
        )
      : false;

    const propSapCode =
      props.localStore && rememberMe
        ? props.localStore[STORAGE_KEY.USER_PREFERENCE.SAPCODE]
        : '';
    const propPan =
      props.localStore && rememberMe
        ? props.localStore[STORAGE_KEY.USER_PREFERENCE.PANNUMBER]
        : '';

   
    this.state = {
      domainPassword: '',
      count:0,
      deviceId: DeviceInfo.getUniqueId(),
      isEmployee: true,
      mobileNumber: '',
      // localStoreFetched: false,
      sapCode: propSapCode,
      panNumber: propPan,
      isTroublePopUpVisible: false,
    };
    this.tabChanged = this.tabChanged.bind(this);
    this.updateLoginId = this.updateLoginId.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    // console.log('<< login componet CONSTR >>', this.state.sapCode, props);
  }

  componentDidMount() {
    console.log('<< componentDidMount Login>>');
    const {localStore} = this.props;
    const {rememberLogin} = this.state;

    if (!HrAppUtil.isEmptyObject(localStore)) {
      if (rememberLogin === undefined) {
        const rememberMeCheck = localStore[keyRememberMe];
        this.state.rememberLogin = HrAppUtil.getBooleanValue(rememberMeCheck);
      }

      if (rememberLogin) {
        // update sapCode
        if (localStore[keySAPCodePref]) {
          this.state.sapCode = localStore[keySAPCodePref];
        }
        // update panNumber
        if (localStore[keyPanNum]) {
          this.state.panNumber = localStore[keyPanNum];
        }
      }
    }

    // console.log('<< login componet Will MOUNT >>', this.state.sapCode);
  }

  // componentDidMount() {
  //   // console.log('<< login componet DID MOUNT >>', this.state.sapCode);
  //   /* This should return a promise, to be resolved in the screen */
  //   // checkAppInstalledAndGetVersion('whatsapp');
  //   // // console.log('Login Component mounted ....');
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('<< shouldComponentUpdate Login>>', nextState);
    const updatedState = nextState;
    const updatedProps = nextProps;
 
    if (!HrAppUtil.isEmptyObject(updatedProps.localStore)) {
      if (updatedState.rememberLogin === undefined) {
        const rememberMeFlag = updatedProps.localStore[keyRememberMe];
        updatedState.rememberLogin = HrAppUtil.getBooleanValue(rememberMeFlag);
      }
      if (updatedState.rememberLogin) {
        // update sapCode when user preference is
        if (
          !updatedState.sapPopulated &&
          updatedState.isEmployee &&
          updatedProps.localStore[keySAPCodePref]
        ) {
          updatedState.sapCode = updatedProps.localStore[keySAPCodePref];
          updatedState.sapPopulated = true;
        }
        // update panNumber
        if (
          !updatedState.isEmployee &&
          !updatedState.panPopulated &&
          updatedProps.localStore[keyPanNum]
        ) {
          updatedState.panNumber = updatedProps.localStore[keyPanNum];
          updatedState.panPopulated = true;
        }
      }
    }
    return true; // should return true by default
  }

  componentWillUnmount() {
    console.log('<< login componet WILL UN MOUNT >>');
  }

  performLogin = () => {
    // // console.log('............... Perform login called .............. ');
    const {authenticateUser, localStore, showError} = this.props;
    const {
      isEmployee,
      mobileNumber,
      panNumber,
      deviceId,
      sapCode,
      rememberLogin,
      domainPassword,
    } = this.state;
    const authReq = {
      isCandidate: !isEmployee,
      sapCode: isEmployee ? sapCode : '',
      domainPassword: isEmployee ? domainPassword : '',
      mobileNumber: !isEmployee ? mobileNumber : '', // arnab
      panNumber: !isEmployee ? panNumber : '',
      deviceIdentifier: deviceId,
      fcmToken: localStore[STORAGE_KEY.DEVICE.FCM_TOKEN],
    };

    // // console.log('Local store inside authenticate method >>>> ', localStore);
    // // console.log('rememberLogin >>>> ', rememberLogin);
    // this.setState({ isVisible: true });
    // console.log("sapcode length >>>> ", sapCode.length);
    if (sapCode.length < 8 && sapCode.length > 0) {
      showError(
        getText(I18N_CONSTANTS.LOGIN.MIN_SAPCODE_WARNING),
        'Login - Invalid input',
      );
    } else {
      let validReq = true;
      if (authReq.isCandidate) {
        if (        
          HrAppUtil.isNullOrEmpty(authReq.mobileNumber) ||
          HrAppUtil.isNullOrEmpty(authReq.panNumber)
        ) {
          validReq = false;
        }
      } else if (
        !HrAppUtil.isValidSapCode(authReq.sapCode) ||
        !HrAppUtil.isValidPassword(authReq.domainPassword)
      ) {
        validReq = false;
      }

      if (validReq) {
        authenticateUser(authReq, localStore, rememberLogin);
      } else {
       console.log('Invalid auth request : ', authReq);
        const validationError = new Error(
          !authReq.isCandidate
            ? getText(I18N_CONSTANTS.LOGIN.EMPLOYEE_WARNING)
            : getText(I18N_CONSTANTS.LOGIN.CANDIDATE_WARNING),
        );
        showError(validationError, 'auth validation error');
      }
    }
  };

  troubleLoggedIn = () => {
    this.setState({isTroublePopUpVisible: true});
  };

  hideIsTroublePopUp = () => {
    this.setState({isTroublePopUpVisible: false});
  };

  deviceWarningLoginHelp = () => {
    this.hidePopUp();
    this.troubleLoggedIn();
  };

  updateLoginId = (loginId) => {
    const {isEmployee} = this.state;
    if (isEmployee) {
      this.state.sapCode = loginId;
      this.state.panNumber = '';
      this.setState({sapCode: loginId, panNumber: ''});
    } else {
      this.state.sapCode = '';
      this.state.panNumber = loginId;
      this.setState({sapCode: '', panNumber: loginId});
    }
    // console.log('<<<< On Change Login Id ', loginId, '????',this.state.sapCode);
    // this.state.loginId = loginId;
  };

  updatePassword = (password) => {
    const {isEmployee} = this.state;
    if (isEmployee) {
      this.setState({domainPassword: password});
    } else {
      this.setState({mobileNumber: password});
    }
  };

  onClickHandlerPopUp = () => {
    // Alert.alert('Password Policy', 'Password policy details should be provided by RNLIC');
    const {showMessage} = this.props;
    showMessage(
      '- Minimum 8 characters of length\n- Use letters, numbers and special character to increase security\n- 6 historical passwords not allowed',
      ApplicationConstants.messageType.INFO,
      'Password Policy',
    );
  };

  loginView = (loginEmployee, loginId) => {
    if (loginEmployee) {
      return (
        <View>
          <View style={styles.idContainer}>
            <LoginID
              isEmployee
              loginId={loginId}
              onChange={this.updateLoginId}
            />
          </View>
          <View style={styles.passwordContainer}>
            <LoginPassword
              secureTextEntry
              isEmployee
              onChange={this.updatePassword}
              onClickHandler={this.onClickHandlerPopUp}
            />
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.idContainer}>
          <LoginID
            isEmployee={false}
            loginId={loginId}
            onChange={this.updateLoginId}
          />
        </View>
        <View style={styles.passwordContainer}>
          <LoginPassword
            isEmployee={false}
            onChange={this.updatePassword}
            onClickHandler={this.onClickHandlerPopUp}
          />
        </View>
      </View>
    );
  };

  loginCommonView = (loginEmployee, loginId) => (
    <View style={styles.loginView}>
      <View style={styles.imgContainer}>
        <Image style={styles.loginImage} source={IMG_LOGIN} />
      </View>
      {this.loginView(loginEmployee, loginId)}
    </View> 
  );

  removeRememberLogin = () => {
    const {rememberLogin} = this.state;
    this.setState({rememberLogin: !rememberLogin});
  };

  goToResetPassword = () => {
    Actions.resetPassword();
  };

  loginContainer = (deviceId, loginEmployee, rememberLogin, loginId) => (
    <ImageBackground source={IMG_APP_BACKGROUND} style={styles.rootContainer}>
      <Content>
        {this.loginCommonView(loginEmployee, loginId)}
        <View style={styles.view}>
          <View style={styles.checkboxFlex}>
            <CheckBox
              checked={rememberLogin}
              // title={getText(I18N_CONSTANTS.LOGIN.REMEMBER_ME)}
              containerStyle={styles.checkBoxStyle}
              // textStyle={styles.textStyle}
              onPress={this.removeRememberLogin}
            />
            <Text style={[styles.rememberMeStyles]}>
              {getText(I18N_CONSTANTS.LOGIN.REMEMBER_ME)}
            </Text>
          </View>
          {loginEmployee ? (
            <View style={styles.resetPasswordView}>
              <TouchableOpacity onPress={this.goToResetPassword}>
                <Text style={styles.resetPasswordtext}>Reset Password</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View>
          <Button
            // disabled={!loginEmployee}
            bordered
            onPress={this.performLogin}
            style={[
              styles.btnLoginStyle,
              // !loginEmployee ? styles.disabled : {}
            ]}>
            <Text
              style={[
                styles.loginTextStyle,
                // !loginEmployee ? styles.disabled : {}
              ]}>
              {getText(I18N_CONSTANTS.LOGIN.LOGIN)}
            </Text>
          </Button>
          <View style={styles.troubleLogin}>
            <TouchableOpacity onPress={this.troubleLoggedIn}>
              <Text style={styles.loginHelp}>
                {getText(I18N_CONSTANTS.LOGIN.TROUBLE_LOGGING_IN)}
              </Text>
            </TouchableOpacity>
            {!loginEmployee ? (
              <Text style={styles.candidateTextWarning}>
                {/* {getText(I18N_CONSTANTS.LOGIN.TROUBLE_LOGGING_IN)} */}
                LOGIN APPLICABLE FOR FRONT LINE SALES ONLY
              </Text>
            ) : null}
          </View>
        </View>
        {/* <Text selectable>{deviceId}</Text> */}
      </Content>
    </ImageBackground>
  );

  getTabHeading = (tabTitle) => (
    <TabHeading style={styles.tabStyle}>
      <Text style={styles.tabTitle}>{tabTitle}</Text>
    </TabHeading>
  );

  proceedToNext = () => {
    // hide warning
    const {
      localStore,
      authData,
      removeDeviceWarning,
      postLoginProceed,
    } = this.props;
    removeDeviceWarning();
    postLoginProceed(localStore, authData.userProfile.mobileNo);
  };

  hidePopUp = () => {
    const {removeDeviceWarning} = this.props;
    removeDeviceWarning();
  };

  tabChanged = (event) => {
    if (event.i === 1) {
      this.setState({isEmployee: false});
    } else if (event.i === 0) {
      this.setState({isEmployee: true});
    }
  };

  render() {
    const {authData, localStore} = this.props;
    const deviceWarningVisible = authData.deviceRegistrationInfo
      ? authData.deviceRegistrationInfo.registerdWithOtherDevice
      : false;


    const contactNumber = localStore[keyContactNum];
    const contactEmail = localStore[keyContactEmail];
    const helpMessage = localStore[keyHelpMsg];
    const {
      deviceId,
      isEmployee,
      rememberLogin,
      isTroublePopUpVisible,
      sapCode,
      panNumber,
    } = this.state;
    const activeTab = isEmployee ? 0 : 1;
    // if (deviceWarningVisible) {
    //   Alert.alert('dd', 'Device Warning...');
    // }
    if (authData.loginSuccess != null && !authData.loginSuccess) {
      // // console.log('within login faliure');
    }
    const panNO = isEmployee ? '' : panNumber;
    const sap = isEmployee ? sapCode : '';
    // console.log('State SAP Code : ', sapCode, 'Store sapCode : ', localStore[STORAGE_KEY.USER_PREFERENCE.SAPCODE]);
    // console.log('<< login componet RENDER >>', this.state.sapCode);

    return (
      <SafeAreaView style={styles.rootView}>
        <HeaderComponent disableRedirection />
        <Tabs onChangeTab={this.tabChanged} page={activeTab}>
          <Tab
            heading={this.getTabHeading(
              getText(I18N_CONSTANTS.LOGIN.EMPLOYEE),
            )}>
            {this.loginContainer(deviceId, true, rememberLogin, sap)}
          </Tab>
          <Tab
            heading={this.getTabHeading(
              getText(I18N_CONSTANTS.LOGIN.CANDIDATE),
            )}>
            {this.loginContainer(deviceId, false, rememberLogin, panNO)}
          </Tab>
        </Tabs>
        <DeviceWarningComponent
          closePopUp={this.hidePopUp}
          isVisible={deviceWarningVisible}
          proceedDashboard={this.proceedToNext}
          loggingHelp={this.deviceWarningLoginHelp}
        />
        <TroubleLoggedInPopUp
          key={contactNumber}
          closeIsTroublePopUp={this.hideIsTroublePopUp}
          isTroublePopUpVisible={isTroublePopUpVisible}
          contactNumber={contactNumber}
          contactEmail={contactEmail}
          message={helpMessage}
        />
     

        {/* <Loader isLoading={pendingAction} />
        <ErrorPopover />
        <Spinner /> */}
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  localStore: PropTypes.shape({
    keyRememberMe: PropTypes.string,
    keySAPCodePref: PropTypes.string,
    keyPanNum: PropTypes.string,
    keyContactNum: PropTypes.string,
    keyContactEmail: PropTypes.string,
    keyHelpMsg: PropTypes.string,
  }).isRequired,
  authenticateUser: PropTypes.func.isRequired,
  authData: PropTypes.shape({
    loginSuccess: PropTypes.bool,
    userProfile: PropTypes.shape({
      mobileNo: PropTypes.string.isRequired,
    }),
    deviceRegistrationInfo: PropTypes.shape({
      registerdWithOtherDevice: PropTypes.bool,
    }),
  }).isRequired,
  removeDeviceWarning: PropTypes.func.isRequired,
  postLoginProceed: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};

export default Login;
