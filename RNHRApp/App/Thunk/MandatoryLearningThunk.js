import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import { errorOccured } from "../Redux/Actions/ApplicationStateAction";
import syncStoreToState from "./LocalStorageThunk";
import invokeApi from "../Network";
import ApiEndpoints from "../Config/ApiEndpoints";
import goToNextCourse from "../Redux/Actions/MandatoryLearning-Action";
import MandatLearnEnabUtil from "../Util/MandatoryLearningEnablementUtil";

export const updateLearning = (request, isLastPage, swiper) => dispatch => {
  let currentResponse = null;
  invokeApi(
    dispatch,
    ApiEndpoints.learningEnablement.updateLearningStatus,
    request
  )
    .then(successResponse => {
      currentResponse = successResponse;
      // console.log("currentResponse", currentResponse);
      return MandatLearnEnabUtil.updateMandatoryLearningStatus(dispatch);
    })
    .then(() => {
      dispatch(goToNextCourse(currentResponse, isLastPage));
      swiper.scrollBy(1);
    })
    .catch(error => {
      // console.log("within currentResponse fail");
    });
  /*

  */
};
