import React from 'react';
import {View, Text} from 'react-native';
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
    <View style={{borderWidth: 1}}>
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
        pointerConfig={{
          initialPointerIndex: 0,
          stripBehindBars: true,
          pointerStripHeight: 207,
          pointerLabelComponent: items => {
            return (
              <View
                style={{
                  width: 36,
                  padding: 6,
                  borderWidth: 1,
                  borderRadius: 8,
                  backgroundColor: '#eee',
                }}>
                <Text>{items[0].value}</Text>
              </View>
            );
          },
        }}
      />
    </View>
  );
};

export default BarWithGradient;
