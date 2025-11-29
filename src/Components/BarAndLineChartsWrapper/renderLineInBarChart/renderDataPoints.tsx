import React, {Fragment, useState} from 'react';
import {styles} from '../../../BarChart/styles';
import {TouchableOpacity, View} from 'react-native';
import {getXForLineInBar, getYForLineInBar} from 'gifted-charts-core';
import {
  Rect,
  Text as CanvasText,
  Circle,
  ForeignObject,
} from 'react-native-svg';
import {DataPointProps} from 'gifted-charts-core';
import {isWebApp} from '../../../utils';

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
    yAxisOffset,
    opacity,
    svgHeight,
    totalWidth,
  } = props;

  const {
    focusEnabled,
    dataPointLabelComponent,
    showDataPointLabelOnFocus,
    focusedDataPointIndex,
  } = lineConfig;
  const [selectedDataPointIndex, setSelectedDataPointIndex] = useState(
    focusedDataPointIndex ?? -1,
  );

  return (
    <>
      {data.map((item: any, index: number) => {
        if (
          index < lineConfig.startIndex ||
          index > lineConfig.endIndex ||
          item.hideDataPoint
        ) {
          return null;
        }
        const currentBarWidth = item.barWidth || barWidth || 30;
        const customDataPoint =
          item.customDataPoint || lineConfig.customDataPoint;
        const dataPointColor =
          lineConfig.focusEnabled && index === selectedDataPointIndex
            ? lineConfig.focusedDataPointColor
            : lineConfig.dataPointsColor;

        const dataPointRadius =
          lineConfig.focusEnabled && index === selectedDataPointIndex
            ? lineConfig.focusedDataPointRadius
            : lineConfig.dataPointsRadius;
        const value =
          item.value ??
          item.stacks.reduce(
            (total: number, item: any) => total + item.value,
            0,
          );
        const x = getXForLineInBar(
          index,
          firstBarWidth,
          currentBarWidth,
          yAxisLabelWidth,
          lineConfig,
          spacing,
        );
        const y = getYForLineInBar(
          value,
          lineConfig.shiftY,
          containerHeight,
          maxValue,
          yAxisOffset,
        );
        if (customDataPoint) {
          return (
            <TouchableOpacity
              key={index + '.' + value + 'custom'}
              style={[
                styles.customDataPointContainer,
                {
                  opacity,
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
              ]}
              onPress={() => {
                if (focusEnabled) setSelectedDataPointIndex(index);
              }}>
              {customDataPoint(item, index)}
            </TouchableOpacity>
          );
        }
        if (lineConfig.dataPointsShape === 'rectangular') {
          return (
            <Fragment key={index + '.' + value + 'rect'}>
              <Rect
                x={x}
                y={y - lineConfig.dataPointsHeight / 2}
                width={lineConfig.dataPointsWidth}
                height={lineConfig.dataPointsHeight}
                fill={dataPointColor}
                opacity={opacity}
                onPress={() => {
                  if (focusEnabled) setSelectedDataPointIndex(index);
                }}
              />
              {item.dataPointText && (
                <CanvasText
                  fill={item.textColor || lineConfig.textColor}
                  opacity={opacity}
                  fontSize={item.textFontSize || lineConfig.textFontSize}
                  x={x + (item.textShiftX || lineConfig.textShiftX || 0)}
                  y={
                    y -
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
          <Fragment key={index + '.' + value + 'circ'}>
            <Circle
              cx={x}
              cy={y}
              r={dataPointRadius}
              fill={dataPointColor}
              opacity={opacity}
              onPress={() => {
                if (focusEnabled) setSelectedDataPointIndex(index);
              }}
            />
            {item.dataPointText && (
              <CanvasText
                fill={item.textColor || lineConfig.textColor}
                opacity={opacity}
                fontSize={item.textFontSize || lineConfig.textFontSize}
                x={x + (item.textShiftX || lineConfig.textShiftX || 0)}
                y={
                  y -
                  lineConfig.dataPointsHeight / 2 +
                  (item.textShiftY || lineConfig.textShiftY || 0)
                }>
                {item.dataPointText}
              </CanvasText>
            )}
          </Fragment>
        );
      })}
      {dataPointLabelComponent
        ? data.map((item: any, index: number) => {
            if (
              index < lineConfig.startIndex ||
              index > lineConfig.endIndex ||
              item.hideDataPoint
            ) {
              return null;
            }
            const currentBarWidth = item.barWidth || barWidth || 30;
            const value =
              item.value ??
              item.stacks.reduce(
                (total: number, item: any) => total + item.value,
                0,
              );
            const x = getXForLineInBar(
              index,
              firstBarWidth,
              currentBarWidth,
              yAxisLabelWidth,
              lineConfig,
              spacing,
            );
            const y = getYForLineInBar(
              value,
              lineConfig.shiftY,
              containerHeight,
              maxValue,
              yAxisOffset,
            );

            if (isWebApp)
              return (
                <ForeignObject
                  height={svgHeight}
                  width={totalWidth}
                  x={x - 12}
                  y={y - 24}
                  key={index + '.' + value + 'label'}>
                  {showDataPointLabelOnFocus
                    ? selectedDataPointIndex === index
                      ? dataPointLabelComponent?.(item, index)
                      : null
                    : dataPointLabelComponent?.(item, index)}
                </ForeignObject>
              );

            return (
              <View
                style={{top: y - 24, left: x - 12, position: 'absolute'}}
                key={index + '.' + value + 'label'}>
                {showDataPointLabelOnFocus
                  ? selectedDataPointIndex === index
                    ? dataPointLabelComponent?.(item, index)
                    : null
                  : dataPointLabelComponent?.(item, index)}
              </View>
            );
          })
        : null}
    </>
  );
};
