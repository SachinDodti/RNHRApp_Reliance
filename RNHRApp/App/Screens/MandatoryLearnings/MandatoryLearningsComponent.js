import React, {Component} from 'react';
import {View, Text, ImageBackground, SafeAreaView} from 'react-native';
import {Button} from 'native-base';
import Swiper from 'react-native-swiper';

import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {STORAGE_KEY} from '../../Util/LocalStorage';
import styles from './Styles';
import appStyles from '../../appStyles';
import {IMG_APP_BACKGROUND} from '../../Assets/images';
import HeaderComponent from '../../Components/HeaderComponent';
import I18N_CONSTANTS from '../../I18n/LanguageConstants';
import {getText} from '../../I18n/Lang';
import LearningPageComponent from '../../Components/LearningPageComponent';

import HrAppUtil from '../../Util/HrAppUtil';
import ApplicationConfiguration from '../../Config/env';

const keyLearningDataCheck = STORAGE_KEY.MANDATORY_LEARNING.ALL_MANDATORY_DATA;

class MandatoryLearning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learningData: '',
      nextTitle: 'Next',
    };
  }

  getPendingLearning(props) {
    const {localStore} = this.props;
    let learningData = localStore[keyLearningDataCheck];
    // update the learning data for only for pending one
    const learningDataValue =
      learningData !== '' ? HrAppUtil.parse(learningData) : [];
    const pendingLearning = [];
    if (learningDataValue !== '' && learningDataValue.length > 0) {
      learningDataValue.map((course) => {
        if (course.status !== 'COMPLETED') {
          return pendingLearning.push(course);
        }
        return null;
      });
      // console.log(">>>>> PENDING LEARNING122 : ", pendingLearning.length);
    }

    learningData = HrAppUtil.stringify(pendingLearning);
    return learningData;
  }

  componentDidMount() {
    this.setState({
      learningData: this.getPendingLearning(this.props),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    nextState.learningData = this.getPendingLearning(nextProps);
    // console.log("Next State ::: ", nextState);
    return true;
  }

  componentDidUpdate() {
    const {mandatoryLearning} = this.props;
    //console.log(' componentDidUpdate mandatoryLearning', mandatoryLearning);
    if (mandatoryLearning.lastPage) {
      // HrAppUtil.getInitialScene().then(initialScene => {
      //   if (initialScene && initialScene != Actions.currentScene) {
      //     Actions[initialScene]();
      //   }
      // });
      HrAppUtil.getInitialScene(
        ApplicationConfiguration.scene.DASHBOARD,
        true,
      ).then((initialScene) => {
        if (initialScene) {
          Actions[initialScene]();
        }
      });
    }
  }

  goToNextCourse = (currentPage) => {
    // console.log("currentPage", currentPage);
    const {updateCurrentCourseAndGoToNext} = this.props;
    const {learningData} = this.state;
    const courseInfo = HrAppUtil.parse(learningData);

    const currentCourse =
      currentPage < courseInfo.length ? courseInfo[currentPage] : null;
    // console.log("Course visited", currentCourse);
    if (currentCourse) {
      const courseUpdateRequest = {learningId: currentCourse.learningId};
      const lastPage = currentPage + 1 === courseInfo.length;
      updateCurrentCourseAndGoToNext(
        courseUpdateRequest,
        lastPage,
        this.refs.swiper,
      );
      // this.refs.swiper.scrollBy(1);
    }
  };

  setButtonStyle = (checkBoxFlag) =>
    checkBoxFlag ? styles.btnNextEnableStyle : styles.btnNextDisableStyle;

  getLearningCourses = (currentPage) => {
    // console.log("currentPage", currentPage);
    const {learningData} = this.state;
    const learningDataValue =
      learningData !== '' ? HrAppUtil.parse(learningData) : [];
    const pendingLearning = [];
    if (learningDataValue !== '' && learningDataValue.length > 0) {
      // const pendingLearning = [];
      learningDataValue.map((course) => {
        if (course.status !== 'COMPLETED') {
          return pendingLearning.push(course);
        }
        return null;
      });
      // console.log(">>>>> PENDING LEARNING2 : ", pendingLearning.length);
      return pendingLearning.map((course) => (
        <LearningPageComponent
          key={course.learningId}
          status={course.status === 'COMPLETED'}
          course={course}
          goToNextCourse={this.goToNextCourse}
          currentPage={currentPage}
        />
      ));
    }
    return <View />;
  };

  render() {
    const {mandatoryLearning} = this.props;
    const {currentPage} = mandatoryLearning;
    const {learningData} = this.state;
    const courseInfo = HrAppUtil.parse(learningData);

    const dataLength = courseInfo ? courseInfo.length : 0;
    // console.log("currentPage in render", currentPage);
    // console.log('MandatoryLearning props', mandatoryLearning);
    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={[appStyles.backgroundImageStyle]}>
          <HeaderComponent disableRedirection />
          <View style={styles.parentView}>
            <Swiper 
              ref="swiper"
              key={dataLength}
              extraData={currentPage}
              style={styles.swiperStyle}
              loop={false}
              dot={<View style={styles.dotStyles} />}
              activeDot={<View style={styles.activeDotStyles} />}
              scrollEnabled={false}
              onIndexChanged={(index) => {
                console.log('Swiper onIndexChanged index: ', index);
                this.setState({currIndex: index});
              }}
              //index={mandatoryLearning.currentPage}
            >
              {this.getLearningCourses(mandatoryLearning.currentPage)}
            </Swiper>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

MandatoryLearning.propTypes = {
  updateCurrentCourseAndGoToNext: PropTypes.func.isRequired,
  localStore: PropTypes.shape({
    keyLearningDataCheck,
  }).isRequired,
  mandatoryLearning: PropTypes.shape({
    currentPage: PropTypes.number,
  }).isRequired,
};

export default MandatoryLearning;
