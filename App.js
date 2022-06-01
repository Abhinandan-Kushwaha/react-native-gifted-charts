import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart, LineChart, PieChart} from './src';
import {Path, Pattern} from 'react-native-svg';
import BarWithGradient from './examples/BarChart/BarWithGradient';
import CappedBars from './examples/BarChart/CappedBars';
import RoundStackBar from './examples/BarChart/RoundStackBar';
import SimpleBarAnimated from './examples/BarChart/SimpleBarAnimated';
import SimpleBlueBars from './examples/BarChart/SimpleBlueBars';
import SimpleBlueBarsVerticalLines from './examples/BarChart/SimpleBlueBarsVerticalLines';
import BarChartWithGivenNumberOfVerticalLines from './examples/BarChart/BarChartWithGivenNumberOfVerticalLines';
import AnimatedArea from './examples/LineChart/AnimatedArea';
import AreaTwo from './examples/LineChart/AreaTwo';
import LineChartTwo from './examples/LineChart/LineChartTwo';
import SimpleBlueLine from './examples/LineChart/SimpleBlueLine';
import SimpleBlueLineWithGivenNumberOfVerticalLines from './examples/LineChart/SimpleBlueLineWithGivenNumberOfVerticalLines';
import ProgressPie from './examples/PieChart/ProgressPie';
import SimplePie from './examples/PieChart/SimplePie';
import PieChartFocusOnPress from './examples/PieChart/PieChartFocusOnPress';
import SplitPie from './examples/PieChart/SplitPie';
import ThreeDPie from './examples/PieChart/ThreeDPie';
import CaloriesBurnt from './examples/LineChart/CaloriesBurnt';
import ScrollingChartWithPointer from './examples/LineChart/ScrollingChartWithPointer';
import AreaGraphCard from './AreaGraphCard';

