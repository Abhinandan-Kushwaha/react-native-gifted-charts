import React from 'react';
import {View,Animated} from 'react-native'
import {BarChart} from '../../src/BarChart';

const SecondaryLineBar = () => {
  const animatedHeight = new Animated.Value(0);
  Animated.timing(animatedHeight,{
    toValue: 300,
    duration:2000,
    useNativeDriver: false
  }).start();
  return (
    <Animated.View style={{backgroundColor:'yellow',overflow:'hidden'}}>
    <BarChart
      isAnimated
      xAxisLabelTexts={[
        'J',
        'F',
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S',
        'O',
        'N',
        'D',
      ]}
      data={[
        {value: 12},
        {value: 15},
        {value: 14},
        {value: 19},
        {value: 22},
        {value: 14},
        {value: 17},
        {value: 18},
        {value: 21},
        {value: 16},
        {value: 22},
        {value: 16},
      ]}
      // secondaryData={[{value: 20},{value: 30},{value: 10}]}
      roundedTop
      roundedBottom
      frontColor={'black'}
      barWidth={15}
      spacing={10}
      // hideAxesAndRules
      xAxisThickness={0}
      yAxisThickness={0}
      showLine
      secondaryYAxis
      lineConfig={{
        isSecondary: true,
        dataPointsWidth: 0,
        isAnimated: true,
        curved: true,
        delay: 1000,
        color: 'red',
        thickness: 3,
      }}
      lineData={[
        {value: 20},
        {value: 54},
        {value: 48},
        {value: 20},
        {value: 20},
        {value: 26},
        {value: 78},
        {value: 79},
        {value: 94},
        {value: 68},
        {value: 90},
        {value: 60},
      ]}
    />
    </Animated.View>
  );
};

export default SecondaryLineBar;
