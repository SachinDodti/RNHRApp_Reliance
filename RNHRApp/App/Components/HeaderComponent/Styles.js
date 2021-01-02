import { StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

const width = Math.round(Dimensions.get('screen').width);

const styles = StyleSheet.create({
  headerStyle: {
    height: 80,
    width,
  },
});

export default styles;
