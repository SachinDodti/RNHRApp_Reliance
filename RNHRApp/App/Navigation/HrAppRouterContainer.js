import { connect } from 'react-redux';
import HrAppRouter from './HrAppRouter';
import syncStoreToState from '../Thunk/LocalStorageThunk';
import { todayBirthday } from '../Thunk/Birthday-Thunk';
import { getStateCityMaster } from '../Thunk/LocationDirectory-Thunk';
import { todayAnniversary } from '../Thunk/Anniversary-Thunk';
import updateLinkedApplicationConfiguration from '../Thunk/LinkedApplication-Thunk';
import mandatoryEnablementUpdate from '../Thunk/MandatoryEnablementThunk';
import { getNoticeBoard } from '../Thunk/NoticeBoard-Thunk';
import { updateHelpInformation, checkDeviceRegistration } from '../Thunk/Authentication-Thunk'
import {
  getRegisterSapInfo,
  getRegisterQueryGroupType
} from "../Thunk/RegisterQueryThunk";;
import { resetOTPFlag } from '../Redux/Actions/ResetPassword-Action';
import { showMessage, notificationReceivedAction } from '../Redux/Actions/ApplicationStateAction';
import getAllAnnouncements from '../Thunk/AnnouncementThunk';
import { getNotification } from '../Thunk/Notification-Thunk';
import { getProductDetails } from "../Thunk/ProductCorner-Thunk";
import { getTrackQuery } from "../Thunk/TrackQueryThunk"

import { getForcedNotification } from '../Thunk/ForcedNotificationThunk'

function mapStateToProps(state) {
  return { ...state };
}
function mapDispatchToProps(dispatch) {
  return {
    setNotificationReceived: (notificationReceived, notificationData) =>
      dispatch(notificationReceivedAction(notificationReceived, notificationData)),
    showMessage: (message, title, type) => dispatch(showMessage(message, title, type)),
    syncStoreToState: () => dispatch(syncStoreToState()),
    todayBirthday: () => {
      dispatch(todayBirthday());
    },
    getStateCityMaster: () => {
      dispatch(getStateCityMaster());
    },
    todayAnniversary: () => {
      dispatch(todayAnniversary());
    },
    updateLinkedApplicationConfiguration: localStore => dispatch(updateLinkedApplicationConfiguration(localStore)),
    enablementCheck: () => dispatch(mandatoryEnablementUpdate()),
    getNoticeBoard: () => {
      dispatch(getNoticeBoard());
    },
    updateHelpInformation: storeObj => dispatch(updateHelpInformation(storeObj)),
    checkDeviceRegistration: () => dispatch(checkDeviceRegistration()),
    resetChangePassword: () => dispatch(resetOTPFlag()),
    announcements: () => dispatch(getAllAnnouncements()),
    getAllNotifications: () => dispatch(getNotification()),
    getRegisterSapData: () => dispatch(getRegisterSapInfo()),
    getRegQueryGroupTypeMaster: () => dispatch(getRegisterQueryGroupType()),
    getProductDetails: () => dispatch(getProductDetails()),
    getTrackQuery: request => dispatch(getTrackQuery(request)),
    getForcedNotification: () => dispatch(getForcedNotification())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HrAppRouter);
