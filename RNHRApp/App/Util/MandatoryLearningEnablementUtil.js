import _ from "lodash";
import { LocalStorageUtil, STORAGE_KEY } from "./LocalStorage";
import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network/index";
import HrAppUtil from "./HrAppUtil";

// class MandatLearnEnabUtil {
//   static async updateMandatoryLearningStatus(localStore) {
//     return LocalStorageUtil.store(STORAGE_KEY.MANDATORY_LEARNING.ALL_MANDATORY_LEARNING_COMPLETED, 'false');
//   }
// }

class MandatLearnEnabUtil {
  static async getLearningList(dispatch) {
    return invokeApi(
      dispatch,
      ApiEndpoints.learningEnablement.getLearningList,
      {},
    );
  }

  static async getCurrentLearnings(dispatch) {
    const accessToken = await LocalStorageUtil.get(STORAGE_KEY.USER.AUTH_TOKEN);
    if (!HrAppUtil.isNullOrEmpty(accessToken)) {
      return invokeApi(
        dispatch,
        ApiEndpoints.learningEnablement.getLearningStatus,
        {},
      );
    }
    return {};
  }

  static checkForKeyInObject(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  static checkIfKeyExistsInResponse(response, key) {
    const keyExists = MandatLearnEnabUtil.checkForKeyInObject(response, key);
    return keyExists
      ? {
        length: response[key].mandatoryLearnings.length,
        data: response[key].mandatoryLearnings,
      }
      : 0;
  }

  static async updateMandatoryLearningStatus(dispatch) {
    // get all learnings list
    const allLearnings = await MandatLearnEnabUtil.getLearningList(dispatch);
    const getCurrentLearnings = await MandatLearnEnabUtil.getCurrentLearnings(
      dispatch,
    );
    const allLearningExists = MandatLearnEnabUtil.checkIfKeyExistsInResponse(
      allLearnings,
      "data",
    );
    const currentLearnings = MandatLearnEnabUtil.checkIfKeyExistsInResponse(
      getCurrentLearnings,
      "data",
    );
    if (allLearningExists.length > 0 && currentLearnings.length > 0) {
      // get all learning data
      const allLearningData = allLearningExists.data;
      // get current user's learning data
      const currentLearningData = currentLearnings.data;
      const learningStatus = [];
      // loop all learnings
      allLearningData.forEach(element => {
        const course = element;
        // get currentLearningsData by learningId from all learnings
        let courseDetails = _.filter(
          currentLearningData,
          currentLearning => currentLearning.learningId === element.learningId,
        );
        courseDetails = courseDetails.length > 0 ? courseDetails[0] : null;
        // if found, update the status from currentLearnings
        course.status = courseDetails ? courseDetails.status : null;
        learningStatus.push(course);
      });
      const pendingCourses = _.filter(
        learningStatus,
        learningCourse =>
          !learningCourse.status ||
          learningCourse.status.toUpperCase() !== "COMPLETED",
      );
      const checkPending = pendingCourses.length > 0;
      let learningCompleted = "true";
      if (checkPending) {
        learningCompleted = "false";
      }
      const learningStore = [];
      learningStore.push([
        STORAGE_KEY.MANDATORY_LEARNING.ALL_MANDATORY_LEARNING_COMPLETED,
        learningCompleted,
      ]);
      learningStore.push([
        STORAGE_KEY.MANDATORY_LEARNING.ALL_MANDATORY_DATA,
        JSON.stringify(learningStatus),
      ]);
   
      LocalStorageUtil.storeMultiple(learningStore);

      return learningCompleted;
    }
    return false;
  }
}

export default MandatLearnEnabUtil;
