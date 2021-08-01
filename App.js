import React from 'react';
import {View} from 'react-native';
import {LineChart} from './src';

const App = () => {
  const lineData = [
    {value: 40, label: 'Jan'},
    {value: 80, label: 'Feb'},
    {value: 170, label: 'Mar'},
    {value: 90, label: 'Apr'},
    {value: 190, label: 'May'},
  ];
  const lineData2 = [
    {value: 30, label: 'Jan'},
    {value: 40, label: 'Feb'},
    {value: 60, label: 'Mar'},
    {value: 70, label: 'Apr'},
    {value: 100, label: 'May'},
  ];

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LineChart
        xAxisColor="red"
        xAxisThickness={2}
        yAxisColor="purple"
        yAxisThickness={0.5}
        yAxisTextStyle={{color: 'blue', fontSize: 10}}
        isAnimated
        animationDuration={1200}
        height={300}
        rotateLabel
        thickness={4}
        dataPointsHeight={4}
        dataPointsWidth={4}
        dataPointsBorderRadius={2}
        spacing={84}
        initialSpacing={0}
        areaChart
        color1="skyblue"
        color2="orange"
        data={[...lineData]}
        startFillColor1="skyblue"
        endOpacity1={0.1}
        endFillColor1="skyblue"
        startFillColor2="orange"
        endFillColor2="white"
        curved
        // hideRules
        showVerticalRules
        // showYAxisIndices
        // showXAxisIndices
        data2={[...lineData2]}
      />
    </View>
  );
};

export default App;
