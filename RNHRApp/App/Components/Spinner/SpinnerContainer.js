
import { connect } from 'react-redux';

import Spinner from './SpinnerComponent';
import { resetError } from '../../Redux/Actions/ApplicationStateAction';


function mapStateToProps(state) {
  return { appState: state.appState };
}

function mapDispatchToProps(dispatch) {
  return {
    clearError: () => dispatch(resetError()),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
