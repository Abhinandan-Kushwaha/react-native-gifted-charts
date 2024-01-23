import React from 'react';
import {Rect} from 'react-native-svg';

export const renderSpecificVerticalLines = props => {
  const {
    data,
    barWidth,
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    lineConfig,
    maxValue,
  } = props;
  return data.map((item: any, index: number) => {
    if (item.showVerticalLine) {
      const currentBarWidth = item.barWidth || barWidth || 30;
      return (
        <Rect
          x={
            yAxisLabelWidth +
            6 -
            (item.verticalLineThickness || 1) / 2 -
            1 -
            (initialSpacing - currentBarWidth / 2) +
            (currentBarWidth + spacing) * index
          }
          y={
            containerHeight -
            lineConfig.shiftY -
            (item.value * containerHeight) / maxValue +
            9
          }
          width={item.verticalLineThickness || 1}
          height={(item.value * containerHeight) / maxValue + lineConfig.shiftY}
          fill={item.verticalLineColor || 'lightgray'}
        />
      );
    }
    return null;
  });
};
