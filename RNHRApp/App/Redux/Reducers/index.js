import { combineReducers } from "redux";
import AuthenticationReducer from "./Authentication";
import AttendanceReducer from "./Attendance";
import LocalStorageReducer from "./LocalStorage";
import WishReduce from "./Wish";
import ReporteeRuducer from "./Reportee";
import AppStateReducer from "./AppState";
import MandatoryEnablementReducer from "./MandatoryEnablement";
import MandatoryLearningReducer from "./MandatoryLearning";
import locationDirectoryReducer from "./LocationDirectory";
import noticeBoardReducer from "./NoticeBoard";
import resetPasswordReducer from "./ResetPassword";
import AnnouncementReducer from "./Announcements";
import notificationReducer from "./Notification";
import RegisterQueryReducer from "./RegisterQuery";
import OdRuleEngineReducer from "./ODRuleEngine"
import TrackQueryReducer from "./TrackQuery";
import ProductCornerReducer from "./ProductCorner";
import ForcedNotificationReducer from "./ForcedNotification"

const appReducer = combineReducers({
  auth: AuthenticationReducer,
  attendance: AttendanceReducer,
  localStore: LocalStorageReducer,
  wishes: WishReduce,
  reportee: ReporteeRuducer,
  appState: AppStateReducer,
  mandatoryEnablement: MandatoryEnablementReducer,
  mandatoryLearning: MandatoryLearningReducer,
  locationDirectory: locationDirectoryReducer,
  noticeBoard: noticeBoardReducer,
  resetPassword: resetPasswordReducer,
  announcements: AnnouncementReducer,
  notification: notificationReducer,
  registerQueryData: RegisterQueryReducer,
  trackQueryData: TrackQueryReducer,
  productCornerData: ProductCornerReducer,
  forcedNotification: ForcedNotificationReducer,
  odRuleEngine:OdRuleEngineReducer
});

export default appReducer;
