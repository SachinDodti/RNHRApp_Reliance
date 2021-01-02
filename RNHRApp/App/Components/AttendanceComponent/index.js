import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
  // Platform,
  // PermissionsAndroid,
} from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import AutoScrolling from "react-native-auto-scrolling";
// import Geolocation from 'react-native-geolocation-service';
import RNLocation from "react-native-location";
import styles from "./Styles";
import { IMG_ATTENDANCE, IMG_ICON_CALENDAR } from "../../Assets/images";
// import HrAppUtil from '../../Util/HrAppUtil';
import ApplicationConfiguration from "../../Config/env";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import LocationUtil from "../../Util/LocationUtil";
import HrAppUtil from "../../Util/HrAppUtil";

// const colors = require('../../Config/config');

class AttendanceComponent extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   checkInDate: '',
    //   checkInTime: '',
    //   checkOutDate: '',
    //   checkOutTime: '',
    //   isCheckInEnabled: true,
    // };
    this.performCheckIn = this.performCheckIn.bind(this);
    this.performCheckOut = this.performCheckOut.bind(this);
    RNLocation.configure({
      distanceFilter: 5.0
    });
  }

  openAttendanceScreen = () => {
    Actions.attendance();
  };

  checkInCheckoutAllowed(location) {
    const { onCheckinCheckoutNotAllowed } = this.props;
    // if (HrAppUtil.isRunningOnSimulator()) {
    //   console.log("Running in simulator - Check in not allowed");
    //   onCheckinCheckoutNotAllowed(
    //     getText(I18N_CONSTANTS.ATTENDANCE.SIMULATOR_NOT_ALLOWED)
    //   );
    //   return false;
    // }
    if (location.fromMockProvider) {
      // console.log('Mock location provider - Check in not allowed');
      onCheckinCheckoutNotAllowed(
        getText(I18N_CONSTANTS.ATTENDANCE.MOCK_LOCATION_NOT_ALLOWED)
      );
      return false;
    }
    return true;
  }

  async performCheckIn() {
    const { performAttendance } = this.props;
    // await LocationUtil.getCurrentPosition(this.doCheckIn);
    performAttendance(this.doCheckIn);
  }

  async performCheckOut() {
    const { performAttendance } = this.props;
    // await LocationUtil.getCurrentPosition(this.doCheckout);
    performAttendance(this.doCheckout);
  }

  getEncryptedSignature = (latitude, longitude) => {
    const sPlainText = `${latitude}_${longitude}`;
    const sEncryptedText = HrAppUtil.encrypt(sPlainText);
    return sEncryptedText;
  };

  doCheckIn = position => {
    const { onCheckIn } = this.props;
    // console.log("check in position", position);
    if (this.checkInCheckoutAllowed(position)) {
      const { latitude, longitude } = position;
      const signature = this.getEncryptedSignature(latitude, longitude);
      const userLocation = {
        latitude,
        longitude
      };
      const checkInReq = {
        signature,
        userLocation,
        type: "check-in"
      };
      //   console.log("check in request : ", checkInReq);
      onCheckIn(checkInReq);
    }
  };

  doCheckout = position => {
    const { onCheckOut } = this.props;
    // console.log("check out position", position);
    if (this.checkInCheckoutAllowed(position)) {
      const { latitude, longitude } = position;
      const signature = this.getEncryptedSignature(latitude, longitude);
      const userLocation = {
        latitude,
        longitude
      };
      const checkOutReq = {
        signature,
        userLocation,
        type: "check-out"
      };
      //   console.log("check out request : ", checkOutReq);
      onCheckOut(checkOutReq);
    }
  };

  getMarqueeComp() {
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

  render() {
    const {
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      isCheckInEnabled,
      isCheckOutEnabled
    } = this.props;
    // console.log(this.props);
    const CheckInOut = (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.buttonContainerLeft,
            !isCheckInEnabled ? styles.disabled : {}
          ]}
          onPress={this.performCheckIn}
          disabled={!isCheckInEnabled}
        >
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonContainerRight,
            !isCheckOutEnabled ? styles.disabled : {}
          ]}
          onPress={this.performCheckOut}
          disabled={!isCheckOutEnabled}
        >
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    );
    const CheckInOutTime = (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.textI}>{checkInDate}</Text>
          <Text style={styles.textI}>{checkInTime}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.textI}>{checkOutDate}</Text>
          <Text style={styles.textI}>{checkOutTime}</Text>
        </View>
      </View>
    );

    return (
      <View>
        <View style={styles.AttenUpperTileScrollView}>
          {this.getMarqueeComp()}
        </View>
        <TouchableOpacity
          style={styles.AttenUpperTile}
          onPress={this.openAttendanceScreen}
        >
          <Image style={styles.imgLeftUpper} source={IMG_ATTENDANCE} />
          <Text style={styles.midText}>Attendance</Text>
          <View>
            <Image style={styles.imgRightUpper} source={IMG_ICON_CALENDAR} />
          </View>
        </TouchableOpacity>
        <View style={styles.lowerTile}>
          {CheckInOutTime}
          {CheckInOut}
          {/* <AutoScrolling>
            <Text style={styles.textScroll}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </Text>
          </AutoScrolling> */}
        </View>
      </View>
    );
  }
}

AttendanceComponent.propTypes = {
  onCheckIn: PropTypes.func.isRequired,
  onCheckOut: PropTypes.func.isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  checkInTime: PropTypes.string.isRequired,
  checkOutTime: PropTypes.string.isRequired,
  isCheckInEnabled: PropTypes.bool,
  isCheckOutEnabled: PropTypes.bool,
  onCheckinCheckoutNotAllowed: PropTypes.func.isRequired,
  announcement: PropTypes.string
};

AttendanceComponent.defaultProps = {
  isCheckInEnabled: false,
  isCheckOutEnabled: false,
  announcement: null
};

export default AttendanceComponent;
