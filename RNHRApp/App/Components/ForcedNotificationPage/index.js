import React, { Component } from "react";
import Pdf from "react-native-pdf";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler
} from "react-native";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";
import { Button, Left } from "native-base";
import { CheckBox } from "react-native-elements";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import styles from "./Styles";

import appStyles from "../../appStyles";

import { Rating, AirbnbRating } from 'react-native-ratings';

import Icon from 'react-native-vector-icons/AntDesign';
const scrn = Dimensions.get('screen');

const colors = require("../../Config/config");


class ForcedNotificaionPageComponent extends Component {
  constructor(props) {
    super(props);
    const { nextText } = this.props;
    Icon.loadFont();
    this.state = {
      nextText,
      consentAccepted: false,
      enableLike: false,
      enableDisLike: false,
      download: false,
      ratingValue: 0,
      comment: "",
      consent: "",
      selectedSurvey: "",
      loaded: false,
      enableNextButton: false,
      noteMessage: undefined,
      disableCheckbox: true,
      feedbackType: ""
    };
  }

  componentDidMount() {
    const { notification } = this.props;
    this.setState({ noteMessage: notification.Note, feedbackType: notification.FeedbackType });
    if (Platform.OS === "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }


  updateStatus = checkStatus => {
    this.setState({ consentAccepted: checkStatus, enableNextButton: checkStatus });
  };

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  }

  isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    return contentOffset.y == 0;
  }

  onLikePress() {
    const { enableLike } = this.state;
    this.setState({ enableLike: !enableLike, enableDisLike: false })
  }
  onDisLikePress() {
    const { enableDisLike } = this.state;
    this.setState({ enableLike: false, enableDisLike: !enableDisLike })
  }
  onRatingCompleted(rating) {
    console.log(`Rating is: ${rating}`);
    const { ratingValue } = this.state;
    this.setState({
      ratingValue: (ratingValue === 1
        && ratingValue === rating) ? 0 : rating
    });
  }
  onDownloadPress = () => {
    const { notification } = this.props;
    console.log(`link is: ${notification.LINK}`);
    Linking.openURL(encodeURI(notification.LINK));
  }
  onCommentTextChange = text => {
    this.setState({ comment: text });
  };

  onNextForcedNotificationPress = () => {
    const { goToNextForcedNotification, notification } = this.props;
    const {
      enableLike,
      enableDisLike,
      consentAccepted,
      ratingValue,
      selectedSurvey,
      nextText,
      feedbackType
    } = this.state;
    let likeDislikeValue = "";
    let validToProceed = false;
    if (enableLike) {
      likeDislikeValue = "Like"
    }
    if (enableDisLike) {
      likeDislikeValue = "Dislike"
    }
    if (feedbackType === "NA") {
      validToProceed = true;
    }
    else {
      if (feedbackType.includes("Survey") && selectedSurvey === "") {
        Alert.alert("Please enter feedback");
      } else if (feedbackType.includes("Rating") && ratingValue === 0) {
        Alert.alert("Please enter feedback");
      } else if (feedbackType.includes("Like/Dislike") && likeDislikeValue === "") {
        Alert.alert("Please enter feedback");
      } else {
        validToProceed = true;
      }
    }
    if (validToProceed) {

      const updateForcedNotificationRequest = {
        "comment": selectedSurvey,
        "consente": consentAccepted ? "Yes" : "No",
        "like_Dislike": likeDislikeValue,
        "noticeBoardId": notification.AutoId,
        "rate": ratingValue,
      }
      goToNextForcedNotification(updateForcedNotificationRequest);
      this.setState({ selectedSurvey: "", ratingValue: 0 });
    }

  }
  reLoadWebView = () => {
    this.forceNotificationWebView.reload();
  }

  renderPdfView(link) {
    const { feedbackType } = this.state;
    return (
      <View style={styles.pdfContainerStyle} >

        <Pdf
          source={{ uri: link, cache: true }}
          style={styles.webContainerStyle}
          onError={error => {
            console.log('Error while reloading pdf', error);
            //this.setState({ disableCheckbox: false }); //remove in future\
          }}
          onLoadComplete={numOfPages => {
            console.log("PDF view onLoadComplete - number of pages: " + numOfPages);
            if (numOfPages === 1) {
              if (feedbackType.includes("Consent")) {
                this.setState({ disableCheckbox: false });
              } else {
                this.setState({ enableNextButton: true });
              }
            }
          }}
          onPageChanged={(page, numberOfPages) => {
            if (page === numberOfPages) {
              if (feedbackType.includes("Consent")) {
                this.setState({ disableCheckbox: false });
              } else {
                this.setState({ enableNextButton: true });
              }
            }
          }}
        />
      </View >

    );
  }

