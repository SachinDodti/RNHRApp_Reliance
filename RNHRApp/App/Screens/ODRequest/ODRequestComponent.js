import React,{Component} from "react";
import {Container, Content ,Item ,Picker,Icon  } from "native-base";
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
  import {Actions } from "react-native-router-flux";
  import PropTypes from "prop-types";
  import HeaderComponent from "../../Components/HeaderComponent";
  import NavBarComponent from "../../Components/NavBarComponent";
  import {IMG_APP_BACKGROUND} from "../../Assets/images";
  import appStyles from "../../appStyles";
  import styles from "./Styles";
  import {STORAGE_KEY} from "../../Util/LocalStorage";
  import HrAppUtil from "../../Util/HrAppUtil";
  import AutoScrolling from "react-native-auto-scrolling";
  import DatePicker from 'react-native-datepicker';
  import ApplicationConfiguration from "../..//Config/env";
  import I18N_CONSTANTS from "../../I18n/LanguageConstants";
  import {getText} from "../../I18n/Lang";

  const colors = require("../../Config/config");

  class ODRequest extends Component {
      constructor(props){
          super(props);
          this.state = {
            odMinDate:undefined,
            odMaxDate:undefined,
            odDateFrm: undefined,
            odDateTo: undefined,

            odTpyeIndex: -1,
            odTpyeName: undefined,
            odTpyeId: undefined,

            odReasonIndex: -1,
            odReasonName: undefined,
            odReasonId: undefined,

            yourCommentDesc: ""
           
       
          }
      }

      async componentDidMount(){
        const { getODRuleEngin , getODType, getODReason } = this.props;
        const requestData = {sapCode:this.getSapCode()}
        await getODRuleEngin(requestData);
        await getODType(requestData);
        await getODReason(requestData);

      }

    

      shouldComponentUpdate(){

        const { odRuleEngine } = this.props;      
        const { OdRuleEngineInfo ,OdTypeInfo, OdReasonInfo} = odRuleEngine; 
        const { Response } = OdRuleEngineInfo;       
        const { odMinDate, odMaxDate, odDateFrm,odDateTo } = this.state;

        let startDateFormat=''
        let endDateFormat=''
        try{

          let startDate = Response[0].StartDate.split("T")
           startDateFormat = startDate[0]

          this.setState({ odMinDate: startDateFormat })
        
          let endDate = Response[0].EndDate.split("T")
           endDateFormat = endDate[0]
         this.setState({ odMaxDate: endDateFormat })

        }catch(ex){

        }


        return true;
       }

      getMarqueeComp() {
        const { odRuleEngine } = this.props;      
        const { OdRuleEngineInfo ,OdTypeInfo, OdReasonInfo} = odRuleEngine; 
        const { Response } = OdRuleEngineInfo;
       
   

        
        let startDateString =''
        let endDateString =''
        let startDateFormat=''
        let endDateFormat=''
        try{

          let startDate = Response[0].StartDate.split("T")
           startDateFormat = startDate[0]

          let endDate = Response[0].EndDate.split("T")
           endDateFormat = endDate[0]
     
       
           startDateString = HrAppUtil.getDateFormat(
            startDateFormat,
            ApplicationConfiguration.dateFormat.DETAIL_SHORT_FORMAT,
            "DD-MMM-YYYY"
            );

          endDateString = HrAppUtil. getDateFormat(
          endDateFormat,
          ApplicationConfiguration.dateFormat.DETAIL_SHORT_FORMAT,
          "DD-MMM-YYYY"
          );

        }catch(ex){

        }

       
        
    

        const  announcement = "OD Request will be accepted between " + startDateString + " to "+ endDateString
        return (
          <AutoScrolling>
            <Text style={styles.textScroll}>{announcement}</Text>
          </AutoScrolling>
        );
      }

      onYourQueryTextChange = text => {
        this.setState({ yourCommentDesc: text });
      };
    

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
    

    renderOdUI(){
      const {
        odMinDate,
        odMaxDate,
        odDateFrm,
        odDateTo,
        odTpyeIndex,
        odReasonIndex,
        yourCommentDesc
        
    } = this.state;

      const { odRuleEngine } = this.props;
      const { OdRuleEngineInfo ,OdTypeInfo, OdReasonInfo} = odRuleEngine;
      const  ODTypeList = OdTypeInfo.Response;
      const  ODReasonList = OdReasonInfo.Response;

      return   <View style={styles.buttonViewL} >

                     <View style={styles.showBorder}>
                          <Text style={styles.whiteTextStyle}>To OD Request please enter below details</Text>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} >
                              <DatePicker
                                  style={{ width: 150 }}
                                  date={odDateFrm} //initial date from state
                                  mode="date" //The enum of date, datetime and time
                                  placeholder="From Date"
                                  format="YYYY-MM-DD"
                                  minDate={odMinDate}
                                  maxDate={odMaxDate}
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
                                      if (!this.checkDateValidation(date, odDateTo)) {
                                          this.setState({ odDateFrm: date });
                                      }
                                  }}
                              />
                              <DatePicker
                                style={{ width: 150, marginLeft: 12 }}
                                date={odDateTo} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="To Date"
                                format="YYYY-MM-DD"
                                minDate={odMinDate}
                                maxDate={odMaxDate}
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
                                    if (!this.checkDateValidation(odDateFrm, date)) {
                                        this.setState({ odDateTo: date });
                                    }
                                }}
                            />

                        </View>

                        <View style={styles.showBorder}>
                                <Text style={styles.whiteTextStyle}>OD Type</Text>
                                <TouchableOpacity style={styles.itemStyle}>
                            <Item picker>
                              <Picker
                                mode="dropdown"
                                placeholder="Select OD Type."
                                headerStyle={styles.iosPickerHeader}
                                placeholderStyle={styles.whiteTextStyle}
                                selectedValue={odTpyeIndex}
                                onValueChange={value => this.onChangeODTpye(value)}
                                textStyle={styles.whiteTextStyle}
                            >
                                <Picker.Item
                                    color={colors.OTPText}
                                    label="Select OD Type."
                                    value="-1"
                                />
                                { ODTypeList ? ODTypeList.map((item, index) => (
                                  <Picker.Item
                                        label={item.Name}
                                        value={index}
                                        key={Math.random().toString()}
                                        color={colors.OTPText}
                                    />
                                )) : <Picker.Item
                                        color={colors.OTPText}
                                        label="All"
                                        value="-1"
                                    />
                                    
                                    }
                            </Picker>
                        </Item>
                    </TouchableOpacity>
                </View>




                                    <View style={styles.showBorder}>
                                                  <Text style={styles.whiteTextStyle}>OD Reason</Text>
                                                  <TouchableOpacity style={styles.itemStyle}>
                                              <Item picker>
                                                <Picker
                                                  mode="dropdown"
                                                  placeholder="Select OD Reason."
                                                  headerStyle={styles.iosPickerHeader}
                                                  placeholderStyle={styles.whiteTextStyle}
                                                  selectedValue={odReasonIndex}
                                                  onValueChange={value => this.onChangeODReason(value)}
                                                  textStyle={styles.whiteTextStyle}
                                              >
                                                  <Picker.Item
                                                      color={colors.OTPText}
                                                      label="Select OD Reason."
                                                      value="-1"
                                                  />
                                                  { ODReasonList ? ODReasonList.map((item, index) => (
                                                    <Picker.Item
                                                          label={item.Name}
                                                          value={index}
                                                          key={Math.random().toString()}
                                                          color={colors.OTPText}
                                                      />
                                                  )) : <Picker.Item
                                                          color={colors.OTPText}
                                                          label="All"
                                                          value="-1"
                                                      />
                                                      
                                                      }
                                              </Picker>
                                          </Item>
                                      </TouchableOpacity>
                                  </View>
                                  </View>

                            <View style={styles.showBorder}>
                                <Text style={styles.whiteTextStyle}>Your Comment</Text>
                                <TextInput
                                  editable
                                  style={styles.queryForStyle}
                                  placeholderTextColor="#5d8dc9"
                                  placeholder="Enter Comment"
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  multiline
                                  numberOfLines={4}
                                  value={yourCommentDesc}
                                  onChangeText={text => this.onYourQueryTextChange(text)}
                                />
                            
                            </View>


                            <View style={styles.transparentView}>
                                <TouchableOpacity
                                  style={styles.btnStyle}
                                  onPress={this.onSubmitRegisterQueryOKClick}
                                >
                                  <Text style={styles.resetPasswordtext}>Apply</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={styles.btnStyle}
                                // onPress={this.onCancelClick}
                                >
                                  <Text style={styles.resetPasswordtext}>Cancel</Text>
                                </TouchableOpacity>
                             </View>
           
           
           
            </View> 
      

    }

    onChangeODTpye(value) {
    const { odRuleEngine } = this.props;
      const { OdRuleEngineInfo ,OdTypeInfo, OdReasonInfo} = odRuleEngine;
      const  ODTypeList = OdTypeInfo.Response;

      const ID = ODTypeList ? ODTypeList[value].ID : '';
      const Name = ODTypeList ? ODTypeList[value].Name : '';


      if (value > -1) {
        this.setState({
          odTpyeIndex: value,
          odTpyeName:Name,
          odTpyeId:ID
        });
      }
    }

    onChangeODReason(value){


      const { odRuleEngine } = this.props;
      const { OdRuleEngineInfo ,OdTypeInfo, OdReasonInfo} = odRuleEngine;

      const  ODReasonList = OdReasonInfo.Response;


      const ID = ODReasonList ? ODReasonList[value].ID : '';
      const Name = ODReasonList ? ODReasonList[value].Name : '';


      if (value > -1) {
        this.setState({
          odReasonIndex: value,
          odReasonName: Name,
          odReasonId: ID,
        });
      }
    }


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
  

    onSubmitRegisterQueryOKClick = () => {

      const { applyODRequest } = this.props;
      const {
            odDateFrm,
            odDateTo,
            odTpyeIndex,
            odTpyeName,
            odTpyeId,
            odReasonId,
            odReasonName,
            yourCommentDesc
      } = this.state;
      const loggedInUser = this.getSapCode();
      let validSapCode = "";
       validSapCode = loggedInUser;

      if(HrAppUtil.isNullOrEmpty(odDateFrm)){
        Alert.alert("Apply OD", "Please enter From Date.");
      }
      else if(HrAppUtil.isNullOrEmpty(odDateTo)){
        Alert.alert("Apply OD", "Please enter To Date.");
      }
      else if (HrAppUtil.isNullOrEmpty(odTpyeId)){
        Alert.alert("Apply OD", "Please select OD Type");
      }
      else if(HrAppUtil.isNullOrEmpty(odReasonId)){
        Alert.alert("Apply OD", "Please select OD Reason");
      }
      else{
        const odRequest = {
          SapCode: validSapCode,
          FromDate:odDateFrm,
          ToDate:odDateTo,
          ODReason:odReasonName,
          ODReasonID:odReasonId,
          ODType:odTpyeName,
          Comment:yourCommentDesc
        };

        applyODRequest(odRequest);
      }

 
     
  
    };



      render(){  
        const navBarProps = this.getNavBarProps();
          return(
            <SafeAreaView style={appStyles.rootView}>
              <ImageBackground
                 source={IMG_APP_BACKGROUND}
                style={appStyles.backgroundImageStyle}>
              <HeaderComponent />
              <NavBarComponent {...navBarProps} />
              <View style={[styles.groupTitle]}>
                 <Text style={[styles.textFormat]}>OD Request</Text>
              </View>

                    <View style={styles.AttenUpperTileScrollView}>
                              {this.getMarqueeComp()}
                    </View> 

                    <ScrollView style={styles.marginBottom} indicatorStyle="white">
                        {this.renderOdUI()}
                    </ScrollView>


                     
              </ImageBackground>  
            </SafeAreaView>
          )
      }


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

      getSapCode =() => {
        const {localStore,auth} = this.props;
        const loggedInUser = 
        auth.useProfile ||
        (!HrAppUtil.isNullOrEmpty
          (localStore
              [STORAGE_KEY.USER.LOGGEDIN_USER])
              ? HrAppUtil.parse(
                  localStore[STORAGE_KEY.USER.LOGGEDIN_USER]
              ):{});
  
              const sapCode = loggedInUser
              ? loggedInUser.sapCode || loggedInUser.panNo
              :"DUMMY";
              return sapCode;
    };
  }


  ODRequest.propTypes = {
   
    odRuleEngine: PropTypes.shape({
      OdTypeInfo: PropTypes.object,
        
    }).isRequired,

   

};
 

  export default ODRequest;

    