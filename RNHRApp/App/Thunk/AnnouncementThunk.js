import invokeApi from "../Network";
import ApiEndpoints from "../Config/ApiEndpoints";
import fetchAnnouncementSuccess from "../Redux/Actions/AnnouncementAction";
import HrAppUtil from "../Util/HrAppUtil";
import { errorOccured } from "../Redux/Actions/ApplicationStateAction";

const getAllAnnouncements = () => dispatch => {
  HrAppUtil.log("Inside the announcement thunk");
  invokeApi(dispatch, ApiEndpoints.common.getAnnouncements)
    .then(result => {
      const announcementArray = result.data.announcements;
      dispatch(fetchAnnouncementSuccess(announcementArray));
    })
    .catch(error => {
      // console.error(error);
      // dispatch(errorOccured(error, false));
    });
};

export default getAllAnnouncements;
