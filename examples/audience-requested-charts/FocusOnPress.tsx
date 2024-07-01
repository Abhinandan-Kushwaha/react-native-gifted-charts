import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {LineChart} from '../../src/LineChart';

export const FocusOnPress = () => {
  const customTooltip = (value: number) => {
    return (
      <View
        style={{
          padding: 6,
          borderWidth: 1,
          borderColor: 'lightgray',
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: -44,
          marginLeft: -26,
        }}>
        <Text style={{color: 'gray', fontSize: 8, textAlign: 'center'}}>
          Date here
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 90,
            marginTop: 10,
          }}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: 'brown',
            }}
          />
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>
            {(value + 0.1).toFixed(1)}
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>
            {value.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  const values = [
    {value: 0},
    {value: 2},
    {value: 1.8},
    {value: 1.7},
    {value: 3},
    {value: 3.2},
    {value: 2},
    {value: 1.8},
    {value: 1.7},
    {value: 3},
  ];
  const data = values.map(item => ({
    ...item,
    dataPointLabelComponent: () => customTooltip(item.value),
  }));

  return (
    <LineChart
      data={data}
      color="skyblue"
      dataPointsColor="brown"
      noOfSections={4}
      maxValue={4}
      focusEnabled
      showStripOnFocus
      showDataPointLabelOnFocus
    />
  );
};
