import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { View, ScrollView, Permissions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

// Material Design
import { Appbar, Button, Subheading } from 'react-native-paper';

// Config
import config from '../../config';

const NewUserCamera = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [processed, setProcessed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ineData, setIneData] = useState(null);

  const fetchIneExtractor = async (ine) => {
    const { data } = await axios({
      method: 'POST',
      data: { ine },
      url: `${config.apiUrl}/utilities/ine-extractor`,
    });

    setIneData({
      ...ineData,
      gender: data.gender,
      birthday: data.birthday,
    });
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const recognizeText = async (result) => {
    setProcessed(false);
    const data = new FormData();

    data.append('file', {
      name: 'recognize-text.jpg',
      uri: result.uri,
      type: 'image/jpeg',
    });

    const response = await axios({
      url: `${config.apiUrl}/utilities/recognizer`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': config.apiKey,
      },
      data,
    });

    console.log(response.data);
    setIneData(response.data);
    setProcessed(true);
    setLoading(true);
  };

  const pickImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      recognizeText(result);
      setImage(result.uri);
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      recognizeText(result);
      setImage(result.uri);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  });

  return (
    <>
      <View>
        <View>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Escanear INE" />
          </Appbar.Header>
        </View>

        <ScrollView style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <Subheading style={{ paddingVertical: 10, textAlign: 'center' }}>
            Esta es una herramienta para extraer texto de las credenciales de
            elector, selecciona alguna de las siguientes opciones:
          </Subheading>

          <View
            style={{
              marginVertical: 10,
              alignContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Button
              icon="camera"
              mode="contained"
              onPress={pickImageFromCamera}
            >
              Tomar foto
            </Button>
            <View style={{ paddingTop: 15 }}>
              <Button
                icon="camera"
                mode="contained"
                onPress={pickImageFromGallery}
              >
                Seleccionar
              </Button>
            </View>
            {!processed ? (
              <ActivityIndicator />
            ) : (
              <View style={{ paddingTop: 15 }}>
                <Subheading>Nombre: {ineData.firstName}</Subheading>
                <Subheading>Primer apellido: {ineData.lastName1}</Subheading>
                <Subheading>Segundo apellido: {ineData.lastName2}</Subheading>
                <Subheading>
                  Dirección: {ineData.address.street1},{' '}
                  {ineData.address.street2}
                </Subheading>
                <Subheading>Municipio: {ineData.address.delegation}</Subheading>
                <Subheading>Estado: {ineData.address.state}</Subheading>
                <Subheading>CP: {ineData.address.zipCode}</Subheading>
                <Subheading>INE: {ineData.ine.key}</Subheading>
                <Subheading>CURP: {ineData.curp}</Subheading>
              </View>
            )}

            {processed && (
              <Button
                style={{ marginTop: 20 }}
                mode="contained"
                onPress={() => {
                  fetchIneExtractor(ineData.ine.key);
                  navigation.navigate('NewUserForm', {
                    firstName: ineData.firstName,
                    lastName1: ineData.lastName1,
                    lastName2: ineData.lastName2,
                    ine: ineData.ine.key,
                    curp: ineData.curp,
                    gender: ineData.gender,
                    birthday: ineData.birthday,
                    street1: ineData.address.street1,
                    street2: ineData.address.street2,
                    zipCode: ineData.address.zipCode,
                    state: ineData.address.state,
                    delegation: ineData.address.delegation,
                    country: ineData.address.country,
                  });
                }}
              >
                Pasar datos
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

NewUserCamera.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default NewUserCamera;
