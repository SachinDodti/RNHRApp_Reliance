import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import { Divider } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "../../Components/Collapsible";
import styles from "./MandatoryAppEnablementStyles";
import HeaderComponent from "../../Components/HeaderComponent";
import { IMG_APP_BACKGROUND, IMG_DROPDOWN_BLUE } from "../../Assets/images";

import appStyles from "../../appStyles";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import Required from "../../Components/Required";
import AppComponent from "../../Components/AppComponent";
import { STORAGE_KEY } from "../../Util/LocalStorage";
import HrAppUtil from "../../Util/HrAppUtil";
import AlertPopover, {
  AlertPopoverType
} from "../../Components/AlertPop/AlertPopoverComponent";
import ApplicationConfiguration from "../../Config/env";

class MandatoryAppEnablement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mandatoryAppsExpanded: true,
      optionalAppsExpanded: true,
      showCancelPopup: false
    };
    this.onPaneExpand = this.onPaneExpand.bind(this);
    this.showCancelPopup = this.showCancelPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
  }

  // shouldComponentUpdate(_nextProps, _nextState) {
  //   // const { localStore } = this.props;
  //   // console.log('<<--------------------
  // MANDATORY APPS : SHOULD COMPONENT UPDATE  -------------------- >>>', localStore);
  //   return true;
  // }

  onPaneExpand(isExpanded, refId) {
    const newStateValue = {};
    newStateValue[refId] = isExpanded;
    //this.setState(newStateValue);
  }

  getAppDetail(isOptional) {
    // get all the mandatory application list
    const { localStore } = this.props;
    const optionalApps = localStore[STORAGE_KEY.APPLICATION.OPTIONAL_APPS];
    const mandatoryApps = localStore[STORAGE_KEY.APPLICATION.MANDATORY_APPS];
    const checkForOptionalApps = optionalApps
      ? HrAppUtil.parse(optionalApps)
      : [];
    const checkForMandatApps = mandatoryApps
      ? HrAppUtil.parse(mandatoryApps)
      : [];
    const applications = isOptional ? checkForOptionalApps : checkForMandatApps;
    const installedAppStatusCheck =
      localStore[STORAGE_KEY.APPLICATION.INSTALLATION_STATUS];
    const installedAppStatus = installedAppStatusCheck
      ? HrAppUtil.parse(installedAppStatusCheck)
      : [];
    const itemList = applications.map(_item => (
      <AppComponent
        title={_item.title}
        // iosBundleId={_item.ios.bundleId}
        iosStoreUrl={_item.ios.storeUrl}
        // androidPackageId={_item.android.packageId}
        androidStoreUrl={_item.android.storeUrl}
        installed={
          installedAppStatus[_item.name]
            ? installedAppStatus[_item.name].currentStatus
            : false
        }
      />
    ));
    return <View>{itemList}</View>;
  }

  showCancelPopup() {
    // console.log('Show popup .... ');
    this.setState({ showCancelPopup: true });
  }

  hidePopup() {
    // console.log('hide popup .... ');
    this.setState({ showCancelPopup: false });
  }

  goToLogin() {
    // console.log('Go to login .... ');
    this.setState({ showCancelPopup: false });
    // Actions[ApplicationConfiguration.scene.LOGIN]();
    HrAppUtil.doLogout();
  }

  render() {
    const {
      mandatoryAppsExpanded,
      optionalAppsExpanded,
      showCancelPopup
    } = this.state;
    const { localStore } = this.props;
    // console.log(' ************ Current Localstore >> ', localStore);
    const canProceed = HrAppUtil.getBooleanValue(
      localStore[STORAGE_KEY.APPLICATION.ALL_MANDATORY_APPS_INSTALLED]
    );
    console.log('proceed',canProceed)
    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={[appStyles.backgroundImageStyle]}
        >
          <HeaderComponent disableRedirection />
          <ScrollView style={[styles.appContainer]} indicatorStyle="white">
            <View style={[styles.viewContainer]}>
              <Text style={[styles.disclaimer]}>
                {getText(I18N_CONSTANTS.MANDATORY_APPS.INFO)}
              </Text>
              <Divider style={[appStyles.dividerStyle, appStyles.margin20]} />
              <View>
                <Collapse
                  styles={[styles.collapse]}
                  isCollapsed={mandatoryAppsExpanded}
                  refId="mandatoryAppsExpanded"
                  onToggle={this.onPaneExpand}
                >
                  <CollapseHeader style={[styles.collapseHeader]}>
                    <View style={[styles.headerContainer]}>
                      <View style={[styles.headerText]}>
                        <Text style={[styles.disclaimer]}>
                          {getText(
                            I18N_CONSTANTS.MANDATORY_APPS.MANDATORY_HEADER
                          )}{" "}
                          <Required />
                        </Text>
                      </View>
                      <View style={styles.dropdownImgView}>
                        <Image
                          style={[
                            styles.expandIcon,
                            {
                              transform: [
                                {
                                  rotate: mandatoryAppsExpanded
                                    ? "-90deg"
                                    : "0deg"
                                }
                              ]
                            }
                          ]}
                          source={IMG_DROPDOWN_BLUE}
                        />
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    {this.getAppDetail(false)}

                    <Divider
                      style={[appStyles.dividerStyle, appStyles.margin20]}
                    />
                  </CollapseBody>
                </Collapse>

                <Collapse
                  styles={[styles.collapse]}
                  isCollapsed={optionalAppsExpanded}
                  refId="optionalAppsExpanded"
                  onToggle={this.onPaneExpand}
                >
                  <CollapseHeader style={[styles.collapseHeader]}>
                    <View style={[styles.headerContainer]}>
                      <View style={[styles.headerText]}>
                        <Text style={[styles.disclaimer]}>
                          {getText(
                            I18N_CONSTANTS.MANDATORY_APPS.OPTIONAL_HEADER
                          )}
                        </Text>
                      </View>
                      <View style={styles.dropdownImgView}>
                        <Image
                          style={[
                            styles.expandIcon,
                            {
                              transform: [
                                {
                                  rotate: optionalAppsExpanded
                                    ? "-90deg"
                                    : "0deg"
                                }
                              ]
                            }
                          ]}
                          source={IMG_DROPDOWN_BLUE}
                        />
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>{this.getAppDetail(true)}</CollapseBody>
                </Collapse>
              </View>
              <View style={[appStyles.buttonContainer]}>
                <TouchableOpacity
                  style={[appStyles.button, appStyles.buttonWarning]}
                  onPress={this.showCancelPopup}
                >
                  <Text
                    style={[
                      appStyles.txtWarning,
                      appStyles.font14,
                      appStyles.boldText
                    ]}
                  >
                    {getText(I18N_CONSTANTS.COMMON.CANCEL)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!canProceed}
                  style={[
                    appStyles.button,
                    canProceed
                      ? appStyles.buttonSuccess
                      : appStyles.buttonDisbaled
                  ]}
                  onPress={() => {
                    // console.log(
                    //   "Mandatory App --- Initial Scene",
                    //   Actions.scene,
                    // );

                    HrAppUtil.getInitialScene(
                      ApplicationConfiguration.scene.DASHBOARD,
                      true
                    ).then(initialScene => {
                      if (initialScene) {
                        Actions[initialScene]();
                      }
                    });
                  }}
                >
                  <Text
                    style={[
                      canProceed ? appStyles.txtSuccess : appStyles.txtDisabled,
                      appStyles.font14,
                      appStyles.boldText
                    ]}
                  >
                    {getText(I18N_CONSTANTS.COMMON.PROCEED)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <AlertPopover
            popOver={showCancelPopup}
            message={getText(I18N_CONSTANTS.MANDATORY_APPS.CANCEL_MESSAGE)}
            onCancel={this.hidePopup}
            onOk={this.goToLogin}
            type={AlertPopoverType.WARNING}
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

MandatoryAppEnablement.propTypes = {
  localStore: PropTypes.objectOf(PropTypes.string).isRequired
};

export default MandatoryAppEnablement;
