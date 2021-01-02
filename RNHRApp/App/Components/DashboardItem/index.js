import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import styles from "./Styles";
import { IMG_DEFAULT_ICON } from "../../Assets/images";
import InformationIcon from "../InformationIconComponent";
import HrAppUtil from "../../Util/HrAppUtil";
import ApplicationConfiguration from "../../Config/env";

class DashboardItem extends Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    // console.log("pppppppppppppppppp", this.props);
  }

  onClickHandler() {
    // console.log('Props in dashboard item ', this.props);
    const {
      isApp,
      childrenApps,
      navigateTo,
      httpLink,
      groupId,
      title,
      announcement,
      appId,
      webActivity,
    } = this.props;



    // console.log("Web Activity", webActivity);

    if (!HrAppUtil.isNullOrEmpty(navigateTo)) {
      // check whether group tile view
      if (!HrAppUtil.isNullOrEmpty(groupId)) {
        let sceneProp = {};
        sceneProp = {
          ...sceneProp,
          groupId,
          childrenApps,
          groupTitle: title,
          announcement,
          webActivity,
        };
        // console.log("Generated Props : ", sceneProp);
        Actions[navigateTo](sceneProp);
      } else {
        Actions[navigateTo]();
      }
    } else if (isApp) {
      // Alert.alert('Deep linking will be here');
      this.openApp();
    } else if (httpLink && httpLink !== "") {
      // Linking.openURL(httpLink);
      if (title === "HR Helpdesk") {
        const { icon } = this.props;
        let sceneHRProp = {};
        sceneHRProp = {
          ...sceneHRProp,
          groupId,
          title,
          groupTitle: title,
          icon,
        };
        Actions[ApplicationConfiguration.scene.HR_HELP_DESK]({ sceneHRProp });
      } else {
        HrAppUtil.openWebLinks(httpLink, title, appId, webActivity);
      }
    } else if (appId === "productCorner") {
      Actions[ApplicationConfiguration.scene.PRODUCT_CORNER]();
    }
    
    else {
      Alert.alert(
        "Error",
        `Application ${title} has not been configured properly. Please report to the application support team`,
      );
    }
  }

  getView(isDark, notInstalled, rowView = true) {
    // const {icon} = this.props;
    const { icon, title } = this.props;
    // const disabledItem = this.shouldBeDisabled();
    if (rowView) {
      const compStyle = [
        styles.showBorder,
        styles.itemView,
        styles.rowItemAppearence,
        isDark ? styles.dark : styles.ligth,
      ];

      return (
        <TouchableOpacity style={compStyle} onPress={this.onClickHandler}>

        
          <Image
            style={styles.tileIcon}
            source={{ uri: icon || IMG_DEFAULT_ICON }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textSingle}>{title} </Text>
          </View>
          {notInstalled ? <InformationIcon /> : null}
        </TouchableOpacity>
      );
    }

    const compStyle = [
      styles.showBorder,
      styles.itemView,
      styles.tileItemAppearence,
      isDark ? styles.dark : styles.ligth,
    ];
    return (
      <TouchableOpacity style={compStyle} onPress={this.onClickHandler}>


        <View style={[styles.titleContainer]}>
          <View style={[styles.titleRow]}>
            <Image
              style={[styles.tileIcon2]}
              source={{ uri: icon || IMG_DEFAULT_ICON }}
            />
            {notInstalled ? (
              <View style={[styles.tileIconFlex]}>
                <InformationIcon />
              </View>
            ) : null}
          </View>
          <View style={[styles.titleRow, styles.textContainerTile]}>
            <Text style={[styles.textSingleRow]}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  getAppDetail() {
    const {
      title,
      iosUriScheme,
      iosStoreUrl,
      androidScheme,
      androidStoreUrl,
    } = this.props;
    let appDetail = { title };
    switch (Platform.OS) {
      case "ios":
        appDetail = {
          ...appDetail,
          scheme: iosUriScheme,
          storeUrl: iosStoreUrl,
        };
        break;
      case "android":
        appDetail = {
          ...appDetail,
          scheme: androidScheme,
          storeUrl: androidStoreUrl,
        };
        break;
      default:
      // do nothing
    }
    return appDetail;
  }

  openStoreForApp(storeUrl) {
    const { title } = this.props;
    Alert.alert(
      "Confirmation",
      // `Application ${title} has not been installed in your device. Would you like to install the application?`,
      `Download ${title} to continue. Would you like to proceed?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // console.log('OK Pressed : ', storeUrl);
            Linking.openURL(storeUrl).catch(() => {
              Alert.alert(
                "Error",
                `Failed to launch application store for : ${title}`,
              );
            });
          },
        },
      ],
      { cancelable: false },
    );
  }

  openApp() {
    const appDetail = this.getAppDetail();
    if (this.shouldBeDisabled()) {
      Alert.alert(
        "Error",
        `Application ${appDetail.title} has not been configured properly. Please report to the application support team`,
      );
    } else if (HrAppUtil.isNullOrEmpty(appDetail.scheme)) {
      this.openStoreForApp(appDetail.storeUrl);
    } else {
      Linking.canOpenURL(appDetail.scheme).then(supported => {
        if (supported) {
          Linking.openURL(appDetail.scheme).catch(() => {
            Alert.alert(
              "Error",
              `Failed to launch application ${appDetail.title}`,
            );
          });
        } else {
          this.openStoreForApp(appDetail.storeUrl);
        }
      });
    }
  }

  shouldBeDisabled() {
    const {
      isApp,
      navigateTo,
      httpLink,
      iosUriScheme,
      iosStoreUrl,
      androidScheme,
      androidStoreUrl,
    } = this.props;

    if (!isApp) {
      if (
        HrAppUtil.isNullOrEmpty(httpLink) &&
        HrAppUtil.isNullOrEmpty(navigateTo)
      ) {
        return true;
      }
    } else {
      switch (Platform.OS) {
        case "ios":
          return (
            HrAppUtil.isNullOrEmpty(iosUriScheme) &&
            HrAppUtil.isNullOrEmpty(iosStoreUrl)
          );
        case "android":
          return (
            HrAppUtil.isNullOrEmpty(androidScheme) &&
            HrAppUtil.isNullOrEmpty(androidStoreUrl)
          );
        default:
          return true;
      }
    }
    return false;
  }

  render() {
    const { notInstalled, showAsRow, darkTheme } = this.props;
    return this.getView(darkTheme, notInstalled, showAsRow);
  }
}

DashboardItem.propTypes = {
  title: PropTypes.string.isRequired,
  groupId: PropTypes.string,
  icon: PropTypes.string,
  darkTheme: PropTypes.bool,
  childrenApps: PropTypes.array,
  isApp: PropTypes.bool,
  httpLink: PropTypes.string,
  iosUriScheme: PropTypes.string,
  // iosBundleId: PropTypes.string,
  iosStoreUrl: PropTypes.string,
  // androidPackageId: PropTypes.string,
  androidScheme: PropTypes.string,
  androidStoreUrl: PropTypes.string,
  showAsRow: PropTypes.bool,
  notInstalled: PropTypes.bool,
  navigateTo: PropTypes.string,
  announcement: PropTypes.string,
  webActivity: PropTypes.func,
};

DashboardItem.defaultProps = {
  groupId: "",
  icon: "",
  darkTheme: null,
  childrenApps: [],
  isApp: false,
  httpLink: "",
  iosUriScheme: "",
  // iosBundleId: '',
  iosStoreUrl: "",
  // androidPackageId: '',
  androidScheme: "",
  androidStoreUrl: "",
  showAsRow: false,
  notInstalled: false,
  navigateTo: "",
  announcement: null,
  webActivity: null,
};
export default DashboardItem;
