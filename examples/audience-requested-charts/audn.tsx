import React from 'react';
import {View, Text} from 'react-native';
import {LineChart,yAxisSides} from 'react-native-gifted-charts';

const Audn = () => {
  const iData = [
    {value: 180},
    {value: 80},
    {value: 270},
    {value: 300},
    {value: 500},
    {value: 8},

    {value: 270},
    {value: 300},
    {value: 500},
    {value: 8},
  ];

  return (
    <View style={{flex: 1, paddingTop: 160, backgroundColor:'#121'}}>
      {/* <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#beb'}}>
            <Text>{'Title'}</Text>
            <TouchableOpacity onPress={()=>Alert.alert('Pressed')} style={{padding:6,backgroundColor:'#aae'}}>
              <Text>{'Button'}</Text>
            </TouchableOpacity>
          </View> */}
      <LineChart
        data={iData}
        showLine
        overflowTop={20}
        startFillColor={'#FCC745'}
        endSpacing={20}
        endFillColor={'#0F0F0F'}
        areaChart
        startOpacity={0.2}
        endOpacity={0.1}
        width={280}
        color="yellow"
        textColor1="pink"
        showValuesAsTopLabel
        topLabelContainerStyle={{marginTop:-12}}
        // initialSpacing={WINDOW_WIDTH / 4}
        hideYAxisText={false}
        showReferenceLine1
        referenceLinesOverChartContent={true}
        referenceLine1Position={300}
        referenceLine1Config={{
          color: 'red',
          type: 'dashed',
          // zIndex: 999999999999,
          labelText: (
            <View style={{height: 26}}>
              <Text
                style={{
                  backgroundColor: '#eee',
                  width: 70,
                  marginLeft: 100,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                }}>
                Goal:: {150}
              </Text>
            </View>
          ),
        }}
        spacing={50}
        animateOnDataChange
        scrollToEnd={true}
        // textColor1={tw.color('text-on-200')}
        textShiftY={-8}
        textShiftX={-5}
        xAxisLabelTextStyle={{
          color: 'white',
          width: 100,
        }}
        // width={WINDOW_WIDTH - 80}
        isAnimated
        animationDuration={1000}
        animateTogether
        onDataChangeAnimationDuration={300}
        // maxValue={getTopAxisOffset()}
        // yAxisOffset={getBottomAxisOffset()}
        yAxisSide={yAxisSides.RIGHT}
        showValuesAsDataPointsText
        yAxisColor="red"
        noOfSections={6}
        focusEnabled
        showStripOnFocus
        // xAxisColor={tw.color('bg-app-300')}
        verticalLinesColor="transparent"
        rulesType="solid"
        // rulesColor={tw.color('app-300')}
        xAxisColor={'lightgray'}
        yAxisTextStyle={{color: 'lightgray'}}
        dataPointsColor={'black'}
        customDataPoint={() => {
          return (
            <View
              style={{
                backgroundColor: 'yellow',
                height: 14,
                width: 14,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  backgroundColor: '#121',
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Audn;
