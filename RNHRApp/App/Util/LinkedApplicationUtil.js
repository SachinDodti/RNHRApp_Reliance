import { Platform, Linking } from "react-native";
import HrAppUtil from "./HrAppUtil";
import invokeApi from "../Network";
import ApiEndpoints from "../Config/ApiEndpoints";
import { STORAGE_KEY, LocalStorageUtil } from "./LocalStorage";
import ApplicationConfiguration from "../Config/env";

// const ANDROID_MARKET_URL = "market://details?id=@appId@";
// const ID_TOKEN = "@appId@";
// const IOS_MARKET_URL =
//   "itms://itunes.apple.com/us/app/apple-store/@appId@?mt=8";
// inital setup
class LinkedApplicationUtil {
  static async getAllApplication(
    appConfig,
    loggedInUser,
    currentInstallationStatus,
  ) {
    // 1. get application configuration
    // 2. get loggedInUser information
    //
    // console.log(
    //   "******** Inside Linked Application util ****************",
    //   currentInstallationStatus
    // );
    const userRoles = loggedInUser.userRole ? [loggedInUser.userRole] : [];
    const result = {
      mandatoryApps: [],
      optionalApps: [],
      invalidApps: [],
      installationStatus: {},
      allMandatoryAppsInstalled: true,
      dbSyncRequired: currentInstallationStatus.dbSyncRequired,
    };
    const appGroups = appConfig.applicationGroups;
    const isAllOptionalForIos =
      Platform.OS === "ios" && ApplicationConfiguration.iosAllAppOptional;
    for (let i = 0; i < appGroups.length; i += 1) {
      // check whether applicable
      if (HrAppUtil.checkIfApplicable(userRoles, appGroups[i].applicableFor)) {
        // check all the applicarions under the group
        const apps = appGroups[i].applications;
        // console.log('======================== Group Starts: ', appGroups[i].groupName, '  ======================');
        for (let j = 0; j < apps.length; j += 1) {
          const app = apps[j];
          const applicable = HrAppUtil.checkIfApplicable(
            userRoles,
            app.applicableFor,
          );
          const mandatory = HrAppUtil.checkIfApplicable(
            userRoles,
            app.mandatoryFor,
          );
          let appInstalled = false;
          let invalidApp = false;
          if (applicable && app.isApp) {
            // check whether mandatory

            // checkStatus
            const currentAppStatus = currentInstallationStatus[app.name]
              ? HrAppUtil.clone(currentInstallationStatus[app.name])
              : { name: app.name };
            switch (Platform.OS) {
            case "ios":
              if (
                HrAppUtil.isNullOrEmpty(app.ios.uriScheme) ||
                  HrAppUtil.isNullOrEmpty(app.ios.bundleId)
              ) {
                invalidApp = true;
              } else {
                appInstalled = await Linking.canOpenURL(app.ios.uriScheme);
              }

              break;
            case "android":
              if (
                HrAppUtil.isNullOrEmpty(app.android.androidScheme) ||
                  HrAppUtil.isNullOrEmpty(app.android.packageId)
              ) {
                invalidApp = true;
              } else {
                appInstalled = await Linking.canOpenURL(
                  app.android.androidScheme,
                );
              }

              break;
            default:
              throw new Error("Invalid PLatform");
            }
            // if (!invalidApp) {
            //   currentAppStatus.currentStatus = appInstalled;
            //   result.installationStatus[app.name] = currentAppStatus;
            //   if (mandatory) {
            //     result.mandatoryApps.push(app);
            //     if (!appInstalled) {
            //       result.allMandatoryAppsInstalled = false;
            //     }
            //   } else {
            //     result.optionalApps.push(app);
            //   }
            // } else {
            //   result.invalidApps.push(app);
            // }
            currentAppStatus.currentStatus = appInstalled;
            currentAppStatus.title = app.title;
            result.installationStatus[app.name] = currentAppStatus;

            if (invalidApp) {
              result.invalidApps.push(app);
            } else if (mandatory && !isAllOptionalForIos) {
              result.mandatoryApps.push(app);
              if (!appInstalled) {
                result.allMandatoryAppsInstalled = false;
              }
            } else {
              result.optionalApps.push(app);
            }
          }
          // console.log('--------------------', app.name, '---------------------');
          // console.log('Applicable : ', applicable);
          // console.log('Mandatory : ', mandatory);
          // console.log('Installed : ', appInstalled);
          // console.log('-----------------------------------------------------');
        }
        // console.log('======================== Group ENDS: ', appGroups[i].groupName, ' ======================');
      }
    }

    // check for any potential change

    // console.log("currnet installation status, ", currentInstallationStatus);
    // console.log("New installation status, ", result.installationStatus);

    result.dbSyncRequired = !HrAppUtil.objectEquals(
      result.installationStatus,
      currentInstallationStatus,
    );

    const initiallySynced = HrAppUtil.getBooleanValue(
      await LocalStorageUtil.get(
        STORAGE_KEY.APPLICATION.INSTALLATION_STATUS_SYNCED,
      ),
    );
    result.dbSyncRequired = result.dbSyncRequired || !initiallySynced;
    // console.log("===================================================");
    // console.log("generated result : ", result);
    // console.log("Mandatory Apps : ", result.mandatoryApps.length);
    // console.log("Optional Apps : ", result.optionalApps.length);
    // console.log("Invalid Apps : ", result.invalidApps.length);
    // console.log(
    //   "DB Sync Required Apps : ",
    //   result.dbSyncRequired || !initiallySynced
    // );
    // console.log("===================================================");

    // if (result.dbSyncRequired || !initiallySynced) {
    //   await this.updateCurrentInstallationStatus(result.installationStatus);
    // }
    return result;
  }

