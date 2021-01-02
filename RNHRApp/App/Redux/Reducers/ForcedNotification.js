import { FORCED_NOTIFICATION } from '../Actions/Constants';

const ForcedNotificationReducer = (
  state = {
    mandatoryForcedNotificationPending: false,
    mandatoryLearningPending: false,
    mandatoryAppsPending: false,
    currentPage: 0,
  },
  action,
) => {
  switch (action.type) {
    case FORCED_NOTIFICATION.UPDATE_FORCED_NOTIFICATION:
      const { response } = action;
      return {
        ...state,
        response,
        currentPage: state.currentPage,
        mandatoryForcedNotificationPending: action.mandatoryForcedNotificationPending,
        mandatoryLearningPending: action.mandatoryLearningPending,
        mandatoryAppsPending: action.mandatoryAppsPending,
        lastPage: action.isLastPage || false,
      };
    default:
      return { ...state };
  }
};

export default ForcedNotificationReducer;
