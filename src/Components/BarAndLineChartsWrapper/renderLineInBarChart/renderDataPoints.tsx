import React, {Fragment} from 'react';
import {styles} from '../../../BarChart/styles';
import {View} from 'react-native';
import {getXForLineInBar, getYForLineInBar} from 'gifted-charts-core';
import {Rect, Text as CanvasText, Circle} from 'react-native-svg';
import {DataPointProps} from 'gifted-charts-core';

export const renderDataPoints = (props: DataPointProps) => {
  const {
    data,
    lineConfig,
    barWidth,
    containerHeight,
    maxValue,
    firstBarWidth,
    yAxisLabelWidth,
    spacing,
    selectedIndex,
  } = props;
  return data.map((item: any, index: number) => {
    if (
      index < lineConfig.startIndex ||
      index > lineConfig.endIndex ||
      item.hideDataPoint
    ) {
      return null;
    }
    const currentBarWidth = item.barWidth || barWidth || 30;
    const customDataPoint = item.customDataPoint || lineConfig.customDataPoint;
    const dataPointColor =
      lineConfig.focusEnabled &&
      index === (lineConfig.focusedDataPointIndex ?? selectedIndex)
        ? lineConfig.focusedDataPointColor
        : lineConfig.dataPointsColor;

    const dataPointRadius =
      lineConfig.focusEnabled &&
      index === (lineConfig.focusedDataPointIndex ?? selectedIndex)
        ? lineConfig.focusedDataPointRadius
        : lineConfig.dataPointsRadius;
    const value =
      item.value ??
      item.stacks.reduce((total: number, item: any) => total + item.value, 0);
    if (customDataPoint) {
      return (
        <View
          style={[
            styles.customDataPointContainer,
            {
              height: lineConfig.dataPointsHeight,
              width: lineConfig.dataPointsWidth,
              top:
                containerHeight -
                (value * containerHeight) / maxValue -
                (item.shiftY ?? lineConfig.shiftY ?? 0),
              left: getXForLineInBar(
                index,
                firstBarWidth,
                currentBarWidth,
                yAxisLabelWidth,
                lineConfig,
                spacing,
              ),
            },
          ]}>
          {customDataPoint(item, index)}
        </View>
      );
    }
    if (lineConfig.dataPointsShape === 'rectangular') {
      return (
        <Fragment key={index}>
          <Rect
            x={getXForLineInBar(
              index,
              firstBarWidth,
              currentBarWidth,
              yAxisLabelWidth,
              lineConfig,
              spacing,
            )}
            y={
              getYForLineInBar(
                value,
                lineConfig.shiftY,
                containerHeight,
                maxValue,
              ) -
              lineConfig.dataPointsHeight / 2
            }
            width={lineConfig.dataPointsWidth}
            height={lineConfig.dataPointsHeight}
            fill={dataPointColor}
          />
          {item.dataPointText && (
            <CanvasText
              fill={item.textColor || lineConfig.textColor}
              fontSize={item.textFontSize || lineConfig.textFontSize}
              x={
                getXForLineInBar(
                  index,
                  firstBarWidth,
                  currentBarWidth,
                  yAxisLabelWidth,
                  lineConfig,
                  spacing,
                ) + (item.textShiftX || lineConfig.textShiftX || 0)
              }
              y={
                getYForLineInBar(
                  value,
                  lineConfig.shiftY,
                  containerHeight,
                  maxValue,
                ) -
                lineConfig.dataPointsHeight / 2 +
                (item.textShiftY || lineConfig.textShiftY || 0)
              }>
              {item.dataPointText}
            </CanvasText>
          )}
        </Fragment>
      );
    }
    return (
      <Fragment key={index}>
        <Circle
          cx={getXForLineInBar(
            index,
            firstBarWidth,
            currentBarWidth,
            yAxisLabelWidth,
            lineConfig,
            spacing,
          )}
          cy={getYForLineInBar(
            value,
            lineConfig.shiftY,
            containerHeight,
            maxValue,
          )}
          r={dataPointRadius}
          fill={dataPointColor}
        />
        {item.dataPointText && (
          <CanvasText
            fill={item.textColor || lineConfig.textColor}
            fontSize={item.textFontSize || lineConfig.textFontSize}
            x={
              getXForLineInBar(
                index,
                firstBarWidth,
                currentBarWidth,
                yAxisLabelWidth,
                lineConfig,
                spacing,
              ) + (item.textShiftX || lineConfig.textShiftX || 0)
            }
            y={
              getYForLineInBar(
                value,
                lineConfig.shiftY,
                containerHeight,
                maxValue,
              ) -
              lineConfig.dataPointsHeight / 2 +
              (item.textShiftY || lineConfig.textShiftY || 0)
            }>
            {item.dataPointText}
          </CanvasText>
        )}
      </Fragment>
    );
  });
};
