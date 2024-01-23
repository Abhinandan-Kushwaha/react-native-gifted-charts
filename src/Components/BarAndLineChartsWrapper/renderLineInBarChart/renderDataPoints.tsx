import React, {Fragment} from 'react';
import {styles} from '../../../BarChart/styles';
import {View} from 'react-native';
import {getXForLineInBar, getYForLineInBar} from 'gifted-charts-core';
import {Rect, Text as CanvasText, Circle} from 'react-native-svg';

export const renderDataPoints = props => {
  const {
    data,
    lineConfig,
    barWidth,
    containerHeight,
    maxValue,
    firstBarWidth,
    yAxisLabelWidth,
    spacing,
  } = props;
  return data.map((item: any, index: number) => {
    if (index < lineConfig.startIndex || index > lineConfig.endIndex) {
      return null;
    }
    const currentBarWidth = item.barWidth || barWidth || 30;
    const customDataPoint = item.customDataPoint || lineConfig.customDataPoint;
    const value =
      item.value ?? item.stacks.reduce((total, item) => total + item.value, 0);
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
            fill={lineConfig.dataPointsColor}
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
          r={lineConfig.dataPointsRadius}
          fill={lineConfig.dataPointsColor}
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
