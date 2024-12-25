import React from 'react';
import {View} from 'react-native';
import {chartTypes} from 'gifted-charts-core';
import {Line, Svg} from 'react-native-svg';

const RenderVerticalLines = (props: any) => {
  const {
    verticalLinesAr,
    verticalLinesSpacing,
    spacing,
    initialSpacing,
    verticalLinesZIndex,
    verticalLinesHeight,
    verticalLinesThickness,
    verticalLinesColor,
    verticalLinesStrokeDashArray,
    verticalLinesShift,
    verticalLinesUptoDataPoint,
    verticalLinesStrokeLinecap,
    xAxisThickness,
    labelsExtraHeight,
    containerHeight,
    data,
    stackData,
    barWidth,
    maxValue,
    chartType,
    containerHeightIncludingBelowXAxis,
    totalWidth,
    xAxisLabelsVerticalShift,
  } = props;

  const getHeightOfVerticalLine = (index: number) => {
    if (verticalLinesUptoDataPoint) {
      if (index < data.length) {
        return (
          (data[index].value * containerHeight) / maxValue - xAxisThickness
        );
      } else {
        return verticalLinesHeight ?? 0;
      }
    } else {
      return (
        verticalLinesHeight ||
        containerHeightIncludingBelowXAxis - xAxisThickness
      );
    }
  };

  const extendedContainerHeight = containerHeight + 10 + labelsExtraHeight;
  const thickness = verticalLinesThickness || 2;
  const heightAdjustmentDueToStrokeLinecap =
    verticalLinesStrokeLinecap === 'round' ||
    verticalLinesStrokeLinecap === 'square'
      ? thickness / 2
      : 0;

  return (
    <View
      style={{
        position: 'absolute',
        height: containerHeightIncludingBelowXAxis,
        bottom: 60 + xAxisLabelsVerticalShift, //stepHeight * -0.5 + xAxisThickness,
        left: 0,
        width: totalWidth,
        zIndex: verticalLinesZIndex || -1,
      }}>
      <Svg height={containerHeightIncludingBelowXAxis} width={totalWidth}>
        {verticalLinesAr.map((item: any, index: number) => {
          let totalSpacing = initialSpacing;
          if (verticalLinesSpacing) {
            totalSpacing = verticalLinesSpacing * (index + 1);
          } else {
            if (stackData) {
              totalSpacing += (stackData[0].barWidth || barWidth || 30) / 2;
            } else {
              totalSpacing += (data[0].barWidth || barWidth || 30) / 2;
            }
            for (let i = 0; i < index; i++) {
              let actualSpacing = spacing;
              if (stackData) {
                if (i >= stackData.length - 1) {
                  actualSpacing += (barWidth || 30) / 2;
                } else {
                  if (stackData[i].spacing || stackData[i].spacing === 0) {
                    actualSpacing = stackData[i].spacing;
                  }
                  if (stackData[i + 1].barWidth) {
                    actualSpacing += stackData[i + 1].barWidth;
                  } else {
                    actualSpacing += barWidth || 30;
                  }
                }
              } else {
                if (i >= data.length - 1) {
                  actualSpacing += (barWidth || 30) / 2;
                } else {
                  if (data[i].spacing || data[i].spacing === 0) {
                    actualSpacing = data[i].spacing;
                  }
                  if (data[i + 1].barWidth) {
                    actualSpacing += data[i + 1].barWidth;
                  } else {
                    actualSpacing += barWidth || 30;
                  }
                }
              }
              totalSpacing += actualSpacing;
            }
          }

          const x =
            verticalLinesShift +
            1 +
            (chartType === chartTypes.BAR
              ? totalSpacing - 1
              : verticalLinesSpacing
                ? verticalLinesSpacing * (index + 1)
                : index * spacing + (initialSpacing - 2));

          return (
            <Line
              key={index}
              x1={x}
              y1={
                extendedContainerHeight -
                getHeightOfVerticalLine(index) +
                heightAdjustmentDueToStrokeLinecap
              }
              x2={x}
              y2={containerHeightIncludingBelowXAxis - heightAdjustmentDueToStrokeLinecap}
              stroke={verticalLinesColor || 'lightgray'}
              strokeWidth={verticalLinesThickness || 2}
              strokeDasharray={verticalLinesStrokeDashArray ?? ''}
              strokeLinecap={verticalLinesStrokeLinecap}
            />
          );
        })}
      </Svg>
    </View>
  );
};

export default RenderVerticalLines;
