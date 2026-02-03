import React from 'react';
import {View} from 'react-native';
import {chartTypes} from 'gifted-charts-core';
import {Line, Svg} from 'react-native-svg';

const RenderVerticalLines = (props: any) => {
  const {
    showVerticalLines, // this is the value passed by user (note that it's not the effective value that is computed by traversing through the data array and finding any item for which showVerticalLines is true)
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
        return data?.[index]?.verticalLineHeight ?? verticalLinesHeight ?? 0;
      }
    } else {
      return (
        data?.[index]?.verticalLineHeight ??
        (verticalLinesHeight ||
          containerHeightIncludingBelowXAxis - xAxisThickness)
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
          if (!index && chartType === chartTypes.BUBBLE && initialSpacing === 0)
            return null;
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

          if (!showVerticalLines && !item.showVerticalLine) {
            return null;
          }

          const verticalLinesShiftLocal =
            chartType === chartTypes.BAR
              ? (item.verticalLineShift ?? verticalLinesShift)
              : verticalLinesShift;

          const x =
            verticalLinesShiftLocal +
            2 +
            (chartType === chartTypes.BAR // This logic exists because we have renderSpecificVerticalLines in Line Charts which I would love to deprecate at the earliest, because that functionality gets handled here elegantly
              ? totalSpacing - 1
              : verticalLinesSpacing
                ? verticalLinesSpacing * (index + 1)
                : index * spacing + (initialSpacing - 2));

          const lineProps =
            chartType === chartTypes.BAR // This logic exists because we have renderSpecificVerticalLines in Line Charts which I would love to deprecate at the earliest, because that functionality gets handled here elegantly
              ? {
                  y2:
                    containerHeightIncludingBelowXAxis -
                    heightAdjustmentDueToStrokeLinecap,
                  stroke:
                    (item.verticalLineColor ?? verticalLinesColor) ||
                    'lightgray',
                  strokeWidth:
                    (item.verticalLineThickness ?? verticalLinesThickness) || 2,
                  strokeDasharray:
                    item.verticalLineStrokeDashArray ??
                    verticalLinesStrokeDashArray ??
                    '',
                  strokeLinecap:
                    item.verticalLineStrokeLinecap ??
                    verticalLinesStrokeLinecap,
                }
              : {
                  y2:
                    containerHeightIncludingBelowXAxis -
                    heightAdjustmentDueToStrokeLinecap,
                  stroke: verticalLinesColor || 'lightgray',
                  strokeWidth: verticalLinesThickness || 2,
                  strokeDasharray: verticalLinesStrokeDashArray ?? '',
                  strokeLinecap: verticalLinesStrokeLinecap,
                };

          return (
            <Line
              {...lineProps}
              key={index}
              x1={x}
              y1={
                extendedContainerHeight -
                getHeightOfVerticalLine(index) +
                heightAdjustmentDueToStrokeLinecap
              }
              x2={x}
            />
          );
        })}
      </Svg>
    </View>
  );
};

export default RenderVerticalLines;
