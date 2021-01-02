import React, { Component } from "react";
import { Container, Content, Item, Picker } from "native-base";
import { RadioGroup } from "react-native-btr";
import {
    View,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    Platform,
    Alert,
    TouchableOpacity,
    TextInput,
    Linking
} from "react-native";
import ImagePicker from "react-native-image-picker";

import { Actions } from "react-native-router-flux";
import DocumentPicker from "react-native-document-picker";

import PropTypes from "prop-types";
import * as RNFS from "react-native-fs";
// import AlertPopover, {
//     AlertPopoverType
// } from "../../Components/AlertPop/AlertPopoverComponent";
import HeaderComponent from "../../../Components/HeaderComponent";
import NavBarComponent from "../../../Components/NavBarComponent";
import { IMG_APP_BACKGROUND } from "../../../Assets/images";
import appStyles from "../../../appStyles";
import styles from "../Styles";
import FeedbackPopup from "../FeedbackPopup/FeedbackPopupComponent";
// import { STORAGE_KEY } from "../../Util/LocalStorage";
// import HrAppUtil from "../../Util/HrAppUtil";

// import I18N_CONSTANTS from "../../I18n/LanguageConstants";
// import { getText } from "../../I18n/Lang";

const colors = require("../../../Config/config");


import HrAppUtil from "../../../Util/HrAppUtil";

class ViewQueryStatusComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFeebackPopup: false,
        }
    }

    componentDidMount() {
        const { sceneViewQueryProps, viewQueryStatus } = this.props;
        const { queryId } = sceneViewQueryProps;
        //test purpose
        viewQueryStatus({
            queryId: queryId
        });
    }

    // shouldComponentUpdate(nextProps, nextState) {

    //     return true;
    // }

    componentDidUpdate() {

    }

    onBackPress = () => {
        const { openPdff } = this.state;
        if (openPdff) {
            this.setState({ openPdff: false });
        } else {
            Actions.pop();
        }
    };

    getNavBarProps = () => ({
        includeBack: true,
        includeProfile: true,
        includeNotification: true,
        onBackPress: this.onBackPress,
        includeVersion: true
    });

    onFeedbackClick = () => {
        this.setState({ showFeebackPopup: true })
    }
    onFeedbackSubmitGoodClick = () => {
        const { submitTrackQueryFeedback } = this.props
        const { sceneViewQueryProps, viewQueryStatus } = this.props;
        const { queryId } = sceneViewQueryProps;
        const submitFeedBackRequest = {
            queryId: queryId,
            feedback: "GOOD",
            remarks: "test"
        }
        this.setState({ showFeebackPopup: false });
        submitTrackQueryFeedback(submitFeedBackRequest);
    }

    onFeedbackSubmitBadClick = () => {
        const { submitTrackQueryFeedback } = this.props
        const { sceneViewQueryProps, viewQueryStatus } = this.props;
        const { queryId } = sceneViewQueryProps;
        const submitFeedBackRequest = {
            queryId: queryId,
            feedback: "BAD",
            remarks: "test"
        }
        this.setState({ showFeebackPopup: false });
        submitTrackQueryFeedback(submitFeedBackRequest);
    }

    getFileExtension = (filename) => {
        return (filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2));
    }

    openPdf = val => {
        const link = val;
        this.setState({ openPdff: true });
        this.setState({ pdfLink: link.link });
        this.setState({ type: link.type });
        this.setState({ name: link.name })
        // <NoticeBoardPdfView />;
        // console.log("item", val);
        // console.log("item", this.state.pdfLink);
        // console.log("item", this.state.type);
    };
    onQueryAttachmentViewClick = (httpLink) => {
        Linking.openURL(httpLink);
    }


    //Response to your feeback list
    renderResponseFeebackList(viewQueryStatus) {
        const { QueryEscalation } = viewQueryStatus;
        let queryResponseFB = [];
        for (let i = 0; i < QueryEscalation.length; i++) {
            queryResponseFB.push(this.renderResponseFeebackUI(QueryEscalation[i]));
        }
        return (
            (queryResponseFB && queryResponseFB.length > 0) ?
                <View style={{ flex: 1 }} >
                    <View style={styles.headingContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.textHeader}>
                                Response to Feedback
                            </Text>
                        </View>
                    </View>
                    {queryResponseFB}
                </View> : null
        )

    }
    //Response to your feeback UI
    renderResponseFeebackUI(responseFeedbackData) {
        return (
            < View styles={{ flex: 1 }}>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Response to your feedback</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{responseFeedbackData.ReplytoFeedback}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Attachment</Text>
                    </View>
                    <View style={styles.columnR}>
                        <TouchableOpacity onPress={() => this.onQueryAttachmentViewClick(responseFeedbackData.Attachment)}>
                            <Text style={styles.nameTextUnderLine}>{responseFeedbackData.FileName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Response Date</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{responseFeedbackData.Responsedate}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Response By</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{responseFeedbackData.Responseby}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Escalation</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{responseFeedbackData.Escalationstatus}</Text>
                    </View>
                </View>
                <View style={[styles.groupTitle]}>
                </View>
            </View >
        );


    }
    // Feedback list
    renderYourFeedbackList(viewQueryStatus) {
        const { QueryFeedback } = viewQueryStatus;
        // const QueryFeedback = [
        //     {
        //         "QueryNo": "",
        //         "TicketNo": "",
        //         "Feedback": "SATISFIED",
        //         "Remark": "NA",
        //         "ContactNo": "9989898989",
        //         "Freezdate": "4/29/2016 3:26: PM"
        //     }
        // ]
        let queryFeedBackUI = [];
        for (let i = 0; i < QueryFeedback.length; i++) {
            queryFeedBackUI.push(this.rendererYourFeedbackUI(QueryFeedback[i]));
        }
        return (
            (queryFeedBackUI && queryFeedBackUI.length > 0) ?
                <View style={{ flex: 1 }} >
                    <View style={styles.headingContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.textHeader}>
                                FeedBack
                            </Text>
                        </View>
                    </View>
                    {queryFeedBackUI}
                </View> : null
        );
    }
    // Feeback UI
    rendererYourFeedbackUI(feedbackData) {
        return (
            < View styles={{ flex: 1 }}>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Your FeedBack</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{feedbackData.Feedback}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Remark</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{feedbackData.Remark}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>FeedBack given date</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{feedbackData.Freezdate}</Text>
                    </View>
                </View>
                <View style={[styles.groupTitle]}>
                </View>
            </View >
        );

    }



    renderViewQueryActions(viewQueryStatus) {
        const { QueryActionTaken } = viewQueryStatus;
        let queryActionsUI = [];
        for (let i = 0; i < QueryActionTaken.length; i++) {
            queryActionsUI.push(this.rendeViewQueryActionUI(QueryActionTaken[i]));
        }
        return (
            <ScrollView
                contentContainerStyle={styles.marginBottom}
                indicatorStyle="white"
            >
                {(queryActionsUI && queryActionsUI.length > 0) ? queryActionsUI : null}
                {this.renderYourFeedbackList(viewQueryStatus)}
                {this.renderResponseFeebackList(viewQueryStatus)}
                {viewQueryStatus.ShowFeedback === "true" ?
                    < View style={styles.columnL}>
                        <Text style={styles.whiteTextStyle}>To share your experience on Employee Helpdesk, please click on the feedback tab below</Text>
                    </View> : null}
                <View style={styles.actionButton}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={this.onBackPress}
                    >
                        <Text style={styles.resetPasswordtext}>Back</Text>
                    </TouchableOpacity>
                </View>
                {
                    viewQueryStatus.ShowFeedback === "true" ? (<View style={styles.actionButton}>
                        <TouchableOpacity
                            style={styles.btnStyle}
                            onPress={this.onFeedbackClick}
                        >
                            <Text style={styles.resetPasswordtext}>FeedBack</Text>
                        </TouchableOpacity>
                    </View>) : null
                }
            </ScrollView >
        );
    }



    rendeViewQueryActionUI(actionTakenData) {

        return (

            <View styles={{ flex: 1 }}>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Action Taken</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{actionTakenData.ActionTaken}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Attachment</Text>
                    </View>
                    <View style={styles.columnR}>
                        <TouchableOpacity onPress={() => this.onQueryAttachmentViewClick(actionTakenData.Attachment)}>
                            <Text style={styles.nameTextUnderLine}>{actionTakenData.FileName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Query Group</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{actionTakenData.QueryGroup}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Query Type</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{actionTakenData.QueryType}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Action Date</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{actionTakenData.ActionDate}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Action By</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{actionTakenData.ActionBy}</Text>
                    </View>
                </View>
                <View style={styles.listView}>
                    <View style={styles.columnL}>
                        <Text style={styles.textId}>Action Status</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>{actionTakenData.actionStatus}</Text>
                    </View>
                </View>
                <View style={[styles.groupTitle]}>
                </View>

                {/* <View style={styles.columnL}>
                        <Text style={styles.whiteTextStyle}>To share your experience on Employee Helpdesk, please click on the feedback tab below</Text>
                    </View>
                    <View style={styles.columnL}>
                        <TouchableOpacity
                            style={styles.btnStyle}
                        >
                            <Text style={styles.resetPasswordtext}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.columnR}>
                        <TouchableOpacity
                            style={styles.btnStyle}
                            onPress={this.onFeedbackClick}
                        >
                            <Text style={styles.resetPasswordtext}>FeedBack</Text>
                        </TouchableOpacity>
                    </View> */}


            </View >


        );


    }

    renderTrackQueryUI() {
        const { trackQueryData } = this.props;
        const { viewQueryStatus } = trackQueryData;
        const { QueryActionTaken } = viewQueryStatus;
        // if (viewQueryStatus.QueryActionTaken && viewQueryStatus.QueryActionTaken.length > 0) {
        //     showActionView = true;
        // }

        let noActionMsg = (QueryActionTaken && QueryActionTaken.length > 0) ? "" : " - No Action Taken";
        return (
            <ScrollView
                contentContainerStyle={styles.marginBottom}
                indicatorStyle="white"
            >
                <View styles={{ flex: 1 }}>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query No</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryNo}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Date</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryDate}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query By</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryBy}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query For</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryFor}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Other SAP Code</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryOtherSapId}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Zone</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.Zone}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Location</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.Location}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Group</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryGroup}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Type</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryType}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Status</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryStatus}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Close Date</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryClosedDate}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Closed By</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryClosedBy}</Text>
                        </View>
                    </View>

                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Description</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{viewQueryStatus.QueryDesc}</Text>
                        </View>
                    </View>

                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Attachment</Text>
                        </View>
                        <View style={styles.columnR}>
                            <TouchableOpacity onPress={() => this.onQueryAttachmentViewClick(viewQueryStatus.Attachment)}>
                                <Text style={styles.nameTextUnderLine}>{viewQueryStatus.FileName}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={styles.headingContainer}>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>
                                    Action {noActionMsg}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {this.renderViewQueryActions(viewQueryStatus)}
                </View>

            </ScrollView >
        );


    }
    render() {
        const navBarProps = this.getNavBarProps();
        const { showFeebackPopup } = this.state;
        const { trackQueryData } = this.props;
        const { viewQueryStatus } = trackQueryData;
        let showViewQueryStatus = false;
        if (!HrAppUtil.isEmptyObject(viewQueryStatus)) {
            showViewQueryStatus = true;
        }
        return (
            <SafeAreaView style={appStyles.rootView}>
                <ImageBackground
                    source={IMG_APP_BACKGROUND}
                    style={appStyles.backgroundImageStyle}
                >
                    <HeaderComponent />
                    <NavBarComponent {...navBarProps} />
                    {showViewQueryStatus ?
                        (<ScrollView
                            contentContainerStyle={styles.scrollViewParent}
                            indicatorStyle="white"
                        >
                            <View style={{ flex: 1 }}>
                                <View style={styles.headingContainer}>
                                    <View style={styles.textView}>
                                        <Text style={styles.textHeader}>
                                            Query Status
                            </Text>
                                    </View>
                                </View>
                                {this.renderTrackQueryUI()}
                            </View>
                        </ScrollView>) : (<View style={styles.headingContainer}>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>
                                    Please wait..
                            </Text>
                            </View>
                        </View>)
                    }
                    <FeedbackPopup 
                        popOver={showFeebackPopup}
                        onBadClick={this.onFeedbackSubmitBadClick}
                        onGoodClick={this.onFeedbackSubmitGoodClick}
                    />
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

ViewQueryStatusComponent.propTypes = {
    auth: PropTypes.shape({ root: PropTypes.string }).isRequired,
    //trackQueryData: PropTypes.objectOf(PropTypes.object).isRequired,
    trackQueryData: PropTypes.shape({
        trackQueryList: PropTypes.array,
        queryStatus: PropTypes.array,
        viewQueryStatus: PropTypes.object
    }).isRequired,
    viewQueryStatus: PropTypes.func.isRequired,
    submitTrackQueryFeedback: PropTypes.func.isRequired
};

export default ViewQueryStatusComponent;

