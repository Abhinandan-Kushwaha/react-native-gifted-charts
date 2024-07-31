import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {BarChart} from '../../src/BarChart';
import {Pattern, Rect} from 'react-native-svg';
import { stackDataItem } from 'gifted-charts-core';

const StackPairWithPattern: React.FC = () => {
  const SurfAndCons = [
    {
      value: 40,
      labelComponent: () => (
        <Text
          style={{
            color: 'gray',
            fontSize: 13,
            fontFamily: 'PoppinsMedium',
            transform: [{rotate: '-45deg'}],
            top: 7,
            left: 7,
          }}>
          T193
        </Text>
      ),
      frontColor: '#D38600',
    },
    {
      value: 20,
    },
    {
      value: 50,
      frontColor: '#177AD5',
      labelComponent: () => (
        <Text
          style={{
            color: 'gray',
            fontSize: 13,
            fontFamily: 'PoppinsMedium',
            transform: [{rotate: '-45deg'}],
            top: 7,
            left: 7,
          }}>
          828
        </Text>
      ),
    },
    {
      value: 40,
    },
    {
      value: 75,
      labelComponent: () => (
        <Text
          style={{
            color: 'gray',
            fontSize: 13,
            fontFamily: 'PoppinsMedium',
            transform: [{rotate: '-45deg'}],
            top: 7,
            left: 7,
          }}>
          939
        </Text>
      ),
      frontColor: '#177AD5',
    },
    {
      value: 25,
    },
    {
      value: 30,
      labelComponent: () => (
        <Text
          style={{
            color: 'gray',
            fontSize: 13,
            fontFamily: 'PoppinsMedium',
            transform: [{rotate: '-45deg'}],
            top: 7,
            left: 7,
          }}>
          NH950
        </Text>
      ),
      frontColor: '#177AD5',
    },
    {
      value: 20,
    },
    {
      value: 60,
      labelComponent: () => (
        <Text
          style={{
            color: 'gray',
            fontSize: 13,
            fontFamily: 'PoppinsMedium',
            transform: [{rotate: '-45deg'}],
            top: 7,
            left: 7,
          }}>
          N123
        </Text>
      ),
      frontColor: '#177AD5',
    },
    {
      value: 40,
    },
    {
      value: 65,
      labelComponent: () => (
        <Text
          style={{
            color: 'gray',
            fontSize: 13,
            fontFamily: 'PoppinsMedium',
            transform: [{rotate: '-45deg'}],
            top: 7,
            left: 7,
          }}>
          T250
        </Text>
      ),
      frontColor: '#177AD5',
    },
    {
      value: 30,
    },
  ];

  const MyPattern = () => {
    return (
      <Pattern
        id="myPattern"
        patternUnits="userSpaceOnUse"
        width="30"
        height="6">
        <Rect
          x={0}
          y={0}
          height={4}
          width={30}
          rx={2}
          ry={2}
          fill={'#D38600'}
        />
      </Pattern>
    );
  };

  const stackData: stackDataItem[] = SurfAndCons.map((item, index) => {
    const bar: stackDataItem = {
      stacks: [
        {
          value: item.value,
        },
      ],
      labelComponent: item.labelComponent,
    };
    if (index % 2 === 0) {
      // even index bars are normal bars
      bar.spacing = 5;
      bar.color = item.frontColor;
    } else {
      // odd index bars are coins (so we will use barBackgroundPattern)
      bar.barBackgroundPattern = MyPattern;
      bar.patternId = 'myPattern';
      bar.color = 'transparent';
      bar.topLabelComponent = () => (
        <Image
          style={{height: 20, width: 20}}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkky2PgMWu-BxNQsQHeaVqG0iiqmcSs57VyA&s',
          }}
        />
      );
    }

    if (index === 2) {
      // Adding an extra bar on this stack
      bar.stacks.push({value: 30, color: '#D38600'});
    }

    return bar;
  });
  return (
    <BarChart
      stackData={stackData}
      spacing={24}
      endSpacing={0}
      yAxisLabelWidth={24}
      xAxisThickness={0}
      xAxisLabelsHeight={18}
      yAxisThickness={0}
      yAxisTextStyle={{color: 'gray'}}
      xAxisTextNumberOfLines={1}
      noOfSections={3}
      maxValue={100}
      initialSpacing={18}
      frontColor={'white'}
    />
  );
};

const styles = StyleSheet.create({});

export default StackPairWithPattern;
