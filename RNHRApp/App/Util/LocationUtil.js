import Geolocation from "react-native-geolocation-service";
import { Platform, PermissionsAndroid } from "react-native";
import RNLocation from "react-native-location";
import {
  endLoading,
  initiateLoding,
  errorOccured,
  showMessage,
} from "../Redux/Actions/ApplicationStateAction";
import ApplicationConfiguration from "../Config/env";

export default class LocationUtil {
  static async hasMockProviderUsed() {
    let grantAccess = await RNLocation.checkPermission(
      ApplicationConfiguration.locationAccuracy,
    );
    // console.log(
    //   "Geo location permission checked and has the permission : ",
    //   grantAccess,
    // );
    if (!grantAccess) {
      // console.log("Going to request for geo location access : ");
      grantAccess = await RNLocation.requestPermission(
        ApplicationConfiguration.locationAccuracy,
      );
      // console.log("Geolocation access granted : ", grantAccess);
    }
    if (grantAccess) {
      await RNLocation.configure({
        distanceFilter: 0,
        desiredAccuracy: {
          android: "highAccuracy",
          ios: "best",
        },
      });
      const location = await RNLocation.getLatestLocation({ timeout: 60000 });
     console.log("Location :>>>>>", location);
      if (location.fromMockProvider) {
        return true;
      }
      return false;
    }

    return null;
  }

  static async requestAndriodLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geo-location Permission",
          message: "Geo-location permission required for attendence",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    } catch (err) {
      new Error(err);
    }
    return false;
  }

  static async getCurrentPosition(callBackFunction, dispatch) {
    if (Platform.OS == "android") {
      grantAccess = await this.requestAndriodLocationPermission();
    } else {
      grantAccess = true;
    }
    if (grantAccess) {
      if (dispatch) {
        dispatch(initiateLoding());
      }

      const fromMockProvider = await this.hasMockProviderUsed();
      Geolocation.getCurrentPosition(
        result => {
          const position = {};
          position.latitude = result.coords.latitude;
          position.longitude = result.coords.longitude;
          position.fromMockProvider = fromMockProvider;
          position.accuracy = result.coords.accuracy;
          position.timeStamp = new Date(result.timestamp);
          // console.log("GEO LOCATION DATA : ", position);
          if (dispatch) {
            dispatch(endLoading());
          }
          callBackFunction(position);
        },
        error => {
          console.log(`Geo Location Error : ${error}`);
          if (dispatch) {
            dispatch(endLoading());
            dispatch(
              showMessage(
                "Failed to retrieve GPS location. Please try after sometime",
              ),
            );
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 1000,
          distanceFilter: 1,
        },
      );
    }
  }
}
