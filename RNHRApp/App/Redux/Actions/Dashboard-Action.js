import { ATTENDANCE_ACTIONS } from './Constants';

export default function getAttendanceAction() {
  return {
    type: ATTENDANCE_ACTIONS.GET_ATTENDANCE_VIEW,
  };
}
