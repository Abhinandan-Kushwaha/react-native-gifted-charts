import React from 'react';
import {View} from 'react-native';
import {BarChart} from '../../src/BarChart';
import { yAxisSides } from '../../src/utils/constants';
import { stackItemType } from '../../src/BarChart/types';

const StackWithNegative = () => {
    const stacks: stackItemType[] = [
        {
          // Mix of positive and negative values
          label: 'Nov "23',
          stacks: [
            {
              value: 20,
              color: '#35aa0a',
            },
            {
              value: -5,
              color: '#ffa600',
            },
            {
              value: -6,
              color: '#dc25bb',
            },
            {
              value: 10,
              color: '#003f5c',
            },
          ],
        },
        // Only positive values
        {
          label: 'Dez "23',
          stacks: [
            {
              value: 8,
              color: '#35aa0a',
            },
            {
              value: 1,
              color: '#ffa600',
            },
            {
              value: 7,
              color: '#dc25bb',
            },
          ],
        },
        // Only negative values
        {
          label: 'Dez "23',
          stacks: [
            {
              value: -5,
              color: '#35aa0a',
            },
            {
              value: 0,
              color: '#ffa600',
            },
            {
              value: -3,
              color: '#dc25bb',
            },
          ],
        },
      ];
  return (
    <View style={{borderWidth:1}}>
      <BarChart
        stackData={stacks}
      />
    </View>
  );
};

export default StackWithNegative;
