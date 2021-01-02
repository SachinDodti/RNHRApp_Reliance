import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { IMG_APP_BACKGROUND, IMG_ONESTEPUP } from "../../Assets/images";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
import ReporteeListComponent from "../../Components/ReporteeList";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import styles from "./ReporteeStyles";
import appStyles from "../../appStyles";
import HrAppUtil from "../../Util/HrAppUtil";
import ApplicationConfiguration from "../../Config/env";

class Reportee extends Component {
  hierarchyUp = () => {
    const { searchReportee, reportee } = this.props;
    if (reportee.supervisor && reportee.supervisor.length > 0) {
      const currentEmp = reportee.supervisor.pop();
      if (!HrAppUtil.isNullOrEmpty(currentEmp.managerSapCode)) {
        searchReportee({
          sapCode: currentEmp.managerSapCode,
          fullName: currentEmp.managerName,
          isHierarchyUp: true,
        });
      }
    }
  };

  render() {
    const { reportee } = this.props;
    const hierarchyUpEnabled =
      reportee && reportee.supervisor && reportee.supervisor.length > 0;
    const supervisor =
      reportee.supervisor.length > 0
        ? reportee.supervisor[reportee.supervisor.length - 1]
        : null;
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
              Actions[ApplicationConfiguration.scene.ATTENDANCE]()
            }
          />
          <ScrollView
            contentContainerStyle={appStyles.scrollViewParent}
            indicatorStyle="white"
          >
            <View style={styles.listView}>
              <View style={styles.flexDirection}>
                {hierarchyUpEnabled ? (
                  <TouchableOpacity onPress={this.hierarchyUp}>
                    <Image style={styles.tileIcon} source={IMG_ONESTEPUP} />
                  </TouchableOpacity>
                ) : null}
                <Text style={styles.headingText}>
                  {getText(I18N_CONSTANTS.REPORTEE.REPORTEE_HEADER)}
                </Text>
              </View>
              <View style={styles.titleText}>
                {reportee.reportee && reportee.reportee.length > 0 ? (
                  <ReporteeListComponent
                    supervisor={supervisor}
                    reporteeArray={reportee.reportee}
                  />
                ) : null}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

Reportee.propTypes = {
  // reportee: PropTypes.func.isRequired,
  searchReportee: PropTypes.func.isRequired,
};

export default Reportee;
