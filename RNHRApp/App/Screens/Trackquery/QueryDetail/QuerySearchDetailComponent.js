import React, { Component } from "react";
import { Container, Content, Item, Picker } from "native-base";
import { Divider, ListItem } from "react-native-elements";
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
    FlatList
} from "react-native";

import { Actions } from "react-native-router-flux";
import HeaderComponent from "../../../Components/HeaderComponent";
import NavBarComponent from "../../../Components/NavBarComponent";
import { IMG_APP_BACKGROUND } from "../../../Assets/images";
import appStyles from "../../../appStyles";
import styles from "../Styles";

import ApplicationConfiguration from "../../../Config/env";

const colors = require("../../../Config/config");

const queryDetail =

{
    "queryNo": "QRY117435",
    "queryDate": "1/7/2020 10:58:16 AM",
    "sapId": "70258745 (Sudhakar Sudharsan Chavan)",
    "otherSapId": "70258745 (Sudhakar Sudharsan Chavan)",
    "zone": "CORPORATE",
    "location": "MU- Goregeon Office",
    "queryGroup": "Attendance & Leave",
    "queryType": "Attendance",
    "queryStatus": "Closed",
    "viewStatus": "ViewStatus"
}
// {
//     "queryNo": "QRY117435",
//     "queryDate": "1/7/2020 10:58:16 AM",
//     "sapId": "70258745 (Sudhakar Chavan)",
//     "otherSapId": "70258745 (Sudhakar Chavan)",
//     "zone": "CORPORATE",
//     "location": "MU- Goregeon Office",
//     "queryGroup": "Attendance & Leave",
//     "queryType": "Attendance",
//     "queryStatus": "Closed",
//     "viewStatus": "ViewStatus"
// },
// {
//     "queryNo": "QRY117435",
//     "queryDate": "1/7/2020 10:58:16 AM",
//     "sapId": "70258745 (Sudhakar Chavan)",
//     "otherSapId": "70258745 (Sudhakar Chavan)",
//     "zone": "CORPORATE",
//     "location": "MU- Goregeon Office",
//     "queryGroup": "Attendance & Leave",
//     "queryType": "Attendance",
//     "queryStatus": "Closed",
//     "viewStatus": "ViewStatus"
// }



class QuerySearchDetailComponent extends Component {


    constructor(props) {
        super(props);

    }



    componentDidMount() {

    }

    // shouldComponentUpdate(nextProps, nextState) {

    //     return true;
    // }

    // componentDidUpdate() {

    // }

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
    onViewStatusClick = () => {
        let sceneViewQueryProps = {};
        const { sceneQueryDetails } = this.props
        const { item } = sceneQueryDetails;
        sceneViewQueryProps = {
            ...sceneViewQueryProps,
            queryId: item.id
        };
        Actions[ApplicationConfiguration.scene.VIEW_QUERY_STATUS]({ sceneViewQueryProps });
    }

    renderQueryDetailUI = () => {
        const { sceneQueryDetails } = this.props;
        const { item } = sceneQueryDetails;


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
                            <Text style={styles.nameText}>{item.QueryNo}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Date</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.QueryDate}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Sap Code</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.SapId}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Other SAP Code</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.OtherSapID}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Zone</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.Zone_Name}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Location</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.Location_Name}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Group</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.QueryGroup}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Type</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.QueryType}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>Query Status</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Text style={styles.nameText}>{item.QueryStatus}</Text>
                        </View>
                    </View>
                    <View style={styles.listView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>View Status</Text>
                        </View>
                        <View style={styles.columnR}>
                            <TouchableOpacity onPress={this.onViewStatusClick}>
                                <Text style={styles.nameTextUnderLine}>View Status</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            // <ListItem
            //     backgroundImageStyle={styles.transparentListView}
            //     title={item.queryNo}
            //     subtitle={item.queryDate}
            //     chevron={{ color: 'grey' }}
            // />
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
                    <ScrollView style={{ flex: 1 }} indicatorStyle="white">
                        {this.renderQueryDetailUI()}

                    </ScrollView>


                </ImageBackground>
            </SafeAreaView>
        );
    }
}

export default QuerySearchDetailComponent;

