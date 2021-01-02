import { FORCED_NOTIFICATION } from './Constants';

export default function goToNextForcedNotification(response, isLastPage) {
  // console.log('incrase loading count');
  return {
    type: FORCED_NOTIFICATION.UPDATE_FORCED_NOTIFICATION,
    isLastPage,
    response,
  };
}
