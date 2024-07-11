import React, { useState } from 'react';
import {BarChart} from '../../src/BarChart';
import {stackDataItem} from 'gifted-charts-core';
import { Text, TouchableOpacity, View } from 'react-native';

const ShiftXaxisLabels = () => {
  const barConfig = {
    color: 'orange',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  };
  const lowerarConfig = {
    color: 'red',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  };

  const stackData: stackDataItem[] = [
    {
      stacks: [
        {value: 80, ...barConfig},
        {value: -40, ...lowerarConfig},
      ],
      label: 'April'
    },
    {
      stacks: [
        {value: 184, ...barConfig},
        {value: -168, ...lowerarConfig},
      ],
      label: 'Mei'
    },
    {
      stacks: [
        {value: 210, ...barConfig},
        {value: -220, ...lowerarConfig},
      ],
      label: 'Juni'
    },
  ];
  
  return (
    <View>
      <BarChart
        barWidth={20}
        spacing={40}
        xAxisLabelTextStyle={{
          fontFamily: 'Goga-Bold',
          color: 'black',
          marginBottom: -20,
        }}
        yAxisTextStyle={{
          left: 0,
          color: '#FF6B00',
          fontFamily: 'Goga-Bold',
        }}
        stackData={stackData}
        mostNegativeValue={-220}
        yAxisThickness={0}
        xAxisThickness={1}
        noOfSections={5}
        rulesThickness={0}
        formatYLabel={label => `€${label}`}
        autoShiftLabelsForNegativeStacks={false}
        labelsDistanceFromXaxis={210}
      />
    </View>
  );
};

export default ShiftXaxisLabels;
