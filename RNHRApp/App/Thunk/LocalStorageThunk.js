import { LocalStorageUtil } from '../Util/LocalStorage';
import syncWithStoreAction from '../Redux/Actions/LocalStorage-Action';

const syncStoreToState = () => (dispatch) => {
  // console.log('************** Syncing Store to State *****************');
  LocalStorageUtil.getAll()
    .then((result) => {
      dispatch(syncWithStoreAction(result));
    });
};

export default syncStoreToState;
