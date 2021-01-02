import {connect} from 'react-redux';
import {compose} from 'recompose';
import MandatoryLearning from './MandatoryLearningsComponent';
import ApplicationHoc from '../../HOC/ApplicationHoc';
import {updateLearning} from '../../Thunk/MandatoryLearningThunk';

function mapStateToProps(state) {
  return {
    ...state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // updateMandatLearningStatus: (request) => dispatch(updateLearningStatus(request)),
    updateCurrentCourseAndGoToNext: (request, isLastPage, swiper) =>
      dispatch(updateLearning(request, isLastPage, swiper)),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ApplicationHoc,
)(MandatoryLearning);
