import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart } from './src';

const App = () => {
  // const lineData = [
  //   {value: 40, text: 'Jan', textShiftX: 8, textShiftY: -10},
  //   {value: 80, text: 'Feb'},
  //   {value: 170, text: 'Mar', textFontSize: 16, textColor: 'blue'},
  //   {value: 90, text: 'Apr'},
  //   {value: 190, text: 'May'},
  // ];
  // const lineData2 = [
  //   {value: 30, text: 'Jan', textShiftX: 8},
  //   {value: 40, text: 'Feb'},
  //   {value: 60, text: 'Mar'},
  //   {value: 70, text: 'Apr'},
  //   {value: 100, text: 'May'},
  // ];

  const data = [
    { value: 15, label: 'Jan', showVerticalLine: true },
    { value: 40, label: 'Feb', verticalLineColor: 'red', showVerticalLine: true, verticalLineThickness: StyleSheet.hairlineWidth },
    { value: 10, label: 'Mar', showDataPoint: true, dataPointShape: 'rectangular', dataPointHeight: 20, dataPointWidth: 20, },
    { value: 30, label: 'Apr', showVerticalLine: true, showDataPoint: true },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          // flex: 1,
          // backgroundColor: 'pink',
          width: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <LineChart
            data={data}
            hideDataPoints
            areaChart
            curved
            color='rgb(220,140,140)'
            startFillColor='rgb(220,140,140)'
            endFillColor='rgba(250,240,240)'
            startOpacity={0.9}
            endOpacity={0.3}
          // dataPointsShape='rectangular'
          // dataPointsHeight={12}
          // dataPointsWidth={12}
          /> */}


        {/* <BarChart
          showGradient
          // isThreeD
          // isAnimated
          // width={300}
          gradientColor="lightgray"
          // backgroundColor="yellow"
          hideRules
          // yAxisThickness={0}
          roundedTop
          showYAxisIndices
          xAxisThickness={0}
          spacing={30}
          noOfSections={4}
          // hideAxesAndRules
          frontColor="#eeeeee"
          barBorderRadius={10}
          data={data}
        /> */}

        <BarChart
          width={300}
          stackData={
            [
              {
                stacks:
                  [{
                    value: 10, color: 'red'
                  },
                  {
                    value: 20, color: 'blue'
                  }]
              },
              {
                stacks:
                  [{
                    value: 14, color: 'red'
                  },
                  {
                    value: 18, color: 'blue'
                  }]
              },
              {
                stacks:
                  [{
                    value: 7, color: 'red'
                  },
                  {
                    value: 10, color: 'blue'
                  }]
              }
            ]
          } />


        {/* <Text>Hello</Text> */}
      </View>
      {/* <LineChart data={data} /> */}
      {/* <PieChart
        showText
        showTextBackground
        showValuesAsLabels
        textSize={14}
        data={data}
      /> */}
      {/* <LineChart data={data} curved /> */}
      {/* <BarChart
        data={data}
        frontColor="lightgray"
        cappedBars
        capThickness={2}
        capColor="gray"
      /> */}
      {/* <PieChart data={data} donut isThreeD shadow /> */}
      {/* <BarChart data={data} horizontal noOfSections={5} /> */}
      {/* <LineChart
        xAxisColor="red"
        xAxisThickness={2}
        yAxisColor="purple"
        yAxisThickness={0.5}
        yAxisTextStyle={{color: 'blue', fontSize: 10}}
        isAnimated
        animationDuration={1200}
        height={300}
        rotateLabel
        // thickness={1}
        dataPointsHeight={8}
        dataPointsWidth={8}
        animateTogether
        // textColor="skyblue"
        // dataPointsShape="rectangular"
        spacing={84}
        initialSpacing={4}
        // areaChart
        color1="skyblue"
        color2="orange"
        data={[...lineData]}
        startFillColor1="skyblue"
        endOpacity1={0.1}
        endFillColor1="skyblue"
        startFillColor2="orange"
        endFillColor2="white"
        curved
        // hideRules
        showVerticalRules
        // showYAxisIndices
        // showXAxisIndices
        data2={[...lineData2]}
      /> */}
    </View>
  );
};

export default App;