const App = () => {
  const [toggle, setToggle] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCurrentData(latestData5);
  //   }, 1100 + 100 + 310);
  //   setTimeout(() => {
  //     setCurrentData(latestData2);
  //   }, 1100 + 300 + 620);

  //   setTimeout(() => {
  //     setCurrentData(latestData5);
  //   }, 1100 + 500 + 930);

  //   setTimeout(() => {
  //     setCurrentData(latestData3);
  //   }, 1100 + 1000 + 1240);

  //   setTimeout(() => {
  //     setCurrentData(latestData4);
  //   }, 1100 + 1500 + 1550);

  //   setTimeout(() => {
  //     setCurrentData(latestData5);
  //   }, 6000);

  //   setTimeout(() => {
  //     setCurrentData(latestData);
  //   }, 7000);
  // }, []);
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
  const lcomp = val => {
    return (
      <View style={{width: 70, marginLeft: 7}}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>{val}</Text>
      </View>
    );
  };
  const latestData = [
    {
      value: 600 - 100,
      labelComponent: () => lcomp('22 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 120,
      hideDataPoint: true,
    },
    {
      value: 600 - 210,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 250,
      hideDataPoint: true,
    },
    {
      value: 600 - 320,
      labelComponent: () => lcomp('24 Nov'),
      customDataPoint: dPoint,
      showStrip: true,
      stripHeight: 190,
      stripColor: 'black',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>410</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: -14,
    },
    {
      value: 600 - 310,
      hideDataPoint: true,
    },
    {
      value: 600 - 270,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 240,
      hideDataPoint: true,
    },
    {
      value: 600 - 130,
      labelComponent: () => lcomp('26 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 120,
      hideDataPoint: true,
    },
    {
      value: 600 - 100,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 210,
      hideDataPoint: true,
    },
    {
      value: 600 - 270,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 240,
      hideDataPoint: true,
    },
    {
      value: 600 - 120,
      hideDataPoint: true,
    },
    {
      value: 600 - 100,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 210,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 20,
      hideDataPoint: true,
    },
    {
      value: 600 - 100,
      customDataPoint: dPoint,
    },
  ];

  const latestData2 = [
    {
      value: 400 - 100,
      labelComponent: () => lcomp('22 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 400 - 120,
      hideDataPoint: true,
    },
    {
      value: 400 - 210,
      customDataPoint: dPoint,
    },
    {
      value: 400 - 250,
      hideDataPoint: true,
    },
    {
      value: 400 - 320,
      labelComponent: () => lcomp('24 Nov'),
      customDataPoint: dPoint,
      showStrip: true,
      stripHeight: 190,
      stripColor: 'black',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>410</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: -14,
    },
    {
      value: 400 - 310,
      hideDataPoint: true,
    },
    {
      value: 400 - 270,
      customDataPoint: dPoint,
    },
    {
      value: 400 - 240,
      hideDataPoint: true,
    },
    {
      value: 400 - 130,
      labelComponent: () => lcomp('26 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 400 - 120,
      hideDataPoint: true,
    },
    {
      value: 400 - 100,
      customDataPoint: dPoint,
    },
    {
      value: 400 - 210,
      hideDataPoint: true,
    },
    {
      value: 400 - 270,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 400 - 240,
      hideDataPoint: true,
    },
    {
      value: 400 - 120,
      hideDataPoint: true,
    },
    {
      value: 400 - 100,
      customDataPoint: dPoint,
    },
    {
      value: 400 - 210,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 400 - 20,
      hideDataPoint: true,
    },
    {
      value: 400 - 100,
      customDataPoint: dPoint,
    },
  ];

  const latestData3 = [
    {
      value: 600 - 170,
      labelComponent: () => lcomp('22 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 60,
      hideDataPoint: true,
    },
    {
      value: 600 - 290,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 120,
      hideDataPoint: true,
    },
    {
      value: 600 - 390,
      labelComponent: () => lcomp('24 Nov'),
      customDataPoint: dPoint,
      showStrip: true,
      stripHeight: 190,
      stripColor: 'black',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>410</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: -14,
    },
    {
      value: 600 - 210,
      hideDataPoint: true,
    },
    {
      value: 600 - 370,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 140,
      hideDataPoint: true,
    },
    {
      value: 600 - 330,
      labelComponent: () => lcomp('26 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 50,
      hideDataPoint: true,
    },
    {
      value: 600 - 200,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 110,
      hideDataPoint: true,
    },
    {
      value: 600 - 370,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 140,
      hideDataPoint: true,
    },
    {
      value: 600 - 320,
      hideDataPoint: true,
    },
    {
      value: 600 - 20,
      customDataPoint: dPoint,
    },
    {
      value: 600 - 310,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 600 - 120,
      hideDataPoint: true,
    },
    {
      value: 600 - 100,
      customDataPoint: dPoint,
    },
  ];

  const latestData4 = [
    {
      value: 300 - 170,
      labelComponent: () => lcomp('22 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 300 - 60,
      hideDataPoint: true,
    },
    {
      value: 300 - 290,
      customDataPoint: dPoint,
    },
    {
      value: 300 - 120,
      hideDataPoint: true,
    },
    {
      value: 300 - 390,
      labelComponent: () => lcomp('24 Nov'),
      customDataPoint: dPoint,
      showStrip: true,
      stripHeight: 190,
      stripColor: 'black',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>410</Text>
          </View>
        );
      },
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: -14,
    },
    {
      value: 300 - 210,
      hideDataPoint: true,
    },
    {
      value: 300 - 370,
      customDataPoint: dPoint,
    },
    {
      value: 300 - 140,
      hideDataPoint: true,
    },
    {
      value: 300 - 330,
      labelComponent: () => lcomp('26 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 300 - 50,
      hideDataPoint: true,
    },
    {
      value: 300 - 200,
      customDataPoint: dPoint,
    },
    {
      value: 300 - 110,
      hideDataPoint: true,
    },
    {
      value: 300 - 370,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 300 - 140,
      hideDataPoint: true,
    },
    {
      value: 300 - 320,
      hideDataPoint: true,
    },
    {
      value: 300 - 20,
      customDataPoint: dPoint,
    },
    {
      value: 300 - 310,
      labelComponent: () => lcomp('28 Nov'),
      customDataPoint: dPoint,
    },
    {
      value: 300 - 120,
      hideDataPoint: true,
    },
    {
      value: 300 - 100,
      customDataPoint: dPoint,
    },
  ];
  const latestData5 = [];
  for (let i = 0; i < latestData.length; i++) {
    latestData5[i] = {...latestData, value: 300};
  }

  const [currentData, setCurrentData] = useState(latestData);

  const customLabel = val => {
    return (
      <View
        style={{
          backgroundColor: 'black',
          // padding: 16,
          borderRadius: 8,
          width: 30,
          paddingVertical: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>{val}</Text>
      </View>
    );
  };
  const ndd = [
    {value: 30, color: 'rgb(84,219,234)'},
    {value: 40, color: 'lightgreen'},
    {value: 20, color: 'orange'},
  ];
  const [data, setData] = useState([
    {value: 15, label: 'Jan'},
    {
      value: 40,
      label: 'Feb',
      verticalLineColor: 'red',
      // showVerticalLine: true,
      verticalLineThickness: StyleSheet.hairlineWidth,
      dataPointLabelComponent: () => customLabel(40),
    },
    {
      value: 10,
      label: 'Mar',
      dataPointLabelComponent: () => customLabel(10),
    },
    {
      value: 30,
      label: 'Apr',
      dataPointLabelComponent: () => customLabel(30),
    },
    {
      value: 20,
      label: 'May',
      dataPointLabelComponent: () => customLabel(20),
    },
    {
      value: 40,
      label: 'Jun',
      focusedDataPointLabelComponent: () => customLabel(40),
    },
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

  const renderLegend = (text, color) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'white',
          }}
        />
        <Text style={{color: 'white', fontSize: 16}}>{text || ''}</Text>
      </View>
    );
  };

  // const styleObject = {
  //   marginLeft: -95,
  //   paddingLeft: 120,
  //   transform: [{rotate: '90deg'}],
  // };
  const ddtt = [
    {
      value: 10,
      label: 'January month',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 20,
      label: 'February month',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 30,
      label: 'March month',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 20,
      label: 'April month',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
  ];

  const MyPattern = () => {
    return (
      <Pattern
        id="DiagonalLines"
        patternUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
        viewBox="0 0 10 10">
        <Path d="M 0 0 L 7 0 L 3.5 7 z" fill="red" stroke="blue" />
      </Pattern>
    );
  };

  const nn = () => {
    return (
      <Pattern
        id="DiagonalLines"
        patternUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={60}
        height={14}
        viewBox="0 0 40 20">
        <Path
          d={`M ${-1220} ${38} L ${465} ${0}`}
          stroke={'white'}
          strokeWidth={1.5}
          transform={{rotation: '-16'}}
        />
      </Pattern>
    );
  };

  const [dtt, setDtt] = useState([
    {
      value: 110,
      barBackgroundPattern: MyPattern,
      patternId: 'DiagonalLines',
      frontColor: '#4444dd',
      spacing: 8,
    },
    {value: 130},
    {
      value: 120,
      barBackgroundPattern: MyPattern,
      patternId: 'DiagonalLines',
      frontColor: '#4444dd',
      spacing: 8,
    },
    {value: 160},
    {
      value: 190,
      barBackgroundPattern: MyPattern,
      patternId: 'DiagonalLines',
      frontColor: '#4444dd',
      spacing: 8,
    },
  ]);

  const barData = [
    {value: 15, label: 'Mon'},
    {value: 30, label: 'Tue'},
    {value: -23, label: 'Wed'},
    {value: 40, label: 'Thu'},
    {value: -16, label: 'Fri'},
    {value: 40, label: 'Sat'},
  ];
  const barData2 = [
    {
      value: 25,
      label: 'Mon',
    },
    {value: 20, label: 'Tue'},
    {value: -13, label: 'Wed'},
    {value: 30, label: 'Thu'},
    {value: -6, label: 'Wed'},
    {value: 30, label: 'Thu'},
    {value: -6, label: 'Wed'},
    {value: 30, label: 'Thu'},
  ];
  const barData3 = [
    {
      value: 15,
      label: 'Monday Morning',
    },
    {value: 10, label: 'Tuesday Morning'},
    {value: 20, label: 'Thuday Morning'},
    {value: 20, label: 'Friday Morning'},
    {value: 20, label: 'Saturday Morning'},
  ];

  const sdata = [
    {
      value: 1.0,
      label: '1',
      showVerticalLine: true,
      verticalLineUptoDataPoint: true,
      verticalLineColor: 'green',
    },
    {value: 0.75, label: '2'},
    {value: 0.25, label: '3'},
    {value: 0.0, label: '4'},
    {value: 0.5, label: '5'},
    {value: 0.72, label: '6'},
    {value: 0.85, label: '7'},
    {value: 0.0, label: '8'},
    {value: 0.5, label: '9'},
    {value: 0.72, label: '10'},
    {value: 0.85, label: '11'},
    {value: 0.72, label: '12'},
    {value: 0.85, label: '13'},
    {value: 0.72, label: '14'},
    {value: 0.85, label: '15'},
  ];
  const lineData = [
    {value: 8, pointerShiftX: 10, pointerShiftY: -10},
    {value: 10},
    {value: 6},
    {value: 18},
    {value: 11},
    {value: 0},
    {value: 19},
    {value: 18},
    {value: 10},
    // {value: 20},
    // {value: 28},
    // {value: 32},
    // {value: 36},
    // {value: 40},
    // {value: 38},
    // {value: 40},
    // {value: 42},
    // {value: 46},
    // {value: 44},
    // {value: 40},
    // {value: 36},
    // {value: 32},
    // {value: 38},
    // {value: 36},
    // {value: 32},
    // {value: 28},
    // {value: 22},
    // {value: 20},
  ];

  // const lineData = [
  //   {value: 0, dataPointText: '0'},
  //   {value: 10, dataPointText: '10'},
  //   {value: 8, dataPointText: '8'},
  //   {value: 58, dataPointText: '58'},
  //   {value: 56, dataPointText: '56'},
  //   {value: 78, dataPointText: '78'},
  //   {value: 74, dataPointText: '74'},
  //   {value: 98, dataPointText: '98'},
  // ];

  // const lineData2 = [
  //   {value: 0, dataPointText: '0'},
  //   {value: 20, dataPointText: '20'},
  //   {value: 18, dataPointText: '18'},
  //   {value: 40, dataPointText: '40'},
  //   {value: 36, dataPointText: '36'},
  //   {value: 60, dataPointText: '60'},
  //   {value: 54, dataPointText: '54'},
  //   {value: 85, dataPointText: '85'},
  // ];

  const styleObject = {
    marginLeft: -130,
    paddingLeft: 110,
    marginTop: -55,
  };

  const lineData1 = [
    {
      value: 10000,
      barMarginBottom: 20,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 40000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 48000,
      onPress: item => Alert.alert(item.value + ''),
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 50000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 56000,
      barMarginBottom: 40,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 70000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 90000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 95000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 70000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 90000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
    {
      value: 95000,
      label: 'hello world',
      labelTextStyle: styleObject,
      labelWidth: 130,
    },
  ];
  const lineData2 = [
    {value: 5},
    {value: 8},
    {value: 18},
    {value: 22},
    {value: 30},
    {value: 44},
    {value: 52},
  ];

  const stackPressed = index => {};

  const stackData = [
    {
      stacks: [
        {
          value: 10,
          color: 'orange',
          innerBarComponent: () => (
            <Text style={{transform: [{rotate: '-90deg'}, {translateX: 10}]}}>
              10
            </Text>
          ),
        },
        {
          value: 20,
          color: '#4ABFF4',
          marginBottom: 2,
          innerBarComponent: () => <Text>20</Text>,
        },
      ],
      spacing: 15,
      label: 'Jan',
    },
    {
      stacks: [
        {value: 10, color: '#4ABFF4', innerBarComponent: () => <Text>10</Text>},
        {
          value: 11,
          color: 'orange',
          marginBottom: 2,
          innerBarComponent: () => <Text>11</Text>,
        },
        {
          value: 15,
          color: '#28B2B3',
          marginBottom: 2,
          innerBarComponent: () => <Text>15</Text>,
        },
      ],
      label: 'Mar',
    },
    {
      stacks: [
        {value: 14, color: 'orange'},
        {value: 18, color: '#4ABFF4', marginBottom: 2},
      ],
      spacing: 15,
      label: 'Feb',
    },
    {
      stacks: [
        {value: 7, color: '#4ABFF4'},
        {value: 11, color: 'orange', marginBottom: 2},
        // {value: 10, color: '#28B2B3', marginBottom: 2},
      ],
      label: 'Mar',
    },
  ];

  const showChart = [
    {value: 50, label: 'archieved', labelTextStyle: {textAlign: 'left'}},
    {value: 450, label: 'discared', labelTextStyle: {textAlign: 'left'}},
    {value: 1387, label: 'active', labelTextStyle: {textAlign: 'left'}},
  ];

  const ldt = [
    {value: -10},
    {value: 25},
    {value: 24},
    {value: 45},
    {value: 60},
    {value: -34},
    {value: 24},
    {value: 45},
    {value: 60},
    {value: -34},
  ];
  const pieData = [
    {value: 54, color: '#177AD5'},
    {value: 40, color: '#79D2DE'},
    {value: 20, color: '#ED6665'},
  ];
  const pieData2 = [
    {value: 70, color: '#177AD5'},
    // {value: 30, color: 'lightgray'},
  ];
  const onBarPressed = (item, index) => {
    console.log(item);
    console.log(index);
  };
  const barDatas = [
    {value: 0.7, label: '1'},
    {value: 0.8, label: '2'},
    {value: 0.6, label: '3'},
    {value: 0.4, label: '4'},
    {value: 0.9, label: '5'},
    {value: 0.7, label: '6'},
  ];

  // const llData = [
  //   {value: 70},
  //   {value: 36},
  //   {value: 50},
  //   {value: 40},
  //   {value: 18},
  //   {value: 38},
  // ];

  const llData = [
    {value: 70},
    {value: 36, barMarginBottom: 30},
    {value: 50},
    {value: 40, barMarginBottom: 0},
    {value: 18, barMarginBottom: 0},
    {value: 38},
  ];
  const llData2 = [
    {value: 50},
    {value: 10},
    {value: 45},
    {value: 30},
    {value: 45},
    {value: 18},
    {value: 45},
    {value: 18},
  ];
  const [drata, setDrata] = useState([
    {value: 120},
    {value: 130},
    {value: 120},
    {value: 160},
    {value: 140},
    {value: 120},
    {value: 160},
    {value: 140},
  ]);
  const ptData = [
    {value: 160, date: '1 Apr 2022'},
    {value: 180, date: '2 Apr 2022'},
    {value: 190, date: '3 Apr 2022'},
    {value: 180, date: '4 Apr 2022'},
    {value: 140, date: '5 Apr 2022'},
    {value: 145, date: '6 Apr 2022'},
    {value: 160, date: '7 Apr 2022'},
    {value: 200, date: '8 Apr 2022'},

    {value: 220, date: '9 Apr 2022'},
    {
      value: 240,
      date: '10 Apr 2022',
      label: '10 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 280, date: '11 Apr 2022'},
    {value: 260, date: '12 Apr 2022'},
    {value: 340, date: '13 Apr 2022'},
    {value: 385, date: '14 Apr 2022'},
    {value: 280, date: '15 Apr 2022'},
    {value: 390, date: '16 Apr 2022'},

    {value: 370, date: '17 Apr 2022'},
    {value: 285, date: '18 Apr 2022'},
    {value: 295, date: '19 Apr 2022'},
    {
      value: 300,
      date: '20 Apr 2022',
      label: '20 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 280, date: '21 Apr 2022'},
    {value: 295, date: '22 Apr 2022'},
    {value: 260, date: '23 Apr 2022'},
    {value: 255, date: '24 Apr 2022'},

    {value: 190, date: '25 Apr 2022'},
    {value: 220, date: '26 Apr 2022'},
    {value: 205, date: '27 Apr 2022'},
    {value: 230, date: '28 Apr 2022'},
    {value: 210, date: '29 Apr 2022'},
    {
      value: 200,
      date: '30 Apr 2022',
      label: '30 Apr',
      labelTextStyle: {color: 'lightgray', width: 60},
    },
    {value: 240, date: '1 May 2022'},
    {value: 250, date: '2 May 2022'},
    {value: 280, date: '3 May 2022'},
    {value: 250, date: '4 May 2022'},
    {value: 210, date: '5 May 2022'},
  ];

  // const props = {
  //   areaMaxValue : 42095,
  //   backgroundColor: "#1c1c1c",
  //   color: "#439dae",
  //   color2: "#5674af",
  //   graphType: "Yearly",
  //   maxValue: 100,
  //   noOfSections: 5,
  //   stepValue: 8419,
  //   toolTipText: [{},{},{}],
  //   yAxisData: ['0%', '20%', '40%', '60%', '80%', '100%'],
  //   yAxisStyle: "#292929",

  // }

  const props = {
    data: [
      {
        value: 0,
      },
      {
        value: 0,
      },
      {
        value: 0,
      },
      {
        value: 0,
      },
      {
        value: 2.543008714282514,
      },
      {
        value: 24.470271636182705,
      },
    ],
    data2: [
      {
        value: 24.53946688785736,
      },
      {
        value: 100,
      },
      {
        value: 7.160509848729807,
      },
      {
        value: 0,
      },
      {
        value: 0,
      },
      {
        value: 0,
      },
    ],
    maxValue: 100,
    areaMaxValue: 42095.805412999995,
    noOfSections: 5,
    stepValue: 8419.1610826,
    color: '#439DAE',
    color2: '#5674AF',
    graphType: 'Yearly',
    backgroundColor: '#1C1C1C',
    yAxisStyle: '#292929',
    yAxisData: ['0%', '20%', '40%', '60%', '80%', '100%'],
    tooltipText: [
      {
        value: '2022',
      },
      {
        value: '2021',
      },
      {
        value: 'undefined - undefined',
      },
    ],
  };
  // const styleObject = {
  //   marginLeft: -95,
  //   paddingLeft: 120,
  //   transform: [{rotate: '90deg'}],
  // };

  const showCharts = [
    {
      value: 13,
      label: 'hello world here',
      labelWidth: 120,
      labelTextStyle: styleObject,
    },
    {
      value: 9,
      label: 'hello world here',
      labelWidth: 120,
      labelTextStyle: styleObject,
    },
    {
      value: 3,
      label: 'hello world here',
      labelWidth: 120,
      labelTextStyle: styleObject,
    },
    {
      value: 2,
      label: 'hello world here',
      labelWidth: 120,
      labelTextStyle: styleObject,
    },
    {
      value: 2,
      label: 'hello world here',
      labelWidth: 120,
      labelTextStyle: styleObject,
    },
    {
      value: 1,
      label: 'hello world here',
      labelWidth: 120,
      labelTextStyle: styleObject,
    },
    {
      value: 1,
      label: 'hello world here',
      labelWidth: 120,
      labelTextStyle: styleObject,
    },
  ];

  //   const pieData = [
  //     {value: 54, color: '#177AD5'},
  //     {value: 40, color: '#79D2DE'},
  //     {value: 20, color: '#ED6665'}
  // ];

  const bbcData = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
  ];

  const data1 = [
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 2.5871326324555546, labelComponent: () => lcomp(10)},
    {value: 4.678033743362773, labelComponent: () => lcomp(10)},
    {value: 20.216823250031982, labelComponent: () => lcomp(10)},
  ];

  const data2 = [
    {value: 16.844381361558508, labelComponent: () => lcomp(10)},
    {value: 8.120871495056477, labelComponent: () => lcomp(10)},
    {value: 100, labelComponent: () => lcomp(10)},
    {value: 1.7351068411690478, labelComponent: () => lcomp(10)},
    {value: 7.804353947946355, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
    {value: 0, labelComponent: () => lcomp(10)},
  ];

  return (
    <View
      style={{
        paddingVertical: 100,
        marginLeft: -70,
        // paddingLeft: -10,
        // backgroundColor: '#1C1C1C',
      }}>
      <View style={{transform: [{rotateZ: '30deg'}, {skewX: '35deg'}]}}>
        <BarChart
          width={560}
          side={'right'}
          data={lineData}
          isThreeD
          sideWidth={40}
          hideAxesAndRules
          // frontColor={'rgb(200,50,50)'}
          // topColor={'rgba(250,50,50,0.8)'}
          // sideColor={'rgb(220,50,50)'}
          frontColor={'rgba(100,90,100,1)'}
          topColor={'rgba(100,150,100,0.8)'}
          sideColor={'rgba(100,120,100,1)'}
        />
      </View>
      <View
        style={{
          transform: [{rotateZ: '30deg'}, {skewX: '35deg'}, {translateY: -100}],
        }}>
        <BarChart
          hideAxesAndRules
          width={560}
          height={140}
          data={lineData}
          isThreeD
          sideWidth={40}
          side={'right'}
          // frontColor={'rgba(100,100,200,1)'}
          // topColor={'rgba(100,100,250,0.8)'}
          // sideColor={'rgba(100,100,220,1)'}
          frontColor={'rgba(100,160,100,1)'}
          topColor={'rgba(100,210,100,0.8)'}
          sideColor={'rgba(100,180,100,1)'}
        />
      </View>
      <View
        style={{
          transform: [{rotateZ: '30deg'}, {skewX: '35deg'}, {translateY: -180}],
        }}>
        <BarChart
          height={120}
          hideAxesAndRules
          width={560}
          data={lineData}
          isThreeD
          sideWidth={40}
          side={'right'}
          frontColor={'rgba(100,220,100,1)'}
          topColor={'rgba(100,255,100,0.8)'}
          sideColor={'rgba(100,240,100,1)'}
        />
      </View>
      {/* <ScrollView style={{overflow:'visible'}}>
        <View style={{marginTop: 40, marginLeft: 80}}>
          {[1, 1, 1, 1, 1].map((items, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  transform: [{rotateZ: '40deg'}, {skewX: '-45deg'}],
                  marginLeft: -50 * index,
                }}>
                {lineData.map(litems => {
                  return (
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: 'green',
                        marginHorizontal: 2,
                        marginVertical: -3,
                        overflow: 'visible',
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          zIndex:1,
                          bottom: 0,
                          transform: [
                            {rotate: '-180deg'},
                            {rotateZ: '-30deg'},
                            {skewX: '45deg'},
                            {translateX: 60},
                            {translateY: 15},
                          ],
                          width: 30,
                          height: Math.random()>0.8 ? litems.value * 5 : 0,
                          backgroundColor: 'rgba(100,100,200,0.9)',
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView> */}
      {/* <AreaGraphCard
        data={data1}
        data2={data2}
        araeMaxValue={82755}
        // backgroundColor={'#1c1c1c'}
        color={'#5674af'}
        color2={'#439dae'}
        graphType="Yearly"
        maxValue={100}
        noOfSections={5}
        stepValue={16551}
        tooltipText={[{}, {}, {}]}
        yAxisData={['0%', '20%', '40%', '60%', '80%', '100%']}
        yAxisStyle={'#292929'}
      /> */}
      {/* <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={bbcData}
        yAxisThickness={0}
        xAxisThickness={0}
        hideRules
        showReferenceLine1
        referenceLine1Position={420}
        referenceLine1Config={{
          color: 'gray',
          dashWidth: 2,
          dashGap: 3,
        }}
      /> */}
      {/* <BarChart
        showScrollIndicator
        data={barData}
        width={280}
        xAxisColor="red"
        xAxisType={'dashed'}
      /> */}
      {/* <LineChart
      showVerticalLines
      width={280}
      noOfVerticalLines={8}
      verticalLinesSpacing={40}
      verticalLinesUptoDataPoint
      data={pieData}
      showGradient /> */}
      {/* <BarChart
        horizontal
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        labelsExtraHeight={120}
        data={showCharts}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={{color: 'black'}}
        yAxisAtTop={false}
        width={320}
      /> */}
      {/* <ScrollingChartWithPointer /> */}
      {/* <SimpleBlueBarsVerticalLines /> */}
      {/* <BarChartWithGivenNumberOfVerticalLines /> */}
      {/* <LineChart
        horizontalRulesStyle={{width: Dimensions.get('window').width * 0.775}}
        thickness={0}
        startFillColor1={props.color}
        hideDataPoints={true}
        startFillColor2={props.color2}
        dataPointsColor1={props.color}
        dataPointsColor2={props.color2}
        color1={'black'}
        color2={'black'}
        adjustToWidth={true}
        maxValue={props.maxValue}
        noOfSections={props.noOfSections}
        yAxisLabelTexts={props.yAxisData}
        areaChart
        stepValue={props.stepValue}
        rulesThickness={1}
        yAxisTextStyle={{color: 'grey', fontSize: 10}}
        data={props.data}
        verticalLineColor={'white'}
        data2={props.data2}
        curved
        endFillColor1={props.color}
        endFillColor2={props.color2}
        startOpacity1={0.6}
        endOpacity1={0.1}
        startOpacity2={0.6}
        scrollAnimation={false}
        endOpacity2={0.1}
        spacing={props.graphType === 'Monthly' ? 43 : 58}
        xAxisThickness={1}
        backgroundColor={props.backgroundColor}
        rulesColor={props.yAxisStyle}
        rulesType="solid"
        initialSpacing={15}
        yAxisColor={'black'}
        xAxisColor={props.yAxisStyle}
        dataPointsHeight={20}
        showScrollIndicator={true}
        dataPointsWidth={20}
        hideRules={props.rulesVisible}
        width={Dimensions.get('window').width * 0.75}
        getPointerProps= {(pointerProps)=>{
          console.log(pointerProps);
        }}
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          // activatePointersOnLongPress: true,
          activatePointersDelay: 10,
          pointerStripColor: 'lightgray',
          autoAdjustPointerLabelPosition: true,
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: 'lightgray',
          radius: 2,
          pointerLabelHeight: 115,
          pointerLabelWidth: 120,
          pointerLabelComponent: items => {
            // console.log('items :', items);
            return props.graphType === 'Yearly' ? (
              <View style={{backgroundColor:'white',justifyContent:'center',width:120,padding:10}}>
                <Text>{props.tooltipText[0].value}</Text>
                <Text>{'Sample tooltip title'}</Text>
                <Text>{props.tooltipText[1].value}</Text>
                <Text>{'Sample tooltip text'}</Text>
              </View>
            ) : (
              <>
                <Text>{props.tooltipText[2].value}</Text>
                <Text>{'Looks cool'}</Text>
              </>
            );
          },
        }}
      /> */}
      {/* <PieChart data={llData}/> */}
      {/* <BarThreeD/> */}
      {/* <BarWithGradient /> */}
      {/* <CappedBars /> */}
      {/* <RoundStackBar /> */}
      {/* <SimpleBarAnimated /> */}
      {/* <SimpleBlueBars /> */}
      {/* <AnimatedArea /> */}
      {/* <AreaTwo /> */}
      {/* <LineChartTwo /> */}
      {/* <SimpleBlueLine /> */}
      {/* <SimpleBlueLineWithGivenNumberOfVerticalLines /> */}
      {/* <ProgressPie /> */}
      {/* <SimplePie /> */}
      {/* <PieChartFocusOnPress /> */}
      {/* <SplitPie /> */}
      {/* <ThreeDPie /> */}
      {/* <LineChart
        data={drata}
        spacing={40}
        pointerConfig={{activatePointersOnLongPress: true,
          pointerStripUptoDataPoint: true,
          pointerLabelWidth: 80,
          pointerLabelComponent: ()=> <Text>Hello</Text>
        }}
        yAxisOffset={100}
        maxValue={120}
      /> */}
      {/* <LineChart
        horizontalRulesStyle={{width: Dimensions.get('window').width * 0.775}}
        thickness={2}
        startFillColor1={'red'}
        hideDataPoints={true}
        startFillColor2={'green'}
        dataPointsColor1={'red'}
        dataPointsColor2={'green'}
        color1={'black'}
        color2={'black'}
        adjustToWidth={true}
        maxValue={200}
        noOfSections={6}
        // yAxisLabelTexts={['']}
        areaChart
        stepValue={40}
        rulesThickness={2}
        yAxisTextStyle={{color: 'grey'}}
        data={[{value:100},{value:80},{value:120},{value:60}]}
        verticalLineColor={'white'}
        data={[{value:70},{value:90},{value:100},{value:80}]}
        curved
        endFillColor1={'red'}
        endFillColor2={'green'}
        startOpacity1={0.6}
        endOpacity1={0.1}
        startOpacity2={0.6}
        scrollAnimation={false}
        endOpacity2={0.1}
        spacing={43}
        xAxisThickness={1}
        // backgroundColor={props.backgroundColor}
        // rulesColor={props.yAxisStyle}
        rulesType="solid"
        // initialSpacing={scales(15)}
        yAxisColor={'black'}
        // xAxisColor={props.yAxisStyle}
        // dataPointsHeight={scales(20)}
        showScrollIndicator={true}
        // dataPointsWidth={scales(20)}
        // hideRules={props.rulesVisible}
        // width={deviceDimensions.width * 0.75}
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          activatePointersOnLongPress: true,
          activatePointersDelay: 10,
          pointerStripColor: 'lightgray',
          autoAdjustPointerLabelPosition: true,
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: 'lightgray',
          radius: 2,
          pointerLabelHeight: 100,
          // pointerLabelWidth: scales(100),
          pointerLabelComponent: items => {
            console.log('items :', items);
            return props.graphType === 'Yearly' ? (
              <Text style={[styles.pointerYearText, {paddingTop: spacing(12)}]}>
                {props.tooltipText[1].value}
                {getCommaString(
                  ((items[1]?.value / 100) * props.areaMaxValue).toFixed(2),
                )}
              </Text>
            ) : (
              <Text style={[styles.pointerYearText, {paddingTop: spacing(12)}]}>
                {props.tooltipText[2].value}
                {getCommaString(
                  ((items[0]?.value / 100) * props.areaMaxValue).toFixed(2),
                )}
              </Text>
            );
          },
        }}
      /> */}
      {/* <CaloriesBurnt /> */}

      {/* <LineChart
        noOfSections={4}
        yAxisLabelTexts={[
          '0',
          '246.122.825 VND',
          '492.245.650 VND',
          '738.368.475 VND',
          '984.491.300 VND',
        ]}
        yAxisTextNumberOfLines={2}
        yAxisTextStyle={{textAlign:'right',width:88}}
        yAxisLabelWidth={100}
        data={llData}
        pointerConfig={{
          showPointerStrip: true,
          pointerStripUptoDataPoint: true,
          pointerLabelComponent: (items)=>{
            return(
              <View style={{height:30,width:50,borderRadius:10,backgroundColor:'green'}}>
                <Text>{items[0].value}</Text>
              </View>
            )
          }
        }}
      /> */}

      {/* <LineChart
        areaChart
        data={ptData}
        rotateLabel
        width={300}
        hideDataPoints
        spacing={10}
        color="#00ff83"
        thickness={2}
        startFillColor="rgba(20,105,81,0.3)"
        endFillColor="rgba(20,85,81,0.01)"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={6}
        stepHeight={50}
        height={300}
        maxValue={600}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{color: 'gray'}}
        yAxisLabelPrefix='hello'
        yAxisTextNumberOfLines={2}
        // yAxisLabelWidth={40}
        // yAxisSide='right'
        xAxisColor="lightgray"
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: 'red',
          pointerStripWidth: 2,
          stripOverPointer: true,
          pointerComponent: ()=>{
            return(
              <View style={{height:14,width:14,borderRadius:7,backgroundColor:'yellow',zIndex:300}}/>
            )
          },
          // pointerColor: 'lightgray',
          // radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          // activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: items => {
            return (
              <View
                style={{
                  height: 90,
                  width: 100,
                  justifyContent: 'center',
                  // marginTop: -30,
                  // marginLeft: -40,
                }}>
                <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                  {items[0].date}
                </Text>

                <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                  <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                    {'$' + items[0].value + '.0'}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      /> */}

      {/* <BarChart
        data={pieData}
        radius={150}
        donut
        showText
        showValuesAsLabels
        showTextBackground
        textBackgroundColor="#333"
        textBackgroundRadius={22}
        textColor="white"
        textSize={16}
        fontWeight="bold"
        strokeWidth={10}
        strokeColor="#333"
        innerCircleBorderWidth={10}
        innerCircleBorderColor="#333"
        showGradient
        // onPress={(item, index) => Alert.alert(item.value.toString())}
        renderTooltip={(item,index)=>{
          return(
            <View style={{height:40,width:100,borderRadius:10,backgroundColor:'green'}}>
              <Text>{item.value}</Text>
            </View>
          )
        }}
      /> */}
      {/* <LineChart
        showText
        showVerticalLines
        // noOfVerticalLines={8}
        // verticalLinesSpacing={30}
        // verticalLinesUptoDataPoint
        initialSpacing={40}
        spacing={40}
        width={280}
        noOfSections={4}
        textColor="black"
        rulesType={'solid'}
        radius={150}
        textSize={20}
        showTextBackground
        textBackgroundRadius={26}
        data={barData3}
        labelsExtraHeight={40}
        xAxisTextNumberOfLines={2}
        xAxisLabelTextStyle={{width:100,marginBottom:-10}}
      /> */}
      {/* <PieChart
        // donut
        // innerRadius={80}
        data={pieData2}
        showText
        semiCircle
        // showTextBackground
        // textBackgroundColor='white'
        // textBackgroundRadius={20}
        showValuesAsLabels={true}
        // isThreeD
        // shadow
        // centerLabelComponent={() => {
        //   return <Text style={{fontSize: 30}}>70%</Text>;
        // }}
      /> */}
      {/* <MyPattern/> */}
      {/* <View style={{position:'absolute',top:40,left:40}}>
        <PieChart
          data={[{value:18,color:'orange'},{value:179-18,color:'white'}]}
          initialAngle={2*Math.PI*13/179}
          // donut
          radius={110}
          donut
          // initialAngle={Math.PI}
          showText
          showValuesAsLabels
          onPress={(item)=>Alert.alert(item.value+'')}
        />
      </View> */}
      {/* <View style={{position:'absolute',top:50,left:50}}> */}
      {/* <PieChart
        data={lineData2}
        donut
        // semiCircle
        radius={100}
        // donut
        // innerRadius={60}
        // labelsPosition={'outward'}
        // initialAngle={Math.PI}
        // focusOnPress
        // shadow
        // isThreeD
        // toggleFocusOnPress={true}
        showText
        showValuesAsLabels
        onPress={(item)=>Alert.alert(item.value+'')}
      /> */}
      {/* </View> */}
      {/* <PieChart
        // backgroundColor='green'
        // donut
        // innerCircleBorderWidth={4}
        // innerCircleBorderColor='gray'
        // strokeColor='gray'
        // strokeWidth={2}
        // isThreeD
        // shiftInnerCenterX={20}
        // semiCircle
        // shadow
        // shadowColor='gray'
        // radius={150}
        showText
        showValuesAsLabels
        // showTextBackground
        // textSize={10}
        // fontWeight='bold'
        // tiltAngle={'30deg'}
        // font='monospace'
        labelsPosition="onBorder"
        data={[
          {value: 50},
          {
            value: 20,
            // shiftX: 30, shiftY: 4
          },
          {value: 40},
          {value: 80, 
            // shiftX: -30, shiftY: 4
          },
          {value: 30, 
            // shiftY: -30, shiftX: -30
          },
        ]}
        innerCircleColor="lightgreen"
        // centerLabelComponent={()=>{
        //   return(
        //     <View>
        //       <Text>100%</Text>
        //     </View>
        //   )
        // }}
      /> */}
      {/* <PieChart donut innerCircleBorderWidth={3} innerCircleBorderColor='lightgray' shiftInnerCenterX={15} shadow data={[{value:50},{value:20},{value:40},{value:80},{value:30}]} /> */}
      {/* <BarChart
        data={lineData2}
        showText
        showValuesAsLabels
        // horizontalRulesStyle={{zIndex:100}}
        // backgroundColor='black'
        // color='white'
        // dataPointsColor1='red'
        // rotateLabel
        labelsExtraHeight={100}
        // areaChart
        // barMarginBottom={10}
        // isAnimated
        // isThreeD
        // showGradient
        cappedBars
        capColor={'red'}
        // curved
        // dataPointsShape="rectangular"
        // cappedBars
        // yAxisSide='right'
        // pressEnabled
        // showStripOnPress
        // pointerConfig={{pointerStripColor: 'blue'}}
        // initialSpacing={0}
        // hideRules
        // scrollToEnd
        // horizontalRulesStyle={{zIndex:1}}
        // backgroundColor='rgba(255,0,0,0.8)'
        // yAxisLabelContainerStyle={{zIndex:100000,elevation:1,textAlign:'left'}}
        // yAxisTextStyle={{fontWeight:'bold',marginRight:-110,zIndex:10000,textAlign:'left'}}
        // spacing={30}
      /> */}
      {/* <BarChart
        data={ldt}
        areaChart
        // maxValue={80}
        // stepValue={20}
        // noOfSections={4}
        // minValue={-60}
        frontColor={'yellow'}
        yAxisThickness={5}
        width={260}
        yAxisSide='right'
        yAxisTextStyle={{left:40}}
        // yAxisLabelContainerStyle={{zIndex:20,elevation:10}}
        // noOfSectionsBelowXAxis={3}
        showReferenceLine1
        referenceLine1Position={40}
        referenceLine1Config={{
          labelText: 'hello',
          labelTextStyle: {left:100,top:-10},
          type: 'solid'
        }}
        showReferenceLine2
        referenceLine2Position={60}
        referenceLine2Config={{
          color:'red',
          labelText: 'hello',
          labelTextStyle: {left:100,top:-10},
          type: 'solid'
        }}
        // width={190}
        // hideRules
      /> */}
      {/* <LineChart
            areaChart
            curved
            data={lineData}
            data2={lineData2}
            height={250}
            showVerticalLines
            spacing={44}
            initialSpacing={0}
            color1="skyblue"
            color2="orange"
            textColor1="green"
            hideDataPoints
            dataPointsColor1="blue"
            dataPointsColor2="red"
            startFillColor1="skyblue"
            startFillColor2="orange"
            startOpacity={0.8}
            endOpacity={0.3}
            /> */}
      {/* <View style={{backgroundColor: '#1A3461'}}>
        <LineChart
          initialSpacing={0}
          data={lineData}
          curved
          // isAnimated
          spacing={30}
          textColor1="yellow"
          textShiftY={-8}
          textShiftX={-10}
          textFontSize={13}
          thickness={5}
          hideRules
          hideYAxisText
          yAxisColor="#0BA5A4"
          showVerticalLines
          verticalLinesColor="rgba(14,164,164,0.5)"
          xAxisColor="#0BA5A4"
          color="#0BA5A4"
        />
      </View> */}
      {/* <PieChart
        data={llData}
        textColor="black"
        radius={150}
        donut
        textSize={15}
        strokeWidth={2}
        strokeColor="black"
        innerCircleBorderWidth={2}
        innerCircleBorderColor="black"
        // showText
        focusOnPress
        showValuesAsLabels
        showGradient
        showTextBackground
        textBackgroundRadius={16}
      /> */}

      {/* <PieChart
        data={pieData}
        textColor="black"
        radius={100}
        donut
        textSize={15}
        strokeWidth={2}
        strokeColor="black"
        innerCircleBorderWidth={2}
        innerCircleBorderColor="black"
        showText
        focusOnPress
        showValuesAsLabels
        showGradient
        showTextBackground
        textBackgroundRadius={16}
      /> */}

      {/* <LineChart
        data={lineData}
        initialSpacing={0}
        spacing={12}
        areaChart
        curved
        isAnimated
        hideDataPoints
        startFillColor1="lightgreen"
        endOpacity={0.6}
        hideRules
        xAxisColor="white"
        yAxisColor="white"
        yAxisTextStyle={{color: 'white'}}
        height={250}
        pointerConfig={{
          color: 'white',
          pointerStripColor: 'white',
          pointerStripHeight: 235,
          pointerLabelComponent: item => {
            return (
              <View>
                <Text style={{color: 'yellow', fontWeight: 'bold'}}>
                  {item.value}
                </Text>
              </View>
            );
          },
        }}
      /> */}

      {/* <LineChart
        curved={true}
        isAnimated={true}
        // animateTogether
        pressEnabled={true}
        showStripOnPress={true}
        showTextOnPress={true}
        data={lineData}
        disableScroll={true}
        pointerConfig={{
          radius: 5,
          // pointerStripHeight:120,
          pointerLabelComponent: () => {
            return (
              <View>
                <Text>{'1234'}</Text>
              </View>
            );
          },
        }}
        // data2={lineData2}
        hideDataPoints
        height={250}
        // showVerticalLines
        // spacing={44}
        initialSpacing={0}
        color1="skyblue"
        color2="orange"
        textColor1="green"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsHeight2={6}
        dataPointsWidth2={6}
        dataPointsColor1="blue"
        dataPointsColor2="red"
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
        hideRules
        spacing={10}
        areaChart
      /> */}
      {/* <LineChart
      isAnimated={true}
      curved
      areaChart={true}
        color1='red'
        color2='blue'
        color3='green'
        color4='purple'
        data={sdata.slice(0,4)}
        // startIndex={0}
        // endIndex={1}
        data2={sdata.slice(2,6)}
        // startIndex2={3}
        // endIndex2={4}
        data3={sdata.slice(3,7)}
        // startIndex3={5}
        // endIndex3={6}
        data4={sdata.slice(4,8)}
        // startIndex4={7}
        // endIndex4={8}
        data5={sdata.slice(1,5)}
        // startIndex5={9}
        // endIndex5={10}
        showFractionalValues
        maxValue={1.5}
        noOfSections={3}
        spacing={90}
        // stepHeight={40}
        stepValue={0.5}
        height={300}
        thickness={3}
        hideDataPoints1
        hideDataPoints2
        hideDataPoints3
        hideDataPoints4
        hideDataPoints5
        startFillColor1='gray'
        startFillColor2='yellow'
        startFillColor3='lightgreen'
        startFillColor4='pink'
        startFillColor5='orange'
        startOpacity={0.8}
        endOpacity={0.3}
        /> */}
      {/* <BarChart
        width={340}
        // rotateLabel
        showVerticalLines
        noOfVerticalLines={7}
        verticalLinesSpacing={40}
        noOfSections={4}
        stackData={stackData}
        renderTooltip={(item, index) => {
          return (
            <View
              style={{
                paddingHorizontal: 10,
                borderRadius: 10,
                backgroundColor: 'pink',
              }}>
              {item.stacks.map(stackItem => {
                return <Text>{stackItem.value}</Text>;
              })}
            </View>
          );
        }}
      /> */}

      {/* <LineChart
        // width={200}
        // height={300}
        pointerConfig={{
          activatePointersOnLongPress: true,
          pointerColor: 'green',
          pointer3Color: 'red',
          pointer2Color: 'orange',
          hidePointer2: true,
        }}
        // isAnimated
        // rotateLabel
        // barWidth={32}
        // spacing={25}
        // noOfSections={4}
        // barBorderRadius={6}
        // data={lineData1}
        // data2={lineData2}
        data={barData}
        data2={barData2}
        data3={barData3}
        hideDataPoints
        color2="red"
        color3="green"
        thickness3={3}
        curved
        // initialSpacing={90}
        // stackData={stackData}
        // horizontal
        // adjustToWidth
        // yAxisAtTop
      /> */}

      {/* <BarChart
      // isAnimated={true}
      isThreeD={true}
        data={dtt}
        labelsExtraHeight={60}
        // maxValue={100}
        // yAxisLabelTexts={['100','110','120','130','140','150','160','170','180','190','200']}
        // backgroundColor={'red'}
        // initialSpacing={10}
        // yAxisSide='right'
        // maxValue={40}
        // data={barData}
        // width={240}
        // radius={170}
        // donut={true}
        // showText={true}
        // showValuesAsLabels={true}
        // semiCircle={true}
        // isThreeD={true}
        // rulesType='solid'
        // // shiftInnerCenterY={100}
        // shadow={true}
        // strokeWidth={5}
        // noOfSections={4}
        // innerCircleBorderColor={'gray'}
        // showTextBackground={true}
      /> */}
      {/* <TouchableOpacity
        onPress={() => {
          dtt[1].value += 20;
          setDtt([...dtt]);
        }}>
        <Text>Press me</Text>
      </TouchableOpacity> */}
      {/* <View
        style={{
          marginVertical: 100,
          marginHorizontal: 30,
          borderRadius: 10,
          paddingVertical: 50,
          backgroundColor: '#414141',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 12,
          }}>
          Quarterly Sales
        </Text>
        <PieChart
          strokeColor="white"
          strokeWidth={4}
          donut
          data={[
            {value: 30, color: 'rgb(84,219,234)'},
            {value: 40, color: 'lightgreen'},
            {value: 20, color: 'orange'},
          ]}
          innerCircleColor="#414141"
          innerCircleBorderWidth={4}
          innerCircleBorderColor={'white'}
          showValuesAsLabels={true}
          showText
          textSize={18}
          showTextBackground={true}
          centerLabelComponent={() => {
            return (
              <View>
                <Text style={{color: 'white', fontSize: 36}}>90</Text>
                <Text style={{color: 'white', fontSize: 18}}>Total</Text>
              </View>
            );
          }}
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
          }}>
          {renderLegend('Jan', 'rgb(84,219,234)')}
          {renderLegend('Feb', 'lightgreen')}
          {renderLegend('Mar', 'orange')}
        </View>
      </View> */}

      {/* <TouchableOpacity
        onPress={() => setCurrentData(latestData)}
        style={{padding: 12, backgroundColor: 'lightgreen', marginBottom: 15}}>
        <Text>Smooth</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCurrentData(latestData2)}
        style={{padding: 12, backgroundColor: 'lightgreen', marginBottom: 15}}>
        <Text>Smooth Low</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCurrentData(latestData3)}
        style={{padding: 12, backgroundColor: 'lightgreen', marginBottom: 15}}>
        <Text>Edged</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCurrentData(latestData4)}
        style={{padding: 12, backgroundColor: 'lightgreen', marginBottom: 15}}>
        <Text>Edged Low</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCurrentData(latestData5)}
        style={{padding: 12, backgroundColor: 'lightgreen'}}>
        <Text>Straight</Text>
      </TouchableOpacity> */}

      {/* {true ? (
        <LineChart
          isThreeD
          key={'xyz'}
          height={320}
          maxValue={360}
          showLine
          hideOrigin
          // animationDuration={000}
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
          yAxisLabelPrefix={'$'}
          yAxisLabelSuffix={'.0'}
          barWidth={32}
          // width={190}
          data={[
            {
              value: 70,
              label: 'Jan',
              topLabelComponent: () => {
                return <Text>30</Text>;
              },
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
          gradientColor={'rgba(200, 100, 244,0.2)'}
          frontColor={'rgba(78, 0, 142,1)'}
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
          dataPointLabelWidth={30}
          dataPointLabelShiftY={-30}
          // data2={lineData1}
          areaChart
          initialSpacing={20}
          customDataPoint={() => {
            return (
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: 'red',
                  borderWidth: 2,
                  borderColor: 'blue',
                  borderRadius: 5,
                }}
              />
            );
          }}
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
          // showTextOnPress
          // textShiftY={-10}
          // textShiftX={-5}
          // textFontSize={18}
          // textColor={'green'}
          // stripWidth={1}
          // stripHeight={200}
          // stripHeight={200}
          // stripOpacity={1}
          // curved
          // isAnimated
          // animationDuration={2000}
          // animationDuration={2000}
          // dataPointsShape="rectangular"
          // showGradient
          color={'rgb(78, 0, 142)'}
          yAxisColor={'rgb(78, 0, 142)'}
          xAxisColor={'rgb(78, 0, 142)'}
          // dataPointsColor={'yellow'}
          dataPointsWidth={20}
          dataPointsHeight={20}
          xAxisThickness={3}
          yAxisThickness={3}
          // dataPointsRadius={4}
          // focusedDataPointRadius={10}
          yAxisTextStyle={{color: 'rgb(78, 0, 142)'}}
          startFillColor={'rgb(200, 100, 244)'}
          startOpacity={0.9}
          endFillColor={'rgb(255, 255, 255)'}
          endOpacity={0.2}
        />
      )} */}

      {/* <TouchableOpacity
        onPress={() => setToggle(!toggle)}
        style={{marginTop: 100, alignSelf: 'center'}}>
        <Text>Line Chart</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default App;
