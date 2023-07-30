import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {LineChart} from '../../src/LineChart';

const AreaChartDynamicData = () => {
  const lcomp = (v) => <Text style={{width:50, color:'white',fontWeight:'bold'}}>{v}</Text>
  const latestData = [
      {
        value: 350,
        labelComponent: () => lcomp('22 Nov'),
        customDataPoint: dPoint,
      },
      {
        value: 370,
        hideDataPoint: true,
      },
      {
        value: 460,
        customDataPoint: dPoint,
      },
      {
        value: 500,
        hideDataPoint: true,
      },
      {
        value: 570,
        labelComponent: () => lcomp('24 Nov'),
        customDataPoint: dPoint,
      },
      {
        value: 560,
        hideDataPoint: true,
      },
      {
        value: 590,
        customDataPoint: dPoint,
      },
      {
        value: 490,
        hideDataPoint: true,
      },
      {
        value: 280,
        labelComponent: () => lcomp('26 Nov'),
        customDataPoint: dPoint,
      },
      {
        value: 370,
        hideDataPoint: true,
      },
      {
        value: 350,
        customDataPoint: dPoint,
      },
      {
        value: 460,
        hideDataPoint: true,
      },
      {
        value: 520,
        labelComponent: () => lcomp('28 Nov'),
        customDataPoint: dPoint,
      },
      {
        value: 490,
        hideDataPoint: true,
      },
      {
        value: 370,
        hideDataPoint: true,
      },
      {
        value: 350,
        customDataPoint: dPoint,
      },
      {
        value: 460,
        labelComponent: () => lcomp('28 Nov'),
        customDataPoint: dPoint,
      },
      {
        value: 270,
        hideDataPoint: true,
      },
      {
        value: 350,
        customDataPoint: dPoint,
      },
    ];
const [currentData, setCurrentData] = useState(JSON.parse(JSON.stringify(latestData)));
useEffect(()=>{
  setTimeout(()=>{
    const newData = latestData.map(item => {
      return {
        ...item,
        value: 250,
      }
    })
    setCurrentData(newData);
  },1500)

  setTimeout(()=>{
    const newData = latestData.map(item => {
      return {
        ...item,
        value: item.value - 50,
      }
    })
    setCurrentData(newData);
  },2500)

  setTimeout(()=>{
    const newData = latestData.map(item => {
      return {
        ...item,
        value: 500 - item.value,
      }
    })
    setCurrentData(newData);
  },3500)
},[])
  const dPoint = () => {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: 'white',
          borderWidth: 3,
          borderRadius: 7,
          borderColor: '#07BAD1',
        }}
      />
    );
  };
  return (
    <View>
      <View
        style={{
          marginVertical: 100,
          paddingVertical: 50,
          backgroundColor: '#414141',
        }}>
        <LineChart
          isAnimated
          thickness={3}
          color="#07BAD1"
          maxValue={600}
          noOfSections={3}
          animateOnDataChange
          animationDuration={1000}
          onDataChangeAnimationDuration={300}
          areaChart
          yAxisTextStyle={{color: 'lightgray'}}
          data={currentData}
          hideDataPoints
          startFillColor={'rgb(84,219,234)'}
          endFillColor={'rgb(84,219,234)'}
          startOpacity={0.4}
          endOpacity={0.1}
          spacing={22}
          backgroundColor="#414141"
          rulesColor="gray"
          rulesType="solid"
          initialSpacing={10}
          yAxisColor="lightgray"
          xAxisColor="lightgray"
        />
      </View>
    </View>
  );
};

export default AreaChartDynamicData;
