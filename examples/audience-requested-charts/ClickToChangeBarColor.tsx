import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

export const ClickToChangeBarColor = () => {
  const data = [
    {value: 50, xValue: '4AM'},
    {value: 80, xValue: '8AM'},
    {value: 90, xValue: '12AM'},
    {value: 70, xValue: '4PM'},
    {value: 70, xValue: '8PM'},
    {value: 70, xValue: '9AM'},
  ];

  const topLabelComponent = item => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 8,
          backgroundColor: 'black',
          marginBottom: 4,
          marginLeft: -20,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          {item.xValue}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
          </View>

          <Text
            style={{
              color: 'yellow',
              paddingLeft: 3,
            }}>
            {item.value} mins
          </Text>
        </View>
      </View>
    );
  };
  return (
    <BarChart
      data={data}
      height={100}
      barBorderTopLeftRadius={4}
      barBorderTopRightRadius={4}
      yAxisTextStyle={{color: 'red'}}
      showYAxisIndices={false}
      hideYAxisText
      xAxisLabelTextStyle={{
        color: 'gray',
        fontSize: 10,
      }}
      xAxisLabelTexts={['4AM', '8PM', '12AM', '4PM', '8PM', '9AM']}
      renderTooltip={topLabelComponent}
      barStyle={{color: 'red'}}
      barWidth={26}
      yAxisColor={'transparent'}
      xAxisColor={'gray'}
      barBorderColor={'green'}
      frontColor={'blue'}
      yAxisExtraHeight={60}
      hideRules
      focusBarOnPress
    />
  );
};
