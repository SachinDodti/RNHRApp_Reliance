import React, { Component } from "react";
import {
  View,
  // TouchableOpacity,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import AutoScrolling from "react-native-auto-scrolling";
import { Actions } from "react-native-router-flux";
import styles from "./GroupTileDetailStyles";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
// import UserProfile from '../../Components/UserProfile';
import DashboardItem from "../../Components/DashboardItem";
import { IMG_APP_BACKGROUND } from "../../Assets/images";
import appStyles from "../../appStyles";
import HrAppUtil from "../../Util/HrAppUtil";
import { STORAGE_KEY } from "../../Util/LocalStorage";
import ApplicationConfiguration from "../../Config/env";

const keyInstallationStatus = STORAGE_KEY.APPLICATION.INSTALLATION_STATUS;
const keyLoggedInUser = STORAGE_KEY.USER.LOGGEDIN_USER;

class GroupTileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMarquee() {
    const { announcement } = this.props;
    if (announcement) {
      return (
        <AutoScrolling>
          <Text style={styles.textScroll}>{announcement}</Text>
        </AutoScrolling>
      );
    }
    return null;
  }

  generateDashboardItems() {
    const { childrenApps, groupId, auth, localStore, webActivity } = this.props;
    // add the in app dashboard items
    const currentStatus = HrAppUtil.parse(
      HrAppUtil.isEmptyObject(localStore[keyInstallationStatus])
        ? "{}"
        : localStore[keyInstallationStatus],
    );
    const defaultApps = HrAppUtil.getDefaultApplications(
      HrAppUtil.isNullOrEmpty(groupId) ? "" : groupId.toUpperCase(),
    );
    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[keyLoggedInUser])
        ? HrAppUtil.parse(localStore[keyLoggedInUser])
        : null);
    const userRoles =
      loggedInUser && loggedInUser.userRole ? [loggedInUser.userRole] : [];
    let showAsDark = true;
    const dashBoardRowArray = [];
    let dashRow = [];
    let dashItemIndex = 0;
    // console.log('Default apps', defaultApps);

    if (defaultApps && defaultApps.length > 0) {
      // let lastAsRowView = false;
      for (let i = 0; i < defaultApps.length; i += 1) {
        const app = defaultApps[i];
        // check for which applicable for
        if (app.showAsRow) {
          if (dashItemIndex > 0) {
            dashBoardRowArray.push(dashRow);
            dashItemIndex = 0;
            dashRow = [];
            if (dashBoardRowArray[dashBoardRowArray.length - 1].length > 1) {
              showAsDark = !showAsDark;
            }
          }
        }

        // update the application infomration
        showAsDark = !showAsDark;
        const dashItem = {
          key: app.title,
          appId: app.title,
          title: app.title,
          icon: app.icon,
          darkTheme: showAsDark,
          isApp: false,
          showAsRow: app.showAsRow,
          navigateTo: app.navigateTo,
          notInstalled: false,
        };
        dashItemIndex += 1;
        dashRow.push(dashItem);
        if (dashItemIndex % 2 === 0 || app.showAsRow) {
          dashBoardRowArray.push(dashRow);
          dashItemIndex = 0;
          dashRow = [];
          if (dashBoardRowArray[dashBoardRowArray.length - 1].length > 1) {
            showAsDark = !showAsDark;
          }
        }
      }
    }

    if (childrenApps && childrenApps.length > 0) {
      // let lastAsRowView = false;
      for (let i = 0; i < childrenApps.length; i += 1) {
        const app = childrenApps[i];
        // check for which applicable for
        if (!HrAppUtil.checkIfApplicable(userRoles, app.applicableFor)) {
          continue;
        }
        if (app.showAsRow) {
          if (dashItemIndex > 0) {
            dashBoardRowArray.push(dashRow);
            dashItemIndex = 0;
            dashRow = [];
            if (dashBoardRowArray[dashBoardRowArray.length - 1].length > 1) {
              showAsDark = !showAsDark;
            }
          }
        }

        // update the application infomration
        showAsDark = !showAsDark;
        let appHasBeenInstalled = false;
        if (app.isApp) {
          if (!HrAppUtil.isEmptyObject(currentStatus)) {
            if (
              currentStatus[app.name] &&
              currentStatus[app.name].currentStatus
            ) {
              appHasBeenInstalled = true;
            }
          }
        } else {
          appHasBeenInstalled = true;
        }
        // console.log("app data", app);
        const dashItem = {
          key: app.title,
          appId: app.name,
          title: app.title,
          icon: app.icon,
          darkTheme: showAsDark,
          isApp: app.isApp,
          httpLink: app.link,
          iosUriScheme: app.ios.uriScheme,
          iosBundleId: app.ios.bundleId,
          iosStoreUrl: app.ios.storeUrl,
          androidPackageId: app.android.packageId,
          androidScheme: app.android.androidScheme,
          androidStoreUrl: app.android.storeUrl,
          showAsRow: app.showAsRow,
          notInstalled: !appHasBeenInstalled,
          webActivity,
          navigateTo: app.navigateTo,
        };
        dashItemIndex += 1;
        dashRow.push(dashItem);
        if (dashItemIndex % 2 === 0 || app.showAsRow) {
          dashBoardRowArray.push(dashRow);
          dashItemIndex = 0;
          dashRow = [];
          if (dashBoardRowArray[dashBoardRowArray.length - 1].length > 1) {
            showAsDark = !showAsDark;
          }
        }
      }

      // add the latest row
      if (dashRow.length > 0) {
        dashBoardRowArray.push(dashRow);
      }

      // iterate over the
      const itemList = dashBoardRowArray.map(rowItem => {
        const items = rowItem.map(_item => {
          // console.log("item1=", _item);
          return (
            <DashboardItem
              title={_item.title}
              appId={_item.appId}
              icon={_item.icon}
              darkTheme={_item.darkTheme}
              childrenApps={_item.childrenApps}
              isApp={_item.isApp}
              httpLink={_item.httpLink}
              iosUriScheme={_item.iosUriScheme}
              iosBundleId={_item.iosBundleId}
              iosStoreUrl={_item.iosStoreUrl}
              androidPackageId={_item.androidPackageId}
              androidScheme={_item.androidScheme}
              androidStoreUrl={_item.androidStoreUrl}
              showAsRow={_item.showAsRow}
              notInstalled={_item.notInstalled}
              navigateTo={_item.navigateTo}
              webActivity={webActivity}
            />
          );
        });

        if (rowItem.length > 0) {
          return <View style={styles.rowFlexDirection}>{items}</View>;
        }
        return <View>{items}</View>;
      });
      // console.log('Two dimension Array >>>>>  ', itemList);
      return <View>{itemList}</View>;
    }

    // iterate over the
    const itemList = dashBoardRowArray.map(rowItem => {
      const items = rowItem.map(_item => {
        // console.log("item2", _item);
        return (
          <DashboardItem
            title={_item.title}
            icon={_item.icon}
            darkTheme={_item.darkTheme}
            appId={_item.appId}
            childrenApps={_item.childrenApps}
            isApp={_item.isApp}
            httpLink={_item.httpLink}
            iosUriScheme={_item.iosUriScheme}
            iosBundleId={_item.iosBundleId}
            iosStoreUrl={_item.iosStoreUrl}
            androidPackageId={_item.androidPackageId}
            androidScheme={_item.androidScheme}
            androidStoreUrl={_item.androidStoreUrl}
            showAsRow={_item.showAsRow}
            notInstalled={_item.notInstalled}
            navigateTo={_item.navigateTo}
            webActivity={webActivity}
          />
        );
      });

      if (rowItem.length > 0) {
        return <View style={styles.rowFlexDirection}>{items}</View>;
      }
      return <View>{items}</View>;
    });
    // console.log('Two dimension Array >>>>>  ', itemList);
    return <View>{itemList}</View>;
  }

  render() {
    // const sapCode = '123444';
    // const fullName = 'Arnab Sutar';
    const { groupTitle } = this.props;
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
            onBackPress={() =>
              Actions[ApplicationConfiguration.scene.DASHBOARD]()
            }
          />
          <View style={[styles.groupTitle]}>
            <Text style={[styles.textFormat]}>{groupTitle}</Text>
          </View>
          {this.getMarquee()}
          <ScrollView style={[styles.appContainer]} indicatorStyle="white">
            {this.generateDashboardItems()}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
GroupTileDetail.propTypes = {
  announcement: PropTypes.string,
  auth: {
    userProfile: PropTypes.string,
  }.isRequired,
  localStore: PropTypes.shape({
    keyInstallationStatus: PropTypes.string,
  }).isRequired,
  groupTitle: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  childrenApps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,

      isApp: PropTypes.bool.isRequired,
      link: PropTypes.string,
      ios: PropTypes.shape({
        uriScheme: PropTypes.string,
        bundleId: PropTypes.string,
        storeUrl: PropTypes.string,
      }),
      android: PropTypes.shape({
        packageId: PropTypes.string,
        androidScheme: PropTypes.string,
        storeUrl: PropTypes.string,
      }),
      showAsRow: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

GroupTileDetail.defaultProps = {
  announcement: null,
};

export default GroupTileDetail;
