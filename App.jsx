import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Screens
import HomeScreen from './src/screens/home-screen';
import UserDetailsScreen from './src/screens/user-details-screen';
import AdminDetailsScreen from './src/screens/admin-details-screen';
import LoginScreen from './src/screens/login-screen';
import AuthLoadingScreen from './src/screens/auth-loading-screen';
import NewUserCameraScreen from './src/screens/new-user-camera';
import NewUserScreen from './src/screens/new-user';
import VerifyScreen from './src/screens/verify-screen';
import NewUserFormScreen from './src/screens/new-user-form';

// Context
import TokenProvider from './src/token-context';

// Material Design Theme
const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: '#AF272F',
    accent: '#AF272F',
  },
};

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    UserDetails: UserDetailsScreen,
    AdminDetails: AdminDetailsScreen,
    NewUserCamera: NewUserCameraScreen,
    NewUser: NewUserScreen,
    Verify: VerifyScreen,
    NewUserForm: NewUserFormScreen,
  },
  { headerMode: 'none' },
);

const AuthStack = createStackNavigator(
  { Login: LoginScreen },
  { headerMode: 'none' },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

const App = () => (
  <PaperProvider theme={theme}>
    <AppContainer />
  </PaperProvider>
);

export default App;
