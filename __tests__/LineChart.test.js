/**
 * @format
 */

import 'react-native';
import React from 'react';
import AnimatedArea from '../examples/LineChart/AnimatedArea';
import AreaTwo from '../examples/LineChart/AreaTwo';
import LineChartTwo from '../examples/LineChart/LineChartTwo';
import SimpleBlueLine from '../examples/LineChart/SimpleBlueLine';
import ChartWithPointer from '../examples/LineChart/ChartWithPointer';
import ChartWithAdjustingPointer from '../examples/LineChart/ChartWithAdjustingPointer';
import ScrollingChartWithPointer from '../examples/LineChart/ScrollingChartWithPointer';
import CaloriesBurnt from '../examples/LineChart/CaloriesBurnt';
import SimpleBlueLineWithGivenNumberOfVerticalLines from '../examples/LineChart/SimpleBlueLineWithGivenNumberOfVerticalLines';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders animated area chart correctly', () => {
  const tree = renderer.create(<AnimatedArea />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders 2 area chart correctly', () => {
  const tree = renderer.create(<AreaTwo />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders 2 line chart correctly', () => {
  const tree = renderer.create(<LineChartTwo />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders blue line chart correctly', () => {
  const tree = renderer.create(<SimpleBlueLine />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ChartWithPointer correctly', () => {
  const tree = renderer.create(<ChartWithPointer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ChartWithAdjustingPointer correctly', () => {
  const tree = renderer.create(<ChartWithAdjustingPointer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ScrollingChartWithPointer correctly', () => {
  const tree = renderer.create(<ScrollingChartWithPointer />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders CaloriesBurnt Area chart correctly', () => {
  const tree = renderer.create(<CaloriesBurnt />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders blue line chart with given number of vertical lines correctly', () => {
  const tree = renderer
    .create(<SimpleBlueLineWithGivenNumberOfVerticalLines />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
