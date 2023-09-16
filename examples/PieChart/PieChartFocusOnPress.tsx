import React from 'react';
import {View} from 'react-native';
import {PieChart} from '../../src/PieChart';

const PieChartFocusOnPress = () => {
  const pieData = [
    {value: 54, color: '#177AD5', text: '54%'},
    {value: 30, color: '#79D2DE', text: '30%'},
    {value: 26, color: '#ED6665', text: '26%'},
  ];
  return (
    <View>
      <PieChart
        donut
        showText
        textColor="black"
        innerRadius={70}
        showTextBackground
        textBackgroundColor="white"
        textBackgroundRadius={22}
        data={pieData}
        focusOnPress
      />
    </View>
  );
};

export default PieChartFocusOnPress;
