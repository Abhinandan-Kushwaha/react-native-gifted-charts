import {barDataItem} from 'gifted-charts-core';
import React from 'react';
import {Text, View} from 'react-native';
import {BarChart} from '../src/BarChart';
import {LineChart} from '../src/LineChart';

const Separator = () => <View style={{height: 30}} />;

export const mergeAlternate = (ar1: barDataItem[], ar2: barDataItem[]) => {
  let ar: barDataItem[] = [];
  ar1.forEach((element, index) => {
    ar.push(element);
    ar.push({...ar2[index], isSecondary: true});
  });

  return ar;
};

const data1 = [
  // only +ve values bw 0.01 to 0.50
  {value: 0.02},
  {value: 0.05},
  {value: 0.12},
  {value: 0.01},
  {value: 0.5},
  {value: 0.35},
  {value: 0.25},
];

const data2 = [
  // +ve values bw 0.01 to 0.50 & a -ve value 0.05
  {value: 0.02},
  {value: 0.05},
  {value: 0.12},
  {value: 0.01},
  {value: -0.05},
  {value: 0.5},
  {value: 0.35},
];

const pData = [
  {value: 10, frontColor: 'pink', spacing: 2},
  {value: 5, frontColor: 'pink', spacing: 2},
  {value: 30, frontColor: 'pink', spacing: 2},
  {value: 8, frontColor: 'pink', spacing: 2},
  {value: 12, frontColor: 'pink', spacing: 2},
  {value: 10, frontColor: 'pink', spacing: 2},
];

const commonBarProps = {
  showValuesAsTopLabel: true,
  topLabelTextStyle: {fontSize: 8},
  spacing: 10,
};

const BarWithSecondaryLineAndSecondaryYAxisOffset = () => {
  const dd2 = [
    {value: 10},
    {value: 7},
    {value: -9},
    {value: 9},
    {value: 14},
    {value: -7},
    {value: 12},
  ];

  const lData = [
    {value: 0, dataPointText: '0'},
    {value: 0.2, dataPointText: '0.2'},
    {value: 0.4, dataPointText: '0.4'},
    {value: -0.06, dataPointText: '-0.06', textShiftY: 16},
    {value: 0.5, dataPointText: '0.5'},
    {value: -0.14, dataPointText: '-0.14', textShiftY: 16},
    {value: 0.65, dataPointText: '0.65', textShiftX: -16},
  ];

  return (
    <View>
      <BarChart
        data={dd2}
        barWidth={15}
        spacing={15}
        isAnimated
        frontColor={'rgba(50,100,50,0.5)'}
        showLine
        lineData={lData}
        lineConfig={{
          isSecondary: true,
          spacing: 15,
          textColor: 'red',
          textFontSize: 13,
          textShiftY: -10,
          textShiftX: -8,
        }}
        secondaryYAxis={{
          yAxisOffset: 0.14,
          noOfSectionsBelowXAxis: 5,
        }}
      />
      <Text>
        {' '}
        See the Secondary Y axis offset and see whether Line is aligned with
        secondary Y-axis
      </Text>
    </View>
  );
};

export const BarAndStackCriticalCharts = () => {
  {
    /*********************************************************************************************/
    /**********    1. only +ve values bw 0.01 to 0.50                                   **********/
    /**********    2. +ve values bw 0.01 to 0.50 & a -ve value 0.05                     **********/
    /**********    3. Secondary with +ve values bw 0.01 to 0.50, primary 5 to 30        **********/
    /**********    4. Secondary with +ve values bw 0.01 to 0.50 & a -ve value 0.05      **********/
  }

  return (
    <View>
      <BarChart data={data1} {...commonBarProps} />
      <Separator />

      <BarChart data={data2} {...commonBarProps} />
      <Separator />

      <BarChart
        data={mergeAlternate(pData, data1)}
        secondaryYAxis={{}}
        {...commonBarProps}
        barWidth={15}
      />
      <Text>Secondary with +ve values bw 0.01 to 0.50, primary 5 to 30</Text>
      <Separator />
      <Separator />

      <BarChart
        data={mergeAlternate(pData, data2)}
        secondaryYAxis={{}}
        {...commonBarProps}
        barWidth={15}
      />
      <Text>
        Secondary with +ve values bw 0.01 to 0.50 & a -ve value 0.05, primary 5
        to 30
      </Text>
      <Separator />

      <BarWithSecondaryLineAndSecondaryYAxisOffset />
      <Separator />
      <Separator />
    </View>
  );
};

