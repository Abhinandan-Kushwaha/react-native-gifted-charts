import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Circle, Rect} from 'react-native-svg';
import {LineChart} from '../src/LineChart';

const dataPointsColor = '#123456';

describe.each(['circular', 'rectangular'] as const)(
  '%s data point press handlers',
  dataPointsShape => {
    let tree: renderer.ReactTestRenderer;

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      act(() => tree?.unmount());
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    const renderChart = (
      props: Partial<React.ComponentProps<typeof LineChart>> = {},
    ) => {
      act(() => {
        tree = renderer.create(
          <LineChart
            data={[{value: 20}, {value: 40}]}
            dataPointsShape={dataPointsShape}
            dataPointsColor={dataPointsColor}
            {...props}
          />,
        );
      });
      return tree.root
        .findAllByType(dataPointsShape === 'rectangular' ? Rect : Circle)
        .filter(point => point.props.fill === dataPointsColor);
    };

    it('omits press handlers when points have no press or focus action', () => {
      const points = renderChart();
      expect(points).toHaveLength(2);
      points.forEach(point => {
        expect(point.props.onPress).toBeUndefined();
        expect(point.props.onPressOut).toBeUndefined();
      });
    });

    it('does not make points touchable for an onBackgroundPress callback', () => {
      const points = renderChart({onBackgroundPress: jest.fn()});
      points.forEach(point => {
        expect(point.props.onPress).toBeUndefined();
        expect(point.props.onPressOut).toBeUndefined();
      });
    });

    it('passes the selected item and index to the chart callback', () => {
      const onPress = jest.fn();
      const points = renderChart({onPress});
      act(() => points[1].props.onPress());
      expect(onPress).toHaveBeenCalledWith(
        expect.objectContaining({value: 40}),
        1,
      );
    });

    it('enables only points that have an item callback', () => {
      const onPress = jest.fn();
      const points = renderChart({
        data: [{value: 20}, {value: 40, onPress}],
      });
      expect(points[0].props.onPress).toBeUndefined();
      expect(points[0].props.onPressOut).toBeUndefined();
      act(() => points[1].props.onPress());
      expect(onPress).toHaveBeenCalledWith(
        expect.objectContaining({value: 40}),
        1,
      );
    });

    it('preserves item callback precedence over chart press and focus', () => {
      const itemPress = jest.fn();
      const onPress = jest.fn();
      const onFocus = jest.fn();
      const points = renderChart({
        data: [{value: 20, onPress: itemPress}],
        onPress,
        onFocus,
        focusEnabled: true,
      });
      act(() => {
        points[0].props.onPress();
        points[0].props.onPressOut();
      });
      expect(itemPress).toHaveBeenCalledTimes(1);
      expect(onPress).not.toHaveBeenCalled();
      expect(onFocus).not.toHaveBeenCalled();
    });

    it('preserves focus and unfocus handlers', () => {
      const onFocus = jest.fn();
      const points = renderChart({
        focusEnabled: true,
        focusedDataPointColor: '#ff0000',
        onFocus,
      });
      act(() => points[1].props.onPress());
      expect(onFocus).toHaveBeenCalledWith(
        expect.objectContaining({value: 40}),
        1,
      );
      expect(points[1].props.fill).toBe('#ff0000');
      act(() => {
        points[1].props.onPressOut();
        jest.runOnlyPendingTimers();
      });
      expect(points[1].props.fill).toBe(dataPointsColor);
    });
  },
);
