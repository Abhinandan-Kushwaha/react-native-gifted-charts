import React from 'react';
import {View} from 'react-native';
import {BarChart} from '../../src/BarChart';

const BarWithGradient = () => {
  const barData = [
    {value: 0.7, label: '1'},
    {value: 0.8, label: '2'},
    {value: 0.6, label: '3'},
    {value: 0.4, label: '4'},
    {value: 0.9, label: '5'},
    {value: 0.7, label: '6'},
  ];
  return (
    <View>
      <BarChart
        showFractionalValues
        showYAxisIndices
        showXAxisIndices
        hideRules
        noOfSections={5}
        data={barData}
        showGradient
        frontColor={'#1B6BB0'}
        gradientColor={'#FFEEFE'}
        backgroundColor={'#FECF9E'}
      />
    </View>
  );
};

export default BarWithGradient;
