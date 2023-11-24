import React from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';
import {DataSet} from '../../src/utils/types';

const SegmentedDataSetChart = () => {
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
      dataPointsColor: 'blue',
      textColor: 'green',
      lineSegments: [{startIndex: 2, endIndex: 4, strokeDashArray: [3, 4]}],
    },
    {
      data: lineData2,
      color: 'orange',
      dataPointsColor: 'red',
      lineSegments: [
        {startIndex: 0, endIndex: 2, color: 'gray'},
        {startIndex: 4, endIndex: 6, strokeDashArray: [3, 4], color: 'gray'},
      ],
    },
  ];
  return (
    <View style={{borderWidth:1}}>
      <LineChart
        dataSet={dataSet}
        height={250}
        showValuesAsDataPointsText
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        dataPointsHeight={6}
        dataPointsWidth={6}
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
      />
    </View>
  );
};

export default SegmentedDataSetChart;
