import React from 'react';
import {View} from 'react-native';
import {LineChart} from './src';

const App = () => {
  const lineData = [
    {value: 40},
    {value: 80},
    {value: 170},
    {value: 90},
    {value: 190},
  ];
  const lineData2 = [
    {value: 30},
    {value: 40},
    {value: 60},
    {value: 70},
    {value: 100},
  ];

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LineChart
        xAxisColor="red"
        xAxisThickness={2}
        yAxisColor="purple"
        yAxisThickness={0.5}
        yAxisTextStyle={{color: 'blue'}}
        isAnimated
        animationDuration={1000}
        height={300}
        rotateLabel
        thickness={1}
        dataPointsHeight={4}
        dataPointsWidth={4}
        dataPointsBorderRadius={2}
        spacing={60}
        color1="skyblue"
        color2="orange"
        data={[...lineData]}
        startFillColor1="skyblue"
        endOpacity1={0.1}
        endFillColor1="skyblue"
        startFillColor2="orange"
        endFillColor2="white"
        curved
        showVerticalRules
        showYAxisIndices
        showXAxisIndices
        data2={[...lineData2]}
      />
    </View>
  );
};

export default App;
