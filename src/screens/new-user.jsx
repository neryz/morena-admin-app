import React, { useState } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

// Material Design
import {
  Appbar,
  Button,
  TextInput,
  Text,
  Subheading,
} from 'react-native-paper';

// Forms
import { Formik } from 'formik';

// Config
import config from '../../config';

const NewUser = ({ navigation }) => {
  const [ineData, setIneData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const extractIneData = async (ine) => {
    const { data } = await axios({
      method: 'POST',
      data: { ine },
      url: `${config.apiUrl}/utilities/ine-extractor`,
    });

    setIneData({
      ine: { key: ine },
      gender: data.gender,
      birthday: data.birthday,
    });
    setIsChecked(true);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Extractor de información" />
      </Appbar.Header>
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
            ine: '',
            curp: '',
          }}
          onSubmit={(values, actions) => {
            extractIneData(values.ine);
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
                  label="INE"
                  dense
                  onChangeText={handleChange('ine')}
                  onBlur={handleBlur('ine')}
                  value={values.ine}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Button
                  onPress={handleSubmit}
                  title="Submit"
                  icon={isSubmitting ? 'loading' : ''}
                  color="#5F0C0C"
                  style={{ backgroundColor: 'white' }}
                >
                  Extraer
                </Button>
              </View>
            </View>
          )}
        </Formik>
        {isChecked && (
          <View style={{ marginBottom: 10, marginTop: 20 }}>
            <Subheading>
              Extrajo la siguiente información de manera exitosa:
            </Subheading>

            <Text>
              INE:
              {ineData.ine.key}
            </Text>

            <Text>
              Fecha de nacimiento:
              {ineData.birthday}
            </Text>
            <Text>
              Género:
              {ineData.gender}
            </Text>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate('NewUserForm', {
                  gender: ineData.gender,
                  birthday: ineData.birthday,
                  ine: ineData.ine.key,
                })
              }
              title="Siguiente"
              style={{ marginTop: 20 }}
            >
              Siguiente
            </Button>
          </View>
        )}
      </View>
    </>
  );
};

NewUser.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default NewUser;
