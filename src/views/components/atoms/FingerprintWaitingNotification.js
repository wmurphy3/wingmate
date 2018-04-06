import React from 'react';
import { Fingerprint } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text, View } from 'react-native';

export default class FingerprintWaitingNotification extends React.Component {
  state = {
    hasFingerprintAuth: null,
    authError: null,
    authStatus: null // valid values are null, 'wait', 'success', and 'fail'
  };

  componentDidMount() {
    Fingerprint.hasHardwareAsync().then(hasHardware => {
      hasHardware &&
        Fingerprint.isEnrolledAsync().then(hasFingerprintAuth => {
          this.setState({ hasFingerprintAuth });
          this.authFunction();
        });
    });
  }

  authFunction = async () => {
    try {
      let result =
        Platform.OS === 'ios'
          ? await Fingerprint.authenticateAsync('Show me your finger')
          : await Fingerprint.authenticateAsync();

      if (result.success) {
        this.setState(
          { authStatus: 'success' },
          this.props.onFingerprintSuccess()
        );
      } else {
        this.setState({
          authStatus: 'fail',
          authError: result.error
        });
      }
    } catch (err) {
      console.error('authFunction Error', err);
    }
  };

  render() {
    return (
      <View style={{ padding: 10 }}>
      </View>
    );
  }
}
