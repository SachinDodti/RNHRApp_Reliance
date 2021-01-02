import { StyleSheet, Dimensions } from "react-native";

import { getDeviceFontSize } from "../../Util/Resolution";

const colors = require("../../Config/config");

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({

    showBorder: {
        borderColor: colors.tileBorderColor,
        borderBottomWidth: 1,
        marginTop: 2,
        paddingBottom: 2
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
        lineHeight: 60
    },
    AttenUpperTileScrollView: {
        margin: 10,
        marginBottom: -5,
        // marginBottom: 0.5,
        height: 30,
        backgroundColor: colors.navBarBackground,
        flexDirection: "row",
      },
      textScroll: {
        // paddingBottom: 10,
        color: colors.white,
        paddingTop: 5,
      },
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
    showBorder: {
        borderColor: colors.tileBorderColor,
        borderBottomWidth: 1,
        marginTop: 7,
        paddingBottom: 2
    },
    whiteTextStyle: {
        color: colors.white,
        padding: 5
    },
    marginBottom: {
        marginBottom: height / 9.5
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
    iosPickerHeader: {
        marginTop: 70
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
      transparentView: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.transparentPopover,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
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
      },resetPasswordtext: {
        padding: 10,
        marginRight: 10,
        justifyContent: "center",
        alignSelf: "center",
        // alignSelf: "stretch",
        color: colors.placeHolderTextColor,
        fontFamily: "VAGRoundedStd-Black",
        fontSize: 14
      }
    
});

export default styles;