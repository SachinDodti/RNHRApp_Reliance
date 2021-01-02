import React, { Component } from "react";
import { Container, Content, Item, Picker } from "native-base";
import { Divider, ListItem } from "react-native-elements";

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
    Image,
    FlatList,
    BackHandler
} from "react-native";
import DatePicker from 'react-native-datepicker';

import { Actions } from "react-native-router-flux";
import DocumentPicker from "react-native-document-picker";

import PropTypes from "prop-types";
import * as RNFS from "react-native-fs";
import HeaderComponent from "../../../../Components/HeaderComponent";
import NavBarComponent from "../../../../Components/NavBarComponent";
import { IMG_APP_BACKGROUND } from "../../../../Assets/images";
import appStyles from "../../../../appStyles";
import styles from "../../Styles";
// import { STORAGE_KEY } from "../../Util/LocalStorage";
// import HrAppUtil from "../../Util/HrAppUtil";

// import I18N_CONSTANTS from "../../I18n/LanguageConstants";
// import { getText } from "../../I18n/Lang";


import ApplicationConfiguration from "../../../../Config/env";

const colors = require("../../../../Config/config");

class QueryDetailListComponent extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // This is the first method in the activity lifecycle
        // Addding Event Listener for the BackPress 
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        // This is the Last method in the activity lifecycle
        // Removing Event Listener for the BackPress 
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        // Registered function to handle the Back Press
        //Actions[ApplicationConfiguration.scene.TRACK_QUERY]();
        Actions.pop({ refresh: {} });
        // Returning true means we have handled the backpress
        // Returning false means we haven't handled the backpress
        return true;
    }

    shouldComponentUpdate() {
        return true;
    }

    onBackPress = () => {
        //Actions[ApplicationConfiguration.scene.TRACK_QUERY]();
        //Actions.refresh({ key: ApplicationConfiguration.scene.TRACK_QUERY })
        Actions.pop();
    };

    getNavBarProps = () => ({
        includeBack: true,
        includeProfile: true,
        includeNotification: true,
        onBackPress: this.onBackPress,
        includeVersion: true
    });
    // navigateQueryDetail = (item) => { - commented based on requirement

    //     let sceneQueryDetails = {};
    //     sceneQueryDetails = {
    //         ...sceneQueryDetails,
    //         item
    //     };
    //     Actions[ApplicationConfiguration.scene.QUERY_SEARCH_DETAILS]({ sceneQueryDetails });
    // }

    navigateToQueryViewStatus = (item) => {
        let sceneViewQueryProps = {};
        sceneViewQueryProps = {
            ...sceneViewQueryProps,
            queryId: item.id
        };
        Actions[ApplicationConfiguration.scene.VIEW_QUERY_STATUS]({ sceneViewQueryProps });
    }

    FlatListHeader = () => {
        return (
            <View >
                <View style={styles.scrolListView}>
                    <View style={styles.columnL}>
                        <Text style={styles.nameText}>Query No</Text>
                    </View>
                    <View style={styles.columnL}>
                        <Text style={styles.nameText}>Query Date</Text>
                    </View>
                    <View style={styles.columnR}>
                        <Text style={styles.nameText}>Query Type</Text>
                    </View>
                </View>
            </View>
        );
    }

    renderQueryDetailListUI = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => this.navigateToQueryViewStatus(item)}>
                <View >
                    <View style={styles.scrolListView}>
                        <View style={styles.columnL}>
                            <Text style={styles.nameTextUnderLine}>{item.QueryNo}</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.textId}>{item.QueryDate}</Text>
                        </View>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>{item.QueryType}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderQuerySearchListView() {
        const { trackQueryData } = this.props;
        const { trackQueryList } = trackQueryData;
        return (
            <ScrollView
                contentContainerStyle={styles.marginBottom}
                indicatorStyle="white"
            >
                <FlatList
                    data={trackQueryList}
                    ListHeaderComponent={this.FlatListHeader}
                    renderItem={this.renderQueryDetailListUI}
                    // ItemSeparatorComponent={this.renderSeparator}
                    ItemSeparatorComponent={Divider}
                />

            </ScrollView>

        );
    }

    render() {
        const navBarProps = this.getNavBarProps();
        const { trackQueryData } = this.props;
        const { trackQueryList } = trackQueryData;
        return (
            <SafeAreaView style={appStyles.rootView}>
                <ImageBackground
                    source={IMG_APP_BACKGROUND}
                    style={appStyles.backgroundImageStyle}
                >
                    <HeaderComponent />
                    <NavBarComponent {...navBarProps} />
                    <View style={[styles.groupTitle]}>
                        <Text style={[styles.textFormat]}>Track Query</Text>
                    </View>
                    <View style={styles.headingContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.textHeader}>
                                {trackQueryList.length} Record(s) Found
                            </Text>
                        </View>
                    </View>
                    {(trackQueryList && trackQueryList.length > 0) ?
                        <ScrollView style={{ flex: 1 }} indicatorStyle="white">
                            {this.renderQuerySearchListView()}
                        </ScrollView> : null}
                    {(trackQueryList && trackQueryList.length > 0) ?
                        <View style={styles.textBottom}>
                            <Text style={styles.whiteTextStyle}>
                                Note: Click on Query No. for more details.
                            </Text>
                        </View>
                        : null}
                </ImageBackground>
            </SafeAreaView >
        );
    }
}
QueryDetailListComponent.propTypes = {
    auth: PropTypes.shape({ root: PropTypes.string }).isRequired,
    trackQueryData: PropTypes.shape({
        trackQueryList: PropTypes.array,
        queryStatus: PropTypes.array,
        viewQueryStatus: PropTypes.object
    }).isRequired,
};

export default QueryDetailListComponent;

