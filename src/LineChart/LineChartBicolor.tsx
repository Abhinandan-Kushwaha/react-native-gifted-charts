import React, {Fragment, useCallback, useEffect, useMemo, useRef} from 'react';
import {View, Animated, Easing, Text} from 'react-native';
import {styles} from './styles';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
} from 'react-native-svg';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {
  LineChartBicolorPropsType,
  bicolorLineDataItem,
  useLineChartBiColor,
} from 'gifted-charts-core';

export const LineChartBicolor = (props: LineChartBicolorPropsType) => {
  const scrollRef = useRef();
  // const heightValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const opacValue = useMemo(() => new Animated.Value(0), []);

  const {
    pointsArray,
    fillPointsArray,
    selectedIndex,
    setSelectedIndex,
    containerHeight,
    data,
    labelsExtraHeight,
    animationDuration,
    startIndex1,
    endIndex1,
    initialSpacing,
    thickness,
    spacing,
    xAxisThickness,
    dataPointsHeight1,
    dataPointsWidth1,
    dataPointsRadius1,
    dataPointsColor1,
    dataPointsShape1,
    areaChart,
    textFontSize1,
    textColor1,
    totalWidth,
    maxValue,
    extendedContainerHeight,
    getX,
    getY,
    stepHeight,
    noOfSectionsBelowXAxis,
    thickness1,
    zIndex,
    strokeDashArray1,
    rotateLabel,
    isAnimated,
    hideDataPoints1,
    color,
    colorNegative,
    startFillColor,
    endFillColor,
    startOpacity,
    endOpacity,
    startFillColorNegative,
    endFillColorNegative,
    startOpacityNegative,
    endOpacityNegative,
    gradientDirection,
    xAxisTextNumberOfLines,
    focusEnabled,
    showDataPointOnFocus,
    showStripOnFocus,
    showTextOnFocus,
    stripHeight,
    stripWidth,
    stripColor,
    stripOpacity,
    unFocusOnPressOut,
    delayBeforeUnFocus,
    barAndLineChartsWrapperProps,
  } = useLineChartBiColor(props);

  const labelsAppear = useCallback(() => {
    opacValue.setValue(0);
    Animated.timing(opacValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacValue]);

  const appearingOpacity = opacValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const decreaseWidth = useCallback(() => {
    widthValue.setValue(0);
    Animated.timing(widthValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue]);

  useEffect(() => {
    decreaseWidth();
    labelsAppear();
  }, [animationDuration, decreaseWidth, labelsAppear]);

  const renderLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent?: Function,
  ) => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: 30,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left:
              index === 0 && initialSpacing < 10
                ? getX(index) - spacing / 2 + 8
                : getX(index) - spacing / 2,
            justifyContent: 'center',
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent?: Function,
  ) => {
    return (
      <Animated.View
        style={[
          {
            height: rotateLabel ? 40 : 20,
            // backgroundColor: 'yellow',
            position: 'absolute',
            bottom: rotateLabel ? 10 : 30,
            zIndex: 10,
            width: spacing,
            left:
              index === 0 && initialSpacing < 10
                ? getX(index) - spacing / 2 + 8
                : getX(index) - spacing / 2,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={labelTextStyle || {textAlign: 'center'}}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </Animated.View>
    );
  };

  const animatedWidth = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const onStripPress = (item, index) => {
    setSelectedIndex(index);
    if (props.onFocus) {
      props.onFocus(item, index);
    }
  };

  const renderDataPoints = (
    dataForRender,
    dataPtsShape,
    dataPtsWidth,
    dataPtsHeight,
    dataPtsColor,
    dataPtsRadius,
    textColor,
    textFontSize,
    startIndex,
    endIndex,
  ) => {
    return dataForRender.map((item: bicolorLineDataItem, index: number) => {
      if (index < startIndex || index > endIndex) return null;
      if (item.hideDataPoint) {
        return null;
      }
      let dataPointsShape,
        dataPointsWidth,
        dataPointsHeight,
        dataPointsColor,
        dataPointsRadius,
        text,
        customDataPoint,
        dataPointLabelComponent;
      if (index === selectedIndex) {
        dataPointsShape =
          item.focusedDataPointShape ||
          props.focusedDataPointShape ||
          item.dataPointShape ||
          dataPtsShape;
        dataPointsWidth =
          item.focusedDataPointWidth ||
          props.focusedDataPointWidth ||
          item.dataPointWidth ||
          dataPtsWidth;
        dataPointsHeight =
          item.focusedDataPointHeight ||
          props.focusedDataPointHeight ||
          item.dataPointHeight ||
          dataPtsHeight;
        dataPointsColor =
          item.focusedDataPointColor || props.focusedDataPointColor || 'orange';
        dataPointsRadius =
          item.focusedDataPointRadius ||
          props.focusedDataPointRadius ||
          item.dataPointRadius ||
          dataPtsRadius;
        if (showTextOnFocus) {
          text = item.dataPointText;
        }
        customDataPoint =
          item.focusedCustomDataPoint ||
          props.focusedCustomDataPoint ||
          item.customDataPoint ||
          props.customDataPoint;
        dataPointLabelComponent =
          item.focusedDataPointLabelComponent || item.dataPointLabelComponent;
      } else {
        dataPointsShape = item.dataPointShape || dataPtsShape;
        dataPointsWidth = item.dataPointWidth || dataPtsWidth;
        dataPointsHeight = item.dataPointHeight || dataPtsHeight;
        dataPointsColor = item.dataPointColor || dataPtsColor;
        dataPointsRadius = item.dataPointRadius || dataPtsRadius;
        if (showTextOnFocus) {
          text = '';
        }
        customDataPoint = item.customDataPoint || props.customDataPoint;
        dataPointLabelComponent = item.dataPointLabelComponent;
      }

      const currentStripHeight = item.stripHeight ?? stripHeight;
      const currentStripWidth = item.stripWidth ?? stripWidth;
      const currentStripOpacity = item.stripOpacity ?? stripOpacity;
      const currentStripColor = item.stripColor || stripColor;

      return (
        <Fragment key={index}>
          {focusEnabled ? (
            <>
              {unFocusOnPressOut ? (
                <Rect
                  onPressIn={() => onStripPress(item, index)}
                  onPressOut={() =>
                    setTimeout(() => setSelectedIndex(-1), delayBeforeUnFocus)
                  }
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight}
                  fill={'none'}
                />
              ) : (
                <Rect
                  onPress={() => onStripPress(item, index)}
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight}
                  fill={'none'}
                />
              )}
            </>
          ) : null}
          {item.showStrip ||
          (focusEnabled && index === selectedIndex && showStripOnFocus) ? (
            <Rect
              x={initialSpacing + (spacing * index - dataPointsWidth / 2)}
              y={
                currentStripHeight
                  ? containerHeight - currentStripHeight + 8
                  : containerHeight -
                    dataPointsHeight / 2 +
                    20 -
                    (item.value * containerHeight) / maxValue
              }
              width={currentStripWidth}
              height={
                currentStripHeight ||
                containerHeight - dataPointsHeight / 2 + 20
              }
              opacity={currentStripOpacity}
              fill={currentStripColor}
            />
          ) : null}
          {customDataPoint ? (
            <View
              style={[
                styles.customDataPointContainer,
                {
                  height: dataPointsHeight,
                  width: dataPointsWidth,
                  top:
                    containerHeight - (item.value * containerHeight) / maxValue,
                  left: getX(index) - dataPointsWidth,
                },
              ]}>
              {customDataPoint()}
            </View>
          ) : null}
          {dataPointsShape === 'rectangular' ? (
            <Fragment key={index}>
              {customDataPoint ? null : (
                <Rect
                  x={getX(index) - dataPointsWidth}
                  y={
                    extendedContainerHeight +
                    dataPointsHeight / 2 -
                    (item.value * containerHeight) / maxValue
                  }
                  width={dataPointsWidth}
                  height={dataPointsHeight}
                  fill={
                    showDataPointOnFocus
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                  onPress={() => {
                    item.onPress
                      ? item.onPress(item, index)
                      : props.onPress
                        ? props.onPress(item, index)
                        : null;
                  }}
                />
              )}
            </Fragment>
          ) : (
            <Fragment key={index}>
              {customDataPoint ? null : (
                <Circle
                  cx={getX(index)}
                  cy={getY(index)}
                  r={dataPointsRadius}
                  fill={
                    showDataPointOnFocus
                      ? index === selectedIndex
                        ? dataPointsColor
                        : 'none'
                      : dataPointsColor
                  }
                  onPress={() => {
                    item.onPress
                      ? item.onPress(item, index)
                      : props.onPress
                        ? props.onPress(item, index)
                        : null;
                  }}
                />
              )}
            </Fragment>
          )}
          {dataPointLabelComponent ? (
            !showTextOnFocus || index === selectedIndex ? (
              <View
                style={[
                  styles.customDataPointContainer,
                  {
                    top:
                      containerHeight +
                      (item.dataPointLabelShiftY ||
                        props.dataPointLabelShiftY ||
                        0) -
                      (item.value * containerHeight) / maxValue,
                    left:
                      initialSpacing +
                      (item.dataPointLabelShiftX ||
                        props.dataPointLabelShiftX ||
                        0) -
                      (item.dataPointLabelWidth
                        ? item.dataPointLabelWidth + 20
                        : props.dataPointLabelWidth
                          ? props.dataPointLabelWidth + 20
                          : 50) /
                        2 +
                      spacing * index,
                  },
                ]}>
                {dataPointLabelComponent()}
              </View>
            ) : null
          ) : text || item.dataPointText ? (
            !showTextOnFocus || index === selectedIndex ? (
              <CanvasText
                fill={item.textColor || textColor}
                fontSize={item.textFontSize || textFontSize}
                x={
                  initialSpacing -
                  dataPointsWidth +
                  spacing * index +
                  (item.textShiftX || props.textShiftX || 0)
                }
                y={
                  extendedContainerHeight -
                  dataPointsHeight / 2 -
                  (item.value * containerHeight) / maxValue +
                  (item.textShiftY || props.textShiftY || 0)
                }>
                {!showTextOnFocus ? item.dataPointText : text}
              </CanvasText>
            ) : null
          ) : null}
        </Fragment>
      );
    });
  };

  const renderSpecificVerticalLines = (dataForRender: any) => {
    return dataForRender.map((item: bicolorLineDataItem, index: number) => {
      if (item.showVerticalLine) {
        return (
          <Rect
            key={index}
            x={
              initialSpacing -
              (item.verticalLineThickness || 1) / 2 -
              1 +
              spacing * index
            }
            y={
              item.verticalLineUptoDataPoint
                ? containerHeight -
                  (item.value * containerHeight) / maxValue +
                  10
                : -xAxisThickness
            }
            width={item.verticalLineThickness || 1}
            height={
              item.verticalLineUptoDataPoint
                ? (item.value * containerHeight) / maxValue - xAxisThickness
                : containerHeight + 10 - xAxisThickness
            }
            fill={item.verticalLineColor || 'lightgray'}
          />
        );
      }
      return null;
    });
  };

  const lineSvgComponent = (
    pointsArray: any,
    currentLineThickness: number | undefined,
    color: string,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    return (
      <Svg>
        {strokeDashArray &&
        strokeDashArray.length === 2 &&
        typeof strokeDashArray[0] === 'number' &&
        typeof strokeDashArray[1] === 'number'
          ? pointsArray.map((points, index) => (
              <Path
                key={index}
                d={points.points}
                fill="none"
                stroke={points.color === 'green' ? color : colorNegative}
                strokeWidth={currentLineThickness || thickness}
                strokeDasharray={strokeDashArray}
              />
            ))
          : pointsArray.map((points, index) => {
              return (
                <Path
                  key={index}
                  d={points.points}
                  fill="none"
                  stroke={points.color === 'green' ? color : colorNegative}
                  strokeWidth={currentLineThickness || thickness}
                />
              );
            })}

        {/***********************      For Area Chart        ************/}

        {areaChart && (
          <>
            <LinearGradient
              id="Gradient"
              x1="0"
              y1="0"
              x2={gradientDirection === 'horizontal' ? '1' : '0'}
              y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <Stop
                offset="0"
                stopColor={startFillColor}
                stopOpacity={startOpacity.toString()}
              />
              <Stop
                offset="1"
                stopColor={endFillColor}
                stopOpacity={endOpacity.toString()}
              />
            </LinearGradient>
            <LinearGradient
              id="GradientNegative"
              x1="0"
              y1="0"
              x2={gradientDirection === 'horizontal' ? '1' : '0'}
              y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <Stop
                offset="1"
                stopColor={startFillColorNegative}
                stopOpacity={startOpacityNegative.toString()}
              />
              <Stop
                offset="0"
                stopColor={endFillColorNegative}
                stopOpacity={endOpacityNegative.toString()}
              />
            </LinearGradient>
          </>
        )}
        {areaChart
          ? fillPointsArray.map((item, index) => {
              return (
                <Path
                  key={index}
                  d={item.points}
                  fill={
                    item.color === 'green'
                      ? 'url(#Gradient)'
                      : 'url(#GradientNegative)'
                  }
                  stroke={'transparent'}
                  strokeWidth={currentLineThickness || thickness}
                />
              );
            })
          : null}

        {/******************************************************************/}

        {renderSpecificVerticalLines(data)}

        {/***  !!! Here it's done thrice intentionally, trying to make it to only 1 breaks things !!!  ***/}
        {!hideDataPoints1
          ? renderDataPoints(
              data,
              dataPointsShape1,
              dataPointsWidth1,
              dataPointsHeight1,
              dataPointsColor1,
              dataPointsRadius1,
              textColor1,
              textFontSize1,
              startIndex1,
              endIndex1,
            )
          : null}
      </Svg>
    );
  };

  const renderLine = (
    zIndex: number,
    pointsArray: any,
    currentLineThickness: number | undefined,
    color: string,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    return (
      <View
        style={{
          position: 'absolute',
          height: extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
          bottom: 60 + labelsExtraHeight,
          width: totalWidth,
          zIndex: zIndex,
        }}>
        {pointsArray.length
          ? lineSvgComponent(
              pointsArray,
              currentLineThickness,
              color,
              startFillColor,
              endFillColor,
              startOpacity,
              endOpacity,
              strokeDashArray,
            )
          : null}
      </View>
    );
  };

  const renderAnimatedLine = (
    zIndex: number,
    points: any,
    animatedWidth: any,
    currentLineThickness: number | undefined,
    color: string,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
  ) => {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          height: extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
          bottom: 60, //stepHeight * -0.5 + xAxisThickness,
          width: animatedWidth,
          zIndex: zIndex,
          // backgroundColor: 'wheat',
        }}>
        {lineSvgComponent(
          points,
          currentLineThickness,
          color,
          startFillColor,
          endFillColor,
          startOpacity,
          endOpacity,
          strokeDashArray,
        )}
      </Animated.View>
    );
  };

  const renderChartContent = () => {
    return (
      <>
        {isAnimated
          ? renderAnimatedLine(
              zIndex,
              pointsArray,
              animatedWidth,
              thickness1,
              color,
              startFillColor,
              endFillColor,
              startOpacity,
              endOpacity,
              strokeDashArray1,
            )
          : renderLine(
              zIndex,
              pointsArray,
              thickness1,
              color,
              startFillColor,
              endFillColor,
              startOpacity,
              endOpacity,
              strokeDashArray1,
            )}
        {data.map((item: bicolorLineDataItem, index: number) => {
          return (
            <View key={index}>
              {isAnimated
                ? renderAnimatedLabel(
                    index,
                    item.label ||
                      (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : ''),
                    item.labelTextStyle || props.xAxisLabelTextStyle,
                    item.labelComponent,
                  )
                : renderLabel(
                    index,
                    item.label ||
                      (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : ''),
                    item.labelTextStyle || props.xAxisLabelTextStyle,
                    item.labelComponent,
                  )}
              {/* {renderLabel(index, item.label, item.labelTextStyle)} */}
            </View>
          );
        })}
      </>
    );
  };

  return (
    <BarAndLineChartsWrapper
      {...barAndLineChartsWrapperProps}
      scrollRef={scrollRef}
      animatedWidth={animatedWidth}
      renderChartContent={renderChartContent}
      remainingScrollViewProps={{onScroll: (ev: any) => props.onScroll?.(ev)}}
    />
  );
};
