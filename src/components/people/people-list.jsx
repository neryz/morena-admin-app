import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

// Material Design
import { ActivityIndicator, Text, Surface, Headline } from 'react-native-paper';

// Config
import config from '../../../config';

// Components
import PeopleItem from './people-item';

// import TokenContext from '../../token-context';

const PeopleList = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  // const { token } = useContext(TokenContext);

  const getPeople = async () => {
    // const savedToken = await AsyncStorage.getItem('@token');
    // const peopleToken = savedToken || token;

    try {
      const { data } = await axios({
        method: 'get',
        url: `${config.apiUrl}/people?page=${page}`,
        // headers: {
        //   'x-api-key': config.apiKey,
        //   authorization: `Bearer ${peopleToken}`,
        // },
      });

      // Guarda la referencia de usuarios para utilizarla después
      // en los filtros
      setPage((page) => page + 1);
      setPeople((prevState) => [...prevState, ...data]);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Headline>Sección 1: ACATLÁN DE PÉREZ FIGUEROA</Headline>
      </View>

      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={people}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PeopleItem people={item} navigation={navigation} />
        )}
        onEndReached={getPeople}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<ActivityIndicator />}
        initialNumToRender={10}
      />
    </View>
  );
};

PeopleList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
export default PeopleList;
