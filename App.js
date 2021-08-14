import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart, LineChart, PieChart} from './src';

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
    {value: 15, label: 'Jan', showVerticalLine: true},
    {
      value: 40,
      label: 'Feb',
      verticalLineColor: 'red',
      showVerticalLine: true,
      verticalLineThickness: StyleSheet.hairlineWidth,
    },
    {
      value: 10,
      label: 'Mar',
      showDataPoint: true,
      dataPointShape: 'rectangular',
      dataPointHeight: 20,
      dataPointWidth: 20,
    },
    {value: 30, label: 'Apr', showVerticalLine: true, showDataPoint: true},
  ];

  const stackData = [
    {
      stacks: [
        {value: 10, color: 'orange'},
        {value: 20, color: '#4ABFF4', marginBottom: 2},
      ],
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

  const barData1 = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
  ];

  const lineData1 = [
    {value: 0, dataPointText: '0'},
    {value: 20, dataPointText: '20'},
    {value: 18, dataPointText: '18'},
    {value: 40, dataPointText: '40'},
    {value: 36, dataPointText: '36'},
    {value: 60, dataPointText: '60'},
    {value: 54, dataPointText: '54'},
    {value: 85, dataPointText: '85'},
  ];
  const ldata = [
    {value: 15, label: '15'},
    {value: 30, label: '30'},
    {value: 26, label: '26'},
    {value: 40, label: '40'},
  ];

  // const MyComponent = () => {
  //   return (
  //     <View style={{backgroundColor: 'yellow'}}>
  //       <Text>Hello</Text>
  //     </View>
  //   );
  // };

  const barData = [
    {value: 230, label: 'Jan', frontColor: '#4ABFF4'},
    {value: 180, label: 'Feb', frontColor: '#79C3DB'},
    {value: 195, label: 'Mar', frontColor: '#28B2B3'},
    {value: 250, label: 'Apr', frontColor: '#4ADDBA'},
    {value: 320, label: 'May', frontColor: '#91E3E3'},
  ];
  // const lineData = [
  //   {value: 0},
  //   {value: 10},
  //   {value: 8},
  //   {value: 58},
  //   {value: 56},
  //   {value: 78},
  //   {value: 74},
  //   {value: 98},
  // ];
  // const lineData2 = [
  //   {value: 0},
  //   {value: 20},
  //   {value: 18},
  //   {value: 40},
  //   {value: 36},
  //   {value: 60},
  //   {value: 54},
  //   {value: 85},
  // ];
  const lineData = [
    {value: 0},
    {value: 20},
    {value: 18},
    {value: 40},
    {value: 36},
    {value: 60},
    {value: 54},
    {value: 85},
  ];
  const pieData = [
    {value: 70, color: '#177AD5' /*text: '54%'*/},
    {value: 30, color: 'lightgray' /*text: '30%'*/},
    // {value: 20, color: '#ED6665' /*text: '26%'*/},
  ];
  return (
    <View
      style={{
        marginTop: 200,
        paddingVertical: 50,
      }}>
      {/* <LineChart data={ldata} /> */}

      <PieChart
        donut
        innerRadius={80}
        data={pieData}
        centerLabelComponent={() => {
          return <Text style={{fontSize: 30}}>70%</Text>;
        }}
      />
      {/* <BarChart
        data={data}
        horizontal
        showGradient
        cappedBars
        capColor={'rgba(78, 0, 142)'}
        capThickness={4}
        barWidth={35}
        gradientColor={'rgba(200, 100, 244,0.8)'}
        frontColor={'rgba(219, 182, 249,0.2)'}
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
        frontColor={'#177AD5'}
        barWidth={22}
        data={[{value: 15}, {value: 30}, {value: 26}, {value: 40}]}
      /> */}
      {/* <LineChart
        curved
        initialSpacing={0}
        data={lineData}
        spacing={30}
        hideDataPoints
        thickness={5}
        hideRules
        hideYAxisText
        yAxisColor="#0BA5A4"
        showVerticalLines
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
      /> */}

      {/* <LineChart
        areaChart
        hideDataPoints
        isAnimated
        animationDuration={1200}
        startFillColor="#0BA5A4"
        startOpacity={1}
        endOpacity={0.3}
        initialSpacing={0}
        data={lineData}
        spacing={30}
        thickness={5}
        hideRules
        hideYAxisText
        yAxisColor="#0BA5A4"
        showVerticalLines
        verticalLinesColor="rgba(14,164,164,0.5)"
        xAxisColor="#0BA5A4"
        color="#0BA5A4"
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
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={13}
      /> */}
      {/* <View style={{marginLeft: 20}}>
        <BarChart
          barWidth={22}
          horizontal
          yAxisAtTop
          // spacing={16}
          // height={260}
          noOfSections={3}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData1}
          yAxisThickness={0}
          xAxisThickness={0}
          // horizontal
        />
      </View> */}

      {/* <View style={{marginLeft: 40}}>
        <LineChart
          data={data}
          hideDataPoints
          areaChart
          curved
          color="rgb(220,140,140)"
          startFillColor="rgb(220,140,140)"
          endFillColor="rgba(250,240,240)"
          startOpacity={0.9}
          endOpacity={0.3}
          noOfSections={3}
          // dataPointsShape='rectangular'
          // dataPointsHeight={12}
          // dataPointsWidth={12}
        />
      </View> */}

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

      {/* <View
        style={{
          // flex: 1,
          // backgroundColor: 'pink',
          width: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BarChart
          width={300}
          rotateLabel
          // isAnimated
          horizontal
          barWidth={8}
          spacing={40}
          noOfSections={4}
          initialSpacing={50}
          barBorderRadius={20}
          stackData={stackData}
        />
      </View> */}

      {/* <Text>Hello</Text> */}
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
