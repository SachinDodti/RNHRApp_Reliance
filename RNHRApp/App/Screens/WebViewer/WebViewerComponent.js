import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./WebViewerStyles";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";

import { IMG_APP_BACKGROUND } from "../../Assets/images";

import appStyles from "../../appStyles";

const colors = require("../../Config/config");

class WebViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { url: props.link };
  }

  render() {
    // const sapCode = '123444';
    // const fullName = 'Arnab Sutar';
    const { title, openInBrowserEnabled } = this.props;
    const { url } = this.state;
    // console.log("Web View going to load : ", url);
    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={appStyles.backgroundImageStyle}
        >
          <HeaderComponent />
          <NavBarComponent
            includeVersion
            includeBack
            includeProfile
            includeNotification
            onBackPress={() => Actions.pop()}
          />

          <View style={[styles.groupTitle]}>
            <Text style={[styles.textFormat]}>{title}</Text>

            <TouchableOpacity
              style={[appStyles.marginRight10]}
              onPress={() =>
                openInBrowserEnabled ? Linking.openURL(url) : null
              }
            >
              {openInBrowserEnabled ? (
                <Icon
                  name="open-in-browser"
                  size={30}
                  color={colors.groupTileHeader}
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <WebView
            source={{ uri: url }}
            startInLoadingState
            renderLoading={() => (
              <View style={[styles.loadingContainer]}>
                <ActivityIndicator animating size="large" color="#ffffff" />
              </View>
            )}
            javaScriptEnabled
            thirdPartyCookiesEnabled
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
WebViewer.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  openInBrowserEnabled: PropTypes.bool,
};

WebViewer.defaultProps = {
  openInBrowserEnabled: true,
};

export default WebViewer;
