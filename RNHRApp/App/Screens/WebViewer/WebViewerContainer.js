
import { connect } from 'react-redux';

import WebViewer from './WebViewerComponent';


function mapStateToProps(state) {
  return { ...state };
}

// function mapDispatchToProps(dispatch) {
//   return null;
// }

export default connect(mapStateToProps, null)(WebViewer);
