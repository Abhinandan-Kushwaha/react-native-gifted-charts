import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {BarChart} from '../../src/BarChart';

const SimpleBarsEndReached = () => {
  const [onEndReached, setOnEndReached] = useState(false);
  const [num, setNum] = useState(9);
  const [barData1, setBarData1] = useState([
    {value: 250, label: '1'},
    {value: 500, label: '2', frontColor: '#177AD5'},
    {value: 745, label: '3', frontColor: '#177AD5'},
    {value: 320, label: '4'},
    {value: 600, label: '5', frontColor: '#177AD5'},
    {value: 256, label: '6'},
    {value: 300, label: '7'},
    {value: 250, label: '8'},
  ]);

  useEffect(() => {
    if (onEndReached) {
      setBarData1([
        ...barData1,
        {value: 745, label: num.toString()},
        {value: 320, label: (num + 1).toString()},
        {value: 600, label: (num + 2).toString()},
        {value: 256, label: (num + 3).toString()},
      ]);
      setNum(num + 4);
      setOnEndReached(false);
    }
  }, [onEndReached]);

  return (
    <View style={{borderWidth: 1}}>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData1}
        yAxisThickness={0}
        xAxisThickness={0}
        onEndReached={() => setOnEndReached(true)}
      />
    </View>
  );
};

export default SimpleBarsEndReached;
