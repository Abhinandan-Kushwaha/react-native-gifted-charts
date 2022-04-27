/**
 * @format
 */

import 'react-native';
import React from 'react';
import AnimatedArea from '../examples/LineChart/AnimatedArea';
import AreaTwo from '../examples/LineChart/AreaTwo';
import LineChartTwo from '../examples/LineChart/LineChartTwo';
import SimpleBlueLine from '../examples/LineChart/SimpleBlueLine';

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
