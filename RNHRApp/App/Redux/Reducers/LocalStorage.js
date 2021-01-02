import { LOCAL_STORAGE_ACTION } from "../Actions/Constants";

const LocalStorageReducer = (state = {}, action) => {
  switch (action.type) {
    case LOCAL_STORAGE_ACTION.SYNC_TO_STATE:
      // console.log('??????? Update State ??????? ', action.storeData);
      for (const key in action.storeData) {
        if (action.storeData.hasOwnProperty(key)) {
          state[key] = action.storeData[key];
        }
      }

      // console.log("Updated state", state);
      return { ...state };

    default:
      return { ...state };
  }
};

export default LocalStorageReducer;
