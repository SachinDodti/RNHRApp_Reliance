
import { connect } from 'react-redux';

import ErrorPopover from './ErrorPopoverComponent';
import { reset } from '../../Redux/Actions/ApplicationStateAction';


function mapStateToProps(state) {
  return { appState: state.appState };
}

function mapDispatchToProps(dispatch) {
  return {
    clear: () => dispatch(reset()),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPopover);
