import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

// Material Design
import { Appbar } from 'react-native-paper';
import PeopleList from '../components/peoples/people-list';

const VerifyScreen = ({ navigation }) => {
  return (
    <>
      <View>
        <View>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Verificar" />
          </Appbar.Header>
        </View>
        <ScrollView style={{ paddingHorizontal: 10, marginVertical: 10 }}>
          <View>
            <PeopleList navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

VerifyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default VerifyScreen;
