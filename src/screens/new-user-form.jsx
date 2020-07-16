import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

// Material Design
import { Appbar, Button, TextInput, Subheading } from 'react-native-paper';

// Forms
import { Formik } from 'formik';

// Config
import { ScrollView } from 'react-native-gesture-handler';
import config from '../../config';

const NewUserForm = ({ navigation }) => {
  const [ineData, setIneData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const firstName = navigation.getParam('firstName', '');
  const lastName1 = navigation.getParam('lastName1', '');
  const lastName2 = navigation.getParam('lastName2', '');
  const ine = navigation.getParam('ine', '');
  const curp = navigation.getParam('curp', '');
  const gender = navigation.getParam('gender', '');
  const birthday = navigation.getParam('birthday', '');
  const street1 = navigation.getParam('street1', '');
  const street2 = navigation.getParam('street2', '');
  const delegation = navigation.getParam('delegation', '');
  const state = navigation.getParam('state', '');
  const country = navigation.getParam('country', '');
  const zipCode = navigation.getParam('zipCode', '');

  const createPerson = async ({
    firstName,
    lastName2,
    lastName1,
    ine,
    curp,
    gender,
    street1,
    street2,
    delegation,
    state,
    country,
    zipCode,
  }) => {
    const response = await axios({
      method: 'POST',
      url: `${config.apiUrl}/people`,
      data: {
        firstName,
        lastName1,
        lastName2,
        ine: { key: ine },
        curp,
        gender,
        address: {
          street1,
          street2,
          delegation,
          state,
          country,
          zipCode,
        },
      },
    });

    navigation.navigate('UserDetails', {
      id: response.data._id || response.data.id,
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Extractor de información" />
      </Appbar.Header>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 10,
            alignContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Formik
            initialValues={{
              ine,
              firstName,
              lastName2,
              lastName1,
              curp,
              gender,
              birthday,
              street1,
              street2,
              zipCode,
              state,
              delegation,
              country,
            }}
            onSubmit={(values, actions) => {
              createPerson(values);
              actions.setSubmitting(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Status"
                    dense
                    onChangeText={handleChange('status')}
                    onBlur={handleBlur('status')}
                    value={values.status}
                  />
                </View>

                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Nombre"
                    dense
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Primero apellido"
                    dense
                    onChangeText={handleChange('lastName1')}
                    onBlur={handleBlur('lastName1')}
                    value={values.lastName1}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Segundo apellido"
                    dense
                    onChangeText={handleChange('lastName2')}
                    onBlur={handleBlur('lastName2')}
                    value={values.lastName2}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Género"
                    dense
                    onChangeText={handleChange('gender')}
                    onBlur={handleBlur('gender')}
                    value={values.gender}
                  />
                </View>

                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Fecha de nacimiento"
                    dense
                    onChangeText={handleChange('birthday')}
                    onBlur={handleBlur('birthday')}
                    value={values.birthday}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="INE"
                    dense
                    onChangeText={handleChange('ine')}
                    onBlur={handleBlur('ine')}
                    value={values.ine}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="CURP"
                    dense
                    onChangeText={handleChange('curp')}
                    onBlur={handleBlur('curp')}
                    value={values.curp}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    keyboardType="email-address"
                    label="Email"
                    dense
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    keyboardType="numeric"
                    label="Localidad"
                    dense
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Escolaridad"
                    dense
                    onChangeText={handleChange('scolarity')}
                    onBlur={handleBlur('scolarity')}
                    value={values.scolarity}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Ocupación"
                    dense
                    onChangeText={handleChange('ocupation')}
                    onBlur={handleBlur('ocupation')}
                    value={values.ocupation}
                  />
                </View>
                <Subheading>Dirección:</Subheading>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Calle"
                    dense
                    onChangeText={handleChange('street1')}
                    onBlur={handleBlur('street1')}
                    value={values.street1}
                  />
                </View>

                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Población"
                    dense
                    onChangeText={handleChange('street2')}
                    onBlur={handleBlur('street2')}
                    value={values.street2}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Muncipio"
                    dense
                    onChangeText={handleChange('delegation')}
                    onBlur={handleBlur('delegation')}
                    value={values.delegation}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Código postal"
                    dense
                    onChangeText={handleChange('zipCode')}
                    onBlur={handleBlur('zipCode')}
                    value={values.zipCode}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="Estado"
                    dense
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                    value={values.state}
                  />
                </View>
                <View style={{ marginVertical: 10 }} behavior="padding">
                  <TextInput
                    label="País"
                    dense
                    onChangeText={handleChange('country')}
                    onBlur={handleBlur('country')}
                    value={values.country}
                  />
                </View>
                <Subheading style={{ marginVertical: 10 }} behavior="padding">
                  Número telefónico:
                </Subheading>
                <View
                  behavior="padding"
                  style={{ flex: 1, flexDirection: 'row' }}
                >
                  <View
                    style={{
                      width: 150,
                      height: 50,
                    }}
                  >
                    <TextInput
                      label="Tipo"
                      dense
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: 10,
                      width: 220,
                      height: 50,
                    }}
                  >
                    <TextInput
                      keyboardType="numeric"
                      label="Número"
                      dense
                      onChangeText={handleChange('number')}
                      onBlur={handleBlur('number')}
                      value={values.number}
                    />
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    title="Submit"
                    icon={isSubmitting ? 'loading' : ''}
                  >
                    Crear usuario
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

NewUserForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default NewUserForm;
