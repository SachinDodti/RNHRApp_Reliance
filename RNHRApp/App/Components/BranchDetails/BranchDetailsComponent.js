import React, { Component } from "react";
import { View, ScrollView, SafeAreaView, FlatList, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./Styles";
import BranchViewComponent from "./BranchViewComponent";

class BranchDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPaneExpand = this.onPaneExpand.bind(this);
  }

  onPaneExpand(isExpanded, refId) {
    const newStateValue = {};
    newStateValue[refId] = isExpanded;
    this.setState(newStateValue);
  }

  getRefId = item => `S${item.code}`;

  getBranchView = item => (
    <BranchViewComponent
      getRefId={this.getRefId}
      onPaneExpand={this.onPaneExpand}
      item={item}
      sendAddress={this.sendAddress}
    />
  );

  sendAddress = sceneProp => {
    // console.log("sceneProp", sceneProp);
    const shareBranchInfo = {
      emailAddress: sceneProp.emailAddress,
      locateBranches: {
        address: sceneProp.addresss,
        // code: sceneProp.code,
        contactNumber: sceneProp.contactNumber,
        contactPerson: sceneProp.contactPerson,
        email: sceneProp.email,
        location: {
          latitude: "",
          longitude: "",
        },
        name: sceneProp.name,
      },
      mobileNo: sceneProp.mobileNo,
    };
    // console.log("shareBranchInfo", shareBranchInfo);
    const { shareBranchDetails } = this.props;
    shareBranchDetails(shareBranchInfo);
  };

  renderBranchDetails = ({ item }) => (
    <View>{item.address !== "NULL" ? this.getBranchView(item) : null}</View>
  );

  render() {
    const { branchDetails } = this.props;
    // console.log("inside branch block", branchDetails);

    return (
      <SafeAreaView style={styles.flex}>
        <ScrollView style={[styles.appContainer]} indicatorStyle="white">
          {branchDetails.length > 0 &&
          branchDetails.length === 1 &&
          branchDetails[0].address === "NULL" ? (
              <Text style={styles.noDataFound}>No Data Found</Text>
            ) : (
              <FlatList
                extraData={this.state}
                data={branchDetails}
                renderItem={this.renderBranchDetails}
                ItemSeparatorComponent={this.renderSeparator}
              />
            )}
          {/* <FlatList
            extraData={this.state}
            data={branchDetails}
            renderItem={this.renderBranchDetails}
            ItemSeparatorComponent={this.renderSeparator}
          /> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

BranchDetailsComponent.propTypes = {
  branchDetails: PropTypes.objectOf(PropTypes.object).isRequired,
  shareBranchDetails: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BranchDetailsComponent;
