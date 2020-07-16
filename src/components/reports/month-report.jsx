import React from 'react';

import { BarChart } from 'react-native-chart-kit';

import { Dimensions, View } from 'react-native';

import { Subheading, Surface, Paragraph } from 'react-native-paper';

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  datasets: [
    {
      data: [1, 2, 3, 4],
    },
  ],
};

const MonthReport = () => (
  <Surface
    style={{
      padding: 8,
      height: 200,
      elevation: 4,
    }}
  >
    <Subheading style={{ fontWeight: 'bold', color: '#AF272F' }}>
      AVANCE MENSUAL
    </Subheading>
    <BarChart
      data={data}
      width={Dimensions.get('window').width / 2 - 45} // from react-native
      height={100}
      chartConfig={{
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        color: (opacity = 1) => `rgba(175, 39, 47, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(175, 39, 47, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.6,
      }}
      verticalLabelRotation={30}
    />

    <View style={{ alignItems: 'center' }}>
      <Paragraph
        style={{ fontWeight: 'bold', color: '#AF272F', marginTop: -5 }}
      >
        Marzo
      </Paragraph>
      <Paragraph style={{ color: '#AF272F', marginTop: -6 }}>
        135 Preafiliados
      </Paragraph>
      <Paragraph style={{ color: '#AF272F', marginTop: -6 }}>
        360 Confirmados
      </Paragraph>
    </View>
  </Surface>
);

export default MonthReport;
