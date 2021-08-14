import React from 'react';
import {View} from 'react-native';
import {PieChart} from '../../src/PieChart';

const ThreeDPie = () => {
  const pieData = [
    {value: 54, color: '#177AD5', text: '54%'},
    {value: 40, color: '#79D2DE', text: '30%'},
    {value: 20, color: '#ED6665', text: '26%'},
  ];

  return (
    <View>
      <PieChart
        donut
        isThreeD
        showText
        innerCircleBorderWidth={6}
        innerCircleBorderColor="lightgray"
        shiftInnerCenterX={-10}
        shiftInnerCenterY={-15}
        textColor="black"
        radius={170}
        textSize={20}
        showTextBackground
        textBackgroundRadius={26}
        data={pieData}
      />
    </View>
  );
};

export default ThreeDPie;
