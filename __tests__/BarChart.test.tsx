/**
 * @format
 */

import 'react-native';
import React from 'react';
import BarThreeD from '../examples/BarChart/BarThreeD';
import BarWithGradient from '../examples/BarChart/BarWithGradient';
import CappedBars from '../examples/BarChart/CappedBars';
import RoundStackBar from '../examples/BarChart/RoundStackBar';
import SimpleBlueBars from '../examples/BarChart/SimpleBlueBars';
import SimpleBlueBarsVerticalLines from '../examples/BarChart/SimpleBlueBarsVerticalLines';
import BarChartWithGivenNumberOfVerticalLines from '../examples/BarChart/BarChartWithGivenNumberOfVerticalLines';
import BarPairWithLine from '../examples/BarChart/BarPairWithLine';
import StackPairWithPattern from '../examples/BarChart/StackPairWithPattern';
import StackWithNegative from '../examples/BarChart/StackWithNegative';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import ShiftXaxisLabels from '../examples/BarChart/ShiftXaxisLabels';

describe('Bar and Stacked Bar chart tests', () => {
  it('renders 3D bar chart correctly', () => {
    const tree = renderer.create(<BarThreeD />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders gradient bar chart correctly', () => {
    const tree = renderer.create(<BarWithGradient />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders capped bar chart correctly', () => {
    const tree = renderer.create(<CappedBars />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders rounded stack bar chart correctly', () => {
    const tree = renderer.create(<RoundStackBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders alternate blue and gray bar chart correctly', () => {
    const tree = renderer.create(<SimpleBlueBars />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a simple bar chart with vertical lines correctly', () => {
    const tree = renderer.create(<SimpleBlueBarsVerticalLines />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a simple bar chart with given number of vertical lines correctly', () => {
    const tree = renderer
      .create(<BarChartWithGivenNumberOfVerticalLines />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Bar chart combined with Line chart', () => {
    const tree = renderer.create(<BarPairWithLine />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a Bar chart with shifted X axis labels', () => {
    const tree = renderer.create(<ShiftXaxisLabels />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a stacked Bar chart with patterns', () => {
    const tree = renderer.create(<StackPairWithPattern />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('renders a stacked Bar chart with negative values', () => {
    const tree = renderer.create(<StackWithNegative />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
