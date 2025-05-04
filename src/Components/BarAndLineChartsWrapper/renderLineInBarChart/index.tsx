import React from 'react';
import {View, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {renderSpecificVerticalLines} from './renderSpecificVerticalLines';
import {renderDataPoints} from './renderDataPoints';
import {renderSpecificDataPoints} from './renderSpecificDataPoints';
import {LineInBarChartPropsType} from 'gifted-charts-core';
import {DataPointProps} from 'gifted-charts-core';

const RenderLineInBarChart = (props: LineInBarChartPropsType) => {
  const {
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    lineConfig,
    maxValue,
    animatedWidth,
    lineBehindBars,
    points,
    arrowPoints,
    data,
    totalWidth,
    barWidth,
    labelsExtraHeight,
    xAxisLabelsVerticalShift,
    selectedIndex,
    containerHeightIncludingBelowXAxis,
    yAxisOffset,
    highlightEnabled,
    lowlightOpacity,
  } = props;

  const firstBarWidth = data[0].barWidth ?? barWidth;
  const opacity = highlightEnabled
    ? selectedIndex.includes?.(-1)
      ? 1
      : lowlightOpacity
    : 1;

  const dataPointsProps: DataPointProps = {
    data,
    lineConfig,
    barWidth,
    containerHeight,
    maxValue,
    firstBarWidth,
    yAxisLabelWidth,
    spacing,
    selectedIndex: selectedIndex[0],
    yAxisOffset,
    opacity,
  };

  const specificVerticalLinesProps = {
    data,
    barWidth,
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    lineConfig,
    maxValue,
  };

  const specificDataPointsProps = {
    data,
    barWidth,
    firstBarWidth,
    yAxisLabelWidth,
    lineConfig,
    spacing,
    containerHeight,
    maxValue,
    yAxisOffset,
  };

  const renderAnimatedLine = () => {
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          height: containerHeightIncludingBelowXAxis + labelsExtraHeight,
          left: 6 - yAxisLabelWidth,
          bottom: 50 + xAxisLabelsVerticalShift, //stepHeight * -0.5 + xAxisThickness,
          width: animatedWidth,
          zIndex: lineBehindBars ? -1 : 100000,
          // backgroundColor: 'wheat',
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            opacity={opacity}
            stroke={lineConfig.color}
            strokeWidth={lineConfig.thickness}
            strokeDasharray={lineConfig.strokeDashArray}
          />

          {renderSpecificVerticalLines(specificVerticalLinesProps)}

          {!lineConfig.hideDataPoints
            ? renderDataPoints(dataPointsProps)
            : renderSpecificDataPoints(specificDataPointsProps)}
          {lineConfig.showArrow && (
            <Path
              d={arrowPoints}
              fill={lineConfig.arrowConfig?.fillColor}
              stroke={lineConfig.arrowConfig?.strokeColor}
              strokeWidth={lineConfig.arrowConfig?.strokeWidth}
            />
          )}
        </Svg>
      </Animated.View>
    );
  };

  const renderLine = () => {
    return (
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          height: containerHeightIncludingBelowXAxis + labelsExtraHeight,
          left: 6 - yAxisLabelWidth,
          bottom: 50 + xAxisLabelsVerticalShift, //stepHeight * -0.5 + xAxisThickness,
          width: totalWidth,
          zIndex: lineBehindBars ? -1 : 100000,
          // backgroundColor: 'rgba(200,150,150,0.1)'
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            opacity={opacity}
            stroke={lineConfig.color}
            strokeWidth={lineConfig.thickness}
            strokeDasharray={lineConfig.strokeDashArray}
          />
          {renderSpecificVerticalLines(specificVerticalLinesProps)}

          {!lineConfig.hideDataPoints
            ? renderDataPoints(dataPointsProps)
            : renderSpecificDataPoints(specificDataPointsProps)}
          {lineConfig.showArrow && (
            <Path
              d={arrowPoints}
              fill={lineConfig.arrowConfig?.fillColor}
              stroke={lineConfig.arrowConfig?.strokeColor}
              strokeWidth={lineConfig.arrowConfig?.strokeWidth}
            />
          )}
        </Svg>
      </View>
    );
  };

  if (lineConfig.isAnimated) {
    return renderAnimatedLine();
  }

  return renderLine();
};

export default RenderLineInBarChart;
