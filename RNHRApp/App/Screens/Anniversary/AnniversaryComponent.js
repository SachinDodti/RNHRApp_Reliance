import React, { Component } from "react";

import { SafeAreaView, ImageBackground } from "react-native";
import { Actions } from "react-native-router-flux";
import Toast from "react-native-easy-toast";
import PropTypes from "prop-types";
import { IMG_APP_BACKGROUND } from "../../Assets/images";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
import appStyles from "../../appStyles";
import styles from "./AnniversaryStyles";
import SearchBar from "../../Components/SearchBarComponent";
import SearchBirthdayDetails from "../../Components/SearchBirthdayDetails";
import TodayAnniversaryDetails from "../../Components/TodayAnniversaryDetails";
import ApplicationConfiguration from "../../Config/env";
import HrAppUtil from "../../Util/HrAppUtil";
import { STORAGE_KEY } from "../../Util/LocalStorage";

const SMS = "S";
const EMAIL = "E";
const IN_APP = "P";



class Anniversary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchResult: false,
      searchValue: "",
      selected: "key1",
      bday: true,
    };
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.sendAnniversaryWishCommunication = this.sendAnniversaryWishCommunication.bind(
      this,
    );
    this.showWishTemplate = this.showWishTemplate.bind(this);
    this.closeWishTemplatePopUp = this.closeWishTemplatePopUp.bind(this);
  }

  closeWishTemplatePopUp() {
    const { closeWishTemplateAnniversary } = this.props;
    closeWishTemplateAnniversary();
  }

  showWishTemplate(wishType, employee, isBday) {
    const apiReq = {
      wishFor: isBday ? "birthday" : "anniversary",
      wishType,
      recieverSapCode: employee.sapCode,
    };
    const { showWishTemplateAnniversary } = this.props;
    showWishTemplateAnniversary(apiReq, employee);
  }

  onBackPress = () => {
    const { showSearchResult } = this.state;
    if (showSearchResult) {
      this.setState({ showSearchResult: false });
    } else {
      Actions[ApplicationConfiguration.scene.DASHBOARD]();
    }
  };

  onClickHandler = () => {
    const { showError } = this.props;
    const { searchValue, selected } = this.state;
    let sapCode = "";
    let name = "";
    let department = "";
    if (selected === "key0") {
      sapCode = searchValue;
    } else if (selected === "key1") {
      name = searchValue;
    } else {
      department = searchValue;
    }
    this.setState({ showSearchResult: true });
    const authReq = {
      sapCode,
      name,
      department,
    };
    if (name.length > 0 || sapCode.length > 0) {
      const { birthdaySear } = this.props;
      birthdaySear(authReq);
      this.props.resetWish();
    } else {
      showError("Please provide valid inputs", "Anniversary - Invalid input");
    }
    // const { birthdaySear } = this.props;
    // birthdaySear(authReq);
    // this.props.resetWish();
    // // console.log('value....', authReq);
  };

  onValueChange(value) {
    this.props.resetWish();
    this.setState({
      selected: value,
    });
  }

  updateSearchValue = val => {
    // this.setState({ searchValue: val });
    this.state.searchValue = val;
    this.props.resetWish();
  };

  sendAnniversaryWishCommunication(employee, option, bday) {
    // console.log('wola.... ', employee, option);

    let communicationChannel = option.inApp ? IN_APP : "";
    communicationChannel += option.sms ? SMS : "";
    communicationChannel += option.email ? EMAIL : "";
    this.setState({ bday });
    const authReq = {
      wishTo: {
        type: bday ? "birthday" : "anniversary",
        communicationChannel,
        sapCode: employee.sapCode,
        name: employee.name,
        mobile: employee.mobile,
        email: employee.email,
      },
    };
    // console.log('reqqqq.... ', authReq);
    // console.log('reqqqq.... ', communicationChannel);

    const { anniversaryWish } = this.props;
    anniversaryWish(authReq);
  }

  render() {
    const { showSearchResult, selected, bday } = this.state;
    const { wishes, localStore, auth } = this.props;
    const { wished } = wishes;
    // console.log('statusAnn....', wished);
    if (wished && this.refs && this.refs.toast) {
      if (!bday || bday === undefined) {
        this.refs.toast.show("Anniversary Notified Successfully!");
      } else {
        this.refs.toast.show("Birthday Notified Successfully!");
      }
      this.props.resetWish();
    }
    const { employee } = wishes;
    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        ? HrAppUtil.parse(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        : null);

    const notSelected = (
      <TodayAnniversaryDetails
        anniversaryArray={wishes.anniversary}
        sendWishMessage={this.sendAnniversaryWishCommunication}
        showWishTemplateView={(wishType, _employee) =>
          this.showWishTemplate(wishType, _employee, false)
        }
        showWish={wishes.showTemplate ? wishes.showTemplate : false}
        wishType={wishes.wishType ? wishes.wishType : "SMS"}
        templateText={
          wishes.templateText ? wishes.templateText : "Template not found"
        }
        closeTemplate={this.closeWishTemplatePopUp}
        employee={employee}
        loggedInUser={loggedInUser}
        wishedSapCode={localStore[STORAGE_KEY.USER.BIRTHDAY_WISHED]}
      />
    );
    const searchBday = (
      <SearchBirthdayDetails
        birthdayArray={wishes.searchResult}
        sendWishMessage={this.sendAnniversaryWishCommunication}
        showWishTemplateView={(wishType, _employee, isBday) =>
          this.showWishTemplate(wishType, _employee, isBday)
        }
        showWish={wishes.showTemplate ? wishes.showTemplate : false}
        wishType={wishes.wishType ? wishes.wishType : "SMS"}
        templateText={
          wishes.templateText ? wishes.templateText : "Template not found"
        }
        closeTemplate={this.closeWishTemplatePopUp}
        employee={employee}
        loggedInUser={loggedInUser}
        wishedSapCode={localStore[STORAGE_KEY.USER.BIRTHDAY_WISHED]}
      />
    );
    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={appStyles.backgroundImageStyle}
        >
          <HeaderComponent />
          <NavBarComponent
            includeBack
            includeProfile
            includeNotification
            onBackPress={this.onBackPress}
            includeVersion
          />
          <SearchBar
            onChange={this.updateSearchValue}
            onClickHandler={this.onClickHandler}
            onChangeSelectedValue={selected}
            onValueChange={value => this.onValueChange(value)}
          />
          {showSearchResult ? searchBday : notSelected}
          <Toast
            ref="toast"
            style={styles.toastStyle}
            position="buttom"
            positionValue={160}
            fadeInDuration={750}
            fadeOutDuration={2750}
            textStyle={styles.toastText}
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

Anniversary.propTypes = {
  birthdaySear: PropTypes.objectOf(PropTypes.object).isRequired,
  anniversaryWish: PropTypes.objectOf(PropTypes.object).isRequired,
  wishes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Anniversary;
