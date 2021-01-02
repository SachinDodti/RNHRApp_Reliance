import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";

const logWebActivity = request => dispatch => {
  invokeApi(dispatch, ApiEndpoints.common.logWebActivity, request)
    .then(result => {
      // console.log("#LOG activity logged successfully");
    })
    .catch(error => {
      // console.log("#LOG error occured while logging activity", error);
    });
};

export default logWebActivity;