  renderImageView(uri) {
    const { loaded, noteMessage, feedbackType } = this.state;
    return (
      <View style={styles.pdfContainerStyle} >
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }} onScroll={({ nativeEvent }) => {
          if (this.isCloseToTop(nativeEvent)) {
            //do something
          }
          if (this.isCloseToBottom(nativeEvent)) {
            if (loaded) {
              if (feedbackType.includes("Consent")) {
                this.setState({ disableCheckbox: false });
              } else {
                this.setState({ enableNextButton: true });
              }
            }
          }
        }}>
          {(!loaded ? <View style={[styles.loadingContainer]}>
            <ActivityIndicator animating size="large" />
          </View> : null)}
          <Image
            onLoad={() => {
              console.log("Image onLoad called");
              this.setState({
                loaded: true
              })
              // if (feedbackType.includes("Consent")) {
              //   this.setState({ disableCheckbox: false });
              // } else {
              //   this.setState({ enableNextButton: true });
              // }
            }}
            onError={() => {
              console.log("Image onLoad called");
              this.setState({
                loaded: false
              })
            }}
            style={{
              //backgroundColor: !loaded ? '#e1e4e8' : colors.white,
              width: scrn.width,
              height: scrn.height
            }}
            source={{ uri: uri }}
            indicator='bar'
            resizeMode="contain" />

