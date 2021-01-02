import { connect } from 'react-redux';
import { compose } from 'recompose';
import ApplicationHoc from '../../HOC/ApplicationHoc';
import Reportee from './ReporteeComponent';
import { getReportee } from '../../Thunk/Reportee-Thunk';


function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    searchReportee: reporteeReq => dispatch(getReportee(reporteeReq)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc,
)(Reportee);
