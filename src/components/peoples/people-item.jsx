import React from 'react';
import PropTypes from 'prop-types';

// Material Design
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';

const peopleItem = ({ people }) => {
  return (
    // <TouchableOpacity
    //   onPress={() => {
    //     navigation.navigate('peopleDetails', {
    //       // eslint-disable-next-line
    //       id: people._id,
    //     });
    //   }}
    // >
    <List.Item
      title={`${people.firstName} ${people.lastName1} ${people.lastName2}`}
      description={people.status}
      right={() => (
        <Icon name="dots-vertical" style={{ marginTop: 8 }} size={24} />
      )}
    />
    // </TouchableOpacity>
  );
};

peopleItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  people: PropTypes.shape({
    firstName: PropTypes.string,
    lastName1: PropTypes.string,
    lastName2: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default peopleItem;
