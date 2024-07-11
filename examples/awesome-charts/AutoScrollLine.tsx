import React, {useRef, useState, useEffect} from 'react';
import {View} from 'react-native';
import {LinearGradient,Stop} from 'react-native-svg';
import {LineChart} from '../../src/LineChart';

const AutoScrollLine = () => {
  const ref = useRef(null);
  const [x, setX] = useState(10);

  const data = [
    {value: 6},
    {value: 10},
    {value: 8},
    {value: 5},
    {value: 15},
    {value: 8},
    {value: 0},
    {value: 8},
    {value: 10},
    {value: 20},
    {value: 12},
    {value: 15},
    {value: 20},
    {value: 22},
    {value: 20},
    {value: 6},
    {value: 10},
    {value: 8},
    {value: 5},
    {value: 15},
    {value: 8},
    {value: 0},
    {value: 8},
    {value: 10},
    {value: 20},
    {value: 12},
    {value: 15},
    {value: 20},
    {value: 22},
    {value: 20},
  ];

  const done = useRef(0);

  useEffect(() => {
    ref?.current?.scrollTo({x});
    if (done.current < 2) {
      if (x < 560) {
        setTimeout(() => setX(x + 5), done.current ? 16 : 20);
      } else {
        setTimeout(() => setX(-200), 1800);
        done.current++;
      }
    }
  }, [x]);

  return (
    <View style={{backgroundColor: '#011', flex: 1}}>
      <LineChart
        spacing={30}
        curved
        thickness={4}
        lineGradient
        lineGradientId="ggrd" // same as the id passed in <LinearGradient> below
        lineGradientComponent={() => {
          return (
            <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={'#A4F700'} />
              <Stop offset="0.5" stopColor={'#7CF2F7'} />
              <Stop offset="1" stopColor={'#F6A003'} />
            </LinearGradient>
          );
        }}
        isAnimated
        hideRules
        hideDataPoints
        animationDuration={10000}
        scrollRef={ref}
        data={data}
        color2="yellow"
        data2={[...data].map(item => ({value: item.value * 0.6}))}
        thickness2={2}
        xAxisColor={'gray'}
        yAxisColor={'gray'}
        yAxisTextStyle={{color: 'lightgray'}}
        showVerticalLines
        verticalLinesUptoDataPoint
        verticalLinesColor={'#243'}
      />
    </View>
  );
};

export default AutoScrollLine;
