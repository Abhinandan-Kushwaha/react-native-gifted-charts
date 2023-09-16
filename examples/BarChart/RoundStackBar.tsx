import {BarChart} from '../../src/BarChart';
import React from 'react';
import {View} from 'react-native';

const RoundStackBar = () => {
  const stackData = [
    {
      stacks: [
        {value: 10, color: 'orange'},
        {value: 20, color: '#4ABFF4', marginBottom: 2},
      ],
      label: 'Jan',
    },
    {
      stacks: [
        {value: 10, color: '#4ABFF4'},
        {value: 11, color: 'orange', marginBottom: 2},
        {value: 15, color: '#28B2B3', marginBottom: 2},
      ],
      label: 'Mar',
    },
    {
      stacks: [
        {value: 14, color: 'orange'},
        {value: 18, color: '#4ABFF4', marginBottom: 2},
      ],
      label: 'Feb',
    },
    {
      stacks: [
        {value: 7, color: '#4ABFF4'},
        {value: 11, color: 'orange', marginBottom: 2},
        {value: 10, color: '#28B2B3', marginBottom: 2},
      ],
      label: 'Mar',
    },
  ];
  return (
    <View>
      <BarChart
        width={340}
        rotateLabel
        barWidth={12}
        spacing={40}
        noOfSections={4}
        barBorderRadius={20}
        stackData={stackData}
      />
    </View>
  );
};

export default RoundStackBar;
