import React from 'react';
import {View} from 'react-native';
import {BarChart,ruleTypes} from 'react-native-gifted-charts';

export const BarLine = props => {
  const data = [
    {value: 12},
    {value: 4},
    {value: 18},
    {value: 16},
    {value: 5},
    {value: 11},
    {value: 16},
    {value: 5},
    {value: 11},
  ];

  const lineValuesArray = [
    22, 25, 29, 28, 26, 20, 24, 22, 23, 18, 21, 22, 28, 27, 30,
  ];
  const lineData = lineValuesArray.map((item, index) => ({
    value: item,
    customDataPoint:
      (index + 1) % 3 == 0
        ? () => (
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 9,
                backgroundColor: '#42F19E',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 6,
                  width: 6,
                  borderRadius: 3,
                  backgroundColor: 'white',
                }}
              />
            </View>
          )
        : () => {},
  }));

  return (
    <BarChart
      data={data}
      noOfSections={3}
      maxValue={30}
      barWidth={16}
      spacing={40}
      initialSpacing={0}
      roundedTop
      showGradient
      frontColor={'#00C4F5'}
      gradientColor={'#7A4FD1'}
      xAxisType={ruleTypes.DASHED}
      xAxisColor={'gray'}
      rulesColor={'gray'}
      yAxisThickness={0}
      hideYAxisText
      showLine
      lineData={lineData}
      lineConfig={{
        curved: true,
        color: '#42F19E',
        thickness: 4,
        spacing: 6,
      }}
    />
  );
};
