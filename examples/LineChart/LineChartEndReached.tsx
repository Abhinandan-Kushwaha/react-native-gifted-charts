import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {LineChart} from '../../src/LineChart';

const LineChartEndReached = () => {
  const [onEndReached, setOnEndReached] = useState(false);
  const [num, setNum] = useState(9);
  const [lineData, setLineData] = useState([
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
      setLineData([
        ...lineData,
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
      <LineChart
        data={lineData}
        height={250}
        showValuesAsDataPointsText
        showVerticalLines
        spacing={44}
        initialSpacing={0}
        color="skyblue"
        textColor="green"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor="blue"
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
        endReached={() => setOnEndReached(true)}
      />
    </View>
  );
};

export default LineChartEndReached;
