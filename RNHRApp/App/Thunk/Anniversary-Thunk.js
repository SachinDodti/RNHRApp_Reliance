import ApiEndpoints from '../Config/ApiEndpoints';
import invokeApi from '../Network';
import {
  getTodayAnniversarySuccess,
  anniversaryWishSuccess,
  resetWishFlag,
  showWishSuccess,
  closeWishTemplateAction,
} from '../Redux/Actions/Wish-Action';
import HrAppUtil from '../Util/HrAppUtil';
import syncStoreToState from './LocalStorageThunk';

export const closeWishTemplateAnniversary = () => (dispatch) => {
  dispatch(closeWishTemplateAction());
};

export const wishShowAnniversaryTemplate = (request, employee) => (
  dispatch,
) => {
  // console.log('wishshow request', request);
  let response = null;
  invokeApi(dispatch, ApiEndpoints.birthdayAndAnniversary.wishTemplate, request)
    .then((result) => {
      response = result;
      dispatch(
        showWishSuccess(response.data.message, request.wishType, employee),
      );
    })
    .catch((error) => {
      dispatch(showWishError('Exception occured'));
    });
};

export const todayAnniversary = () => (dispatch) => {
  // console.log('get TodayAnniversary Thunk');
  //   //API  CALL
  let response = null;
  invokeApi(
    dispatch,
    ApiEndpoints.birthdayAndAnniversary.getTodayAnniversaries,
    null,
  )
    .then((result) => {
      response = result;
      // console.log('Response from the birthdayAndAnniversary API', response);
      // check device registration
      dispatch(getTodayAnniversarySuccess(response.data.anniversary));
    })
    .catch(() => {});
};

export const anniversaryWish = (request) => (dispatch) => {
  // console.log('anniversaryWish', request);
  //   //API  CALL
  let response = null;
  dispatch(resetWishFlag());
  invokeApi(
    dispatch,
    ApiEndpoints.birthdayAndAnniversary.wishAnniversary,
    request,
  )
    .then((result) => {
      response = result;
      // console.log('Response from the anniversaryWish', response);
      // dispatch(searchBirthdayAnniversary(response.data.birthday));
      dispatch(anniversaryWishSuccess(response.data.wishTo));
    })
    // .catch(error => {
    //   // console.log('within send request fail');
    //   // console.log(error);
    // });
    .then(() => {
      // update wished information
      return HrAppUtil.updateWishedInformation(request.wishTo.sapCode, true);
    })
    .finally(() => {
      dispatch(syncStoreToState());
    });
};

export const resetWish = () => (dispatch) => {
  dispatch(resetWishFlag());
};
