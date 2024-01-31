import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {BarChart} from '../../src/BarChart';
import {barDataItem, ruleTypes} from 'gifted-charts-core';

export const HighlightXaxis = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const MyComponent = (labelText, index) => {
    const isSelected = selectedIndex === index;
    return (
      <View
        style={{
          backgroundColor: isSelected ? '#344F6C' : 'transparent',
          width: 20,
          height: 24,
          paddingTop: 2,
          alignSelf: 'center',
          borderRadius: 4,
        }}>
        <Text
          style={{textAlign: 'center', color: isSelected ? 'white' : 'gray'}}>
          {labelText}
        </Text>
      </View>
    );
  };

  const data: barDataItem[] = [
    {value: 49.5, labelComponent: () => MyComponent('M', 0)},
    {value: 64.2, labelComponent: () => MyComponent('T', 1)},
    {value: 52.2, labelComponent: () => MyComponent('W', 2)},
    {value: 76.5, labelComponent: () => MyComponent('T', 3)},
  ];
  return (
    <BarChart
      data={data}
      roundedTop
      frontColor="lightgray"
      barWidth={20}
      spacing={40}
      showReferenceLine1
      referenceLine1Position={60}
      referenceLine1Config={{
        color:'#6DBDBD',
        thickness: 5
      }}
      referenceLinesOverChartContent={false}
      rulesType={ruleTypes.SOLID}
      showFractionalValues
      roundToDigits={3}
      noOfSections={5}
      yAxisLabelWidth={60}
      yAxisTextStyle={{color: 'gray'}}
      yAxisColor={'lightgray'}
      xAxisColor={'lightgray'}
      focusBarOnPress
      focusedBarConfig={{color: '#344F6C'}}
      onPress={(item, index) => {
        setSelectedIndex(index);
      }}
    />
  );
};
