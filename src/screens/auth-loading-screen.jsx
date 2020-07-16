import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';

const AuthLoadingScreen = ({ navigation }) => {
  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? 'App' : 'Auth');
  };

  useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default AuthLoadingScreen;
