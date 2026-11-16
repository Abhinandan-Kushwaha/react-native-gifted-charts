import React, {Profiler} from 'react';
import renderer, {act} from 'react-test-renderer';
import {View} from 'react-native';
import {LineChart} from '../src/LineChart';

// Pointer drags fire a responder move event for every touch sample. The pointer
// snaps to data points, so samples that stay on the same point must not re-render
// the chart, and the pointer must still follow the finger and reappear after
// release.

const N = 100;
const SPACING = 4;
const series = (k: number) =>
  Array.from({length: N}, (_, i) => ({value: 50 + 40 * Math.sin(i / 7 + k)}));
const ev = (x: number, t: number) => ({
  timeStamp: t,
  nativeEvent: {locationX: x, pageX: x + 1000},
});

type Labels = {items: any[]; index: number}[];

const renderChart = (props: object) => {
  let commits = 0;
  const labels: Labels = [];
  let tree!: renderer.ReactTestRenderer;
  act(() => {
    tree = renderer.create(
      <Profiler
        id="chart"
        onRender={() => {
          commits++;
        }}>
        <LineChart
          width={N * SPACING}
          spacing={SPACING}
          initialSpacing={0}
          hideDataPoints
          pointerConfig={{
            pointerVanishDelay: 100,
            pointerLabelComponent: (items: any[], _s: any, index: number) => {
              labels.push({items, index});
              return null;
            },
          }}
          {...props}
        />
      </Profiler>,
      {unstable_isConcurrent: true},
    );
  });
  const responder = tree.root.findAll(
    n => n.type === View && typeof n.props.onResponderMove === 'function',
  )[0];
  return {
    tree,
    responder,
    commits: () => commits,
    labels,
    pointerShown: () => labels.length > 0,
  };
};

const dataSetProps = {dataSet: [{data: series(0)}, {data: series(1)}]};
const dataProps = {data: series(0), data2: series(1)};

describe.each([
  ['dataSet', dataSetProps],
  ['data + data2', dataProps],
])('%s chart', (_name, props) => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('does not re-render while the finger stays on the same data point', () => {
    const c = renderChart(props);
    act(() => c.responder.props.onResponderGrant(ev(41, 0)));
    act(() => c.responder.props.onResponderMove(ev(41, 1)));
    const before = c.commits();
    for (let i = 0; i < 50; i++) {
      // jitter within the same point (index 10 spans x = 38..42)
      act(() => c.responder.props.onResponderMove(ev(40 + (i % 3) * 0.5, i + 2)));
    }
    expect(c.commits() - before).toBe(0);
    act(() => c.tree.unmount());
  });

  it('re-renders per data point crossed, not per touch sample', () => {
    const sweep = (step: number) => {
      const c = renderChart(props);
      act(() => c.responder.props.onResponderGrant(ev(2, 0)));
      const before = c.commits();
      // sweep from point 0 to point 39
      const samples = Math.round(155 / step);
      for (let i = 1; i <= samples; i++) {
        act(() => c.responder.props.onResponderMove(ev(2 + i * step, i)));
      }
      const result = {commits: c.commits() - before, last: c.labels[c.labels.length - 1]};
      act(() => c.tree.unmount());
      return result;
    };
    const coarse = sweep(0.5); // 310 samples
    const fine = sweep(0.25); // 620 samples
    expect(fine.commits).toBe(coarse.commits);
    // the first sample activates the pointer, then 39 point changes; each
    // change currently costs at most two commits
    expect(coarse.commits).toBeLessThanOrEqual(2 * 40);
    expect(fine.last.index).toBe(39);
    expect(fine.last.items[0].value).toBeCloseTo(series(0)[39].value);
    expect(fine.last.items[1].value).toBeCloseTo(series(1)[39].value);
  });

  it('shows the pointer again when the same point is touched after release', () => {
    const c = renderChart(props);
    act(() => c.responder.props.onResponderGrant(ev(41, 0)));
    act(() => c.responder.props.onResponderMove(ev(41, 1)));
    act(() => c.responder.props.onResponderEnd(ev(41, 2)));
    act(() => jest.advanceTimersByTime(150)); // pointer vanishes
    c.labels.length = 0;
    expect(c.pointerShown()).toBe(false);
    act(() => c.responder.props.onResponderGrant(ev(41, 3)));
    act(() => c.responder.props.onResponderMove(ev(41.5, 4)));
    expect(c.pointerShown()).toBe(true);
    expect(c.labels[c.labels.length - 1].index).toBe(10);
    act(() => c.tree.unmount());
  });

  it('keeps the pointer visible when a new touch starts before it vanishes', () => {
    const c = renderChart(props);
    act(() => c.responder.props.onResponderGrant(ev(41, 0)));
    act(() => c.responder.props.onResponderEnd(ev(41, 1)));
    act(() => c.responder.props.onResponderGrant(ev(41, 2))); // within pointerVanishDelay
    act(() => jest.advanceTimersByTime(150)); // the old release timer hides the pointer
    c.labels.length = 0;
    act(() => c.responder.props.onResponderMove(ev(41.5, 3))); // same point
    expect(c.pointerShown()).toBe(true);
    act(() => c.tree.unmount());
  });
});
