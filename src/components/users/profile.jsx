import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// Material Components
import {
  Avatar,
  ActivityIndicator,
  Headline,
  Paragraph,
  Card,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = ({ people }) => {
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 30,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          {people ? (
            <>
              <Avatar.Image
                style={{ marginTop: 30 }}
                size={120}
                source={{
                  uri: `https://ui-avatars.com/api/?name=${people.firstName}&background=0D8ABC&color=fff`,
                }}
              />
            </>
          ) : (
            <ActivityIndicator style={{ marginRight: 10 }} />
          )}
        </View>
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 40,
          }}
        >
          {people && (
            <>
              <Headline style={{ fontWeight: 'bold' }}>
                {`${people.firstName} ${people.lastName1}`}
              </Headline>
              <Paragraph>{people.email}</Paragraph>
            </>
          )}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ alignItems: 'center' }}>
              <Icon
                name="facebook"
                size={25}
                color="gray"
                style={{ marginTop: 10, marginHorizontal: 2 }}
              />
            </View>
            <View style={{ width: 50, height: 50, alignItems: 'center' }}>
              <Icon
                name="instagram"
                size={25}
                color="gray"
                style={{ marginTop: 10, marginHorizontal: 2 }}
              />
            </View>
          </View>
        </View>
      </View>

      <View>
        {people && (
          <>
            <View style={{ paddingTop: 140, marginVertical: 20 }}>
              <Card style={{ marginLeft: 25, marginRight: 25 }}>
                <Card.Content>
                  <Paragraph style={{ fontWeight: 'bold' }}>
                    Información general:
                  </Paragraph>
                  <Paragraph style={{ paddingTop: 10 }}>
                    {`Perfil: ${people.status}`}
                  </Paragraph>
                  <Paragraph style={{ paddingTop: 1 }}>
                    {`Sección: ${people.section}`}
                  </Paragraph>
                  <Paragraph style={{ fontWeight: 'bold', paddingTop: 25 }}>
                    Información personal:
                  </Paragraph>
                  <Paragraph style={{ paddingTop: 10 }}>
                    {`Nombre: ${people.firstName} ${people.lastName1} ${people.lastName2}`}
                  </Paragraph>
                  {people.curp && (
                    <Paragraph style={{ paddingTop: 1 }}>
                      {`Curp: ${people.curp}`}
                    </Paragraph>
                  )}

                  {people.ine.key && (
                    <Paragraph style={{ paddingTop: 1 }}>
                      {`INE: ${people.ine.key}`}
                    </Paragraph>
                  )}
                  {people.scolarity && (
                    <Paragraph style={{ paddingTop: 1 }}>
                      {`Escolaridad: ${people.scolarity}`}
                    </Paragraph>
                  )}

                  <Paragraph style={{ fontWeight: 'bold', paddingTop: 25 }}>
                    Contacto:
                  </Paragraph>
                  {people.phoneNumber > 0 && (
                    <Paragraph style={{ paddingTop: 10 }}>
                      {`Número: ${people.phoneNumber}`}
                    </Paragraph>
                  )}
                </Card.Content>
              </Card>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

Profile.propTypes = {
  people: PropTypes.shape({
    firstName: PropTypes.string,
    lastName1: PropTypes.string,
    lastName2: PropTypes.string,
    email: PropTypes.string,
    scolarity: PropTypes.string,
    status: PropTypes.string,
    section: PropTypes.string,
    phoneNumber: PropTypes.array,
    ine: PropTypes.object,
    curp: PropTypes.string,
  }),
};

export default Profile;
