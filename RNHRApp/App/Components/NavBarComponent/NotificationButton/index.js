import React, {Component} from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
//import firebase from "react-native-firebase";
import styles from './Styles';
import NotificationPopUp from '../../NotificationPopUp';
import {IMG_NOTIFICATION} from '../../../Assets/images';
import HrAppUtil from '../../../Util/HrAppUtil';
import {STORAGE_KEY} from '../../../Util/LocalStorage';

class NotificationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      notifications: [],
    };
  }

  hidePopUp = () => {
    this.setState({isVisible: false});
  };

  showNotifications = () => {
    //   const { notification } = this.props;
    //   const { notifications } = notification;
    const {getAllNotifications} = this.props;
    getAllNotifications();
    this.setState({isVisible: true});
  };

  getBellIconWithCount = () => {
    const {showNotificationBadge, notification} = this.props;
    const {unReadCount} = notification;
    if (showNotificationBadge && unReadCount > 0) {
      //comment by sachin
      // firebase.notifications().setBadge(parseInt(unReadCount, 10));
      return (
        <View style={styles.notificationDot}>
          <Text style={styles.dotStyles}>{unReadCount}</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    const {
      notification,
      updateNotification,
      getAllNotifications,
      logActivity,
      deleteNotification,
      deletedNotificationId,
      undoDelete,
      showErrorSnack,
      hideErrorSnack,
      showUndoSnack,
    } = this.props;
    const {notifications} = notification;
    const {isVisible} = this.state;
    return (
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.profileButtonStyle}
          onPress={this.showNotifications}>
          <Image
            source={IMG_NOTIFICATION}
            style={styles.NotificationImgStyle}
          />

          {this.getBellIconWithCount()}
        </TouchableOpacity>

        <NotificationPopUp
          getAllNotifications={getAllNotifications}
          updateNotification={updateNotification}
          deleteNotification={deleteNotification}
          deletedNotificationId={deletedNotificationId}
          notifications={notifications}
          closePopUp={this.hidePopUp}
          isVisible={isVisible}
          logActivity={logActivity}
          undoDelete={undoDelete}
          showErrorSnack={showErrorSnack}
          showUndoSnack={showUndoSnack}
          hideErrorSnack={hideErrorSnack}
        />
      </View>
    );
  }
}

export default NotificationButton;
