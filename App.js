import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {MyPattern} from './src/pattern';
import {BarChart, LineChart, PieChart} from './src';
import {Path, Pattern} from 'react-native-svg';

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
        <Text style={{color: 'white', fontWeight: 'bold'}}>{val}</Text>
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
    {
      value: 15,
      label: 'Mon',
    },
    {value: 30, label: 'Tue'},
    {value: -23, label: 'Wed'},
    {value: 40, label: 'Thu'},
    {value: -16, label: 'Wed'},
    {value: 40, label: 'Thu'},
    {value: -16, label: 'Wed'},
    {value: 40, label: 'Thu'},
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
    {value: 12},
    {value: 8},
    {value: 11},
    {value: 13},
    {value: 19},
    {value: 18},
    {value: 22},
    {value: 20},
    {value: 28},
    {value: 32},
    {value: 36},
    {value: 40},
    {value: 38},
    {value: 40},
    {value: 42},
    {value: 46},
    {value: 44},
    {value: 40},
    {value: 36},
    {value: 32},
    {value: 38},
    {value: 36},
    {value: 32},
    {value: 28},
    {value: 22},
    {value: 20},
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
    marginLeft: -95,
    paddingLeft: 110,
    transform: [{rotate: '90deg'}],
    // backgroundColor: 'red',
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

  const stackData = [
    {
      stacks: [
        {value: 10, color: 'orange'},
        {value: 20, color: '#4ABFF4', marginBottom: 2},
      ],
      spacing: 15,
      label: 'Jan',
    },
    {
      stacks: [
        {value: 10, color: '#4ABFF4'},
        {value: 11, color: 'orange', marginBottom: 2},
        {value: 15, color: '#28B2B3', marginBottom: 2},
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
        {value: 10, color: '#28B2B3', marginBottom: 2},
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
    {value: 54, color: '#177AD5', text: '54%'},
    {value: 40, color: '#79D2DE', text: '30%'},
    {value: 20, color: '#ED6665', text: '26%'},
  ];
  const pieData2 = [
    {value: 70, color: '#177AD5'},
    {value: 30, color: 'lightgray'},
  ];

  return (
    <View
      style={{
        // flex: 1,
        paddingVertical: 100,
        paddingLeft: 20,
        // backgroundColor: 'black',
      }}>
      {/* <PieChart
            showText
            textColor="black"
            radius={150}
            textSize={20}
            showTextBackground
            textBackgroundRadius={26}
            data={pieData}
            /> */}
      <PieChart
        donut
        innerRadius={80}
        data={pieData2}
        isThreeD
        shadow
        centerLabelComponent={() => {
          return <Text style={{fontSize: 30}}>70%</Text>;
        }}
      />
      {/* <MyPattern/> */}
      {/* <PieChart
        data={lineData2.reverse()}
        // initialAngle={Math.PI}
        showText
        showValuesAsLabels
      /> */}
      <PieChart
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
      />
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
      {/* <PieChart data={[]} isThreeD shadow donut/> */}

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
        rotateLabel
        barWidth={12}
        spacing={40}
        noOfSections={4}
        barBorderRadius={6}
        stackData={stackData}
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
