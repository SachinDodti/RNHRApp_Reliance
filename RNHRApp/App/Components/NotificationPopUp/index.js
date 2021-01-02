import React, { Component } from "react";
import PropTypes from "prop-types";
import Popover from "react-native-popover-view";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  Platform,
  Linking
} from "react-native";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/AntDesign";
import { Snackbar } from "react-native-paper";
import styles from "./Styles";
import { IMG_ICON_CLOSE } from "../../Assets/images";
import HrAppUtil from "../../Util/HrAppUtil";


class NotificationPopUp extends Component {
  constructor(props) {
    super(props);
    this.backToLogin = this.backToLogin.bind(this);
    this.birthdayWish = this.birthdayWish.bind(this);
    this.state = {
      showNotificationPopUp: false,
      notificationMessage: ""
      // showSnack: false
    };
    this.actionOnDismiss = this.actionOnDismiss.bind(this);
  }

  deleteNotification = notificationId => {
    const { deleteNotification } = this.props;
    deleteNotification(notificationId);
    // this.setState({ showSnack: true });
  };

  updateNotificationStatus = (
    notificationId,
    notificationMsg,
    notificationTitle,
    notificationType,
    notificationByName //Used for HR Helpdesk query no.
  ) => {
    const {
      updateNotification,
      getAllNotifications,
      closePopUp,
      logActivity
    } = this.props;
    console.log("updateNotificationStatus", notificationMsg);
    updateNotification(notificationId);
    this.setState({
      showNotificationPopUp: true,
      notificationMessage: notificationMsg
    });
    if (
      notificationType === "Birthday Manager Notify" ||
      notificationType === "Anniversary Manager Notify" ||
      notificationType === "NoticeBoard" ||
      notificationType === "iBelong" ||
      notificationType === "EmployeeHelpDesk" ||
      notificationType === "Forced Notification" ||
      notificationType === "R&R"
    ) {
      let notificationTypeValue = notificationType;
      if (notificationTypeValue === "Forced Notification") {
        notificationTypeValue = "NoticeBoard"
      }
      HrAppUtil.actionableNotificationNavigation(notificationTypeValue, logActivity, notificationByName);
      closePopUp();
    }
    // getAllNotifications();
    else {
      Alert.alert(notificationTitle, notificationMsg, [
        {
          text: "OK",
          onPress: () => { }
        }
      ]);
    }
  };

  renderNotification = notificationItem => {
    console.log("NotificationPopUp renderNotification", notificationItem);
    const unRead =
      notificationItem.item.notificationRead &&
      notificationItem.item.notificationRead === "N";
    console.log("NotificationPopUp renderNotification unreada xount", unRead);
    if (notificationItem.item.isActive) {
      return (
        <View style={unRead ? styles.unReadStyle : styles.readStyle}>
          <View style={styles.notificationMessageContainer}>
            <TouchableOpacity
              onPress={() =>
                this.updateNotificationStatus(
                  notificationItem.item.appNotificationId,
                  notificationItem.item.body,
                  notificationItem.item.title,
                  notificationItem.item.notificationType,
                  notificationItem.item.notifiedByName
                )
              }
            >
              <View style={styles.notificationRowStyle}>
                <Text style={styles.notificationText}>
                  {notificationItem.item.title}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationActionContainer}>
            <TouchableOpacity
              onPress={() =>
                this.deleteNotification(notificationItem.item.appNotificationId)
              }
            >
              <Icon name="delete" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  actionOnDismiss = () => {
    this.setState({ showSnack: false });
  };

  performUndoDelete = notificationId => {
    const { undoDelete } = this.props;
    undoDelete(notificationId);
  };

  getSnackBarParams = deletedNotificationId => {
    const { showUndoSnack } = this.props;
    return {
      visible: showUndoSnack,
      deletedNotificationId,
      duration: 5000,
      onDismiss: () => this.actionOnDismiss(),
      action: {
        label: "Undo",
        onPress: () => {
          const { undoDelete, deletedNotificationId } = this.props;
          undoDelete(deletedNotificationId);
        }
      }
    };
  };

  getNotifications = () => {
    const { notifications } = this.props;
    //   console.log('Notifications in-pop', notifications);
    if (notifications && notifications.length > 0) {
      return (
        <View style={styles.notificationContainer}>
          <FlatList
            contentContainerStyle={styles.flatListStyle}
            data={notifications}
            renderItem={notificationItem =>
              this.renderNotification(notificationItem)
            }
          />
          <View style={styles.clearButton}>
            {/* <Button title="Clear all" /> */}
          </View>
        </View>
      );
    }
    return null;
  };

  backToLogin = () => {
    this.props.closePopUp();
    HrAppUtil.doLogout();
  };

  birthdayWish = () => {
    this.props.closePopUp();
    Actions.birthday();
  };

  closeNotificationDetailPopUp = () => {
    this.setState({
      showNotificationPopUp: false,
      notificationMessage: ""
    });
  };

  getSnackViewForUndoDelete = snackBarParams => {
    if (
      snackBarParams.deletedNotificationId &&
      snackBarParams.deletedNotificationId !== 0
    ) {
      return <Snackbar {...snackBarParams}>Undo</Snackbar>;
    }
    return null;
  };

  getSnackViewForError = snackBarError => {
    return (
      <Snackbar {...snackBarError}>
        No internet found, please connect internet, and try again
      </Snackbar>
    );
  };

  dismissErrorSnack = () => {
    const { hideErrorSnack } = this.props;
    hideErrorSnack();
  };

  getSnackBarErrorParams = () => {
    return {
      visible: true,
      duration: 5000,
      onDismiss: () => { },
      action: {
        label: "Dismiss",
        onPress: () => {
          const { hideErrorSnack } = this.props;
          hideErrorSnack();
        }
      }
    };
  };

  render() {
    const {
      showNotificationPopUp,
      notificationMessage
      // showSnack
    } = this.state;
    const { showErrorSnack, showUndoSnack } = this.props;
    const { isVisible, closePopUp, deletedNotificationId } = this.props;
    const snackBarParams = this.getSnackBarParams(deletedNotificationId);
    const snackBarError = this.getSnackBarErrorParams();
    return (
      <Popover isVisible={isVisible} popoverStyle={styles.popUpBackgroundColor}>
        <View style={styles.parentView}>
          <View style={styles.hearderMargin}>
            <View style={styles.headerDirection}>
              <View style={styles.titleHeader}>
                <Text style={styles.headerTextName}>Notifications</Text>
              </View>
              <View style={styles.closeButton}>
                <TouchableOpacity onPress={closePopUp}>
                  <Image style={styles.imgRightUpper} source={IMG_ICON_CLOSE} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.notificationMargin}>
            {this.getNotifications()}
          </View>
        </View>
        {showUndoSnack ? this.getSnackViewForUndoDelete(snackBarParams) : null}
        {showErrorSnack ? this.getSnackViewForError(snackBarError) : null}
      </Popover>
    );
  }
}

NotificationPopUp.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closePopUp: PropTypes.func.isRequired
};

export default NotificationPopUp;
