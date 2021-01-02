import { ANNOUNCEMENT_ACTIONS } from "./Constants";

export default function fetchAnnouncementSuccess(announcements) {
  return {
    type: ANNOUNCEMENT_ACTIONS.GET_ANNOUNCEMENT_SUCCESS,
    data: announcements,
  };
}
