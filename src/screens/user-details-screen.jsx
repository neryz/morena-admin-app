import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// Material Design
import { Appbar, TouchableRipple } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Profile from '../components/users/profile';

import config from '../../config';

const peopleDetailsScreen = ({ navigation }) => {
  const [people, setpeople] = useState(null);
  const id = navigation.getParam('id');

  const getpeople = async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${config.apiUrl}/people/${id}`,
    });

    setpeople(data);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        return result;
      }
    } catch (error) {
      Alert.alert('Error', '¡Hubo un error al tomar la foto!');
    }
  };

  useEffect(() => {
    getpeople();
  }, []);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Usuario" />
        <TouchableRipple>
          <Ionicons
            name="md-create"
            size={22}
            color="white"
            style={{ marginRight: 15 }}
          />
        </TouchableRipple>
      </Appbar.Header>

      <Profile people={people} />
      <View
        style={{
          paddingHorizontal: 10,
          marginVertical: 10,
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'column',
        }}
      />
    </View>
  );
};

peopleDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
  }),
  people: PropTypes.shape({
    firstName: PropTypes.string,
    lastName1: PropTypes.string,
    lastName2: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default peopleDetailsScreen;
