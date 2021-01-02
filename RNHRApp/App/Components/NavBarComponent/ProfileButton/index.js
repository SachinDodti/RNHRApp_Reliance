import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { View } from 'native-base';
import styles from './Styles';
import InformationPopUp from '../../InformationPopUp';
import { IMG_PROFILE } from '../../../Assets/images';

class ProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  hidePopUp = () => {
    this.setState({ isVisible: false });
  }

  performLogin = () => {
    this.setState({ isVisible: true });
  }

  render() {
    const { isVisible } = this.state;
    const {
      birthdayCount, anniversaryCount, loggedInUser, sapCode,
    } = this.props;
    return (
      <View>
        <View>
          <TouchableOpacity style={styles.profileButtonStyle} onPress={this.performLogin}>
            <Image source={IMG_PROFILE} style={styles.profileImgStyle} />
          </TouchableOpacity>
        </View>
        <InformationPopUp
          closePopUp={this.hidePopUp}
          isVisible={isVisible}
          birthdayCount={birthdayCount}
          anniversaryCount={anniversaryCount}
          loggedInUser={loggedInUser}
          sapCode={sapCode}
        />
      </View>
    );
  }
}

export default ProfileButton;
