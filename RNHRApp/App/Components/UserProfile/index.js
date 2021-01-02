import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./Styles";

const UserProfile = props => {
  const { id, name } = props;
  return (
    <View>
      <View style={styles.informationBar}>
        <Text style={styles.textStyle}>{id}</Text>
        <Text style={styles.textStyle}>{name}</Text>
      </View>
      <View style={styles.border} />
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
};

UserProfile.defaultProps = {
  id: "",
};

export default UserProfile;
