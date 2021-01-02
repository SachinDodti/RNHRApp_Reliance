import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './Styles';

class Legends extends Component {
  // constructor(props) {
  //   super(props);
  // }

  drawLegends = () => {
    const { legend } = this.props;
    return legend.map(legendValue => (
      <View key={legendValue.text + legendValue.color} style={styles.legendComponent}>
        <View style={[styles.legendColorComponent, { backgroundColor: legendValue.color }]} />
        <Text style={styles.legendTextStyle}>{legendValue.text}</Text>
      </View>
    ));
  };

  render() {
    return (
      <View style={styles.legendContainer}>
        { this.drawLegends() }
      </View>
    );
  }
}

Legends.propTypes = {
  legend: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
};

Legends.defaultProps = {
  legend: null,
};

export default Legends;
