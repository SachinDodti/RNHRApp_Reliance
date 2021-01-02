import { connect } from 'react-redux';
import { compose } from 'recompose';
import ApplicationHoc from '../../HOC/ApplicationHoc';

import MandatoryAppEnablement from './MandatoryAppEnablementComponent';


function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc,
)(MandatoryAppEnablement);
