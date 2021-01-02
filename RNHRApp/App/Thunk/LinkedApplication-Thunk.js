import { STORAGE_KEY, LocalStorageUtil } from "../Util/LocalStorage";
import LinkedApplicationUtil from "../Util/LinkedApplicationUtil";
import syncStoreToState from "./LocalStorageThunk";
import { errorOccured } from "../Redux/Actions/ApplicationStateAction";

const updateLinkedApplicationConfiguration = localStore => dispatch => {
  // console.log(' Update the application configuration option');

  let updateRequired = false;
  LinkedApplicationUtil.getLatestConfiguration(localStore, dispatch)
    .then(result => {
      // console.log(' <<< Latest Version fetched >> ', result);
      updateRequired = result.updateRequired;
      if (updateRequired) {
        const multiStore = [];
        multiStore.push([
          STORAGE_KEY.APPLICATION.APPLICATION_CONFIG_VERSION,
          result.version
        ]);
        multiStore.push([
          STORAGE_KEY.APPLICATION.APPLICATION_CONFIG,
          result.appConfig
        ]);
        return LocalStorageUtil.storeMultiple(multiStore);
      }
      return updateRequired;
    })
    .then(() => {
      if (updateRequired) {
        // console.log('Update store');
        dispatch(syncStoreToState());
      }
    })
    .catch(error => {
      // console.error(error);
      // dispatch(
      //   errorOccured(
      //     `Error: LINKEDAPPCATCH ${error}`,
      //     false,
      //     "updateLinkedApplicationConfiguration",
      //   ),
      // );
    });
};

export const updateLinkedApplicationStatus = localStore => dispatch => {
  // console.log('**************** Inside Linked Application status update thunk *****************',
  // localStore);

  LinkedApplicationUtil.updateMandatoryAppStatus(localStore)
    .then(() => {
      dispatch(syncStoreToState());
    })
    .catch(error => {
      // console.error(error);
      dispatch(errorOccured(error, false, "updateLinkedApplicationStatus"));
    });
};

export const syncLinkedApplicationInstallationStatus = () => () => {
  // console.log('Sync linked application installation status');
};

export default updateLinkedApplicationConfiguration;
