import {BarChart} from '../../src/BarChart';
import React from 'react';
import {View, Text} from 'react-native';

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
    <View style={{borderWidth: 1}}>
      <BarChart
        isAnimated
        width={340}
        rotateLabel
        spacing={40}
        overflowTop={20}
        noOfSections={4}
        stackBorderTopLeftRadius={20}
        stackData={stackData}
        showValuesAsTopLabel
        pointerConfig={{
          initialPointerIndex: 0,
          stripBehindBars: true,
          pointerStripHeight: 210,
          pointerLabelComponent: items => {
            return (
              <View
                style={{
                  width: 30,
                  padding: 6,
                  borderWidth: 1,
                  borderRadius: 8,
                  backgroundColor: '#eee',
                }}>
                <Text>{items[0].stacks[0].value}</Text>
              </View>
            );
          },
        }}
        barInnerComponent={(item, index) => {
          return (
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                <Text style={{color: 'blue',textAlign:'center'}}>{index}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default RoundStackBar;
