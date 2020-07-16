import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import axios from 'axios';

// Material Design
import { ActivityIndicator, Surface } from 'react-native-paper';

// Config
import config from '../../../config';

// Components
import PeopleItem from './people-item';

// import TokenContext from '../../token-context';

const PeopleList = ({ navigation }) => {
  const [peoples, setpeoples] = useState([]);
  // const { token } = useContext(TokenContext);

  const getPeoples = async () => {
    // const savedToken = await AsyncStorage.getItem('@token');
    // const peopleToken = savedToken || token;

    const { data } = await axios({
      method: 'get',
      url: `${config.apiUrl}/people/q/status`,
      params: {
        status: ['Convencidos', 'Protagonista'],
      },
      // headers: {
      //   'x-api-key': config.apiKey,
      //   authorization: `Bearer ${peopleToken}`,
      // },
    });

    // Guarda la referencia de usuarios para utilizarla después
    // en los filtros
    setpeoples(data);
  };

  useEffect(() => {
    getPeoples();
  }, []);

  return (
    <View>
      {peoples.length > 0 ? (
        <>
          {peoples.map((people) => (
            <Surface
              // eslint-disable-next-line
              key={people._id}
              style={{ marginVertical: 10, borderRadius: 10 }}
            >
              <PeopleItem navigation={navigation} people={people} />
            </Surface>
          ))}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

PeopleList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
export default PeopleList;
