import ApiEndpoints from "../Config/ApiEndpoints";
import invokeApi from "../Network";
import {
  getSelfDetailsSuccess,
  resetReporteeList,
} from "../Redux/Actions/Reportee-Action";

export const getReportee = request => dispatch => {
  // console.log('getReporteeRequest', request);
  //   //API  CALL
  let response = null;
  dispatch(resetReporteeList());
  invokeApi(dispatch, ApiEndpoints.attendance.employeeSearch, request)
    .then(result => {
      response = result;
      // console.log('Response from getReportee', response);
      dispatch(getSelfDetailsSuccess(response.data.reporteeList, request));
      // console.log('Response after dispatch', response.data.reporteeListResponseBean.Response.ReporteeInformation);
      // console.log('Response from getReportee', response);
    })
    .catch(error => {
      // console.log('within send request fail');
      // console.log(error);
    });
};
