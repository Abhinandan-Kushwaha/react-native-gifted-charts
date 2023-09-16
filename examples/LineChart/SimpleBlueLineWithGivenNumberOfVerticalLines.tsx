import React from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';

const SimpleBlueLineWithGivenNumberOfVerticalLines = () => {
  const lineData = [
    {value: 0},
    {value: 20},
    {value: 18},
    {value: 40},
    {value: 36},
    {value: 60},
    {value: 54},
    {value: 85},
  ];
  return (
    <View>
      <LineChart
        initialSpacing={0}
        data={lineData}
        spacing={25}
        hideDataPoints
        thickness={5}
        hideRules
        hideYAxisText
        yAxisColor="#0BA5A4"
        width={265}
        showVerticalLines
        noOfVerticalLines={12}
        verticalLinesHeight={210}
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
      />
    </View>
  );
};

export default SimpleBlueLineWithGivenNumberOfVerticalLines;
