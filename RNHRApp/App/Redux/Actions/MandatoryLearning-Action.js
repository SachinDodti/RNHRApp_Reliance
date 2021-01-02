import { MANDATORY_LEARNING } from './Constants';

export default function goToNextCourse(response, isLastPage) {
  // console.log('incrase loading count');
  return {
    type: MANDATORY_LEARNING.UPDATE_LEARNINGS,
    isLastPage,
    response,
  };
}
