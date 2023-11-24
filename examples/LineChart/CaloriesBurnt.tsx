import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart} from '../../src/LineChart';
import { ruleTypes } from '../../src/utils/constants';

const CaloriesBurnt = () => {
  const data1 = [
    {value: 70},
    {value: 36},
    {value: 50},
    {value: 40},
    {value: 18},
    {value: 38},
  ];
  const data2 = [
    {value: 50},
    {value: 10},
    {value: 45},
    {value: 30},
    {value: 45},
    {value: 18},
  ];
  return (
    <View style={{borderWidth:1}}>
      <LineChart
        areaChart
        curved
        data={data1}
        data2={data2}
        hideDataPoints
        spacing={68}
        color1="#8a56ce"
        color2="#56acce"
        startFillColor1="#8a56ce"
        startFillColor2="#56acce"
        endFillColor1="#8a56ce"
        endFillColor2="#56acce"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType={ruleTypes.SOLID}
        rulesColor="gray"
        yAxisTextStyle={{color: 'gray'}}
        yAxisLabelSuffix="%"
        xAxisColor="lightgray"
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: 'lightgray',
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,
          pointerLabelComponent: items => {
            return (
              <View
                style={{
                  height: 120,
                  width: 100,
                  backgroundColor: '#282C3E',
                  borderRadius: 4,
                  justifyContent: 'center',
                  paddingLeft: 16,
                }}>
                <Text style={{color: 'lightgray', fontSize: 12}}>{2018}</Text>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {items[0].value}
                </Text>
                <Text style={{color: 'lightgray', fontSize: 12, marginTop: 12}}>
                  {2019}
                </Text>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {items[1].value}
                </Text>
              </View>
            );
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default CaloriesBurnt;
