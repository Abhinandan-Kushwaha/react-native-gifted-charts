import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {LineChart} from '../../src/LineChart';

const OuterPointerLegend = () => {
  const d1 = [{value: 5}, {value: 8}, {value: 7}, {value: 9}];
  const d2 = [{value: 3}, {value: 4}, {value: 5}, {value: 6}];
  const d3 = [{value: 1}, {value: 1.5}, {value: 2.5}, {value: 4}];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const Legend = ({color, label, value}) => {
    const Circle = ({color}) => (
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 15,
          borderWidth: 4,
          borderColor: 'lightgray',
          backgroundColor: color,
          marginHorizontal: 10,
        }}
      />
    );

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Circle color={color} />
          <Text style={{fontSize: 20}}>{label}</Text>
        </View>
        <Text style={{fontSize: 22, marginRight: 20}}>{value}</Text>
      </View>
    );
  };

  return (
    <View>
      <LineChart
        data={d1}
        data2={d2}
        data3={d3}
        hideDataPoints
        areaChart
        spacing={80}
        thickness1={6}
        color1="orange"
        startFillColor1="#BF27D3"
        startFillColor2="cyan"
        startFillColor3="lightgray"
        endSpacing={0}
        getPointerProps={item => {
          if (item.pointerIndex !== -1) setSelectedIndex(item.pointerIndex);
        }}
        pointerConfig={{
          persistPointer: true,
          pointer1Color: 'red',
          pointer2Color: 'blue',
          pointer3Color: 'gray',
          radius: 6,
          pointerStripWidth: 3,
        }}
      />
      <Legend
        color={'orange'}
        label={'ABC'}
        value={d1[selectedIndex]?.value ?? ''}
      />
      <Legend
        color={'cyan'}
        label={'DEF'}
        value={d2[selectedIndex]?.value ?? ''}
      />
      <Legend
        color={'gray'}
        label={'GHI'}
        value={d3[selectedIndex]?.value ?? ''}
      />
    </View>
  );
};

export default OuterPointerLegend;
