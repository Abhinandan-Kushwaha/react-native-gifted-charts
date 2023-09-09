import React, {Fragment} from 'react';
import {View, Animated} from 'react-native';
import Svg, {Circle, Path, Rect, Text as CanvasText} from 'react-native-svg';
import {styles} from '../../BarChart/styles';
import {getXForLineInBar, getYForLineInBar} from '../../utils';

const RenderLineInBarChart = props => {
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
  } = props;

  const firstBarWidth = data[0].barWidth ?? barWidth;

  const renderSpecificVerticalLines = (dataForRender: any) => {
    return dataForRender.map((item: any, index: number) => {
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
            height={
              (item.value * containerHeight) / maxValue + lineConfig.shiftY
            }
            fill={item.verticalLineColor || 'lightgray'}
          />
        );
      }
      return null;
    });
  };

  const renderDataPoints = () => {
    return data.map((item: any, index: number) => {
      if (index < lineConfig.startIndex || index > lineConfig.endIndex) {
        return null;
      }
      const currentBarWidth = item.barWidth || barWidth || 30;
      const customDataPoint =
        item.customDataPoint || lineConfig.customDataPoint;
      const value =
        item.value ??
        item.stacks.reduce((total, item) => total + item.value, 0);
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
            {customDataPoint()}
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
  const renderSpecificDataPoints = dataForRender => {
    return dataForRender.map((item: any, index: number) => {
      const currentBarWidth = item.barWidth || barWidth || 30;
      if (item.showDataPoint) {
        if (item.dataPointShape === 'rectangular') {
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
                    item.value,
                    lineConfig.shiftY,
                    containerHeight,
                    maxValue,
                  ) -
                  item.dataPointsHeight / 2
                }
                width={item.dataPointWidth || lineConfig.dataPointsWidth}
                height={item.dataPointHeight || 2}
                fill={item.dataPointColor || 'black'}
              />
              {item.dataPointText && (
                <CanvasText
                  fill={item.textColor || 'black'}
                  fontSize={item.textFontSize || 10}
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
                      item.value,
                      lineConfig.shiftY,
                      containerHeight,
                      maxValue,
                    ) -
                    (item.dataPointHeight || lineConfig.dataPointsHeight) / 2 +
                    (item.textShiftY || lineConfig.textShiftY || 0)
                  }>
                  {item.dataPointText}
                </CanvasText>
              )}
            </Fragment>
          );
        } else {
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
                  item.value,
                  lineConfig.shiftY,
                  containerHeight,
                  maxValue,
                )}
                r={item.dataPointRadius || 3}
                fill={item.dataPointColor || 'black'}
              />
              {item.dataPointText && (
                <CanvasText
                  fill={item.textColor || 'black'}
                  fontSize={item.textFontSize || 10}
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
                      item.value,
                      lineConfig.shiftY,
                      containerHeight,
                      maxValue,
                    ) -
                    (item.dataPointHeight || lineConfig.dataPointsHeight) / 2 +
                    (item.textShiftY || lineConfig.textShiftY || 0)
                  }>
                  {item.dataPointText}
                </CanvasText>
              )}
            </Fragment>
          );
        }
      }
      return null;
    });
  };

  const renderAnimatedLine = () => {
    // console.log('animatedWidth is-------->', animatedWidth);
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: containerHeight + 10,
          left: 34 - yAxisLabelWidth,
          bottom: 50, //stepHeight * -0.5 + xAxisThickness,
          width: animatedWidth,
          zIndex: lineBehindBars ? -1 : 100000,
          // backgroundColor: 'wheat',
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            stroke={lineConfig.color}
            strokeWidth={lineConfig.thickness}
          />

          {renderSpecificVerticalLines(data)}

          {!lineConfig.hideDataPoints
            ? renderDataPoints()
            : renderSpecificDataPoints(data)}
          {lineConfig.showArrow && (
            <Path
              d={arrowPoints}
              fill={lineConfig.arrowConfig.fillColor}
              stroke={lineConfig.arrowConfig.strokeColor}
              strokeWidth={lineConfig.arrowConfig.strokeWidth}
            />
          )}
        </Svg>
      </Animated.View>
    );
  };

  const renderLine = () => {
    return (
      <View
        style={{
          position: 'absolute',
          height: containerHeight + 10 + labelsExtraHeight,
          left: 34 - yAxisLabelWidth,
          bottom: 50, //stepHeight * -0.5 + xAxisThickness,
          width: totalWidth,
          zIndex: lineBehindBars ? -1 : 100000,
          // backgroundColor: 'rgba(200,150,150,0.1)'
        }}>
        <Svg>
          <Path
            d={points}
            fill="none"
            stroke={lineConfig.color}
            strokeWidth={lineConfig.thickness}
          />
          {renderSpecificVerticalLines(data)}

          {!lineConfig.hideDataPoints
            ? renderDataPoints()
            : renderSpecificDataPoints(data)}
          {lineConfig.showArrow && (
            <Path
              d={arrowPoints}
              fill={lineConfig.arrowConfig.fillColor}
              stroke={lineConfig.arrowConfig.strokeColor}
              strokeWidth={lineConfig.arrowConfig.strokeWidth}
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
