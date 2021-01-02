/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { LocalStorageUtil, STORAGE_KEY } from "./App/Util/LocalStorage";
import analytics from '@react-native-firebase/analytics';
import { Provider } from "react-redux";
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';

import HrAppRouter from "./App/Navigation";
import store from "./App/Redux";
export default class App extends Component {
  async componentDidMount() {
    await this.checkPermission();

  }
  render(){
   
    return(
            <Provider store={store}>
               <HrAppRouter />
            </Provider>
    )
  }


  getToken = async () => {
    let fcmToken = await LocalStorageUtil.get(STORAGE_KEY.DEVICE.FCM_TOKEN);
    console.log(`FCM Token=${JSON.stringify(fcmToken)}`);  
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.log(`Token Obtained=${JSON.stringify(fcmToken)}`);
      if (fcmToken) {
        await LocalStorageUtil.store(STORAGE_KEY.DEVICE.FCM_TOKEN, fcmToken);
        analytics().setUserProperty("DeviceToken", fcmToken);
      }
    } else {
     analytics().setUserProperty("DeviceToken", fcmToken);
    }
  };


  async checkPermission() {
    const authStatus = await messaging().hasPermission();
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
 
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await messaging().requestPermission();
      this.getToken();
    } catch (ex) {
      console.log("Promise rejected for permission");
    }
  }
}
