import React, { Component } from "react";
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
    Image,
    FlatList
} from "react-native";

import { Divider, ListItem } from "react-native-elements";

import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";


import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";

import { IMG_DEFAULT_ICON, IMG_APP_BACKGROUND } from "../../Assets/images";

import appStyles from "../../appStyles";

import styles from "./Styles";
import HrAppUtil from "../../Util/HrAppUtil";
import ApplicationConfiguration from "../../Config/env";
import Icon from 'react-native-vector-icons/FontAwesome';



class ProductCornerComponent extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const { getProductDetails } = this.props;
        await getProductDetails();
    }

    componentDidUpdate() {

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

    navigateProductCornerDetail = (item) => {
        let sceneProductDetails = {};
        sceneProductDetails = {
            ...sceneProductDetails,
            productDetailsList: item
        };
        Actions[ApplicationConfiguration.scene.PRODUCT_CORNER_DETAILS]({ sceneProductDetails });
    }

    renderProductCornerUI = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.navigateProductCornerDetail(item)}>
                <View >
                    <View style={styles.scrolListView}>
                        <View style={styles.columnL}>
                            <Text style={styles.textId}>{item.ProductName}</Text>
                        </View>
                        <View style={styles.columnR}>
                            <Icon name="chevron-right" size={10} style={styles.moreIcon} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    renderProductCornerListView() {
        const { productCornerData } = this.props;
        //const { productCornerList } = productCornerData;
        return (
            <ScrollView
                contentContainerStyle={styles.marginBottom}
                indicatorStyle="white"
            >
                <FlatList
                    data={(productCornerData) ? productCornerData.productCornerList : {}}
                    renderItem={this.renderProductCornerUI}
                    // ItemSeparatorComponent={this.renderSeparator}
                    ItemSeparatorComponent={Divider}
                />

            </ScrollView>

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
                        <Text style={[styles.textFormat]}>Product Corner</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }} indicatorStyle="white">
                        {this.renderProductCornerListView()}
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>

        );
    }
}

ProductCornerComponent.propTypes = {
    auth: PropTypes.shape({ root: PropTypes.string }).isRequired,
    productCornerData: PropTypes.objectOf(PropTypes.array).isRequired,
    getProductDetails: PropTypes.func.isRequired,
};

export default ProductCornerComponent;
