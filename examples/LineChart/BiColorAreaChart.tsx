import React from 'react';
import {View} from 'react-native';
import { LineChartBicolor } from '../../src/LineChart/LineChartBicolor';

const BiColorAreaChart = () => {
  const lineData = [
    {value: 0},
    {value: 20},
    {value: -18},
    {value: 40},
    {value: 36},
    {value: -60},
    {value: 54},
    {value: 85},
  ];
  return (
    <View style={{borderWidth:1}}>
      <LineChartBicolor
        data={lineData}
        areaChart
        color="green"
        colorNegative="red"
        startFillColor="green"
        startFillColorNegative="red"
        showXAxisIndices
      />
    </View>
  );
};

export default BiColorAreaChart;
