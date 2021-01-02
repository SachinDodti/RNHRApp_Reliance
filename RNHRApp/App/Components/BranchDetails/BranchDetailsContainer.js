import { connect } from 'react-redux';

import BranchDetailsComponent from './BranchDetailsComponent';
import { shareBranchDetails } from '../../Thunk/LocationDirectory-Thunk';


function mapDispatchToProps(dispatch) {
  return {
    shareBranchDetails: shareBranchInfo => dispatch(shareBranchDetails(shareBranchInfo)),
  };
}

export default connect(null, mapDispatchToProps)(BranchDetailsComponent);
