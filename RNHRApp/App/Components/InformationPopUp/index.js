import React, { Component } from "react";
import PropTypes from "prop-types";
import Popover from "react-native-popover-view";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./Styles";
import { IMG_ICON_CLOSE } from "../../Assets/images";
import HrAppUtil from "../../Util/HrAppUtil";

class InformationPopUp extends Component {
  constructor(props) {
    super(props);
    this.backToLogin = this.backToLogin.bind(this);
    this.birthdayWish = this.birthdayWish.bind(this);
    this.anniversaryWish = this.anniversaryWish.bind(this);
  }

  backToLogin = () => {
    const { closePopUp } = this.props;
    HrAppUtil.doLogout();
  };

  birthdayWish = () => {
    const { closePopUp } = this.props;
    closePopUp();
    Actions.birthday();
  };

  anniversaryWish = () => {
    const { closePopUp } = this.props;
    closePopUp();
    Actions.anniversary();
  };

  render() {
    const {
      isVisible,
      closePopUp,
      birthdayCount,
      anniversaryCount,
      sapCode,
      loggedInUser,
    } = this.props;
    // console.log('birthday count length : ', this.props);
    return (
      <Popover isVisible={isVisible} popoverStyle={styles.popUpBackgroundColor}>
        <View style={styles.parentView}>
          <View style={styles.headerDirection}>
            <View style={styles.titleHeader}>
              <Text style={styles.headerTextName}>
                Welcome {loggedInUser.firstName}
              </Text>
            </View>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={closePopUp}>
                <Image style={styles.imgRightUpper} source={IMG_ICON_CLOSE} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerSection}>
            <View style={styles.leftSapMargin}>
              <Text style={styles.headerTextLeft}>{sapCode}</Text>
            </View>
          </View>
          <View style={styles.rightMargin}>
            <Text style={styles.headerTextRight}>
              {loggedInUser.orgRoles ? loggedInUser.orgRoles[0] : ""}
            </Text>
          </View>
          <View style={styles.border} />
          {/* <TouchableOpacity onPress={this.birthdayWish}>
            <Text style={styles.birthdayText}>
              View Birthdays = {birthdayCount} new records
            </Text>
          </TouchableOpacity>
          <View style={styles.lowerBorder} />
          <TouchableOpacity onPress={this.anniversaryWish}>
            <Text style={styles.bodyText}>
              View Anniversaries = {anniversaryCount} new records
            </Text>
          </TouchableOpacity>
          <View style={styles.lowerBorder} /> */}
          <TouchableOpacity onPress={this.backToLogin}>
            <Text style={styles.bodyText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </Popover>
    );
  }
}

InformationPopUp.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closePopUp: PropTypes.func.isRequired,
  birthdayCount: PropTypes.number,
  anniversaryCount: PropTypes.number,
  loggedInUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
  }).isRequired,
  sapCode: PropTypes.string,
};

InformationPopUp.defaultProps = {
  birthdayCount: 0,
  anniversaryCount: 0,
  sapCode: "",
};

export default InformationPopUp;
