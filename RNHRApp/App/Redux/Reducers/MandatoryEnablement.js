import { MANDATORY_ENABLEMENT } from '../Actions/Constants';


const MandatoryEnablementReducer = (state = {
  mandatoryForcedNotificationPending: false, mandatoryLearningPending: false, mandatoryAppsPending: false,
}, action) => {
  switch (action.type) {
    case MANDATORY_ENABLEMENT.CHECK_MANDATORY_ENABLEMENT:
      return {
        ...state,
        mandatoryForcedNotificationPending: action.mandatoryForcedNotificationPending,
        mandatoryLearningPending: action.mandatoryLearningPending,
        mandatoryAppsPending: action.mandatoryAppsPending,
      };
    default:
      return { ...state };
  }
};

export default MandatoryEnablementReducer;
