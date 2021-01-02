import { COMMUNICATION_ACTION } from './Constants';

export function getNoticeBoradSuccess(data) {
  return {
    type: COMMUNICATION_ACTION.GET_NOTICE_BOARD_SUCCESS,
    data,
  };
}

export function getNoticeBoardError(error) {
  return {
    type: COMMUNICATION_ACTION.GET_NOTICE_BOARD_ERROR,
    error,
  };
}
