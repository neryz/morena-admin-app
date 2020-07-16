import React, { useState, useContext } from 'react';
import { Button, View, AsyncStorage, Alert, Text } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

// Forms
import { Formik } from 'formik';

// Material Design
import { TextInput, Checkbox } from 'react-native-paper';

// Config
import { TouchableOpacity } from 'react-native-gesture-handler';
import config from '../../../config';

// Context
// import TokenContext from '../../token-context';

const LoginForm = ({ navigation }) => {
  const [checked, setChecked] = useState(true);
  // const { saveToken } = useContext(TokenContext);

  const login = async (email, password) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `${config.apiUrl}/users/login`,
        data: {
          email,
          password,
        },
        headers: {
          'super-api-key': config.superApiKey,
        },
      });

      await AsyncStorage.setItem('@token', data.token);

      navigation.navigate('AuthLoading');
    } catch (err) {
      Alert.alert(
        '¡Algo salió mal!',
        'Hubo un error al ingresar tu email o contraseña. Ingrésalos nuevamente.',
      );
    }
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => login(values.email, values.password)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
        <View>
          <View style={{ marginVertical: 10 }}>
            <TextInput
              label="Correo electrónico"
              dense
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <TextInput
              label="Contraseña"
              dense
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Checkbox
              color="#5F0C0C"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
            />
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <Text style={{ marginTop: 9, color: '#5F0C0C' }}>
                Recordar contraseña
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button
              onPress={handleSubmit}
              title="Iniciar sesión"
              icon={isSubmitting ? 'loading' : ''}
              color="#5F0C0C"
              style={{ backgroundColor: 'white' }}
            >
              Iniciar sesión
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default LoginForm;
