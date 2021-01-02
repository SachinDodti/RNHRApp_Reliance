import { connect } from 'react-redux';

import ReporteeListComponent from './ReporteeListComponent';
import { getReportee } from '../../Thunk/Reportee-Thunk';


function mapDispatchToProps(dispatch) {
  return {
    searchReportee: reporteeReq => dispatch(getReportee(reporteeReq)),
  };
}

export default connect(null, mapDispatchToProps)(ReporteeListComponent);
