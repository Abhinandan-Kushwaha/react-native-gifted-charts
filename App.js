import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart, LineChart} from './src';

const App = () => {
  const [toggle, setToggle] = useState(true);

  const [data, setData] = useState([
    {value: 15, label: 'Jan'},
    {
      value: 40,
      label: 'Feb',
      verticalLineColor: 'red',
      // showVerticalLine: true,
      verticalLineThickness: StyleSheet.hairlineWidth,
    },
    {
      value: 10,
      label: 'Mar',
    },
    {
      value: 30,
      label: 'Apr',
    },
    {value: 20, label: 'May'},
    {value: 40, label: 'Jun'},
    {value: 48, label: 'Jul'},
    {value: 30, label: 'Aug'},
    {value: 20, label: 'Sep'},
    {value: 40, label: 'Oct'},
    {
      value: 48,
      label: 'Nov',
      onPress: () => Alert.alert('Sales in Nov skyrocketed to $48 M'),
    },
    {value: 30, label: 'Dec'},
  ]);

  return (
    <View
      style={{
        marginTop: 100,
        paddingVertical: 50,
      }}>
      {!toggle ? (
        <BarChart
          isThreeD
          key={'xyz'}
          height={300}
          maxValue={360}
          showLine
          initialSpacing={30}
          // showVerticalLines
          lineConfig={{
            // isAnimated: true,
            delay: 800,
            color: 'green',
            // hideDataPoints: true,
            // showDataPoint: false,
            // dataPointsRadius: 5,
            dataPointsColor: 'purple',
            dataPointsRadius: 4,
            thickness: 2,
            shiftY: 25,
            curved: true,
          }}
          barWidth={32}
          // width={190}
          data={[
            {
              value: 270,
              label: 'Jan',
            },
            {value: 250, label: 'Feb'},
            {value: 200, label: 'Mar'},
            {
              value: 150,
              label: 'Apr',
              showVerticalLine: true,
              verticalLineColor: 'black',
            },
            {value: 200, label: 'May'},
            {value: 250, label: 'Jun'},
            {value: 270, label: 'Jul'},
          ]}
          // horizontal
          // showReferenceLine1
          // referenceLine1Position={120}
          // referenceLine1Config={{
          //   type: 'solid',
          //   color: 'rgba(200,0,0,0.6)',
          //   thickness: 1,
          // }}
          // showReferenceLine2
          // referenceLine2Position={240}
          // referenceLine2Config={{
          //   type: 'solid',
          //   color: 'rgba(0,0,0,0.6)',
          //   thickness: 1,
          // }}
          // showReferenceLine3
          // referenceLine3Position={330}
          // referenceLine3Config={{
          //   type: 'solid',
          //   color: 'rgba(0,0,200,0.6)',
          //   thickness: 1,
          // }}
          // showYAxisIndices
          isAnimated
          showGradient
          // cappedBars
          yAxisColor={'rgb(78, 0, 142)'}
          xAxisColor={'rgb(78, 0, 142)'}
          xAxisThickness={3}
          yAxisThickness={3}
          yAxisTextStyle={{color: 'rgb(78, 0, 142)'}}
          capColor={'rgb(78, 0, 142)'}
          capThickness={4}
          // barWidth={35}
          frontColor={'rgba(200, 100, 244,0.2)'}
          gradientColor={'rgba(78, 0, 142,1)'}
          // rulesType="dashed"
          // rulesColor={'rgba(0,200,0,0.5)'}
          // rulesThickness={1}
          // dashWidth={12}
          // dashGap={2}
        />
      ) : (
        <LineChart
          // width={150}
          // hideDataPoints1
          // spacing={30}
          data={data}
          // data2={lineData1}
          areaChart
          initialSpacing={20}
          // customDataPoint={() => {
          //   return (
          //     <View
          //       style={{
          //         height: 10,
          //         width: 10,
          //         backgroundColor: 'red',
          //         borderWidth: 2,
          //         borderColor: 'blue',
          //         borderRadius: 5,
          //       }}
          //     />
          //   );
          // }}
          // focusedCustomDataPoint={() => {
          //   return (
          //     <View
          //       style={{
          //         height: 14,
          //         width: 14,
          //         backgroundColor: 'green',
          //         borderWidth: 2,
          //         borderColor: 'yellow',
          //         borderRadius: 7,
          //       }}
          //     />
          //   );
          // }}
          // onPress={(item, index) => {
          //   console.log('index-->', index);
          //   setData(data => {
          //     item.focusedCustomDataPoint = () => {
          //       return (
          //         <View
          //           style={{
          //             height: 14,
          //             width: 14,
          //             backgroundColor: 'green',
          //             borderWidth: 2,
          //             borderColor: 'yellow',
          //             borderRadius: 7,
          //           }}
          //         />
          //       );
          //     };
          //     data[index] = item;
          //     console.log('data------.....', data);
          //     return data;
          //   });
          // }}
          // disableScroll
          pressEnabled
          // showDataPointOnPress
          showStripOnPress
          showTextOnPress
          textShiftY={-10}
          textShiftX={-5}
          textFontSize={18}
          textColor={'green'}
          stripWidth={1}
          // stripHeight={200}
          // stripHeight={200}
          stripOpacity={1}
          curved
          isAnimated
          animationDuration={2000}
          // animationDuration={2000}
          // dataPointsShape="rectangular"
          // showGradient
          color={'rgb(78, 0, 142)'}
          yAxisColor={'rgb(78, 0, 142)'}
          xAxisColor={'rgb(78, 0, 142)'}
          // dataPointsColor={'yellow'}
          dataPointsWidth={22}
          dataPointsHeight={22}
          xAxisThickness={3}
          yAxisThickness={3}
          dataPointsRadius={4}
          focusedDataPointRadius={10}
          yAxisTextStyle={{color: 'rgb(78, 0, 142)'}}
          startFillColor={'rgb(200, 100, 244)'}
          startOpacity={0.9}
          endFillColor={'rgb(255, 255, 255)'}
          endOpacity={0.2}
        />
      )}

      <TouchableOpacity
        onPress={() => setToggle(!toggle)}
        style={{marginTop: 100, alignSelf: 'center'}}>
        <Text>Line Chart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
