/**
 * @format
 */

import 'react-native';
import React from 'react';
import AreaTwo from '../examples/LineChart/AreaTwo';
import LineChartTwo from '../examples/LineChart/LineChartTwo';
import SimpleBlueLine from '../examples/LineChart/SimpleBlueLine';
import ChartWithPointer from '../examples/LineChart/ChartWithPointer';
import ChartWithAdjustingPointer from '../examples/LineChart/ChartWithAdjustingPointer';
import ScrollingChartWithPointer from '../examples/LineChart/ScrollingChartWithPointer';
import CaloriesBurnt from '../examples/LineChart/CaloriesBurnt';
import SimpleBlueLineWithGivenNumberOfVerticalLines from '../examples/LineChart/SimpleBlueLineWithGivenNumberOfVerticalLines';
import DataSetSteppedChart from '../examples/LineChart/DataSetSteppedChart';
import HighlightedRange from '../examples/LineChart/HighlightedRange';
import SecondaryLineChart from '../examples/LineChart/SecondaryLineChart';
import SecondaryLineChartFromDataSet from '../examples/LineChart/SecondaryLineChartFromDataSet';
import Segmented from '../examples/LineChart/Segmented';
import SegmentedDataSet from '../examples/LineChart/SegmentedDataSet';
import SegmentedDataSetCurved from '../examples/LineChart/SegmentedDataSetCurved';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Line and Area chart tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('renders 2 area chart correctly', () => {
    const tree = renderer.create(<AreaTwo />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders 2 line chart correctly', () => {
    const tree = renderer.create(<LineChartTwo />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders blue line chart correctly', () => {
    const tree = renderer.create(<SimpleBlueLine />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders ChartWithPointer correctly', () => {
    const tree = renderer.create(<ChartWithPointer />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders ChartWithAdjustingPointer correctly', () => {
    const tree = renderer.create(<ChartWithAdjustingPointer />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders ScrollingChartWithPointer correctly', () => {
    const tree = renderer.create(<ScrollingChartWithPointer />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders CaloriesBurnt Area chart correctly', () => {
    const tree = renderer.create(<CaloriesBurnt />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders blue line chart with given number of vertical lines correctly', () => {
    const tree = renderer
      .create(<SimpleBlueLineWithGivenNumberOfVerticalLines />)
      .toJSON();
      jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders a stepped chart with dataSet', () => {
    const tree = renderer.create(<DataSetSteppedChart />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders a chart with highlighted range', () => {
    const tree = renderer.create(<HighlightedRange />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders a chart with secondary Y axis and secondary line', () => {
    const tree = renderer.create(<SecondaryLineChart />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders a chart with secondary Y axis and secondary line using dataSet', () => {
    const tree = renderer.create(<SecondaryLineChartFromDataSet />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders a segmented chart', () => {
    const tree = renderer.create(<Segmented />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders a segmented chart with dataSet', () => {
    const tree = renderer.create(<SegmentedDataSet />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });

  it('renders a curved segmented chart with dataSet', () => {
    const tree = renderer.create(<SegmentedDataSetCurved />).toJSON();
    jest.runAllTimers();
    expect(tree).toMatchSnapshot();
  });
});
