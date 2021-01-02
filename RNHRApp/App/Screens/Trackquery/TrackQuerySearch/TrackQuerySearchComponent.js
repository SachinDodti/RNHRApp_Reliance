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
    Image

} from "react-native";

//import all the components we are going to use.
import DatePicker from 'react-native-datepicker';
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";

import HeaderComponent from "../../../Components/HeaderComponent";
import NavBarComponent from "../../../Components/NavBarComponent";
import { IMG_APP_BACKGROUND, IMG_ICON_CALENDAR } from "../../../Assets/images";
import appStyles from "../../../appStyles";
import styles from "../Styles";
//import { STORAGE_KEY } from "../../Util/LocalStorage";
import HrAppUtil from "../../../Util/HrAppUtil";

import I18N_CONSTANTS from "../../../I18n/LanguageConstants";
import { getText } from "../../../I18n/Lang";

import ApplicationConfiguration from "../../../Config/env";

const colors = require("../../../Config/config");


class TrackQuerySearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radioQueryByData: [
                {
                    label: "Other SAP Code",
                    value: "SAPCode",
                    checked: true,
                    color: "#F44336",
                    disabled: false,
                    flexDirection: "row",
                    size: 11
                },

                {
                    label: "Name",
                    value: "Name",
                    checked: false,
                    color: "#FF8F00",
                    disabled: false,
                    flexDirection: "row",
                    size: 11
                }
            ],
            queryGroupIndex: -1,
            queryGroupName: undefined,
            queryGroupId: undefined,
            queryType: undefined,
            queryTypeId: undefined,
            isVisible: false,
            selQueryBy: "",
            enteredSapCode: "",
            queryStatusIndex: -1,
            queryNoIndex: -1,
            queryNo: undefined,
            tqDateFrm: undefined,
            tqDateTo: undefined,
            searchNameorSapId: undefined,
            queryStatusId: undefined,
            isSearchOptionsSelected: false
        }
        this.onChangeQueryGroup = this.onChangeQueryGroup.bind(this);
        this.onChangeQueryType = this.onChangeQueryType.bind(this);
        this.onChangeQueryStatus = this.onChangeQueryStatus.bind(this);

    }

    async componentDidMount() {
        const { getTrackQuery, getQueryStatus } = this.props;

        console.log("TrackQuerySearchComponen - componentDidMount ");
        await getQueryStatus();
    }

    async invokeGetTrackQueryWithEmptyRequest() {
        const { getTrackQuery } = this.props;
        const request = {
            "fromDate": "",
            "toDate": "",
            "otherSapIdName": "",
            "queryNo": "",
            "queryStatusId": "",
            "queryGroupId": "",
            "queryTypeId": ""
        }
        await getTrackQuery(request);
    }

    autoPopulateDataOnQueryNoSelection = (index) => {
        const { trackQueryData } = this.props;
        const { trackQueryList } = trackQueryData;
        const { radioQueryByData } = this.state;
        if (trackQueryList && trackQueryList.length > 0 && index > -1) {
            let queryStatusValue = trackQueryList[index].QueryStatus;
            let qsIndex = this.findQueryStatusIndex(queryStatusValue);
            let qgIndex = this.findQueryGroupIndex(trackQueryList[index].QueryGroup);
            let qgtIndex = this.findQueryGroupTypeIndex(qgIndex, trackQueryList[index].QueryType)
            this.onChangeQueryStatus(qsIndex)
            this.onChangeQueryGroup(qgIndex);
            this.onChangeQueryType(qgtIndex);
            //if (trackQueryList[index].Query_For === "Other") {
            const selectedRadio = radioQueryByData.find(e => e.checked === true);
            let setOtherQueryData = (selectedRadio === "Name") ?
                trackQueryList[index].Otherusername : trackQueryList[index].OtherSapID;
            this.setState({ selQueryBy: selectedRadio.value, searchNameorSapId: setOtherQueryData })
            //}
        } else {
            this.onResetSearchPress()
        }
    }

    findQueryStatusIndex = (status) => {
        const { trackQueryData } = this.props;
        const { queryStatus } = trackQueryData;
        let index = queryStatus.findIndex(obj => obj.call_status_description === status);
        return index;
    }
    findQueryGroupIndex = (input) => {
        const { registerQueryData } = this.props;
        const { queryGroup } = registerQueryData;
        let index = queryGroup.findIndex(obj => obj.queryGroupDescription === input);
        return index;
    }
    findQueryGroupTypeIndex = (qgIndex, input) => {
        const { registerQueryData } = this.props;
        const { queryGroup } = registerQueryData;
        const queryTypeData = queryGroup[qgIndex].queryTypeData;
        let index = queryTypeData.findIndex(obj => obj.queryTypeDescription === input);
        return index;
    }

    searchTrackQuery = () => {
        const { getTrackQuery } = this.props;
        const {
            queryGroupId,
            queryTypeId,
            tqDateFrm,
            tqDateTo,
            searchNameorSapId,
            queryStatusId,
            queryNo,
        } = this.state;

        // let isSearchRequest = false;
        // if (!HrAppUtil.isNullOrEmpty(tqDateFrm) ||
        //     !HrAppUtil.isNullOrEmpty(tqDateTo) ||
        //     !HrAppUtil.isNullOrEmpty(searchNameorSapId) ||
        //     !HrAppUtil.isNullOrEmpty(queryNo) ||
        //     !HrAppUtil.isNullOrEmpty(queryStatusId) ||
        //     !HrAppUtil.isNullOrEmpty(queryGroupId) ||
        //     !HrAppUtil.isNullOrEmpty(queryTypeId)) {
        //     isSearchRequest = true;
        // }

        //if (isSearchRequest) {
        const trackQuerySearchRequest = {
            "fromDate": tqDateFrm !== undefined ? tqDateFrm : "",
            "toDate": tqDateTo !== undefined ? tqDateTo : "",
            "otherSapIdName": searchNameorSapId !== undefined ? searchNameorSapId : "",
            "queryNo": (queryNo !== undefined ? queryNo : ""),
            "queryStatusId": queryStatusId !== undefined ? queryStatusId : "",
            "queryGroupId": queryGroupId !== undefined ? queryGroupId : "",
            "queryTypeId": queryTypeId !== undefined ? queryTypeId : ""
        };
        getTrackQuery(trackQuerySearchRequest);
        this.setState({ isSearchOptionsSelected: true });
        //     } else {
        //     Actions[ApplicationConfiguration.scene.QUERY_DETAIL_LIST]();
        // }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("TrackQuerySearchComponen - shouldComponentUpdate ", nextState);
        if (Platform.OS === "ios") {
            if (this.state.queryNo && nextState.queryNo && (this.state.queryNo === nextState.queryNo)) {
                this.onResetSearchPress();
            }
        }
        return true;
    }

    componentDidUpdate() {
        const { isSearchOptionsSelected } = this.state;
        console.log("TrackQuerySearchComponen - componentDidUpdate ");
        if (isSearchOptionsSelected) {
            Actions[ApplicationConfiguration.scene.QUERY_DETAIL_LIST]();
            this.setState({ isSearchOptionsSelected: false })
        }
    }

    onBackPress = () => {
        Actions.pop();
    };

    getNavBarProps = () => ({
        includeBack: true,
        includeProfile: true,
        includeNotification: true,
        onBackPress: this.onBackPress,
        includeVersion: true
    });
    onSearchQueryPress = () => {
        this.searchTrackQuery();
    }

    onResetSearchPress = () => {

        this.setState({
            // clear the data
            queryGroupIndex: -1,
            queryGroupName: undefined,
            queryGroupId: undefined,
            queryType: undefined,
            queryTypeId: undefined,
            isVisible: false,
            selQueryBy: undefined,
            searchNameorSapId: "",
            queryStatusIndex: -1,
            queryStatusId: undefined,
            tqDateFrm: undefined,
            tqDateTo: undefined,
            queryNoIndex: -1,
            queryNo: undefined,
            isSearchOptionsSelected: false,
        });
    }

    onChangeQueryStatus(value) {
        const { trackQueryData } = this.props;
        const { queryStatus } = trackQueryData;
        //if (value > -1) {
        this.setState({
            queryStatusIndex: value,
            queryStatusId: (value > -1) ? queryStatus[value].call_status_code : undefined
        });
        //}
    }

    onChangeQueryId(value) {
        const { trackQueryData } = this.props;
        const { trackQueryList } = trackQueryData;
        //if (value > -1) {
        this.setState({
            queryNoIndex: value,
            queryNo: (value > -1) ? trackQueryList[value].QueryNo : undefined
        });
        this.autoPopulateDataOnQueryNoSelection(value);
        //}
    }

    onChangeQueryGroup(value) {
        const { registerQueryData } = this.props;
        const { queryGroup } = registerQueryData;
        // console.log("Selected query group index : ", value);
        //if (value > -1) {
        this.setState({
            queryGroupIndex: value,
            queryGroupId: (value > -1) ? queryGroup[value].queryGroupId : undefined,
            queryType: undefined,
            queryTypeId: undefined,
            isVisible: false,
        });
        //}
    }

    onChangeQueryType(value) {
        // console.log('test Onchange query type', Platform.OS, value);
        const { queryGroupIndex, queryGroupName } = this.state;
        //if (queryGroupIndex > -1 && value > -1) {
        const { registerQueryData } = this.props;
        const { queryGroup } = registerQueryData;
        const qGroup = queryGroupIndex > -1 ? queryGroup[queryGroupIndex] : undefined;
        const qType = qGroup ? qGroup.queryTypeData[value] : {};
        console.log(
            "Query Group Name : ",
            queryGroupName,
        );
        this.setState({
            queryType: value,
            queryTypeId: (queryGroupIndex > -1 && value > -1 && qType !== undefined) ? qType.queryTypeId : undefined,
            isVisible: true,
        });
        //}
    }

    getCurrentDate = () => {
        const date = new Date().getDate(); // Current Date
        const month = new Date().getMonth() + 1; // Current Month
        const year = new Date().getFullYear(); // Current Year
        const hours = new Date().getHours(); // Current Hours
        const min = new Date().getMinutes(); // Current Minutes
        const sec = new Date().getSeconds(); // Current Seconds
        const todayDateFormat = `${year}-${month}-${date} ${hours}:${min}:${sec}`;

        const currentDate = HrAppUtil.getDateString(
            HrAppUtil.getDate(
                todayDateFormat,
                ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT,
            ), "YYYY-MM-DD");
        return currentDate;

    }

    checkDateValidation(startDate, endDate) {
        // check the dates
        if ((new Date(startDate) > new Date(endDate)) || (new Date(endDate) < new Date(startDate))) {
            // set date error validation true 
            return true;
        } else {
            // null or false date error validation 
            return false;
        }
    }

    renderTrackQueryUI() {
        const {
            isVisible,
            queryGroupIndex,
            queryType,
            radioQueryByData,
            queryStatusIndex,
            queryNoIndex,
            tqDateFrm,
            tqDateTo,
            selQueryBy,
            searchNameorSapId
        } = this.state;
        const compStyle = [
            styles.buttonViewL,
        ];
        const { registerQueryData, trackQueryData, showMessage } = this.props;
        // console.log(
        //   "Register query index.js registerQueryData : ",
        //   registerQueryData
        // );
        const { queryGroup } = registerQueryData;
        const { queryStatus, trackQueryList } = trackQueryData;
        const array =queryGroupIndex > -1 ? queryGroup[queryGroupIndex].queryTypeData : [];
        // if (selQueryBy === undefined) {
        //     const selectedRadio = radioQueryByData.find(e => e.checked === true);
        //     this.setState({ selQueryBy: selectedRadio.value });
        // } //else if (trackQueryList && trackQueryList.length > 0 && queryNoIndex > -1) {
        //     let setOtherQueryData = (selQueryBy === "Name") ?
        //         trackQueryList[queryNoIndex].Otherusername : trackQueryList[queryNoIndex].OtherSapID;
        //     this.setState({ searchNameorSapId: setOtherQueryData })
        // }
        return (
            <View style={compStyle} >
                <View style={styles.showBorder}>
                    <Text style={styles.whiteTextStyle}>To track your query enter below details</Text>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} >
                        <DatePicker
                            style={{ width: 150 }}
                            date={tqDateFrm} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="From Date"
                            format="YYYY-MM-DD"
                            minDate="2010-01-01"
                            maxDate={this.getCurrentDate()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    textColor: 'white'
                                },
                                dateText: {
                                    color: 'white',
                                }
                            }}
                            onDateChange={date => {
                                if (!this.checkDateValidation(date, tqDateTo)) {
                                    this.setState({ tqDateFrm: date });
                                }
                            }}
                        />
                        <DatePicker
                            style={{ width: 150, marginLeft: 12 }}
                            date={tqDateTo} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="To Date"
                            format="YYYY-MM-DD"
                            minDate="2010-01-01"
                            maxDate={this.getCurrentDate()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                                dateText: {
                                    color: 'white',
                                }
                            }}
                            onDateChange={date => {
                                if (!this.checkDateValidation(tqDateFrm, date)) {
                                    this.setState({ tqDateTo: date });
                                }
                            }}
                        />
                    </View>
                    <View />
                </View>


                <View style={styles.showBorder}>
                    {/* <Text style={styles.whiteTextStyle}>Other Sap ID/Name</Text> */}
                    <RadioGroup
                        color={colors.OTPText}
                        labelStyle={{ fontSize: 14 }}
                        radioButtons={this.state.radioQueryByData}
                        style={{ paddingTop: 2, flexDirection: "row" }}
                        onPress={radioQueryByData => {
                            const selectedRadio = radioQueryByData.find(e => e.checked === true);
                            if (trackQueryList && trackQueryList.length > 0 && queryNoIndex > -1) {
                                let setOtherQueryData = (selectedRadio.value === "Name") ?
                                    trackQueryList[queryNoIndex].Otherusername : trackQueryList[queryNoIndex].OtherSapID;
                                this.setState({ radioQueryByData, selQueryBy: selectedRadio.value, searchNameorSapId: setOtherQueryData })
                            } else {
                                this.setState({ radioQueryByData, selQueryBy: selectedRadio.value });
                            }
                        }}
                    />
                    <TextInput
                        style={styles.itemStyle}
                        placeholderTextColor={colors.searchBarText}
                        placeholder={
                            selQueryBy === "Name"
                                ? getText(I18N_CONSTANTS.WISHES.EMP_SEARCH)
                                : getText(I18N_CONSTANTS.WISHES.SAP_SEARCH)
                        }
                        onChangeText={enterData =>
                            this.setState({ searchNameorSapId: enterData })
                        }
                        value={searchNameorSapId}
                        returnKeyLabel="Done"
                        returnKeyType="done"
                        onEndEditing={e => {
                            if (Actions.currentScene === ApplicationConfiguration.scene.TRACK_QUERY) {
                                if (selQueryBy !== "Name" && !HrAppUtil.isValidSapCode(searchNameorSapId)) {
                                    Alert.alert("Track Query", "Please enter a valid 8 digit SAP code");
                                }
                            }
                        }} />
                </View>

                <View style={styles.showBorder}>
                    <Text style={styles.whiteTextStyle}>Query Number</Text>
                    <TouchableOpacity style={styles.itemStyle}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                placeholder="Select Query No."
                                headerStyle={styles.iosPickerHeader}
                                placeholderStyle={styles.whiteTextStyle}
                                selectedValue={queryNoIndex}
                                onValueChange={value => this.onChangeQueryId(value)}
                                textStyle={styles.whiteTextStyle}
                            >
                                <Picker.Item
                                    color={colors.OTPText}
                                    label="Select Query No."
                                    value="-1"
                                />
                                {trackQueryList ? trackQueryList.map((item, index) => (
                                    <Picker.Item
                                        label={item.QueryNo}
                                        value={index}
                                        key={Math.random().toString()}
                                        color={colors.OTPText}
                                    />
                                )) : <Picker.Item
                                        color={colors.OTPText}
                                        label="All"
                                        value="-1"
                                    />}
                            </Picker>
                        </Item>
                    </TouchableOpacity>
                </View>


                <View style={styles.showBorder}>
                    <Text style={styles.whiteTextStyle}>Query Status</Text>
                    <TouchableOpacity style={styles.itemStyle}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                placeholder="Select Query Status"
                                placeholderStyle={styles.whiteTextStyle}
                                headerStyle={styles.iosPickerHeader}
                                selectedValue={queryStatusIndex}
                                onValueChange={value => this.onChangeQueryStatus(value)}
                                textStyle={styles.whiteTextStyle}
                            >
                                <Picker.Item
                                    color={colors.OTPText}
                                    label="All"
                                    value="-1"
                                />
                                {queryStatus ? queryStatus.map((item, index) => (
                                    <Picker.Item
                                        label={item.call_status_description}
                                        value={index}
                                        key={Math.random().toString()}
                                        color={colors.OTPText}
                                    />
                                )) : <Picker.Item
                                        color={colors.OTPText}
                                        label="All"
                                        value="-1"
                                    />}
                            </Picker>
                        </Item>
                    </TouchableOpacity>
                </View>

                <View style={styles.showBorder}>
                    <Text style={styles.whiteTextStyle}>Query Group</Text>
                    <TouchableOpacity style={styles.itemStyle}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                placeholder="Select Query Group"
                                placeholderStyle={styles.whiteTextStyle}
                                headerStyle={styles.iosPickerHeader}
                                selectedValue={queryGroupIndex}
                                onValueChange={value => this.onChangeQueryGroup(value)}
                                textStyle={styles.whiteTextStyle}
                            >
                                <Picker.Item
                                    color={colors.OTPText}
                                    label="All"
                                    value="-1"
                                />
                                {queryGroup ? queryGroup.map((item, index) => (
                                    <Picker.Item
                                        label={item.queryGroupDescription}
                                        value={index}
                                        key={Math.random().toString()}
                                        color={colors.OTPText}
                                    />
                                )) : <Picker.Item
                                        color={colors.OTPText}
                                        label="All"
                                        value="-1"
                                    />}
                            </Picker>
                        </Item>
                    </TouchableOpacity>
                </View>

                <View style={styles.showBorder}>
                    <Text style={styles.whiteTextStyle}>Query Type</Text>
                    <TouchableOpacity style={styles.itemStyle}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                placeholder="Select Query Type"
                                placeholderStyle={styles.whiteTextStyle}
                                headerStyle={styles.iosPickerHeader}
                                // placeholderIconColor="#007aff"
                                selectedValue={queryType}
                                onValueChange={value => this.onChangeQueryType(value)}
                                textStyle={styles.whiteTextStyle}
                            >
                                <Picker.Item
                                    color={colors.OTPText}
                                    label="All"
                                    value="-1"
                                />
                                {array ? array.map((item, index) => (
                                    <Picker.Item
                                        label={item.queryTypeDescription}
                                        value={index}
                                        key={Math.random().toString()}
                                        color={colors.OTPText}
                                    />
                                )) : <Picker.Item
                                        color={colors.OTPText}
                                        label="All"
                                        value="-1"
                                    />}
                            </Picker>
                        </Item>
                    </TouchableOpacity>
                </View>

                <View style={styles.transparentView}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={this.onSearchQueryPress}
                    >
                        <Text style={styles.resetPasswordtext}>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={this.onResetSearchPress}
                    >
                        <Text style={styles.resetPasswordtext}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        const navBarProps = this.getNavBarProps();
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
                    <ScrollView style={styles.marginBottom} indicatorStyle="white">
                        {this.renderTrackQueryUI()}
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

TrackQuerySearchComponent.propTypes = {
    auth: PropTypes.shape({ root: PropTypes.string }).isRequired,
    registerQueryData: PropTypes.shape({
        queryGroup: PropTypes.array,
    }).isRequired,
    trackQueryData: PropTypes.shape({
        trackQueryList: PropTypes.array,
        queryStatus: PropTypes.array,
        viewQueryStatus: PropTypes.object
    }).isRequired,
    getTrackQuery: PropTypes.func.isRequired,
    getQueryStatus: PropTypes.func.isRequired,
};

export default TrackQuerySearchComponent;

