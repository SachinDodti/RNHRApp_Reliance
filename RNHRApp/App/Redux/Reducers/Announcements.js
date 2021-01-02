import { ANNOUNCEMENT_ACTIONS } from "../Actions/Constants";

const AnnouncementReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_ACTIONS.GET_ANNOUNCEMENT_SUCCESS:
      if (action.data && action.data.length > 0) {
        for (let i = 0; i < action.data.length; i++) {
          const key = action.data[i].type;
          const val = action.data[i].message;
          state[key] = val;
        }
      }
      // console.log("state in ann reducer", state);
      return { ...state };
    default:
      return { ...state };
  }
};

export default AnnouncementReducer;
