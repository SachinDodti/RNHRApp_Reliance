import React from 'react';
import { Text } from 'react-native';
import { colors } from 'react-native-elements';

const Required = () => (<Text style={{ color: colors.error }}>*</Text>);

export default Required;
