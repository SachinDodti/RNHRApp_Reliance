import React, { Component } from "react";
import { View, Text } from "react-native";
import Pdf from "react-native-pdf";
import styles from "./Styles";

class NoticeBoardPdfView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pdfLink, type, name, description } = this.props;
    // console.log("type of format", type);
    const link = encodeURI(pdfLink);
    return (
      <View style={[styles.container]}>
        {/* <Text style={[styles.label, styles.showBorder]}>
      {getText(I18N_CONSTANTS.COMMON.NO_RESULT_FOUND)}
    </Text> */}
        {type === "Pdf" ? (
          <Pdf
            source={{
              uri: link,
              cache: true,
            }}
            style={styles.webContainerStyle}
            onError={error => {
              // console.log("Error while reloading pdf", error);
            }}
          />
        ) : (
          <View style={styles.parentView}>
            <Text style={[styles.confMessage]}>{name}</Text>
            <View style={[styles.btnViewContainer]}>
              <Text style={[styles.confMessage]}>{description}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
export default NoticeBoardPdfView;
