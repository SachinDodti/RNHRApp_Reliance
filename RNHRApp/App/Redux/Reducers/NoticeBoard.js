import { COMMUNICATION_ACTION } from "../Actions/Constants";

const noticeBoardReducer = (
  state = {
    notices: [],
  },
  action,
) => {
  switch (action.type) {
  case COMMUNICATION_ACTION.GET_NOTICE_BOARD_SUCCESS:
    return {
      ...state,
      notices: action.data ? action.data : [],
      error: null,
    };
  case COMMUNICATION_ACTION.GET_NOTICE_BOARD_ERROR:
    return {
      ...state,
      error: action.error,
      notices: [],
    };
  default:
    return { ...state };
  }
};

export default noticeBoardReducer;
