import { connect } from 'react-redux';
import { compose } from 'recompose';
import ForcedNotification from './ForcedNotificationComponent';
import ApplicationHoc from '../../HOC/ApplicationHoc';
import { updateForcedNotification, getForcedNotification } from '../../Thunk/ForcedNotificationThunk'
// import updateLearningStatus from
function mapStateToProps(state) {
    return {
        ...state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // updateCurrentNotificationAndGoToNext: (request, isLastPage, swiper) =>
        //     dispatch(updateForcedNotification(request, isLastPage, swiper)),
        updateCurrentNotificationAndGoToNext: (request, isLastPage, swiper, dataLength) => //test revert later
            dispatch(updateForcedNotification(request, isLastPage, swiper, dataLength))
    }
};


export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    ApplicationHoc,
)(ForcedNotification);
