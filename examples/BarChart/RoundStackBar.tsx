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
        {value: 1, color: '#28B2B3', marginBottom: 2},
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
    <View style={{borderWidth:1}}>
      <BarChart
        width={340}
        rotateLabel
        spacing={40}
        noOfSections={4}
        stackBorderTopLeftRadius={20}
        stackData={stackData}
        showValuesAsTopLabel
        pointerConfig={{}}
      />
    </View>
  );
};

export default RoundStackBar;
