import React, { useContext } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';

// Material Design
import { Appbar, Portal } from 'react-native-paper';

// Components
import FABGroup from '../components/fab-group';
import PeopleList from '../components/people/people-list';
import MonthReport from '../components/reports/month-report';
import GoalReport from '../components/reports/goal-report';

// Token Context
// import TokenContext from '../token-context';

const HomeScreen = ({ navigation }) => {
  // const { saveToken } = useContext(TokenContext);

  const logout = async () => {
    await AsyncStorage.removeItem('@token');

    navigation.navigate('AuthLoading');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={logout} />
        <Appbar.Content title="Bienvenido" />
      </Appbar.Header>
      <Portal>
        <FABGroup navigation={navigation} />
      </Portal>

      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#AF272F',
        }}
      >
        <View
          style={{
            paddingRight: 10,
            width: Dimensions.get('screen').width / 2 - 18,
          }}
        >
          <MonthReport />
        </View>

        <View
          style={{
            paddingLeft: 10,
            width: Dimensions.get('screen').width / 2 - 18,
          }}
        >
          <GoalReport />
        </View>
      </View>

      <PeopleList navigation={navigation} />
    </>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default HomeScreen;
