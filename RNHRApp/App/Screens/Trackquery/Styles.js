import { StyleSheet, Dimensions } from "react-native";

import { getDeviceFontSize } from "../../Util/Resolution";

const colors = require("../../Config/config");

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    buttonViewL: {
        flex: 1,
        marginTop: 4,
        marginRight: 3,
        marginLeft: 3,
        marginBottom: 5,
        borderWidth: 0.2,
        borderRadius: 7,
        padding: 10
    },
    blurBackground: {
        backgroundColor: colors.transparentPopover
    },
    transparentView: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.transparentPopover,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    height: {
        height: 100
    },
    placeholderStyle: {
        color: colors.locationDirectoryPopover,
        fontSize: 17
    },
    whiteTextStyle: {
        color: colors.white,
        padding: 5
    },
    buttonViewR: {
        flex: 1,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 20,
        borderWidth: 1.2,
        borderColor: colors.white,
        borderRadius: 7,
        width: 160
    },
    headerContainer: {
        backgroundColor: colors.backgroundColor,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    headingContainer: {
        backgroundColor: colors.tabBackground,
        height: 40,
        flexDirection: "row"
    },
    imgView: {
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    imgPosition: {
        marginRight: 0,
        resizeMode: "contain",
        height: 40,
        marginTop: 15,
        justifyContent: "flex-start",
        position: "absolute"
    },
    textView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    textHeader: {
        textAlign: "left",
        paddingLeft: 65,
        fontSize: 20,
        color: colors.white
    },
    listView: {
        padding: 5,
        flexDirection: "row",
        marginTop: 8,
    },
    scrolListView: {
        height: 55,
        flexDirection: "row",
        marginTop: 2,
    },
    column: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    textId: {
        textAlign: "left",
        paddingLeft: 20,
        // fontWeight: 'bold',
        color: colors.placeHolderTextColor,
        flexWrap: "wrap",
        fontFamily: "VAGRoundedStd-Light",
    },
    nameText: {
        textAlign: "left",
        paddingLeft: 20,
        fontWeight: "bold",
        color: colors.placeHolderTextColor
    },
    nameTextUnderLine: {
        textAlign: "left",
        paddingLeft: 20,
        fontWeight: "bold",
        color: colors.placeHolderTextColor,
        textDecorationLine: 'underline',
    },
    dropdownImgView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    dropdownImgPos: {
        marginRight: 0,
        resizeMode: "contain",
        height: 10,
        marginTop: 15,
        justifyContent: "flex-end",
        position: "absolute"
    },

    imgPhContainer: {
        alignItems: "center",
        padding: 15
    },
    imgPh: {
        width: 150,
        height: 150
    },
    txtStyle: {
        alignSelf: "center",
        fontFamily: "VAGRoundedStd-Light",
        fontSize: 23,
        color: colors.placeHolderTextColor,
        paddingTop: 16
    },
    txtStyle1: {
        alignSelf: "center",
        fontFamily: "VAGRoundedStd-Light",
        fontSize: 23,
        color: colors.placeHolderTextColor,
        paddingTop: 11
    },
    textStyle: {
        margin: 24,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    itemStyle: {
        marginTop: 2,
        borderColor: colors.white,
        borderWidth: 0.5,
        borderRadius: 10,
        fontFamily: "VAGRoundedStd-Light",
        fontSize: 16,
        height: 50,
        paddingLeft: 12,
        color: colors.OTPText
    },
    marginBottom: {
        marginBottom: height / 9.5
    },
    showBorder: {
        borderColor: colors.tileBorderColor,
        borderBottomWidth: 1,
        marginTop: 2,
        paddingBottom: 2
    },
    tileItemAppearence: {
        justifyContent: "center"
    },
    dark: {
        backgroundColor: colors.navBarBackground
    },
    light: {
        backgroundColor: colors.tabBackground
    },
    queryForStyle: {
        // marginRight: 5,
        borderColor: colors.white,
        borderWidth: 0.5,
        borderRadius: 10,
        fontFamily: "VAGRoundedStd-Light",
        fontSize: 14,
        height: 120,
        paddingLeft: 12,
        color: colors.white
    },
    resetPasswordtext: {
        padding: 10,
        marginRight: 10,
        justifyContent: "center",
        alignSelf: "center",
        // alignSelf: "stretch",
        color: colors.placeHolderTextColor,
        fontFamily: "VAGRoundedStd-Black",
        fontSize: 14
    },
    btnStyle: {
        marginTop: 20,
        marginRight: 10,
        padding: 5,
        justifyContent: "center",
        width: 150,
        alignSelf: "center",
        borderRadius: 25,
        borderColor: colors.white,
        borderWidth: 1,
        backgroundColor: colors.btnLoginBackground
    },

    btnBrowseStyle: {
        marginTop: 20,
        marginRight: 10,
        padding: 5,
        width: 150,
        alignSelf: "flex-end",
        borderRadius: 25,
        borderColor: colors.white,
        borderWidth: 1,
        backgroundColor: colors.btnLoginBackground
    },
    attachmentStyle: {
        marginTop: 10,
        borderColor: colors.white,
        borderWidth: 0.5,
        borderRadius: 10,
        fontFamily: "VAGRoundedStd-Light",
        fontSize: 14,
        height: 50,
        paddingLeft: 12,
        color: colors.white,
        flexDirection: "row"
    },
    attachmentTextStyle: {
        color: colors.OTPText,
        alignContent: "flex-start",
        height: "100%",
        fontSize: 16
    },
    blueTextStyle: {
        color: colors.OTPText,
        padding: 5,
        fontSize: 16,
        fontFamily: "VAGRoundedStd-Light"
    },
    tileIcon: {
        resizeMode: "contain",
        width: 30,
        marginLeft: 15,
        justifyContent: "flex-start"
        // position: 'absolute',
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 3
    },
    textSingle: {
        paddingRight: 40,
        color: colors.white,
        textAlign: "left",

        fontSize: 18,
        // lineHeight: 72,

        flexWrap: "wrap",

        justifyContent: "center",
        alignItems: "center",

        marginLeft: 25,
        marginRight: 25
    },
    tileItemAppearence2: {
        height: 100,
        width: "45.7%"
    },
    titleRow: {
        flex: 1,
        flexDirection: "row"
    },
    tileIcon2: {
        resizeMode: "center",
        width: 30,
        marginLeft: 10,
        paddingTop: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start"
        // position: 'absolute',
    },
    textContainerTile: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    textSingleRow: {
        paddingLeft: 10,
        color: colors.white,
        textAlign: "left",
        width: "98%",
        fontSize: 18,
        // lineHeight: 72,

        flexWrap: "wrap"
    },
    groupTitle: {
        // backgroundColor: colors.groupTitleBackgroup,
        borderBottomWidth: 1,
        borderBottomColor: colors.groupTileHeader
    },
    textFormat: {
        color: colors.groupTileHeader,
        textAlign: "center",
        fontSize: getDeviceFontSize(16),
        // fontWeight: 'bold',
        // alignItems: 'flex-start',
        //  flex: 100,
        lineHeight: 60
    },
    itemView: {
        margin: 10,
        marginBottom: 10,
        marginTop: 0,
        marginRight: 2,
        flexDirection: "row"
    },
    appContainer: {
        marginTop: 10
    },
    //Trans list view
    transparentListView: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        opacity: 0.2
    },


    columnL: {
        flex: 1,
       
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },

    actionButton:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    
    columnR: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },
    scrollViewParent: { flex: 1 },
    icon: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
    textBottom: {
        bottom: 0,
        textAlign: "left",
        padding: 10,
        marginTop: 5,
        backgroundColor: colors.OTPText,
        height: "15%"
    },
    iosPickerHeader: {
        marginTop: 70
    }
});

export default styles;
