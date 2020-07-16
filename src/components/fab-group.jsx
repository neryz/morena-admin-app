import React, { useState } from 'react';

// Material Components
import { FAB } from 'react-native-paper';
import PropTypes from 'prop-types';

const FabGroup = ({ navigation }) => {
  const [open, setOpen] = useState(false);

  return (
    <FAB.Group
      open={open}
      icon={open ? 'close' : 'plus'}
      actions={[
        {
          icon: 'check',
          label: 'Verificar',
          onPress: () => navigation.navigate('Verify'),
        },
        {
          icon: 'magnify',
          label: 'Buscar',
          onPress: () => navigation.navigate('Home'),
        },
        {
          icon: 'camera',
          label: 'Capturar INE',
          onPress: () => navigation.navigate('NewUserCamera'),
        },
        {
          icon: 'plus',
          label: 'Agregar nuevo registro',
          onPress: () => navigation.navigate('NewUser'),
        },
      ]}
      onStateChange={({ open }) => setOpen(open)}
    />
  );
};
FabGroup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default FabGroup;
