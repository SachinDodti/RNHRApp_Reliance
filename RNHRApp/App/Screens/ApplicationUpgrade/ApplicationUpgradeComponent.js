import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  FlatList,
  Image,
  Linking,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { IMG_APP_BACKGROUND } from "../../Assets/images";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
import styles from "./Styles";
import appStyles from "../appStyles";
import HrAppUtil from "../../Util/HrAppUtil";
import ApplicationConfiguration from "../../Config/env";
import AlertPopover from "../../Components/AlertPop/AlertPopoverComponent";

class ApplicationUpgrade extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openStore = () => {
    const storeUrl =
      Platform.OS === "ios"
        ? ApplicationConfiguration.appleStoreUrl
        : ApplicationConfiguration.androidStoreUrl;

    const { showError } = this.props;

    Linking.openURL(storeUrl).catch(() => {
      showError(
        new Error(
          `Invalid upgrade link : ${storeUrl} !!!\r\nPlease connect with the support.`,
          "Error in Application Upgrade",
        ),
      );
    });
  };

  render() {
    // console.log("NoticeBoard", this.props);
    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={appStyles.backgroundImageStyle}
        >
          <HeaderComponent disableRedirection />
          <View style={styles.parentView}>
            <Text style={[styles.confMessage]}>
              Download the new version of eKonnect app now !
            </Text>
            <View style={[styles.btnViewContainer]}>
              {/* <Button
                title={getText(I18N_CONSTANTS.COMMON.UPGRADE_NOW)}
                containerStyle={styles.btnProceedTextStyle}
                titleStyle={styles.btnSubmitText}
                buttonStyle={styles.btnProceedStyles}
                onPress={this.submitSapCode}
              // fontFamily: "VAGRoundedStd-Black"
              /> */}
              <Button
                title="Download Now"
                containerStyle={styles.btnProceedTextStyle}
                titleStyle={styles.btnSubmitText}
                buttonStyle={styles.btnProceedStyles}
                onPress={this.openStore}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default ApplicationUpgrade;
