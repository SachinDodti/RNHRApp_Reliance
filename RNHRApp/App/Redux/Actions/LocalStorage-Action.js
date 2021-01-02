import { LOCAL_STORAGE_ACTION } from './Constants';


export default function syncWithStoreAction(storeData) {
  return {
    type: LOCAL_STORAGE_ACTION.SYNC_TO_STATE,
    storeData,
  };
}
