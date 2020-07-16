import React from 'react';

import { ProgressChart } from 'react-native-chart-kit';

import { Dimensions, View } from 'react-native';

// Material Design
import { Subheading, Surface, Paragraph } from 'react-native-paper';

const data = {
  data: [0.6],
};
const GoalReport = () => (
  <Surface
    style={{
      padding: 8,
      height: 200,
      elevation: 4,
    }}
  >
    <Subheading style={{ fontWeight: 'bold', color: '#AF272F' }}>
      META SEMANAL
    </Subheading>

    <ProgressChart
      data={data}
      width={Dimensions.get('window').width / 2 - 45}
      height={110}
      chartConfig={{
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2,
        color: (opacity = 2) => `rgba(175, 39, 47, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
        },
      }}
      hideLegend={false}
    />
    <View style={{ alignItems: 'center' }}>
      <Paragraph style={{ fontWeight: 'bold', color: '#AF272F' }}>
        35 registros
      </Paragraph>
      <Paragraph style={{ color: '#AF272F', marginTop: -6 }}>Fecha</Paragraph>
    </View>
  </Surface>
);

export default GoalReport;
