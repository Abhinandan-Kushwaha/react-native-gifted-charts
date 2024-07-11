import React from 'react';
import {View} from 'react-native';
import {PieChart} from '../../src/PieChart';

const SplitPie = () => {
  const pieData = [
    {value: 54, color: '#177AD5'},
    {value: 40, color: '#79D2DE'},
    {value: 20, color: '#ED6665', shiftX: -10, shiftY: -18},
  ];
  return (
    <View style={{borderWidth: 1}}>
      <PieChart data={pieData} />
    </View>
  );
};

export default SplitPie;
