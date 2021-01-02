import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  UIManager,
} from "react-native";
import PropTypes from "prop-types";
import { Divider } from "react-native-elements";
import appStyles from "../../appStyles";
import { Collapse, CollapseHeader, CollapseBody } from "../Collapsible";
import { IMG_ICON_CALL } from "../../Assets/images";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import styles from "./Styles";

const IMG_DEFAULT_OPEN_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABECAYAAADgHze4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKgGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE5LTA2LTI1VDE0OjQ0OjEyKzA1OjMwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxOS0wNi0yNVQxNDo0NDoxMiswNTozMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE5LTA2LTI1VDE0OjQ0OjEyKzA1OjMwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUyYTgwZWI0LTE2NmMtNDc0ZS1hMjVkLTRjNTQxZjRiMDUxYzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDYtMjVUMTQ6NDQ6MTIrMDU6MzA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZTJhODBlYjQtMTY2Yy00NzRlLWEyNWQtNGM1NDFmNGIwNTFjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTktMDYtMjVUMTQ6NDQ6MTIrMDU6MzA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MmY0NDE2YjQtZTA2Yi1jNDRlLWIwZDgtMzc5MTg5NWMxN2I1PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoyZjQ0MTZiNC1lMDZiLWM0NGUtYjBkOC0zNzkxODk1YzE3YjU8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmMTg0NzBhNi0xNzRjLTZjNDUtODA2My0wZmU5YTNhYTNkNzA8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkJhZz4KICAgICAgICAgPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgrLEyiwAAADsElEQVRoBb2az0sWQRjHZ0azBPeVjMBDdIpunuoSWIcIIpQobYW0S+CbRRJB1K0/oU5FvfjWKTsor2YpVNCpCDzUIa/dhIoIw3f9lb3vTM+z5rrvOvu+7+4848Lyzs7uO9/PzsxHZveVt7hP9wtZfq4YP8WYmpOicWB5/PIc26FNCCkfboRjIu8AmLd73dzBHcpnQjF2NhLWXpJium3gWSZSb+VQQKu4Rzbesb72Z4y5Yw2RE+SHGP5a1ypn6nRGLj7QnaOsE6WSuA4N/tA1CnPjqtMzckt3jqqOY0Ot7sgRKdl7mITNmoYl1PV6hcEXmnPGVT4AtuL05s/BRwF2zZxQq0Kw44vj2U94LeUWhPl3qNQdfeO8WUo+bUPPAACDvYnsPZh8j/UQzIqeFQAYXBStwzD53ugh6PXcBsDG+8pNe3b34Z9lHQS1ntsBIHVh9FKxUchuKFrXM7BAd7c7oWdVAISyrad2CMK9YVvPmgAIY1PPugAQwpaedQPY0rN+AOgFG3rWtAC7P7pR6pkKAIGo9Ew0BOGeoNIzNQDCUOhpBIAQpnoaA5jqaQ4AvWCiZ2oLsPujWxo9SQEQKKmeJEMQ7omkepIDIEwSPcmHIOgNeK5skd4MriGDulABF75LwumyBwBh+IT9d231Az72h7K3ipzdtgqASfgwU5INs1Bs30oOSl+tA2CU4z45xqT6GMSGClYmYah9KCoO4dcq64KjZesvIFouHLjLGb8ZRIYLnL+0OgSZnnw/3P9oODNU9piUR631AIx7J4RNwK7LkFyy895kdtbKHMi4+UMw7vhCoyl0x0FRMTVcnBz0Xw2RA0B4m5JsBtL2BYmVhftLheyjzSpaAHesCcInofHDmwGRzylPZCpeghACKO7IYh4CT0RC/UPo9s/OerkfFzDh87oJEj5fd7mabqDafFnJkwtTQ7+jDZJoWEs3yVTnciH7JRqOx8YAvm5SvYO2dDMedevanPE6AKM5kEQ3XTjWpQZIqhstQArdCAHS6RYHkFjDtLrFASSywEQ3YwBT3eIA6rKAQrfUAFS6pQMg1C0FAK1ucQCxGlLrFgeg1dCGbnUD2NItDqBCQ5u61QSwrVt1gCu5XUkXk3ENJq33h8D5JW7AFxMtJpMGxV3vA3DOz+guAEXmpZLd314NrejOU9T5APDbbMVS+X/DXpmp7pWJoe8UQXFtbFjA2VTkAlxM9sWtZCPXGh36AEs8k4N/ZMCf6tdhofwT3t9crLaSNUqMfPkf/78J++lx0zAAAAAASUVORK5CYII=";
const IMG_DEFAULT_CLOSE_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAgCAYAAACrdt7+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTI2VDE4OjExOjAyKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTI2VDE4OjExOjAyKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0yNlQxODoxMTowMiswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzU2ZGYxNC1hZDIwLTkwNDEtODYwZi1lYTlmZmUzODYxNTUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmMWIyYWEyZC0yZTZiLTY3NDEtYjdhMy0xMDAyODdlNzNkYjAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNWQ2YzhhZC1lZjQ4LWVhNDMtOTI2MC02ZGEzYzU5MzJkZjciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNWQ2YzhhZC1lZjQ4LWVhNDMtOTI2MC02ZGEzYzU5MzJkZjciIHN0RXZ0OndoZW49IjIwMTktMDYtMjZUMTg6MTE6MDIrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Mjc1NmRmMTQtYWQyMC05MDQxLTg2MGYtZWE5ZmZlMzg2MTU1IiBzdEV2dDp3aGVuPSIyMDE5LTA2LTI2VDE4OjExOjAyKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3Pj3XAAAAjBJREFUaIHl1T2MTFEYh/Hfzm4kChI0GirRqVYiEqshIZEwstEQrW8VSo0aEYmsQqOgEBKEIKIiPgoK26ooqERIKGQ3ijs3xmbuO3dm7j0zG091c95zzn3zzznnGVs2fc1/yhpcwU7M4z6OT2Ach7Gn9f0Il/F7OH0mYRIPsLptbB9WTOASTrQVtmE39uJrogZT0sRNLO1Q297AoQ6FrXiFdfX1NRRO4Y7OYcBsA98KiuvxGluq7ys545jBeTQK5nzBgQZOyh6VTqzCM+yvusOELMdDHAnmzGKT1gm5hV34UTB5CW7gLMaq6zMJa/ECO4I5T2S34CN/j8/j1uCnYOE5XJcFtBiYxBtsCOZclR2G7/lA+316Lzs274INDuIpVvbdZhqaeO5frbYzj9M4irn2wsIH5jOmcC/42agbqJtJfmEaFzoVO724P1sLLgY/HUUDlTXJFO4WbVK0cE6W9DGLw0C9mORttFFRIDkzRt9APZskolsgjLaB+jJJRJlAGE0DNfVpkoiygTBaBhrIJBG9BMLwDVSJSSJ6DYThGagyk0T0E0hOSgNVapKIQQIhjYEqN0nEoIFQr4GaajBJRBWBUI+BajNJRFWBUJ2BajdJRJWBMLiBkpgkoupAcvoxUDKTRNQVCL0ZaLOEJomoMxDKG+ilhCaJqDsQyhmoiFpMEpEiEMoZaCG1mSQiVSCUM1BOrSaJSBlITjcD1W6SiGEEQmagjbgtu07wAWckMEnEH9Ydsz78AbLwAAAAAElFTkSuQmCC";

