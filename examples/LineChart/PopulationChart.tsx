import React from 'react';
import {View} from 'react-native';
import {PopulationPyramid} from '../../src/PopulationPyramid';

const PopulationChart = () => {
  const popData = [
    {left: 30, right: 40, midAxisLabel: '~115'},
    {left: 40, right: 44, midAxisLabel: '~105'},
    {left: 55, right: 57, midAxisLabel: '~95'},
    {left: 94, right: 87, midAxisLabel: '~85'},
    {left: 90, right: 88, midAxisLabel: '~75'},
    {left: 88, right: 86, midAxisLabel: '~65'},
  ];

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <PopulationPyramid
        data={popData}
        yAxisLabelTexts={[
          '0-10',
          '10-20',
          '20-30',
          '30-40',
          '40-50',
          '50-60',
          '60-70',
          '70-80',
          '80-90',
          '90-100',
          '100-110',
          '110-120',
        ].reverse()}
        yAxisLabelFontSize={9}
        showYAxisIndices
        showMidAxis
        midAxisLabelFontSize={10}
        midAxisLabelColor={'gray'}
        leftBarLabelColor={'blue'}
        rightBarLabelColor={'red'}
        midAxisLeftColor={'blue'}
        midAxisRightColor={'red'}
      />
    </View>
  );
};

export default PopulationChart;
