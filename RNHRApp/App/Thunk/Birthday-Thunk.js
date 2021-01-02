import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import {
  getTodayBirthdaySuccess,
  searchBirthdayAnniversarySuccess,
  birthdayWishSuccess,
  resetWishFlag,
  showWishSuccess,
  closeWishTemplateAction,
  resetWishSearchResult,
} from "../Redux/Actions/Wish-Action";
import HrAppUtil from "../Util/HrAppUtil";
import syncStoreToState from "./LocalStorageThunk";

export const closeWishTemplate = () => dispatch => {
  dispatch(closeWishTemplateAction());
};

export const wishShow = (request, employee) => dispatch => {
  // console.log('wishshow request', request);
  let response = null;
  invokeApi(dispatch, ApiEndpoints.birthdayAndAnniversary.wishTemplate, request)
    .then(result => {
      response = result;
      dispatch(
        showWishSuccess(response.data.message, request.wishType, employee),
      );
    })
    .catch(error => {
      dispatch(showWishError("Exception occured"));
    });
};

export const todayBirthday = () => dispatch => {
  // console.log('get TodayBirthday Thunk');
  //   //API  CALL
  let response = null;
  invokeApi(
    dispatch,
    ApiEndpoints.birthdayAndAnniversary.getTodayBirthdays,
    null,
  )
    .then(result => {
      response = result;
      // console.log('Response from the birthdayAndAnniversary API', response);
      // check device registration
      dispatch(getTodayBirthdaySuccess(response.data.birthday));
    })
    .catch(error => {
      // console.log('within birthdayAndAnniversary fail');
      // console.log(error);
      // dispatch(getAuthenticateFaliure(error));
    });
  // Actions.MandatoryLearning();
};

export const birthdaySearch = request => dispatch => {
  // console.log('birthdaySearch', request);
  //   //API  CALL
  let response = null;
  dispatch(resetWishSearchResult());
  invokeApi(
    dispatch,
    ApiEndpoints.birthdayAndAnniversary.searchBirthdayAnniversary,
    request,
  )
    .then(result => {
      response = result;
      // console.log('Response from the search', response);
      // dispatch(searchBirthdayAnniversary(response.data.birthday));
      dispatch(searchBirthdayAnniversarySuccess(response.data.birthday));
    })
    .catch(error => {
      // console.log('within send request fail');
      // console.log(error);
    });
};

export const birthdayWish = request => dispatch => {
  // console.log("birthdayWish", request);
  //   //API  CALL
  let response = null;
  dispatch(resetWishFlag());
  invokeApi(dispatch, ApiEndpoints.birthdayAndAnniversary.wishBirthday, request)
    .then(result => {
      response = result;
      // console.log('Response from the birthdayWish', response);
      // dispatch(searchBirthdayAnniversary(response.data.birthday));

      dispatch(birthdayWishSuccess(response.data.wishTo));
    })
    .then(() => {
      // update wished information
      return HrAppUtil.updateWishedInformation(request.wishTo.sapCode, true);
    })
    .finally(() => {
      dispatch(syncStoreToState());
    });
};

export const resetWish = () => dispatch => {
  dispatch(resetWishFlag());
};
