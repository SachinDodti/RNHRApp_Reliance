import React, { Component } from "react";
import { View, Image, Text, SafeAreaView, ImageBackground } from "react-native";
import { Container, Content, Item, Picker } from "native-base";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { IMG_APP_BACKGROUND, IMG_ICON_LOCATION } from "../../Assets/images";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
import styles from "./LocationDirectoryStyles";
import appStyles from "../../appStyles";
import BranchDetails from "../../Components/BranchDetails";
import { getText } from "../../I18n/Lang";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";

const colors = require("../../Config/config");

class LocationDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateIndex: -1,
      city: undefined,
      isVisible: false,
    };
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
  }

  onChangeCity(value) {
    // console.log('test Onchange city', Platform.OS, value);
    const { stateIndex, stateName } = this.state;
    if (stateIndex > -1 && value > -1) {
      const { locationDirectory, branchDetails } = this.props;
      const { stateCity } = locationDirectory;
      const state = stateCity[stateIndex];
      const city = state ? state.cities[value] : {};
      // console.log('State Name : ', stateName, 'City Name : ', city.cityName);
      this.setState({
        city: value,
        // cityName: city.cityName,
        isVisible: true,
      });
      branchDetails({
        cityName: city.cityName,
        stateName,
      });
    }
  }

  onChangeState(value) {
    const { locationDirectory } = this.props;
    const { stateCity } = locationDirectory;
    // console.log('Selected state index : ', value);
    if (value > -1) {
      this.setState({
        stateIndex: value,
        stateName: stateCity[value].stateName,
        city: undefined,
        isVisible: false,
      });
    }
  }

  hidePopUp = () => {
    this.setState({ isVisible: false });
  };

  onBackPress = () => {
    Actions.pop();
  };

  render() {
    const { isVisible, stateIndex, city } = this.state;
    const { locationDirectory } = this.props;
    const { stateCity } = locationDirectory;
    const array = stateIndex > -1 ? stateCity[stateIndex].cities : [];

    // console.log('on locationDirectory after selecting state', locationDirectory.branches);

    const notSelected = (
      <View>
        <View style={styles.imgPhContainer}>
          <Image style={styles.imgPh} source={IMG_ICON_LOCATION} />
        </View>
        <Text style={styles.txtStyle}>
          {getText(I18N_CONSTANTS.LOCATION_DIRECTORY.LOADING_TEXT)}
        </Text>
      </View>
    );
    const selected = (
      <BranchDetails
        stateCityArray={stateCity}
        branchDetails={locationDirectory.branches}
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
            includeVersion
            includeBack
            includeProfile
            includeNotification
            onBackPress={this.onBackPress}
          />
          <View style={styles.height}>
            <Container style={styles.blurBackground}>
              <Content style={styles.blurBackground}>
                <View style={styles.transparentView}>
                  <View style={styles.buttonViewL}>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        placeholder="Select State"
                        placeholderStyle={styles.placeholderStyle}
                        // placeholderIconColor="#007aff"
                        selectedValue={stateIndex}
                        textStyle={styles.whiteTextStyle}
                        onValueChange={value => this.onChangeState(value)}
                      >
                        <Picker.Item
                          label="Select State"
                          color={colors.OTPText}
                          value="-1"
                        />
                        {stateCity.map((item, index) => (
                          <Picker.Item
                            label={item.stateName}
                            value={index}
                            key={Math.random().toString()}
                            color={colors.OTPText}
                          />
                        ))}
                      </Picker>
                    </Item>
                  </View>
                  <View style={styles.buttonViewR}>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        placeholder="Select City"
                        placeholderStyle={styles.placeholderStyle}
                        // placeholderIconColor="#ffffff"
                        selectedValue={city}
                        onValueChange={value => this.onChangeCity(value)}
                        textStyle={styles.whiteTextStyle}
                      >
                        <Picker.Item
                          label="Select City"
                          color={colors.OTPText}
                          value="-1"
                        />
                        {array.map((item, index) => (
                          <Picker.Item
                            label={item.cityName}
                            value={index}
                            key={Math.random().toString()}
                            color={colors.OTPText}
                          />
                        ))}
                      </Picker>
                    </Item>
                  </View>
                </View>
              </Content>
            </Container>
          </View>
          {isVisible ? selected : notSelected}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

LocationDirectory.propTypes = {
  locationDirectory: PropTypes.objectOf(PropTypes.object).isRequired,
  branchDetails: PropTypes.objectOf(PropTypes.object).isRequired,
  // authenticateUser: PropTypes.func.isRequired,
  // authData: PropTypes.objectOf(PropTypes.object()).isRequired,
  // removeDeviceWarning: PropTypes.func.isRequired,
  // postLoginProceed: PropTypes.func.isRequired,
};

export default LocationDirectory;
