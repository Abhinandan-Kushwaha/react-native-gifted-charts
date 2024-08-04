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
import PieWithZero from '../examples/PieChart/PieWithZero';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Pie and Donut chart tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('renders progress pie chart correctly', () => {
    const tree = renderer.create(<ProgressPie />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders simple pie chart correctly', () => {
    const tree = renderer.create(<SimplePie />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders split pie chart correctly', () => {
    const tree = renderer.create(<SplitPie />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders 3D pie chart correctly', () => {
    const tree = renderer.create(<ThreeDPie />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders pie chart correctly for Single data', () => {
    const tree = renderer.create(<PieSingleData />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders pie chart with zero values correctly', () => {
    const tree = renderer.create(<PieWithZero />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

});