  static async updateCurrentInstallationStatus(dispatch, currentStatus) {
    const token = HrAppUtil.isNullOrEmpty(
      await LocalStorageUtil.get(STORAGE_KEY.USER.AUTH_TOKEN),
    );
    const mobileVerified = HrAppUtil.getBooleanValue(
      await LocalStorageUtil.get(STORAGE_KEY.USER.MOBILE_NUMBER_VERIFIED),
    );
    if (currentStatus && !token && mobileVerified) {
      // console.log(
      //   "Going to update the linked application status ",
      //   currentStatus
      // );
      const jsonKeys = Object.keys(currentStatus);
      if (jsonKeys.length > 0) {
        const updateRequest = { installedLinkedApps: [] };
        jsonKeys.forEach(key => {
          const propertyCheck = Object.prototype.hasOwnProperty.call(
            currentStatus,
            key,
          );
          if (propertyCheck) {
            const appItem = currentStatus[key];
            updateRequest.installedLinkedApps.push({
              applicationName: appItem.name,
              applicationDescription: appItem.title,
              applicationVersion: "",
              isInstalled: appItem.currentStatus,
            });
          }
        });

        // console.log("Generated request ", updateRequest);
        try {
          const apiRes = await invokeApi(
            dispatch,
            ApiEndpoints.deviceInformation.updateLinkedAppInstallation,
            updateRequest,
          );
          // console.log("API RES ", apiRes);
          await LocalStorageUtil.store(
            STORAGE_KEY.APPLICATION.INSTALLATION_STATUS_SYNCED,
            "true",
          );
          // console.log(">>>>> DB Synced");
        } catch (err) {
          // console.log("Application installation status sync failed : ", err);
          await LocalStorageUtil.store(
            STORAGE_KEY.APPLICATION.INSTALLATION_STATUS_SYNCED,
            "false",
          );
        }
      }
    } else {
      // console.log(
      //   "::::: Either no logged in user or no application installation status has been found"
      // );
    }

    return false;
  }

  // static openAppStore(androidId, iosBundleId) {
  //   console.log("Open in respective app store");
  //   let linkUrl = null;
  //   switch (Platform.OS) {
  //     case "ios":
  //       linkUrl = IOS_MARKET_URL.replace(ID_TOKEN, iosBundleId);
  //       console.log(" ****** > IOS URL >>> ", linkUrl);
  //       break;
  //     case "android":
  //       linkUrl = ANDROID_MARKET_URL.replace(ID_TOKEN, androidId);
  //       console.log(" ****** > ANDROID URL >>> ", linkUrl);
  //       break;
  //     default:
  //       Alert.alert("Not supported in this platform ", Platform.OS);
  //   }
  //   // Linking.openURL('iess://').catch((err) => { console.log(err); Alert.alert('Error !!!', 'Failed to open the app'); });
  //   Linking.openURL(linkUrl).catch(err => {
  //     console.log(err);
  //     Alert.alert("Error !!!", "Failed to open the app");
  //   });
  // }

