import HrAppUtil from "../Util/HrAppUtil";
import LocationUtil from "../Util/LocationUtil";

export const getCurrentLocationThunk = callbackBackFunction => dispatch => {
  // console.log(">>>>>>>>>>>>>>>>>>>Location data with wait cursor.....");
  LocationUtil.getCurrentPosition(callbackBackFunction, dispatch);
};
