import React from 'react';
import {View} from 'react-native';
import {RadarChart} from '../../src/RadarChart';

const MultipleLineLabel = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <RadarChart
        chartSize={400}
        data={[50, 60, 10, 70, 30]}
        labelConfigArray={[
          {fontSize: 10},
          {fontSize: 15},
          {fontSize: 20},
          {fontSize: 25},
        ]}
        maxValue={100}
        labels={[
          'Lorem\nIpsum',
          'Lorem\nIpsum',
          'Lorem Ipsum\nLorem Ipsum',
          'Lorem Ipsum\nLorem Ipsum\nLorem Ipsum',
          'Lorem Ipsum',
        ]}
      />
    </View>
  );
};

export default MultipleLineLabel;
