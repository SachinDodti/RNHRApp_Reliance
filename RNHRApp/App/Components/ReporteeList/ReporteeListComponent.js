import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./Styles";
import { IMG_MY_TEAM_BLUE } from "../../Assets/images";
import NoResultFound from "../NoResultFound";
import ApplicationConfiguration from "../../Config/env";

class ReporteeListComponent extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  // showAttendance(item) {
  //   let sceneProp = {};
  //   sceneProp = {
  //     ...sceneProp,
  //     showForReportee: true,
  //     reporteeName: item.name,
  //     reporteeSapCode: item.sapCode,
  //   };
  //   // console.log('Generated Props for attendance: ', sceneProp);
  //   Actions[ApplicationConfiguration.scene.ATTENDANCE](sceneProp);
  // }

  onPress(item) {
    const { searchReportee } = this.props;
    searchReportee({
      sapCode: item.sapCode,
      fullName: item.name,
      managerSapCode: item.managerSapCode,
      managerName: item.managerName,
    });
  }

  render() {
    const { reporteeArray, supervisor } = this.props;
    return (
      <View>
        {supervisor ? (
          <View>
            <View style={styles.dataView}>
              <Text style={styles.sapCodeText}>{supervisor.sapCode}</Text>
              <Text style={styles.keyText}>{supervisor.fullName}</Text>
            </View>
            <View style={styles.borderStyle} />
          </View>
        ) : null}
        <ScrollView
          contentContainerStyle={styles.scrollViewButtom}
          indicatorStyle="white"
        >
          {reporteeArray.length > 0 ? (
            <FlatList
              data={reporteeArray}
              renderItem={({ item }) => (
                <View style={styles.listDataView}>
                  <TouchableOpacity
                    style={styles.listViewinside}
                    // onPress={() => this.showAttendance(item)}
                    onPress={() => {
                      let sceneProp = {};
                      sceneProp = {
                        ...sceneProp,
                        showForReportee: true,
                        reporteeName: item.name,
                        reporteeSapCode: item.sapCode,
                      };
                      // console.log('Generated Props for attendance: ', sceneProp);
                      Actions[ApplicationConfiguration.scene.ATTENDANCE](
                        sceneProp,
                      );
                    }}
                  >
                    <View style={styles.flex}>
                      <Text style={styles.dataTextSapCode}>{item.sapCode}</Text>
                    </View>
                    <View style={styles.keyMargin}>
                      <Text style={styles.datatextKey}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!item.hasAnyReportee}
                    onPress={() => this.onPress(item)}
                  >
                    <Image
                      style={[
                        styles.arrowIcon,
                        !item.hasAnyReportee ? styles.arrowIconHide : null,
                      ]}
                      source={IMG_MY_TEAM_BLUE}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <NoResultFound />
          )}
        </ScrollView>
      </View>
    );
  }
}

ReporteeListComponent.propTypes = {
  searchReportee: PropTypes.func.isRequired,
  // supervisor: PropTypes.shape({
  //   sapCode: PropTypes.string,
  //   fullName: PropTypes.string,
  // }).isRequired,
};

// ReporteeListComponent.defaultProps = {
//   okLabel: '',
//   title: '',
// };

export default ReporteeListComponent;