        </ScrollView>
      </View >
    );

  }

  renderUrlView(url, documentType) {
    const { feedbackType, loaded } = this.state;
    let clickText = "Click here to view the url";
    if (documentType === "Video") {
      console.log("renderUrlView embedLink: ", url);
      clickText = "Click here to view the video";
    }
    return (
      <View style={styles.pdfContainerStyle} >
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}
        >
          <View style={styles.parentView}>
            <View style={[styles.forcedNotifyTextViewContainer]}>
              <Text style={[styles.confMessage]}>{url ? url : ""}</Text>
              <TouchableOpacity style={{ flex: 1 }}
                onPress={() => {
                  if (feedbackType.includes("Consent")) {
                    this.setState({ disableCheckbox: false });
                  } else {
                    this.setState({ enableNextButton: true });
                  }
                  Linking.openURL(encodeURI(url))
                }}
              >
                <Text style={[styles.confMessage]}>{clickText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView >
      </View >


    );

  }
  renderTextView(name, description) {
    const { feedbackType } = this.state;

    return (
      <View style={styles.pdfContainerStyle} >
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }} onScroll={({ nativeEvent }) => {
          if (this.isCloseToTop(nativeEvent)) {
          }
          if (this.isCloseToBottom(nativeEvent)) {
            if (feedbackType.includes("Consent")) {
              this.setState({ disableCheckbox: false });
            } else {
              this.setState({ enableNextButton: true });
            }
          }
        }}>
          <View style={styles.parentView}>
            <View style={[styles.forcedNotifyTextViewContainer]}>
              <Text style={[styles.confMessage]}>{description}</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    );

  }
  renderSurveyOptions = (SurveyOption) => {
    return (
      (SurveyOption ?
        <CheckBox
          key={SurveyOption}
          title={SurveyOption}
          size={15}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          containerStyle={styles.checkBoxSurveyStyle}
          checked={this.state.selectedSurvey === SurveyOption}
          onPress={() => this.setState({ selectedSurvey: SurveyOption })}
        ></CheckBox> : null)
    );

  }

  render() {
    const { consentAccepted, disableCheckbox, nextText, enableNextButton } = this.state;

    const { notification } = this.props;
    // console.log("LearningPageComponent", this.props);
    return (
      <View style={styles.pdfContainerStyle}
        key={notification.AutoId}
      >
        <View style={styles.forcedNotifyNameContainer}>
          <Text style={styles.forcedNotifyNameStyle}>{notification.ShortDescription}</Text>
        </View>
        <View
          style={styles.forcedNotifyContainer}
        >
          {(notification.DocumentType === "Pdf") ? this.renderPdfView(encodeURI(notification.LINK)) : null}
          {(notification.DocumentType === "Image") ? this.renderImageView(encodeURI(notification.LINK)) : null}
          {(notification.DocumentType === "Text Message") ? this.renderTextView(notification.ShortDescription, notification.Description) : null}
          {(notification.DocumentType === "Web Page" || notification.DocumentType === "Video") ? this.renderUrlView(encodeURI(notification.LINK), notification.DocumentType) : null}
          {/* {(notification.DocumentType === "Video") ? this.renderVideoUI(encodeURI(notification.LINK)) : null} */}
          {/* <Image style={{ width: 20, height: 20, justifyContent: 'flex-end' }}></Image> */}
          <TouchableOpacity style={[{ flexDirection: "row", justifyContent: 'flex-end' }, styles.downloadBtnStyle]} onPress={this.onDownloadPress}>
            {notification.IsPdfDownload === "Yes" ? <Icon name="download" size={24} color="#444" /> : null}
          </TouchableOpacity>
          <ScrollView style={styles.toolsContainer}>
            {(notification.FeedbackType.includes("Consent") && notification.Note) ?
              <View style={styles.checkboxContainer}>
                <CheckBox
                  checked={consentAccepted}
                  title={notification.Note}
                  containerStyle={styles.checkBoxContainerStyle}
                  textStyle={[
                    styles.textStyle,
                    disableCheckbox ? { opacity: 0.5 } : {}
                  ]}
                  onPress={() => this.updateStatus(!consentAccepted)}
                  disabled={disableCheckbox}
                />
              </View>
              : null}

            {(notification.FeedbackType.includes("Like/Dislike") ? //start
              <View >
                <View style={styles.likeStyle}>
                  <TouchableOpacity style={[{ flexDirection: "row", alignItems: "center" }, styles.buttonStyle]} onPress={this.onLikePress.bind(this)}>
                    <Text >Like </Text>
                    {this.state.enableLike ? <Icon name="like1" size={18} color="#444" /> : <Icon name="like2" size={18} color="#444" />}
                  </TouchableOpacity>
                  <TouchableOpacity style={[{ flexDirection: "row", alignItems: "center" }, styles.buttonStyle]} onPress={this.onDisLikePress.bind(this)}>
                    <Text >Dislike </Text>
                    {this.state.enableDisLike ? <Icon name="dislike1" size={18} color="#444" /> : <Icon name="dislike2" size={18} color="#444" />}
                  </TouchableOpacity>
                </View>
              </View>
              : null)}

            {(notification.FeedbackType.includes("Survey") ? //start
              <View >
                {/* <Text style={styles.feeedbackTextStyleInfo}>Share your comments with us in the below box</Text> */}
                <Text style={styles.feedbackTextStyleInfo}>{notification.SurveyQuestion}</Text>
                {
                  notification.SurveyOptionList ?
                    notification.SurveyOptionList.map(optionList => (
                      this.renderSurveyOptions(optionList.SurveyOption)
                    )) : null
                }
              </View > : null)}
            {(notification.FeedbackType.includes("Rating") ?
              <View style={styles.toolsContainer}>
                <AirbnbRating
                  showRating={false}
                  defaultRating={this.state.ratingValue}
                  size={20}
                  alignItems={Left}
                  onFinishRating={this.onRatingCompleted.bind(this)}
                />
                <Text style={styles.feedbackTextStyleInfo}>Select the stars above to rate this post.</Text>
              </View>
              : null)}

            <Button
              disabled={!enableNextButton}
              bordered
              onPress={this.onNextForcedNotificationPress}
              style={
                enableNextButton
                  ? styles.btnNextEnableStyle
                  : [styles.btnNextEnableStyle, { opacity: 0.4 }]
              }
            >
              <Text style={styles.txtNextStyle}>
                {nextText}
              </Text>
            </Button>
          </ScrollView>
        </View >
      </View >
    );
  }
}

ForcedNotificaionPageComponent.propTypes = {
  notification: PropTypes.shape({ LINK: PropTypes.string.isRequired })
    .isRequired,
  goToNextForcedNotification: PropTypes.func.isRequired,
};

export default ForcedNotificaionPageComponent;
