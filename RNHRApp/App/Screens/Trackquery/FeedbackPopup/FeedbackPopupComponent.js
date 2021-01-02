import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-native-popover-view';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './FeedbackStyle';
import queryStyles from "../../Trackquery/Styles";
import { IMG_ICON_HAPPY, IMG_ICON_SAD } from '../../../Assets/images';
// import I18N_CONSTANTS from '../../I18n/LanguageConstants';
// import { getText } from '../../I18n/Lang';


export const FeedbackType = {
    GOOD: IMG_ICON_HAPPY,
    BAD: IMG_ICON_SAD,
};

const FeedbackPopup = (props) => {
    const {
        popOver, onGoodClick, onBadClick
    } = props;

    return (
        <Popover isVisible={popOver} style={[styles.popOver]}>
            <View style={[styles.parentView]}>
                <View style={[styles.header]}>

                    <Text style={[styles.title]}>Your Feedback! Click on Feedback and share now.</Text>
                </View>
                <View style={queryStyles.scrolListView}>
                    <TouchableOpacity style={[styles.btnViewContainer]} onPress={onGoodClick}>
                        <Image
                            style={[styles.feadbackIcon]}
                            source={FeedbackType.GOOD}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnViewContainer]} onPress={onBadClick}>
                        <Image
                            style={[styles.feadbackIcon]}
                            source={FeedbackType.BAD}
                        />
                    </TouchableOpacity>
                </View>


            </View>
        </Popover>
    );
};

// FeedbackPopup.propTypes = {
//     popOver: PropTypes.bool.isRequired,
//     onCancel: PropTypes.func,
//     onOk: PropTypes.func.isRequired,
//     showCancel: PropTypes.bool,
//     cancelLabel: PropTypes.string,
//     okLabel: PropTypes.string,
//     message: PropTypes.string.isRequired,
//     type: PropTypes.string,
//     title: PropTypes.string,
// };

// FeedbackPopup.defaultProps = {
//     onCancel: () => 0,
//     showCancel: true,
//     cancelLabel: getText(I18N_CONSTANTS.COMMON.CANCEL),
//     okLabel: getText(I18N_CONSTANTS.COMMON.PROCEED),
//     type: AlertPopoverType.SUCCESS,
//     title: '',
// };

export default FeedbackPopup;
