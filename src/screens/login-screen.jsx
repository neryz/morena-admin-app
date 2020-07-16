import React from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

// Forms
import LoginForm from '../components/login/login-form';

// Images
import logo from '../../assets/logo.png';

const LoginScreen = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <View
      style={{
        marginTop: 130,
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Image source={logo} style={{ width: 130, resizeMode: 'contain' }} />
    </View>

    <KeyboardAvoidingView
      behavior="padding"
      style={{
        paddingTop: 0,
        marginTop: 0,
        paddingHorizontal: 20,
        marginVertical: 10,
        flex: 1,
      }}
    >
      <LoginForm navigation={navigation} />
    </KeyboardAvoidingView>
  </View>
);

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default LoginScreen;
