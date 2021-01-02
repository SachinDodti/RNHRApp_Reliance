import { LocalStorageUtil, STORAGE_KEY } from "../Util/LocalStorage";
import LinkedApplicationUtil from "../Util/LinkedApplicationUtil";
import { errorOccured } from "../Redux/Actions/ApplicationStateAction";
import syncStoreToState from "./LocalStorageThunk";
import MandatLearnEnabUtil from "../Util/MandatoryLearningEnablementUtil";
import ApplicationConfiguration from "../Config/env";
import HrAppUtil from "../Util/HrAppUtil";
import ForcedNotificationEnabUtil from "../Util/ForcedNotificationEnablementUtil"
// import HrAppUtil from '../Util/HrAppUtil';

const mandatoryEnablementUpdate = () => dispatch => {
  // console.log("************** mandatoryEnablementUpdate *****************");
  let localStore = {};
  let bypassEnablement = false;

  LocalStorageUtil.getAll()
    .then(result => {
      localStore = result;
      const loggedInUser = HrAppUtil.parse(
        localStore[STORAGE_KEY.USER.LOGGEDIN_USER]
      );
      const isCandidate = !HrAppUtil.getBooleanValue(
        localStore[STORAGE_KEY.USER_PREFERENCE.IS_EMPLOYEE]
      );
      if (isCandidate && ApplicationConfiguration.bypassCandidateEnablement) {
        bypassEnablement = true;
      }
      return LinkedApplicationUtil.getLatestConfiguration(localStore, dispatch);
    })
    .then(appConfigResult => {
      // appConfig = HrAppUtil.parse(appConfigResult.appConfig);
      // update the local store with latest versiob
      // console.log('>>>>>> ME : appConfigResult : ', appConfigResult);
      localStore[STORAGE_KEY.APPLICATION.APPLICATION_CONFIG] =
        appConfigResult.appConfig;
      localStore[STORAGE_KEY.APPLICATION.APPLICATION_CONFIG_VERSION] =
        appConfigResult.version;
      if (appConfigResult.updateRequired) {
        const multiStore = [];
        multiStore.push([
          STORAGE_KEY.APPLICATION.APPLICATION_CONFIG_VERSION,
          appConfigResult.version
        ]);
        multiStore.push([
          STORAGE_KEY.APPLICATION.APPLICATION_CONFIG,
          appConfigResult.appConfig
        ]);
        return LocalStorageUtil.storeMultiple(multiStore);
      }

      return false;
    })
    .then(() => {
      if (!bypassEnablement) {
        return LinkedApplicationUtil.updateMandatoryAppStatus(localStore);
      }
      return false;
    })
    .then(result => {
      // console.log("::::: Updated mandatory result : ", result);
      if (result && result.dbSyncRequired) {
        return LinkedApplicationUtil.updateCurrentInstallationStatus(
          dispatch,
          result.installationStatus
        );
      }
      return false;
    })
    .then(() => {
      if (!bypassEnablement) {
        return MandatLearnEnabUtil.updateMandatoryLearningStatus(dispatch);
      }
      return false;
    })
    .then(() => { // need ot enable when Forced Notification service deployed
      if (!bypassEnablement) {
        return ForcedNotificationEnabUtil.updateForcedNotificationStatus(dispatch);
      }
      return false;
    })
    .then(() => {
      // console.log('Sync store for linked application ');
      dispatch(syncStoreToState());
      return;
    })
    .catch(error => {
      console.error(error);
      // dispatch(
      //   errorOccured(
      //     `Error: UPDTMANDTLEARNCATCH ${error}`,
      //     false,
      //     "mandatoryEnablementUpdate",
      //   ),
      // );
    });
};

export default mandatoryEnablementUpdate;
