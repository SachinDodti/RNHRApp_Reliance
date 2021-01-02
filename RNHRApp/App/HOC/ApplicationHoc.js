import * as React from 'react';
import { SafeAreaView } from 'react-native';
import ErrorPopover from '../Components/ErrorPopover';
import Spinner from '../Components/Spinner';
import appStyles from '../appStyles';

const colors = require('../Config/config');

const ApplicationBase = WrappedComponent => class LoadingScreen extends React.PureComponent {
  render() {
    return (
      <SafeAreaView style={[appStyles.rootView]}>
        <WrappedComponent {...this.props} />
        <ErrorPopover />
        <Spinner cursorColor={colors.white} />
      </SafeAreaView>
    );
  }
};

export default ApplicationBase;
