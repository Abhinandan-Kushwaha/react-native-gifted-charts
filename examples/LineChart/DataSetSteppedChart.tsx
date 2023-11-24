import React from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';
import {DataSet} from '../../src/utils/types';

const DataSetSteppedChart = () => {
  const lineData = [
    {value: 0, dataPointText: '0'},
    {value: 10, dataPointText: '10'},
    {value: 8, dataPointText: '8'},
    {value: 58, dataPointText: '58'},
    {value: 56, dataPointText: '56'},
    {value: 78, dataPointText: '78'},
    {value: 74, dataPointText: '74'},
    {value: 98, dataPointText: '98'},
  ];

  const lineData2 = [
    {value: 0, dataPointText: '0'},
    {value: 20, dataPointText: '20'},
    {value: 18, dataPointText: '18'},
    {value: 40, dataPointText: '40'},
    {value: 36, dataPointText: '36'},
    {value: 60, dataPointText: '60'},
    {value: 54, dataPointText: '54'},
    {value: 85, dataPointText: '85'},
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
      />
    </View>
  );
};

export default DataSetSteppedChart;
