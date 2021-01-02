import React, { Component } from "react";
import PropTypes from "prop-types";
import Popover from "react-native-popover-view";
import { ActivityIndicator } from "react-native";
import styles from "./SpinnerStyle";

class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { appState, cursorColor } = this.props;
    // console.log("Spinner App State : ", appState);
    const showSpinner = appState && appState.loadingCount > 0;
    // console.log('Inside Spinner render >> ', appState);
    return (
      <Popover
        isVisible={showSpinner}
        mode="js-modal"
        popoverStyle={styles.popOver}
      >
        <ActivityIndicator color={cursorColor} size="large" animating />
      </Popover>
    );
  }
}

Spinner.propTypes = {
  appState: PropTypes.shape({
    loadingCount: PropTypes.number,
  }).isRequired,
  cursorColor: PropTypes.string.isRequired,
};

export default Spinner;
