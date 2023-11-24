import React from 'react';
import {View} from 'react-native';
import {PieChart} from '../../src/PieChart';

const PieSingleData = () => {
  const pieData = [{value: 54, color: '#177AD5', text: '54%'}];
  return (
    <View style={{borderWidth:1}}>
      <PieChart
        donut
        showText
        textColor="black"
        innerRadius={70}
        showTextBackground
        textBackgroundColor="white"
        textBackgroundRadius={22}
        data={pieData}
      />
    </View>
  );
};

export default PieSingleData;
