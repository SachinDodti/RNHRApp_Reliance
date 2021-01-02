import React, { Component } from "react";
import {
    View, Text, ImageBackground, SafeAreaView,
    ScrollView, Dimensions, BackHandler, Platform
} from "react-native";
import { Button } from "native-base";
import Swiper from "react-native-swiper";

import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { STORAGE_KEY } from "../../Util/LocalStorage";
import styles from "./Styles";
import appStyles from "../../appStyles";
import { IMG_APP_BACKGROUND } from "../../Assets/images";
import HeaderComponent from "../../Components/HeaderComponent";
import ForcedNotificationPageComponent from "../../Components/ForcedNotificationPage";
import HrAppUtil from "../../Util/HrAppUtil";

import ApplicationConfiguration from "../../Config/env";

const keyForcedNotificationDataCheck = STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_DATA;

class ForcedNotificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forcedNotificationData: "",
        };
    }

    getPendingForcedNotification(props) {
        const { localStore } = props;
        let forcedNotificationData = localStore[keyForcedNotificationDataCheck];
        // update the learning data for only pending one
        const forcedNotificationValue =
            forcedNotificationData ? HrAppUtil.parse(forcedNotificationData) : [];
        let pendingFNData = [];
        console.log(">>>>> PENDING Forced Notification : ", forcedNotificationValue.length)
        if (forcedNotificationValue && forcedNotificationValue.length > 0) {
            pendingFNData = forcedNotificationData;
            return pendingFNData;
        }
        forcedNotificationData = HrAppUtil.stringify(pendingFNData);
        return forcedNotificationData;
    }

    componentDidMount() {
        this.setState({
            forcedNotificationData: this.getPendingForcedNotification(this.props)
        });
        if (Platform.OS === "android") {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        }
    }

    componentWillUnmount() {
        // This is the Last method in the activity lifecycle
        // Removing Event Listener for the BackPress 
        if (Platform.OS === "android") {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        }
    }
    handleBackButtonClick = () => {
        //Actions.pop({ refresh: {} });
        // Returning true means we have handled the backpress
        // Returning false means we haven't handled the backpress
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        nextState.forcedNotificationData = this.getPendingForcedNotification(nextProps);
        //console.log("Next State lastPage ::: ", nextProps.forcedNotification ? nextProps.forcedNotification.lastPage : "");
        return true;
    }

    componentDidUpdate() {
        const { localStore } = this.props;
        const { forcedNotificationData } = this.state;
        const forcedNotificationValue =
            forcedNotificationData ? HrAppUtil.parse(forcedNotificationData) : [];
        const allForcedNotificationCompleted =
            HrAppUtil.getBooleanValue(
                localStore[STORAGE_KEY.FORCED_NOTIFICATION.ALL_MANDATORY_FN_COMPLETED
                ]
            );
        //console.log(" componentDidUpdate forcedNotification", forcedNotification ? forcedNotification.lastPage : "");
        if (forcedNotificationValue.length === 0 && allForcedNotificationCompleted) {
            HrAppUtil.getInitialScene(
                ApplicationConfiguration.scene.DASHBOARD,
                true
            ).then(initialScene => {
                if (initialScene && initialScene != Actions.currentScene) {
                    Actions[initialScene]();
                }
            });
            // HrAppUtil.getInitialScene().then(initialScene => {
            //     if (initialScene && initialScene != Actions.currentScene) {
            //         Actions[initialScene]();
            //     }
            // });
        }
    }

    goToNextForcedNotification = (request) => {
        const { updateCurrentNotificationAndGoToNext } = this.props;
        const { forcedNotificationData } = this.state;
        const notificationInfo = HrAppUtil.parse(forcedNotificationData);

        const currentNotification =
            notificationInfo.length ? notificationInfo[0] : null;
        console.log("goToNextForcedNotification  visited", currentNotification);
        if (currentNotification) {
            const notificationUpdateRequest = request;
            // const tempRequest = {
            //     "comment": "",
            //     "consente": "",
            //     "like_Dislike": "",
            //     "noticeBoardId": "166", //test dummy
            //     "rate": "",
            // }
            const lastPage = notificationInfo.length === 1;
            updateCurrentNotificationAndGoToNext(
                notificationUpdateRequest,
                //tempRequest,
                lastPage,
                this.refs.fnswiper,
                notificationInfo.length
            );
        }
    };

    setButtonStyle = checkBoxFlag =>
        checkBoxFlag ? styles.btnNextEnableStyle : styles.btnNextDisableStyle;

    getForcedNotificationInfo = currentPage => {
        console.log("getForcedNotificationInfo currentPage", currentPage);
        const { forcedNotificationData } = this.state;
        const forcedNotficationDataValue =
            forcedNotificationData !== "" ? HrAppUtil.parse(forcedNotificationData) : [];
        let pendingNotification = [];
        if (forcedNotficationDataValue !== "" && forcedNotficationDataValue.length > 0) {
            pendingNotification = forcedNotficationDataValue;
            console.log(">>>>> PENDING NOTIFICATION2 : ", pendingNotification.length);
            return pendingNotification.map(notification => (
                <ForcedNotificationPageComponent
                    key={notification.AutoId}
                    notification={notification}
                    goToNextForcedNotification={this.goToNextForcedNotification}
                    nextText={(forcedNotficationDataValue.length === 1 ? "Proceed to Homepage" : "Next")}
                />
            ));
        }
        return <View />;
    };

    render() {
        const { forcedNotification } = this.props;
        const { currentPage } = forcedNotification;
        console.log("currentPage in render", currentPage);
        console.log('forcedNotification props', forcedNotification);
        return (
            <SafeAreaView style={appStyles.rootView}>
                <ImageBackground
                    source={IMG_APP_BACKGROUND}
                    style={[appStyles.backgroundImageStyle]}
                >
                    <HeaderComponent disableRedirection />
                    {/* <ScrollView
                        removeClippedSubviews={false}
                        nestedScrollEnabled={true}
                    > */}
                    <View
                        style={styles.parentView}
                    // nestedScrollEnabled={true}
                    >
                        <Swiper
                            ref="fnswiper"
                            style={styles.swiperStyle}
                            loop={false}
                            dot={<View style={styles.dotStyles} />}
                            activeDot={<View style={styles.activeDotStyles} />}
                            scrollEnabled={false}
                        >
                            {this.getForcedNotificationInfo(forcedNotification.currentPage)}
                        </Swiper>
                    </View>
                    {/* </ScrollView> */}
                </ImageBackground>
            </SafeAreaView >
        );
    }
}

ForcedNotificationComponent.propTypes = {
    updateCurrentNotificationAndGoToNext: PropTypes.func.isRequired,
    localStore: PropTypes.shape({
        keyForcedNotificationDataCheck
    }).isRequired,
    forcedNotification: PropTypes.shape({
        currentPage: PropTypes.number
    }).isRequired
};

export default ForcedNotificationComponent;
