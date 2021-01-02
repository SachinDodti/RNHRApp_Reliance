import React, {Component} from 'react';
import Pdf from 'react-native-pdf';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'native-base';
import {CheckBox} from 'react-native-elements';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import {getText} from '../../I18n/Lang';
import styles from './Styles';

class LearningPageComponent extends Component {
  constructor(props) {
    super(props);
    const {status} = this.props;
    this.state = {
      status,
      disableCheckbox: true,
    };
  }

  updateStatus = (checkStatus) => {
    this.setState({
      status: checkStatus,
    });
  };

  updateLearningStatus = () => {
    // console.log('update learning status here');
  };

  updateCheckBoxStatus() {}

  render() {
    const {status, disableCheckbox} = this.state;
    const {course, goToNextCourse, currentPage} = this.props;
    // console.log("LearningPageComponent", this.props);
    return (
      <View style={styles.courseContainer} key={course.learningId}>
        <View style={styles.courseNameContainer}>
          <Text style={styles.courseNameStyle}>{course.learningName}</Text>
        </View>
        <View style={styles.pdfContainerStyle}>
          <Pdf
            source={{uri: course.learningLink, cache: true}}
            style={styles.webContainerStyle}
            onError={(error) => {
              // console.log('Error while reloading pdf', error);
            }}
            onPageChanged={(page, numberOfPages) => {
              //   console.log(`current page: ${page} total page ${numberOfPages}`);
              if (page === numberOfPages) {
                this.setState({disableCheckbox: false});
              }
            }}
          />
          <View style={styles.toolsContainer}>
            <Text style={[styles.textStyleInfo]}>
              Kindly read the entire training module to complete the mandatory
              learning
            </Text>
            <CheckBox
              checked={status}
              title={getText(I18N_CONSTANTS.MANDATORY_LEARNING.AGREE)}
              style={styles.checkBoxStyle}
              containerStyle={styles.checkBoxContainerStyle}
              textStyle={[
                styles.textStyle,
                disableCheckbox ? {opacity: 0.5} : {},
              ]}
              onPress={() => this.updateStatus(!status)}
              disabled={disableCheckbox}
            />
            <Button
              disabled={!status}
              bordered
              onPress={() => goToNextCourse(currentPage)}
              style={
                status
                  ? styles.btnNextEnableStyle
                  : [styles.btnNextEnableStyle, {opacity: 0.4}]
              }>
              <Text style={styles.txtNextStyle}>
                {getText(I18N_CONSTANTS.MANDATORY_LEARNING.NEXT)}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

LearningPageComponent.propTypes = {
  course: PropTypes.shape({learningLink: PropTypes.string.isRequired})
    .isRequired,
  status: PropTypes.bool.isRequired,
  goToNextCourse: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default LearningPageComponent;
