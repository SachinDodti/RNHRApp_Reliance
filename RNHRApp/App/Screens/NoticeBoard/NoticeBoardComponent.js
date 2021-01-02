import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Image,
  Linking,
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
} from "../../Assets/images";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
import styles from "./Styles";
import appStyles from "../appStyles";
import ApplicationConfiguration from "../../Config/env";
import HrAppUtil from "../../Util/HrAppUtil";
import NoticeBoardPdfView from "../../Components/NoticeBoardPdfView";
import ApplicationConstants from "../../Constants/ApplicationContants";

const imageIcon = {
  Pdf: IMG_PDF_VIEW,
  Image: IMG_ICON_IMAGE,
  Video: IMG_ICON_VIDEO,
  "Web Page": IMG_ICON_WEB,
  "Text Message": IMG_ICON_TEXT_MESSAGE,
  Doc: IMG_ICON_WORDDOC,
  Ppt: IMG_ICON_PPT,
};

class NoticeBoard extends Component {
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
    this.setState({ pdfLink: link.link });
    this.setState({ type: link.type });
    this.setState({ name: link.name });
    this.setState({ description: link.description });
    // <NoticeBoardPdfView />;
    // console.log("item", val);
    // console.log("item", this.state.pdfLink);
    // console.log("item", this.state.type);
  };

  openTextMessage = val => {
    Alert.alert(val.description);
  };

  render() {
    const { noticeBoard } = this.props;
    const { openPdff, pdfLink, type, name, description } = this.state;
    // console.log("pdfLink", pdfLink);
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
                <View style={styles.notice}>
                  <Text style={styles.heading1}>
                    {getText(I18N_CONSTANTS.NOTICE_BOARD.HEADER_TEXT)}
                  </Text>
                  <View style={styles.heading2}>
                    <View style={styles.container}>
                      <FlatList
                        data={[{ file: "Content", date: "Date" }]}
                        renderItem={({ item }) => (
                          <View style={styles.content2}>
                            <Text style={styles.content}>{item.file}</Text>
                            <Text style={styles.content}>{item.date}</Text>
                          </View>
                        )}
                      />
                    </View>
                    <View style={styles.borderLine} />
                    <View style={styles.noticeView}>
                      {noticeBoard.notices.length > 0 ? (
                        <View style={styles.noticeView}>
                          <FlatList
                            data={noticeBoard.notices}
                            renderItem={({ item }) => (
                              <View style={styles.details}>
                                <TouchableOpacity
                                // onPress={() => Linking.openURL("{item.link}")}
                                >
                                  <Image
                                    style={styles.fileIcon}
                                    source={imageIcon[item.type]}
                                  />
                                </TouchableOpacity>
                                {item.type === "Pdf" ||
                                item.type === "Text Message" ? (
                                    <TouchableOpacity style={styles.opacityView}>
                                      <Text
                                        style={styles.files}
                                        onPress={() => this.openPdf1(item)}
                                      >
                                        {item.name}
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <TouchableOpacity style={styles.opacityView}>
                                      <Text
                                        style={styles.files}
                                        onPress={() => {
                                          item.link != ""
                                            ? Linking.openURL(item.link)
                                            : null;
                                        }}
                                      >
                                        {item.name}
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                <Text style={styles.dates}>
                                  {HrAppUtil.getDateString(
                                    HrAppUtil.getDate(
                                      item.createdOn,
                                      ApplicationConfiguration.dateFormat
                                        .DEFAUL_FORMAT,
                                    ),
                                    ApplicationConfiguration.dateFormat
                                      .NOTICE_BOARD_FORMAT,
                                  )}
                                </Text>
                              </View>
                            )}
                          />
                        </View>
                      ) : (
                        <Text style={styles.noDateFound}>
                          No Notification Available
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default NoticeBoard;
