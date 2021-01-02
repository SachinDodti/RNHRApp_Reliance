import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, Platform, Linking, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './AppComponentStyle';
import {
  IMG_INSTALLAED, IMG_INSTALLATION_PENDING,
} from '../../Assets/images';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import { getText } from '../../I18n/Lang';


class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.onInstallClick = this.onInstallClick.bind(this);
  }

  onInstallClick() {
    const { iosStoreUrl, androidStoreUrl } = this.props;
    switch (Platform.OS) {
    case 'ios':

      Linking.openURL(iosStoreUrl).catch(() => Alert.alert('Error', `Cannot redirect to App Store : ${iosStoreUrl}`));
      break;
    case 'android':
      // console.log('Play Store URL : ', androidStoreUrl);

      Linking.openURL(androidStoreUrl).catch(() => Alert.alert('Error', `Cannot redirect to App Store : ${androidStoreUrl}`));
      break;
    default:
      Alert.alert('Error', `Invalid platform : ${Platform.OS}`);
    }
  }


  render() {
    const { title, installed } = this.props;
    return (
      <View style={[]}>
        <View style={[styles.appDetailContainer]}>
          <View style={[styles.appName]}>
            <Text style={[styles.appNameText]}>{title}</Text>
          </View>
          <View style={[styles.appStatus]}>
            <TouchableOpacity
              style={[styles.appStatusDetail]}
              disabled={installed}
              onPress={this.onInstallClick}
            >
              <Text style={
                [styles.appStatusText, !installed
                  ? styles.notInstalledColor : styles.installedColor]}
              >
                {!installed
                  ? getText(I18N_CONSTANTS.COMMON.INSTALL_NOW)
                  : getText(I18N_CONSTANTS.COMMON.INSTALLED)}

              </Text>
              <Image
                source={!installed
                  ? IMG_INSTALLATION_PENDING : IMG_INSTALLAED}
                style={[styles.appStatusIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

AppComponent.propTypes = {
  title: PropTypes.string.isRequired,
  iosStoreUrl: PropTypes.string,
  androidStoreUrl: PropTypes.string,
  installed: PropTypes.bool.isRequired,
};

AppComponent.defaultProps = {
  iosStoreUrl: '',
  androidStoreUrl: '',
};
export default AppComponent;