  static async getCurrentVersion(dispatch) {
    // get the current version
    // console.log("Fetch latest version");
    const configVersionResponse = await invokeApi(
      dispatch,
      ApiEndpoints.common.getAppConfigVersion,
    );
    const latestVersion = configVersionResponse.data.version;
    // console.log("Latest version : ", latestVersion);
    return latestVersion;
  }

  static async getCurrentConfiguration(dispatch) {
    // console.log("Fetch current configuration");
    return invokeApi(dispatch, ApiEndpoints.common.getAppConfig);
  }

  static async getLatestConfiguration(localStore, dispatch) {
    const result = {};
    const currentVersion =
      localStore[STORAGE_KEY.APPLICATION.APPLICATION_CONFIG_VERSION];
    const latestVersion = await this.getCurrentVersion(dispatch);
    if (
      HrAppUtil.isNullOrEmpty(currentVersion) ||
      currentVersion !== latestVersion
    ) {
      const apiConfigResponse = await this.getCurrentConfiguration(dispatch);
      result.appConfig = JSON.stringify(
        apiConfigResponse.data.applicationConfiguration,
      );
      result.updateRequired = true;
      result.version = latestVersion;
    } else {
      result.appConfig = localStore[STORAGE_KEY.APPLICATION.APPLICATION_CONFIG];
      result.updateRequired = false;
      result.version = latestVersion;
    }
    return result;
  }

  static async updateMandatoryAppStatus(localStore) {
    // console.log(
    //   "]]]]]]]]]]]]]]]] Inside mandatory enablement app status > ",
    //   localStore
    // );
    // check for application config
    if (
      HrAppUtil.isNullOrEmpty(
        localStore[STORAGE_KEY.APPLICATION.APPLICATION_CONFIG],
      ) ||
      HrAppUtil.isNullOrEmpty(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
    ) {
      return;
    }
    // check for user Role
    const loggedInUser = HrAppUtil.parse(
      localStore[STORAGE_KEY.USER.LOGGEDIN_USER],
    );
    const appConfig = HrAppUtil.parse(
      localStore[STORAGE_KEY.APPLICATION.APPLICATION_CONFIG],
    );
    const currentInstallationStatus = HrAppUtil.isNullOrEmpty(
      localStore[STORAGE_KEY.APPLICATION.INSTALLATION_STATUS],
    )
      ? {}
      : HrAppUtil.parse(
        localStore[STORAGE_KEY.APPLICATION.INSTALLATION_STATUS],
      );
    const result = await this.getAllApplication(
      appConfig,
      loggedInUser,
      currentInstallationStatus,
    );
    // console.log("Received status : ", result);
    // return result;
    const multiStore = [];
    const mandatoryAppsInstalled =
      result.allMandatoryAppsInstalled ||
      ApplicationConfiguration.bypassAppEnablement;
    multiStore.push([
      STORAGE_KEY.APPLICATION.INSTALLATION_STATUS,
      HrAppUtil.stringify(result.installationStatus)
        ? HrAppUtil.stringify(result.installationStatus)
        : "",
    ]);
    multiStore.push([
      STORAGE_KEY.APPLICATION.MANDATORY_APPS,
      HrAppUtil.stringify(result.mandatoryApps),
    ]);
    multiStore.push([
      STORAGE_KEY.APPLICATION.OPTIONAL_APPS,
      HrAppUtil.stringify(result.optionalApps),
    ]);
    multiStore.push([
      STORAGE_KEY.APPLICATION.INVALID_APPS,
      HrAppUtil.stringify(result.invalidApps),
    ]);
    multiStore.push([
      STORAGE_KEY.APPLICATION.ALL_MANDATORY_APPS_INSTALLED,
      mandatoryAppsInstalled ? "true" : "false",
    ]);
    await LocalStorageUtil.storeMultiple(multiStore);
    return result;
  }
}

export default LinkedApplicationUtil;
