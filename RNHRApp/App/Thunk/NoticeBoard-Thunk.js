import ApiEndpoints from '../Config/ApiEndpoints';
import invokeApi from '../Network';
import { getNoticeBoradSuccess } from '../Redux/Actions/NoticeBorad-Action';

export const getNoticeBoard = () => (dispatch) => {
  // console.log('get StateCityMaster Thunk');
  //   //API  CALL
  let response = null;
  invokeApi(dispatch, ApiEndpoints.communication.getNotices, null)
    .then((result) => {
      response = result;
      // console.log('Response from the StateCityMaster API', response);
      // check device registration
      dispatch(getNoticeBoradSuccess(response.data.notices));
    }).catch((error) => {
      // console.log('within StateCityMaster fail');
      // console.log(error);
      // dispatch(getAuthenticateFaliure(error));
    });
};
