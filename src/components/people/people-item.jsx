import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Material Design
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, List, Surface } from 'react-native-paper';

import { selectColor } from '../../utilities';

const PeopleItem = ({ navigation, people }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UserDetails', {
          // eslint-disable-next-line
          id: people._id,
        });
      }}
    >
      <Surface
        // eslint-disable-next-line
        key={people._id}
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: selectColor(people.status),
        }}
      >
        <List.Item
          title={`${people.firstName} ${people.lastName1} ${people.lastName2}`}
          description={people.status}
          left={() => {
            if (people.avatar)
              return (
                <Avatar.Image
                  style={{ marginTop: 8 }}
                  size={40}
                  source={{ uri: people.avatar }}
                />
              );

            return (
              <Avatar.Text
                style={{ marginTop: 8 }}
                size={40}
                label={people.firstName[0]}
              />
            );
          }}
          right={() => (
            <Icon name="dots-vertical" style={{ marginTop: 8 }} size={24} />
          )}
        />
      </Surface>
    </TouchableOpacity>
  );
};

PeopleItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  people: PropTypes.shape({
    firstName: PropTypes.string,
    lastName1: PropTypes.string,
    lastName2: PropTypes.string,
    ine: PropTypes.object,
    status: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default PeopleItem;
