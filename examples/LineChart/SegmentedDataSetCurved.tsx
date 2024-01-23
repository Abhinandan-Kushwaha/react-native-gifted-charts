import React from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';
import {DataSet} from 'gifted-charts-core';

const SegmentedDataSetCurved = () => {
  const lineData = [
    {value: 0},
    {value: 10},
    {value: 8},
    {value: 58},
    {value: 56},
    {value: 78},
    {value: 74},
    {value: 98},
  ];
  const lineData2 = [
    {value: 0},
    {value: 20},
    {value: 18},
    {value: 40},
    {value: 36},
    {value: 60},
    {value: 54},
    {value: 85},
  ];
  const dataSet: Array<DataSet> = [
    {
      data: lineData,
      color: 'skyblue',
      startFillColor: 'skyblue',
      lineSegments: [{startIndex: 2, endIndex: 4, strokeDashArray: [3, 4]}],
    },
    {
      data: lineData2,
      color: 'orange',
      startFillColor: 'orange',
      lineSegments: [
        {startIndex: 0, endIndex: 2, color: 'gray'},
        {startIndex: 4, endIndex: 6, strokeDashArray: [3, 4], color: 'gray'},
      ],
    },
  ];
  return (
    <View style={{borderWidth:1}}>
      <LineChart
        areaChart
        curved
        dataSet={dataSet}
        height={250}
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        hideDataPoints
        startOpacity={0.8}
        endOpacity={0.3}
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
      />
    </View>
  );
};

export default SegmentedDataSetCurved;
