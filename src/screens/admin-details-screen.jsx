import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

// Material Design
import {
  Appbar,
  Avatar,
  ActivityIndicator,
  Caption,
  Headline,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

// Custom components
import Profile from '../components/users/profile';

import config from '../../config';

const AdminDetailsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const rating = 4.5;

  const getMe = async () => {
    const token = await AsyncStorage.getItem('@token');
    const id = navigation.getParam('id');

    const { data } = await axios({
      method: 'get',
      url: `${config.apiUrl}/users/${id}`,
      headers: {
        'x-api-key': config.apiKey,
        authorization: `Bearer ${token}`,
      },
    });

    setUser(data);
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Administrador" />
        {user ? (
          <Avatar.Image
            style={{ marginRight: 10 }}
            size={24}
            source={{
              uri: `https://ui-avatars.com/api/?name=${user.emailAddress}&background=0D8ABC&color=fff`,
            }}
          />
        ) : (
          <ActivityIndicator style={{ marginRight: 10 }} />
        )}
      </Appbar.Header>

      <Profile user={user} rating={rating} />

      <View
        style={{
          paddingHorizontal: 10,
          marginVertical: 10,
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Headline style={{ fontWeight: 'bold' }}>Califica y comenta</Headline>
        <Caption>Tu experiencia ayuda a otros</Caption>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {[1, 2, 3, 4, 5].map(() => (
            <Icon
              name="star-o"
              size={38}
              color="lightgray"
              style={{ marginTop: 10, marginHorizontal: 2 }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

AdminDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
  }),
};

export default AdminDetailsScreen;
