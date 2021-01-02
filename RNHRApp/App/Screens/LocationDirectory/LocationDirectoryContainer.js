import { connect } from 'react-redux';
import { compose } from 'recompose';
import ApplicationHoc from '../../HOC/ApplicationHoc';

import LocationDirectory from './LocationDirectoryComponent';
import { getBranchDetails } from '../../Thunk/LocationDirectory-Thunk';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    branchDetails: branchReq => dispatch(getBranchDetails(branchReq)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc,
)(LocationDirectory);
