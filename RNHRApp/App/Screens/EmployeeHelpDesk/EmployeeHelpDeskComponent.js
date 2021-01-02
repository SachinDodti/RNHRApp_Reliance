import React, { Component } from "react";
import { Container, Content, Item, Picker, 
  Icon } from "native-base";
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

import FileViewer from 'react-native-file-viewer';

import PropTypes from "prop-types";
import * as RNFS from "react-native-fs";
import AlertPopover, {
  AlertPopoverType
} from "../../Components/AlertPop/AlertPopoverComponent";
import HeaderComponent from "../../Components/HeaderComponent";
import NavBarComponent from "../../Components/NavBarComponent";
import { IMG_APP_BACKGROUND } from "../../Assets/images";
import appStyles from "../../appStyles";
import styles from "./Styles";
import { STORAGE_KEY } from "../../Util/LocalStorage";
import HrAppUtil from "../../Util/HrAppUtil";

import ApplicationConfiguration from "../..//Config/env";

import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";

import AppFilePreview from "../../Components/AppFilePreview";


const colors = require("../../Config/config");

const maxFileSize = 5242880; // bytes 5MB

class EmployeeHelpDeskRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioQueryByData: [
        {
          label: "Self",
          value: "Self",
          checked: true,
          color: "#F44336",
          disabled: false,
          flexDirection: "row",
          size: 11
        },

        {
          label: "Others",
          value: "Others",
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
      singleFile: "",
      selectedFileBase64String: "",
      selQueryBy: "",
      enteredSapCode: "",
      showSubmitRegQueryPopUp: false,
      isRegQuerySuccessMsgShowed: false,
      viewSelectedFile: false,
    };
    this.onChangeQueryGroup = this.onChangeQueryGroup.bind(this);
    this.onChangeQueryType = this.onChangeQueryType.bind(this);
  }

  async componentDidMount() {
    const { getRegisterSapData } = this.props;
    const requestData = { sapCode: this.getSapCode() };

    console.log("====== RegisterQuery componentDidMount ======")
    await getRegisterSapData(requestData);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("====== RegisterQuery shouldComponentUpdate ======")
    return true;
  }

  componentDidUpdate() {
    const { registerQueryData } = this.props;
    const { registerQuerySuccessMsg } = registerQueryData;
    const { isRegQuerySuccessMsgShowed } = this.state;

    console.log("====== RegisterQuery componentDidUpdate ======")
    if (registerQuerySuccessMsg && !isRegQuerySuccessMsgShowed) {
      this.showRegisterQuerySuccessMsg(registerQuerySuccessMsg);
      this.setState({ isRegQuerySuccessMsgShowed: true });
    }
  }

  showRegisterQuerySuccessMsg = (msg) => {
    const { clearRegisterQuerySuccessMsg } = this.props;
    Alert.alert(
      'Success: Query Registered',
      msg,
      [
        {
          text: 'OK', onPress: () => {
            console.log('OK Pressed');
            clearRegisterQuerySuccessMsg();
            Alert.alert(
              '', //Alert title
              'Would you like to raise another query? ',
              [
                {
                  text: 'Yes', onPress: () => {
                    console.log('Yes Pressed')
                    this.setState({ isRegQuerySuccessMsgShowed: false });
                  }
                },
                {
                  text: 'No', onPress: () => {
                    console.log('No Pressed'),
                      //Actions[ApplicationConfiguration.scene.HR_HELP_DESK]();
                      Actions.pop();
                  },
                }
              ],
              { cancelable: false }
            )
          }
        },
      ],
      { cancelable: false }
    )

  }

  onChangeQueryGroup(value) {
    const { registerQueryData } = this.props;
    const { queryGroup } = registerQueryData;
    // console.log("Selected query group index : ", value);
    if (value > -1) {
      this.setState({
        queryGroupIndex: value,
        queryGroupId: queryGroup[value].queryGroupId,
        queryType: undefined,
        queryTypeId: undefined,
        isVisible: false,
        yourQueryDesc: ""
      });
    }
  }

  onChangeQueryType(value) {
    // console.log('test Onchange query type', Platform.OS, value);
    const { queryGroupIndex, queryGroupName } = this.state;
    if (queryGroupIndex > -1 && value > -1) {
      const { registerQueryData } = this.props;
      const { queryGroup } = registerQueryData;
      const qGroup = queryGroup[queryGroupIndex];
      const qType = qGroup ? qGroup.queryTypeData[value] : {};
      console.log(
        "Query Group Name : ",
        queryGroupName,
        "Query Type Name : ",
        qType.queryTypeDescription
      );
      this.setState({
        queryType: value,
        queryTypeId: qType.queryTypeId,
        isVisible: true
      });
    }
  }

  async getSelfOrOtherRegisterSapInfo(sapId) {
    const { getRegisterSapData } = this.props;
    if (sapId === "") return;
    const requestData = { sapCode: sapId };
    await getRegisterSapData(requestData);
  }

  onOtherOptionSelected = sapId => {
    if (!HrAppUtil.isValidSapCode(sapId)) {
      Alert.alert("Register Query", "Please enter a valid 8 digit SAP code");
    } else {
      this.getSelfOrOtherRegisterSapInfo(sapId);
    }
  };

  getSapCode = () => {
    const { localStore, auth } = this.props;
    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty
        (localStore
          [STORAGE_KEY.USER.LOGGEDIN_USER])
        ? HrAppUtil.parse
        (localStore
          [STORAGE_KEY.USER.LOGGEDIN_USER])
        : {});
    const sapCode = loggedInUser
      ? loggedInUser.sapCode || loggedInUser.panNo
      : "DUMMY";
    return sapCode;
  };

  onBackPress = () => {
    const { viewSelectedFile } = this.state;
    if (viewSelectedFile) {
      this.setState({ viewSelectedFile: false });
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

  readSelectedFileData = () => {
    const { singleFile } = this.state;
    const f1 = singleFile.uri;

    return Promise.resolve()
      .then(() => {
        return RNFS.readFile(f1, "base64").then(contents => {
          // console.log("Read F1", contents, "baz 𝌆 bar © foo");
          this.setState({ selectedFileBase64String: contents });
        });
      })
      .catch(err => console.log("Read F1 error:", err));
  };

  onSubmitRegisterQueryOKClick = () => {
    const {
      queryGroupId,
      queryTypeId,
      selectedFileBase64String,
      singleFile,
      enteredSapCode,
      yourQueryDesc,
      selQueryBy
    } = this.state;
    const { employeeRegisterQuery, registerQueryData } = this.props;
    const { registerSapInfo } = registerQueryData;
    const loggedInUser = this.getSapCode();
    let validSapCode = "";
    if (selQueryBy === "Others") {
      validSapCode = enteredSapCode;
    } else {
      validSapCode = loggedInUser;
    }

    if (!HrAppUtil.isValidSapCode(validSapCode)) {
      Alert.alert("Register Query", "Please enter a valid 8 digit SAP code");
    } else if (selQueryBy === "Others" && loggedInUser === validSapCode) {
      Alert.alert("Error: Register Query", "The SAP Code you have logged in from is the same as the Sap code entered to raise query. Please enter other valid Sap code");
    } else if (HrAppUtil.isNullOrEmpty(queryGroupId)) {
      Alert.alert("Register Query", "Please select Query group");
    } else if (HrAppUtil.isNullOrEmpty(queryTypeId)) {
      Alert.alert("Register Query", "Please select Query type");
    } else if (HrAppUtil.isNullOrEmpty(yourQueryDesc)) {
      Alert.alert("Register Query", "Please enter query description");
    } else {
      const regQueryRequest = {
        sapCode: validSapCode,
        contactNumber: registerSapInfo.contactNo,
        emailId: registerSapInfo.email,
        queryGroup: queryGroupId,
        queryType: queryTypeId,
        queryDesc: yourQueryDesc,
        fileName: singleFile ? singleFile.name : "",
        fileBase64: selectedFileBase64String,
        createdBy: loggedInUser,
        createdUser: loggedInUser
      };
      //this.setState({ showSubmitRegQueryPopUp: false });

      console.log('REQUEST_QUERY',regQueryRequest)
     // alert(regQueryRequest.fileBase64)
      employeeRegisterQuery(regQueryRequest);
      this.resetCurrentSelectedRegisterQuery();
    }

  };

  resetCurrentSelectedRegisterQuery = () => {
    this.setState({
      // clear the data
      queryGroupIndex: -1,
      queryGroupName: undefined,
      queryGroupId: undefined,
      queryType: undefined,
      queryTypeId: undefined,
      isVisible: false,
      singleFile: "",
      selectedFileBase64String: "",
      selQueryBy: "",
      enteredSapCode: "",
      yourQueryDesc: ""
    });
  };

  onCancelClick = () => {
    Actions.pop();
  };

  onYourQueryTextChange = text => {
    this.setState({ yourQueryDesc: text });
  };

  setSubmitRegisterQueryPopup = () => {
    //
    const {
      queryGroupId,
      queryTypeId,
      enteredSapCode,
      selQueryBy
    } = this.state;
    const loggedInUserSapCode = this.getSapCode();
    let validSapCode;
    if (selQueryBy === "Others") {
      validSapCode = enteredSapCode;
    } else {
      validSapCode = loggedInUserSapCode;
    }
    if (!HrAppUtil.isValidSapCode(validSapCode)) {
      Alert.alert("Register Query", "Please enter a valid 8 digit SAP code");
    } else if (selQueryBy === "Others" && loggedInUserSapCode === validSapCode) {
      Alert.alert("Error: Register Query", "The SAP Code you have logged in from is the same as the Sap code entered to raise query. Please enter other valid Sap code");
    } else if (HrAppUtil.isNullOrEmpty(queryGroupId)) {
      Alert.alert("Register Query", "Please select Query group");
    } else if (HrAppUtil.isNullOrEmpty(queryTypeId)) {
      Alert.alert("Register Query", "Please select Query type");
    } else {
      this.setState({ showSubmitRegQueryPopUp: true });
    }
  };

  async SingleFilePicker() {

    let message = "";
    let res;
    try {
      // Android file picker
      res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf]
        //DocumentPicker.types.video
      });
      // console.log(`URI : ${res.uri}`);
      // console.log(`Type : ${res.type}`);
      // console.log(`File Name : ${res.name}`);
      // console.log(`File Size : ${res.size}`);
      // console.log(`File content : ${res.content}`);
      if (res.size > maxFileSize) {
        message = "This file is too large. Allowed maximum file size is 5MB.";
        Alert.alert(message);
      } else {
        this.setState({ singleFile: res });
        this.readSelectedFileData();
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("Canceled");
      } else {
        Alert.alert(`${JSON.stringify(err)}`);
        throw err;
      }
    }
  }

  async previewSelectedFile() {
    const { singleFile } = this.state;

    if (Platform.OS === "ios") {
      this.setState({ viewSelectedFile: true });
    } else {
      const decUrl = (Platform.OS === "ios") ? encodeURI(singleFile.uri) : singleFile.uri;
      await FileViewer.open(decUrl)
        .then(() => {
          // success
          console.log(decUrl)
        })
        .catch(_err => {
          // error
          console.error(_err);
        });
    }

  }
  //
  deleteSelectedFile = () => {
    this.setState({ singleFile: "" });
    this.setState({ selectedFileBase64String: "" });
  }
  // Redirect to photo gallery of iOS device
  singleImagePicker = async () => {
    // if (Platform.OS === "ios") { // Need to uncomment when customer want this feature for iOS add it
    const options = {
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
        Alert.alert("Canceled");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        console.log("EmployeeHelpDesk response", JSON.stringify(response));
        if (response.fileSize > maxFileSize) {
          message =
            "This file is too large. Allowed maximum file size is 5MB.";
          Alert.alert(message);
        } else {
          let nameFromImage = ''
          if(response.fileName === null|| response.fileName === undefined){

           

                 if(response.uri){
                  let uri = encodeURI(response.uri)
                  try{
                    var fields =  uri.split('images/');
                    nameFromImage = fields[1];        
                  }catch(ex){
        
                  }
                 }
          }
          else{
            nameFromImage = response.fileName
          }

         

       

         

       
          const tempData = {
            name: nameFromImage,
            uri: response.uri,
            type: response.type
          };
          this.setState({ singleFile: tempData });

          this.readSelectedFileData();

          this.setState({ selectedFileBase64String: response.data });
        }
      }
    });

  }

  showAttachmentPickerOptionForiOS = () => {
    return (
      <View style={styles.transparentView}>
        <TouchableOpacity
          style={styles.btnBrowseStyle}
          onPress={this.singleImagePicker}
        >
          <Text style={styles.resetPasswordtext}>Browse Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnBrowseStyle}
          onPress={this.SingleFilePicker.bind(this)}
        >
          <Text style={styles.resetPasswordtext}>Browse File</Text>
        </TouchableOpacity>
      </View>
    );
  }

  openSelectedFile = val => { //specific to iOS
    const link = val;
    this.setState({ openPdff: true });
    this.setState({ pdfLink: link.uri });
    this.setState({ type: link.type });
    this.setState({ name: link.name });
    this.setState({ image: link.image });
  };

  renderRegisterQueryUI() {
    // console.log('on locationDirectory after selecting state', locationDirectory.branches);
    const {
      isVisible,
      queryGroupIndex,
      queryType,
      enteredSapCode,
      radioQueryByData,
      singleFile,
      yourQueryDesc
    } = this.state;
    let selectedItem = radioQueryByData.find(e => e.checked === true);
    selectedItem = selectedItem
      ? selectedItem.value
      : this.state.radioQueryByData[0].value;
    const compStyle = [
      styles.showBorder,
      styles.buttonViewL,
      styles.tileItemAppearence,
      styles.dark
    ];

    const { registerQueryData } = this.props;
    // console.log(
    //   "Register query index.js registerQueryData : ",
    //   registerQueryData
    // );
    const loggedInUserSapCode = this.getSapCode();
    const { queryGroup } = registerQueryData;
    const array =
      queryGroupIndex > -1 ? queryGroup[queryGroupIndex].queryTypeData : [];
    return (
      <View style={compStyle}>
        <View style={styles.showBorder}>
          <Text style={styles.whiteTextStyle}>Query</Text>
          <RadioGroup
            color={colors.OTPText}
            labelStyle={{ fontSize: 14 }}
            radioButtons={this.state.radioQueryByData}
            onPress={radioQueryByData => {
              const selQueryBy = radioQueryByData.find(e => e.checked === true);
              if (selQueryBy.value === "Self") {
                this.getSelfOrOtherRegisterSapInfo(loggedInUserSapCode);
              }
              this.setState({ radioQueryByData, selQueryBy: selQueryBy.value });
            }}
            style={{ paddingTop: 20, flexDirection: "row" }}
          />
          <View />
        </View>

        {selectedItem === "Others" ? (
          <View style={styles.showBorder}>
            <Text style={styles.whiteTextStyle}>SAP Code</Text>
            <TextInput
              style={styles.itemStyle}
              placeholder={getText(I18N_CONSTANTS.LOGIN.SAP_CODE)}
              placeholderTextColor="#72a8e2"
              onChangeText={enterData =>
                this.setState({ enteredSapCode: enterData })
              }
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredSapCode}
              numeric
              keyboardType="number-pad"
              maxLength={8}
              returnKeyLabel="Done"
              returnKeyType="done"
              onEndEditing={e => {
                if (Actions.currentScene === ApplicationConfiguration.scene.REGISTER_QUERY) {
                  if (loggedInUserSapCode === enteredSapCode) {
                    Alert.alert("Error: Register Query", "The SAP Code you have logged in from is the same as the Sap code entered to raise query. Please enter other valid Sap code");
                  } else {
                    this.onOtherOptionSelected(enteredSapCode);
                  }
                }
              }}
            />
          </View>
        ) : null}
        <View style={styles.showBorder}>
          <Text style={styles.whiteTextStyle}>Query Group</Text>
          <TouchableOpacity style={styles.itemStyle}>
            <Item picker>
              <Picker
                mode="dropdown"
                placeholder="Select Query Group"
                iosIcon={<Icon name="ios-arrow-down" />}
                headerStyle={styles.iosPickerHeader}
                placeholderStyle={styles.whiteTextStyle}
                selectedValue={queryGroupIndex}
                onValueChange={value => this.onChangeQueryGroup(value)}
                textStyle={styles.whiteTextStyle}
              >
                <Picker.Item
                  color={colors.OTPText}
                  label="Select Query Group: "
                  value="-1"
                />
                {queryGroup.map((item, index) => (
                  <Picker.Item
                    label={item.queryGroupDescription}
                    value={index}
                    key={Math.random().toString()}
                    color={colors.OTPText}
                  />
                ))}
              </Picker>
            </Item>
          </TouchableOpacity>
        </View>

        <View style={styles.showBorder}>
          <Text style={styles.whiteTextStyle}>Query Type</Text>
          <TouchableOpacity style={styles.itemStyle}>
            <Item picker>
              <Picker
                iosIcon={<Icon name="ios-arrow-down" />}
                mode="dropdown"
                placeholder="Select Query Type:"
                headerStyle={styles.iosPickerHeader}
                placeholderStyle={styles.whiteTextStyle}
                // placeholderIconColor="#007aff"
                selectedValue={queryType}
                onValueChange={value => this.onChangeQueryType(value)}
                textStyle={styles.whiteTextStyle}
              >
                <Picker.Item
                  color={colors.OTPText}
                  label="Select Query Type:"
                  value="-1"
                />
                {array.map((item, index) => (
                  <Picker.Item
                    label={item.queryTypeDescription}
                    value={index}
                    key={Math.random().toString()}
                    color={colors.OTPText}
                  />
                ))}
              </Picker>
            </Item>
          </TouchableOpacity>
        </View>

        <View style={styles.showBorder}>
          <Text style={styles.whiteTextStyle}>Your Query</Text>
          <TextInput
            editable
            maxLength={8000}
            style={styles.queryForStyle}
            placeholderTextColor="#5d8dc9"
            placeholder="Max 8000 characters allowed to enter your query"
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            numberOfLines={4}
            value={yourQueryDesc}
            onChangeText={text => this.onYourQueryTextChange(text)}
          />
          <Text style={styles.whiteTextStyle}>
            Character so far :{(yourQueryDesc ? yourQueryDesc.length : 0)}/8000
         </Text>
        </View>

        <View style={styles.showBorder}>
          <Text style={styles.whiteTextStyle}>Attachment</Text>
          <View style={styles.attachmentStyle}>
            <Text style={styles.attachmentTextStyle}>
              {singleFile.uri ? singleFile.name : "Maximum upload image/pdf size: 5 MB"}
            </Text>
            <View style={styles.column}>
              < TouchableOpacity style={{ marginBottom: 10 }}>
                <Text style={styles.attachRemoveView} onPress={this.deleteSelectedFile}>
                  {singleFile.uri ? "Remove" : ""} </Text>
              </TouchableOpacity>
              < TouchableOpacity >
                <Text style={styles.attachRemoveView} onPress={this.previewSelectedFile.bind(this)}>
                  {singleFile.uri ? "View" : ""} </Text>
              </TouchableOpacity>
            </View>
          </View>

          {Platform.OS === "ios" ? this.showAttachmentPickerOptionForiOS() :
            <TouchableOpacity
              style={styles.btnBrowseStyle}
              onPress={this.SingleFilePicker.bind(this)}
            >
              <Text style={styles.resetPasswordtext}>Browse</Text>
            </TouchableOpacity>}
        </View>

        <View style={styles.transparentView}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={this.onSubmitRegisterQueryOKClick}
          >
            <Text style={styles.resetPasswordtext}>Submit</Text>
           </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={this.onCancelClick}
          >
            <Text style={styles.resetPasswordtext}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }

  render() {
    //console.log("EmployeeHelpDeskComponent this.props", this.props);
    const { registerQueryData } = this.props;
    const { selQueryBy, enteredSapCode, viewSelectedFile, singleFile } = this.state;
    const { registerSapInfo } = registerQueryData;
    let validSapCode = "";

    if (selQueryBy === "Others") {
      validSapCode = enteredSapCode;
    } else {
      validSapCode = this.getSapCode();
    }
    const navBarProps = this.getNavBarProps();
    return (
      <SafeAreaView style={appStyles.rootView}>
        <ImageBackground
          source={IMG_APP_BACKGROUND}
          style={appStyles.backgroundImageStyle}
        >
          <HeaderComponent />
          <NavBarComponent {...navBarProps} />
          <View style={{ flex: 1 }}>
            {viewSelectedFile === true ? (
              <AppFilePreview
                singleFileData={singleFile}
                type={singleFile.type}
                name={singleFile.name}
              />
            ) : (
                <ScrollView style={styles.marginBottom} indicatorStyle="white">
                  {this.renderRegisterQueryUI()}
                </ScrollView>
              )}

          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

EmployeeHelpDeskRegister.propTypes = {
  auth: PropTypes.shape({ root: PropTypes.string }).isRequired,
  registerQueryData: PropTypes.shape({
    registerSapInfo: PropTypes.object,
    queryGroup: PropTypes.array,
    registerQuerySuccessMsg: PropTypes.string
  }).isRequired,
  employeeRegisterQuery: PropTypes.func.isRequired,
  getRegisterSapData: PropTypes.func.isRequired,
  clearRegisterQuerySuccessMsg: PropTypes.func.isRequired
};

export default EmployeeHelpDeskRegister;
