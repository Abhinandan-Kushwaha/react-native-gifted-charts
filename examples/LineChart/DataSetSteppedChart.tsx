import React from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';
import {DataSet} from 'gifted-charts-core';

const DataSetSteppedChart = () => {
  const lineData = [
    {value: 100},
    {value: 110},
    {value: 108},
    {value: 158},
    {value: 156},
    {value: 178},
    {value: 174},
    {value: 198},
  ];

  const lineData2 = [
    {value: 100},
    {value: 120},
    {value: 118},
    {value: 140},
    {value: 136},
    {value: 160},
    {value: 154},
    {value: 185},
  ];
  const dataSet: Array<DataSet> = [
    {
      data: lineData,
      color: 'skyblue',
      dataPointsColor: 'blue',
      textColor: 'green',
    },
    {data: lineData2, color: 'orange', dataPointsColor: 'red'},
  ];
  return (
    <View style={{borderWidth:1}}>
      <LineChart
        dataSet={dataSet}
        stepChart
        height={250}
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        dataPointsHeight={6}
        dataPointsWidth={6}
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
        showValuesAsDataPointsText
        yAxisOffset={80}
      />
    </View>
  );
};

export default DataSetSteppedChart;
