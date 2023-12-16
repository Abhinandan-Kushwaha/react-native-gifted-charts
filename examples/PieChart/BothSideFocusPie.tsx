import React from 'react';
import {View} from 'react-native';
import {PieChart} from '../../src/PieChart';

const BothSideFocusPie = () => {
  const pieData = [
    {value: 54, color: '#177AD5', text: '54%'},
    {value: 30, color: '#79D2DE', text: '30%', focused: true},
    {value: 26, color: '#ED6665', text: '26%'},
  ];
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
        focusOnPress
        inwardExtraLengthForFocused={30}
      />
    </View>
  );
};

export default BothSideFocusPie;
