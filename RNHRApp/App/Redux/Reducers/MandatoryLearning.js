import { MANDATORY_LEARNING } from '../Actions/Constants';

const MandatoryLearningReducer = (
  state = {
    mandatoryLearningPending: false,
    mandatoryAppsPending: false,
    currentPage: 0,
  },
  action,
) => {
  switch (action.type) {
  case MANDATORY_LEARNING.UPDATE_LEARNINGS:
    const { response } = action;
    return {
      ...state,
      response,
      currentPage: state.currentPage + 1,
      mandatoryLearningPending: action.mandatoryLearningPending,
      mandatoryAppsPending: action.mandatoryAppsPending,
      lastPage: action.isLastPage || false,
    };
  default:
    return { ...state };
  }
};

export default MandatoryLearningReducer;
