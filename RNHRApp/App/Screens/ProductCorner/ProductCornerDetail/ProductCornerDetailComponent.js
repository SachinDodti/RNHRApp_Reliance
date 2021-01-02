import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ImageBackground,
    FlatList,
    Alert,
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
    IMG_APP_BACKGROUND,
    IMG_PDF_VIEW,
    IMG_ICON_IMAGE,
    IMG_ICON_VIDEO,
    IMG_ICON_WEB,
    IMG_ICON_WORDDOC,
    IMG_ICON_TEXT_MESSAGE,
    IMG_ICON_PPT,
} from "../../../Assets/images";
import I18N_CONSTANTS from "../../../I18n/LanguageConstants";
import { getText } from "../../../I18n/Lang";
import HeaderComponent from "../../../Components/HeaderComponent";
import NavBarComponent from "../../../Components/NavBarComponent";
import styles from "../Styles";
import appStyles from "../../appStyles";
import ApplicationConfiguration from "../../../Config/env";
import HrAppUtil from "../../../Util/HrAppUtil";
import NoticeBoardPdfView from "../../../Components/NoticeBoardPdfView";

const imageIcon = {
    Pdf: IMG_PDF_VIEW,
    Image: IMG_ICON_IMAGE,
    Video: IMG_ICON_VIDEO,
    "Web Page": IMG_ICON_WEB,
    "Text Message": IMG_ICON_TEXT_MESSAGE,
    Doc: IMG_ICON_WORDDOC,
    Ppt: IMG_ICON_PPT,
};

class ProductCornerDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPdff: false,
            pdfLink: "",
            type: "",
            name: "",
            description: "",
        };
    }

    onBackPress = () => {
        const { openPdff } = this.state;
        if (openPdff) {
            this.setState({ openPdff: false });
        } else {
            Actions.pop();
        }
    };

    openPdf1 = val => {
        const link = val;
        this.setState({ openPdff: true });
        this.setState({ pdfLink: link.ProductUrl });
        this.setState({ type: "Pdf" });
        this.setState({ name: link.ProductType });
        this.setState({ description: "" });
        this.logProductCornerItemClick(val);
    };

    logProductCornerItemClick = (item) => {//ProductCornerItem Click
        const { logProductView } = this.props;
        logProductView({
            source: "HRAPP",
            productDtlId: item.ProductdtlId
        });
    }

    renderProductCornerDetails = () => {
        const { sceneProductDetails } = this.props;

  
        const { productDetailsList } = sceneProductDetails;
        return (
            <View style={styles.notice}>
                <Text style={styles.content}>
                    {productDetailsList ? productDetailsList.ProductName : ""}
                </Text>
                <View style={styles.heading2}>
                    <View style={styles.container}>
                        <FlatList
                            data={[{ file: "", view: "Click to View" }]}
                            renderItem={({ item }) => (
                                <View style={styles.content2}>
                                    <Text style={styles.heading1}>{item.file}</Text>
                                    <Text style={styles.headingView}>{item.view}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.borderLine} />
                    <View style={styles.noticeView}>
                        {(productDetailsList && productDetailsList.ProductdtlpdfList.length > 0) ? (
                            <View style={styles.noticeView}>
                                <FlatList
                                    data={productDetailsList.ProductdtlpdfList}
                                    renderItem={({ item }) => (
                                        <View style={styles.details}>
                                            <TouchableOpacity style={styles.opacityView}
                                            >
                                                <Text style={styles.files}>
                                                    {item.ProductType}
                                                </Text>
                                            </TouchableOpacity>
                                            {item.ProductUrl !== "" ? (
                                                <TouchableOpacity style={styles.opacityView}>
                                                    <Text
                                                        style={styles.views}
                                                        onPress={() => this.openPdf1(item)}>View</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                    <TouchableOpacity style={styles.opacityView}>
                                                        <Text style={styles.views}>NA</Text>
                                                    </TouchableOpacity>
                                                )}
                                        </View>
                                    )}
                                />
                            </View>
                        ) : (
                                <Text style={styles.noDateFound}>
                                    No ProductCorner Detail Available
                                </Text>
                            )}
                    </View>
                </View>
            </View >);

    }

    render() {
        const { openPdff, pdfLink, type, name, description } = this.state;
        console.log("pdfLink", pdfLink);
        // console.log("NoticeBoard", this.props);
        return (
            <SafeAreaView style={appStyles.rootView}>
                <ImageBackground
                    source={IMG_APP_BACKGROUND}
                    style={appStyles.backgroundImageStyle}
                >
                    <HeaderComponent />
                    <NavBarComponent
                        includeVersion
                        includeBack
                        includeProfile
                        includeNotification
                        onBackPress={this.onBackPress}
                    />
                    <View style={[styles.groupTitle]}>
                        <Text style={[styles.textFormat]}>Product Corner</Text>
                    </View>
                    <View style={[styles.marginButtom, styles.noticeView]}>
                        {openPdff === true ? (
                            <NoticeBoardPdfView
                                pdfLink={pdfLink}
                                type={type}
                                name={name}
                                description={description}
                            />
                        ) : (
                                <View style={styles.noticeView}>
                                    {this.renderProductCornerDetails()}
                                </View>
                            )}
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

export default ProductCornerDetailComponent;
