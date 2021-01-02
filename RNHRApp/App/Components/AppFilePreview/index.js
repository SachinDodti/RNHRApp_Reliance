import React, { Component } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import Pdf from "react-native-pdf";
import styles from "./Styles";
import { ScrollView } from "react-native-gesture-handler";



class AppFilePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { singleFileData, type, name } = this.props;
    const uri = encodeURI(singleFileData.uri);
   
    //const uri = singleFileData.uri; for android
  
    const source = {uri:uri,cache:true};
  
    const win = Dimensions.get('screen');
    return (
      <View style={[styles.container]}>
        {type.includes("pdf") ? (
          <Pdf
          source={source}
            style={styles.webContainerStyle}
            onError={error => {
               console.log("Error while reloading pdf", error);
            }}
          />
        ) : (
            <ScrollView >
              <Image style={{
                width: win.width,
                height: win.height,
              }} source={{ uri }} resizeMode="contain" />

            </ScrollView>
          )}
      </View>
    );
  }
}
export default AppFilePreview;
