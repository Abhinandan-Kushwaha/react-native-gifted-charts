/**
 * @format
 */

import 'react-native';
import React from 'react';
import ProgressPie from '../examples/PieChart/ProgressPie';
import SimplePie from '../examples/PieChart/SimplePie';
import SplitPie from '../examples/PieChart/SplitPie';
import ThreeDPie from '../examples/PieChart/ThreeDPie';
import PieSingleData from '../examples/PieChart/PieSingleData';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders progress pie chart correctly', () => {
  const tree = renderer.create(<ProgressPie />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders simple pie chart correctly', () => {
  const tree = renderer.create(<SimplePie />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders split pie chart correctly', () => {
  const tree = renderer.create(<SplitPie />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders #D pie chart correctly', () => {
  const tree = renderer.create(<ThreeDPie />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders pie chart correctly for Single data', () => {
  const tree = renderer.create(<PieSingleData />).toJSON();
  expect(tree).toMatchSnapshot();
});
