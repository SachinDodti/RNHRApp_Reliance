import { MANDATORY_ENABLEMENT } from './Constants';

export function initiateLoding(mandatoryLearningPending, mandatoryAppsPending) {
  // console.log('incrase loading count');
  return {
    type: MANDATORY_ENABLEMENT.CHECK_MANDATORY_ENABLEMENT,
    mandatoryLearningPending,
    mandatoryAppsPending,
  };
}
