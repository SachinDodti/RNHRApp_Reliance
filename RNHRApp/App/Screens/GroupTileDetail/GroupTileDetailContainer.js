
import { connect } from 'react-redux';

import GroupTileDetail from './GroupTileDetailComponent';


function mapStateToProps(state) {
  return { ...state };
}

// function mapDispatchToProps(dispatch) {
//   return null;
// }

export default connect(mapStateToProps, null)(GroupTileDetail);
