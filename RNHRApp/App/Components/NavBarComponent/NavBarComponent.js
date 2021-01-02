import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./Styles";
import BackButton from "./BackButtonComponent";
import ProfileButton from "./ProfileButton";
import Version from "./Version";
import NotificationButton from "./NotificationButton";
import HrAppUtil from "../../Util/HrAppUtil";
import { STORAGE_KEY } from "../../Util/LocalStorage";

class NavBarComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  getProfileButtonView() {
    const { localStore, auth, wishes } = this.props;
    const loggedInUser =
      auth.userProfile ||
      (!HrAppUtil.isNullOrEmpty(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        ? HrAppUtil.parse(localStore[STORAGE_KEY.USER.LOGGEDIN_USER])
        : {});
    const sapCode = loggedInUser
      ? loggedInUser.sapCode || loggedInUser.panNo
      : "DUMMY";
    // console.log(' Wishes : ', loggedInUser);
    return (
      <ProfileButton
        birthdayCount={wishes.birthday.length}
        anniversaryCount={wishes.anniversary.length}
        loggedInUser={loggedInUser}
        sapCode={sapCode}
      />
    );
  }

  getNotificationButtonView = () => {
    const {
      localStore,
      appState,
      notification,
      updateNotification,
      getAllNotifications,
      logActivity,
      deleteNotification,
      deletedNotificationId,
      undoDelete,
      hideErrorSnack
    } = this.props;

    // const notifications = HrAppUtil.parse(localStore[STORAGE_KEY.APPLICATION.NOTIFICATIONS]);
    return (
      <NotificationButton
        updateNotification={updateNotification}
        getAllNotifications={getAllNotifications}
        notification={notification}
        showNotificationBadge={notification.notificationReceived}
        logActivity={logActivity}
        deleteNotification={deleteNotification}
        deletedNotificationId={notification.deletedNotificationId}
        undoDelete={undoDelete}
        showErrorSnack={notification.showErrorSnack}
        showUndoSnack={notification.showUndoSnack}
        hideErrorSnack={hideErrorSnack}
      />
    );
  };

  // getProfileNotificationContainer = (profile, notification) => (
  //   <View style={styles.profileNotificationButtonContainer}>
  //     {profile ? this.getProfileButtonView() : null}
  //     {notification ? this.getNotificationButtonView() : null}
  //   </View>
  // );

  getProfileNotificationContainer() {
    const { includeProfile, includeNotification } = this.props;
    return (
      <View style={styles.profileNotificationButtonContainer}>
        {includeProfile ? this.getProfileButtonView() : null}
        {includeNotification ? this.getNotificationButtonView() : null}
      </View>
    );
  }

  render() {
    const { includeBack, onBackPress, includeVersion } = this.props;
    // console.log('All wish data count : ', birthdayCount, anniversaryCount);
    return (
      <View style={styles.rootView}>
        {includeBack ? <BackButton onPress={onBackPress} /> : null}
        {includeVersion ? <Version /> : null}
        {this.getProfileNotificationContainer()}
      </View>
    );
  }
}

NavBarComponent.propTypes = {
  includeBack: PropTypes.bool,
  includeProfile: PropTypes.bool,
  includeNotification: PropTypes.bool,
  onBackPress: PropTypes.func,
  includeVersion: PropTypes.bool
};

NavBarComponent.defaultProps = {
  includeVersion: false,
  includeBack: true,
  includeProfile: false,
  includeNotification: false,
  onBackPress: null
};

export default NavBarComponent;
