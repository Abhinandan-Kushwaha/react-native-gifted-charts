import React from 'react';
import {View} from 'react-native';
import {LineChart} from '../../src/LineChart';

const Segmented = () => {
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
  return (
    <View style={{borderWidth:1}}>
      <LineChart
        data={lineData}
        data2={lineData2}
        lineSegments={[{startIndex: 2, endIndex: 4, strokeDashArray: [3, 4]}]}
        lineSegments2={[
          {startIndex: 0, endIndex: 2, color: 'gray'},
          {startIndex: 4, endIndex: 6, strokeDashArray: [3, 4], color: 'gray'},
        ]}
        height={250}
        showValuesAsDataPointsText
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        color1="skyblue"
        color2="orange"
        textColor1="green"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="blue"
        dataPointsColor2="red"
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
      />
    </View>
  );
};

export default Segmented;
