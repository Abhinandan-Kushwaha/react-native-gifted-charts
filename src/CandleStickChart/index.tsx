import {
  CandleStickChartPropsType,
  useCandleStickChart,
} from 'gifted-charts-core';
import {BarChart} from '../BarChart';
import {screenWidth} from '../utils';

export const CandleStickChart = (props: CandleStickChartPropsType) => {
  const {propsCastedToBarChartProps} = useCandleStickChart({
    ...props,
    parentWidth: props.width ?? screenWidth,
  });
  return <BarChart {...propsCastedToBarChartProps} />;
};