const commonLineProps = {
  showValuesAsDataPointsText: true,
  spacing: 30,
  textShiftY: -10,
  textShiftX: -5,
  textFontSize: 12,
  textColor: 'red',
  secondaryLineConfig: {color: 'purple', textColor: 'green'},
};

export const LineAndAreaCriticalCharts = () => {
  {
    /*********************************************************************************************/
    /**********    1. only +ve values bw 0.01 to 0.50                                   **********/
    /**********    2. +ve values bw 0.01 to 0.50 & a -ve value 0.05                     **********/
    /**********    3. Secondary with +ve values bw 0.01 to 0.50, primary 5 to 30        **********/
    /**********    4. Secondary with +ve values bw 0.01 to 0.50 & a -ve value 0.05      **********/
  }

  const pData = [
    {value: 10},
    {value: 5},
    {value: 30},
    {value: 8},
    {value: 12},
    {value: 10},
  ];

  return (
    <View>
      <LineChart isAnimated data={data1} {...commonLineProps} />
      <Separator />

      <LineChart data={data2} {...commonLineProps} />
      <Separator />

      <LineChart
        data={pData}
        secondaryData={data1}
        secondaryYAxis={{}}
        {...commonLineProps}
      />
      <Text>Secondary with +ve values bw 0.01 to 0.50, primary 5 to 30</Text>
      <Separator />
      <Separator />

      <LineChart
        data={pData}
        secondaryData={data2}
        secondaryYAxis={{}}
        {...commonLineProps}
      />
      <Text>
        Secondary with +ve values bw 0.01 to 0.50 & a -ve value 0.05, primary 5
        to 30
      </Text>
      <Separator />

      <Separator />
      <Separator />
    </View>
  );
};

export const LineChartsWithDataSetCritical = () => {
  {
    /*************************************************************************************************/
    /**********    4. Secondary with +ve values bw 0.01 to 0.50, primary 5 to 30            **********/
    /**********    5. Secondary with +ve bw 0.01 to 0.50 & a -ve 0.05, primary 5 to 30      **********/
    /**********    4. Primary with +ve values bw 0.01 to 0.50, secondary 5 to 30           **********/
  }
  return (
    <View>
      <LineChart
        dataSet={[
          {
            data: pData,
          },
          {
            data: data1,
            isSecondary: true,
            color: 'purple',
            textColor: 'green',
          },
        ]}
        secondaryYAxis={{}}
        {...commonLineProps}
      />
      <Text>Secondary with +ve values bw 0.01 to 0.50, primary 5 to 30</Text>
      <Separator />
      <Separator />

      <LineChart
        dataSet={[
          {
            data: pData,
          },
          {
            data: data2,
            isSecondary: true,
            color: 'purple',
            textColor: 'green',
          },
        ]}
        secondaryYAxis={{}}
        {...commonLineProps}
      />
      <Text>Secondary with +ve values bw 0.01 to 0.50, primary 5 to 30</Text>
      <Separator />
      <Separator />

      <LineChart
        dataSet={[
          {
            data: data2,
          },
          {
            data: pData,
            isSecondary: true,
            color: 'purple',
            textColor: 'green',
          },
        ]}
        secondaryYAxis={{}}
        {...commonLineProps}
      />
      <Text>Primary with +ve values bw 0.01 to 0.50, secondary 5 to 30</Text>
      <Separator />
      <Separator />

      <Separator />
      <Separator />
    </View>
  );
};

export const PieAndDonutCriticalCharts = () => {
  return <View></View>;
};
