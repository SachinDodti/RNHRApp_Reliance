import React, { Component } from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";

import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";


import HeaderComponent from "../../../Components/HeaderComponent";
import NavBarComponent from "../../../Components/NavBarComponent";

import ApplicationConfiguration from "../../../Config/env";

import { IMG_DEFAULT_ICON, IMG_APP_BACKGROUND } from "../../../Assets/images";

import appStyles from "../../../appStyles";

import styles from "../Styles";
import HrAppUtil from "../../../Util/HrAppUtil";

class HelpDeskComponent extends Component {
  constructor(props) {
    super(props);
  }

  getNavBarProps = () => ({
    includeBack: true,
    includeProfile: true,
    includeNotification: true,
    onBackPress: this.onBackPress,
    includeVersion: true
  });

  onClickRegisterQueryHandler = () => {
    Actions[ApplicationConfiguration.scene.REGISTER_QUERY]();
  };

  onClickTrackQueryHandler = () => {
    //Alert.alert("Message", `Track query is coming soon!`);
    Actions[ApplicationConfiguration.scene.TRACK_QUERY]();
  };

  onClickProductCornerHandler = () => {
    Actions[ApplicationConfiguration.scene.PRODUCT_CORNER]();
  };

  render() {
 
    const { sceneHRProp, announcements } = this.props;
    const { title, icon } = sceneHRProp;
    const compStyle1 = [
      styles.showBorder,
      styles.itemView,
      styles.tileItemAppearence2,
      styles.dark // : styles.ligth
    ];
    const compStyle2 = [
      styles.showBorder,
      styles.itemView,
      styles.tileItemAppearence2,
      styles.light // : styles.ligth
    ];
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
            onBackPress={() => Actions.pop()}
          />
          <View style={[styles.groupTitle]}>
            <Text style={[styles.textFormat]}>{title}</Text>
          </View>
          <ScrollView style={styles.appContainer} indicatorStyle="white">
            <View style={{ flexDirection: "row", padding: 5 }}>
              <TouchableOpacity
                style={compStyle1}
                onPress={this.onClickRegisterQueryHandler}
              >
                <View style={[styles.titleContainer]}>
                  <View style={[styles.titleRow]}>
                    <Image
                      style={[styles.tileIcon2]}
                      source={{ uri: icon || IMG_DEFAULT_ICON }}
                    />
                  </View>
                  <View style={[styles.titleRow, styles.textContainerTile]}>
                    <Text style={[styles.textSingleRow]}>Register Query</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={compStyle2}
                onPress={this.onClickTrackQueryHandler}
              >
                <View style={[styles.titleContainer]}>
                  <View style={[styles.titleRow]}>
                    <Image
                      style={[styles.tileIcon2]}
                      source={{ uri: icon || IMG_DEFAULT_ICON }}
                    />
                  </View>
                  <View style={[styles.titleRow, styles.textContainerTile]}>
                    <Text style={[styles.textSingleRow]}>Track Query</Text>
                  </View>
                </View>
              </TouchableOpacity>


            </View>
            <View style={[styles.textContainerTile], [{ marginTop: 10 }]}>
              <Text style={[styles.textSingleRow]}>{announcements ? announcements.EmployeeHelpdeskNote : ""} </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default HelpDeskComponent;