const { State: TextInputState } = TextInput;

class BranchViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MobileNo: "",
      EmailId: "",
      mandatoryAppsExpanded: false,
      optionalAppsExpanded: false,
      shift: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow,
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  updateMobileNo = val => {
    this.setState({
      MobileNo: val,
    });
  };

  updateEmailId = val => {
    this.setState({
      EmailId: val,
    });
  };

  resetData = () => {
    this.textInputMobileNo.setNativeProps({ text: "" });
    this.textInputEmail.setNativeProps({ text: "" });
  };

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      },
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { item, getRefId, onPaneExpand, sendAddress } = this.props;
    const { shift } = this.state;
    // console.log("state", this.state);
    return (
      <View style={[styles.viewContainer]}>
        <Animated.View
          style={[styles.container, { transform: [{ translateY: shift }] }]}
        >
          <View>
            <Animated.View
              style={[styles.container, { transform: [{ translateY: shift }] }]}
            >
              <Collapse
                styles={[styles.collapse]}
                isCollapsed={this.state[getRefId(item)]}
                refId={getRefId(item)}
                onToggle={onPaneExpand}
                showIcons
                openIcon={IMG_DEFAULT_OPEN_ICON}
                closedIcon={IMG_DEFAULT_CLOSE_ICON}
              >
                <CollapseHeader style={[styles.collapseHeader]}>
                  <View style={[styles.headerContainer]}>
                    <View style={[styles.headerText]}>
                      <Text style={[styles.disclaimer]}>{item.address}</Text>
                    </View>
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <View>
                    <TextInput
                      style={styles.mobileText}
                      onChangeText={this.updateMobileNo}
                      placeholder="Mobile Number"
                      ref={component => (this.textInputMobileNo = component)}
                      numeric
                      keyboardType="number-pad"
                      maxLength={10}
                    />
                  </View>
                  <Text style={styles.middletext}>Or</Text>
                  <View>
                    <TextInput
                      style={styles.emailText}
                      autoCapitalize="none"
                      onChangeText={this.updateEmailId}
                      placeholder="Email Address"
                      ref={component => (this.textInputEmail = component)}
                    />
                  </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={[appStyles.button, appStyles.buttonWarning]}
                      onPress={this.resetData}
                    >
                      <Text
                        style={[
                          appStyles.txtWarning,
                          appStyles.font14,
                          appStyles.boldText,
                        ]}
                      >
                        {getText(I18N_CONSTANTS.COMMON.RESET)}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[appStyles.button, appStyles.buttonSuccess]}
                      onPress={() => {
                        const { EmailId, MobileNo } = this.state;
                        let sceneProp = {};
                        sceneProp = {
                          ...sceneProp,
                          addresss: item.address,
                          code: item.code,
                          contactNumber: item.contactNumber,
                          contactPerson: item.contactPerson,
                          email: item.email,
                          location: {
                            latitude: item.latitude,
                            longitude: item.longitude,
                          },
                          name: item.name,
                          emailAddress: EmailId,
                          mobileNo: MobileNo,
                        };
                        sendAddress(sceneProp);
                      }}
                    >
                      <Text
                        style={[
                          appStyles.txtSuccess,
                          appStyles.font14,
                          appStyles.boldText,
                        ]}
                      >
                        {getText(I18N_CONSTANTS.COMMON.PROCEED)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </CollapseBody>
              </Collapse>
              {item.contactNumber != null ? (
                <View style={styles.contactView}>
                  <Image style={styles.phoneImg} source={IMG_ICON_CALL} />
                  <Text style={styles.phoneNoText}>{item.contactNumber}</Text>
                </View>
              ) : null}
              <Divider
                style={[
                  appStyles.dividerStyle,
                  appStyles.margin20,
                  styles.marginUnderkine,
                ]}
              />
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

BranchViewComponent.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  getRefId: PropTypes.objectOf(PropTypes.object).isRequired,
  onPaneExpand: PropTypes.objectOf(PropTypes.object).isRequired,
  sendAddress: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BranchViewComponent;
