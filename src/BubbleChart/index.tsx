import {
  BubbleChartPropsType,
  BubbleDefaults,
  useBubbleChart,
} from 'gifted-charts-core';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {Fragment, useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  I18nManager,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Circle, ForeignObject, Rect, Svg, Line} from 'react-native-svg';
import {isWebApp, screenWidth} from '../utils';
import {bubbleDataItem} from 'gifted-charts-core';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedLine = Animated.createAnimatedComponent(Line);

export const BubbleChart = (props: BubbleChartPropsType) => {
  const opacityValue = useMemo(() => new Animated.Value(0), []);
  const pointsOpacityValue = useMemo(() => new Animated.Value(0), []);
  const {secondaryXAxis} = props;
  const {
    barAndLineChartsWrapperProps,
    totalWidth,
    animationDuration,
    containerHeightIncludingBelowXAxis = 0,
    getY,
    getX,
    maxValue,
    selectedIndex,
    setSelectedIndex,
    showTextOnFocus,
    focusEnabled,
    focusTogether,
    selectedLineNumber,
    lastLineNumber,
    initialSpacing,
    spacing,
    containerHeight,
    handleFocus,
    handleUnFocus,
    isAnimated,
    showBubbleOnFocus,
    showBubbleLabelOnFocus,
    bubblesShape,
    bubblesWidth,
    bubblesHeight,
    bubblesColor,
    bubblesRadius,
    labelFontSize,
    labelTextStyle,
    startIndex,
    endIndex,
    showValuesAsBubbleLabels,
    hideBubbles,
    xAxisLabelsVerticalShift,
    labelsExtraHeight,
    xAxisThickness,
    xAxisTextNumberOfLines,
    rotateLabel,
    allowFontScaling,
    borderColor,
    borderWidth,
    opacity,
    xAxisLabelTexts,
    showRegressionLine,
    regressionLineX1,
    regressionLineY1,
    regressionLineX2,
    regressionLineY2,
    regressionLineConfig,
  } = useBubbleChart({
    ...props,
    parentWidth: props.parentWidth ?? screenWidth,
  });

  const progress = useRef(new Animated.Value(0)).current;
  const AnimatedRegressionLineX = useRef(new Animated.Value(0)).current;
  const AnimatedRegressionLineY = useRef(new Animated.Value(0)).current;

  const scrollRef = props.scrollRef ?? useRef(null);
  const widthValue = useMemo(() => new Animated.Value(0), []);

  const appearingOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // const appearRegressionLine = RegressionLine.interpolate({
  //   inputRange:[0,1],
  //   outputRange:[regressionLineX1,regressionLineX2]
  // })

  const growingRadii = useMemo(
    () =>
      (props.data ?? []).map(item =>
        progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, item.r ?? bubblesRadius],
        }),
      ),
    [props.data, progress],
  );

  const growingHeight = (props.data ?? []).map((_, i) =>
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, props.data?.[i].bubbleHeight ?? bubblesHeight],
    }),
  );

  const growingWidth = (props.data ?? []).map((_, i) =>
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, props.data?.[i].bubbleWidth ?? bubblesWidth],
    }),
  );

  const appearingDataPoints = pointsOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity],
  });

  const drawRegressionLine = useCallback(() => {
    if (!regressionLineConfig.isAnimated) return;
    AnimatedRegressionLineX.setValue(regressionLineX1);
    AnimatedRegressionLineY.setValue(regressionLineY1);
    Animated.parallel([
      Animated.timing(AnimatedRegressionLineX, {
        toValue: regressionLineX2,
        duration: regressionLineConfig.animationDuration,
        easing: Easing.linear,
        useNativeDriver: false, // SVG props
      }),
      Animated.timing(AnimatedRegressionLineY, {
        toValue: regressionLineY2,
        duration: regressionLineConfig.animationDuration,
        easing: Easing.linear,
        useNativeDriver: false, // SVG props
      }),
    ]).start();
  }, [regressionLineConfig]);

  const decreaseWidth = useCallback(() => {
    widthValue.setValue(0);
    Animated.timing(widthValue, {
      toValue: totalWidth,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue]);

  const labelsAppear = useCallback(() => {
    opacityValue.setValue(0);
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacityValue]);

  const radiiGrow = useCallback(() => {
    if (bubblesShape === 'rectangular') return;
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, animationDuration]);

  const bubblesHeightsWidthsGrow = useCallback(() => {
    if (bubblesShape !== 'rectangular') return;
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, animationDuration]);

  const dataPointsAppear = useCallback(() => {
    pointsOpacityValue.setValue(0);
    Animated.timing(pointsOpacityValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [pointsOpacityValue]);

  useEffect(() => {
    if (isAnimated) {
      decreaseWidth();
      labelsAppear();
      dataPointsAppear();
      if (bubblesShape === 'rectangular') {
        bubblesHeightsWidthsGrow();
      } else {
        radiiGrow();
      }
    }
    if (regressionLineConfig.isAnimated) {
      drawRegressionLine();
    }
  }, [isAnimated, bubblesShape]);

  const svgHeight =
    containerHeightIncludingBelowXAxis + (props.overflowBottom ?? 0);

  // const onStripPress = (item: any, index: number) => {
  //   if (props.focusedBubbleIndex === undefined || !props.onFocus) {
  //     setSelectedIndex(index);
  //   }
  //   if (props.onFocus) {
  //     props.onFocus(item, index);
  //   }
  // };

  const renderLabel = (top: boolean, index: number, label: string) => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: top
              ? containerHeight +
                60 +
                (secondaryXAxis?.labelsDistanceFromXaxis ?? 15)
              : -xAxisTextNumberOfLines * 18 - (containerHeight - 200) / 20,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left: initialSpacing + spacing * index - spacing / 2,
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        <Text
          style={{textAlign: 'center'}}
          allowFontScaling={allowFontScaling}
          numberOfLines={xAxisTextNumberOfLines}>
          {label}
        </Text>
      </View>
    );
  };

  const renderAnimatedLabel = (top: boolean, index: number, label: string) => {
    return (
      <Animated.View
        style={[
          {
            height: rotateLabel
              ? 40
              : (props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18),
            position: 'absolute',
            bottom: top
              ? containerHeight +
                60 +
                (secondaryXAxis?.labelsDistanceFromXaxis ?? 15)
              : rotateLabel
                ? 10
                : -xAxisTextNumberOfLines * 18,
            zIndex: 10,
            width: spacing,
            left: initialSpacing + spacing * index - spacing / 2,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        <Text
          allowFontScaling={allowFontScaling}
          style={{textAlign: 'center'}}
          numberOfLines={xAxisTextNumberOfLines}>
          {label}
        </Text>
      </Animated.View>
    );
  };

  const renderDataPoints = (
    hideBubbles: any,
    dataForRender: any,
    originalDataFromProps: any,
    bubsShape: any,
    bubsWidth: any,
    bubsHeight: any,
    bubsColor: any,
    bubsRadius: any,
    labelFontSize: any,
    // textColor: any,
    // textFontSize: any,
    // textFontFamily: any,
    // textFontWeight: any,
    startIndex: any,
    endIndex: any,
    isSecondary: any,
    showValuesAsDataPointsText: any,
    key: number,
  ) => {
    const getYOrSecondaryY = getY; //isSecondary ? getSecondaryY : getY;
    return dataForRender.map((item: bubbleDataItem, index: number) => {
      if (index < startIndex || index > endIndex) return null;
      if (item.hideBubble) {
        return null;
      }
      let bubblesShape,
        bubblesWidth,
        bubblesHeight,
        dataPointsColor,
        bubblesRadius,
        text,
        customBubble,
        labelComponent;
      if (
        index === selectedIndex &&
        (focusTogether || key === selectedLineNumber)
      ) {
        bubblesShape =
          item.focusedBubbleShape ||
          props.focusedBubbleShape ||
          item.bubbleShape ||
          bubsShape;
        bubblesWidth =
          item.focusedBubbleWidth ||
          props.focusedBubbleWidth ||
          item.bubbleWidth ||
          bubsWidth;
        bubblesHeight =
          item.focusedBubbleHeight ||
          props.focusedBubbleHeight ||
          item.bubbleHeight ||
          bubsHeight;
        dataPointsColor =
          item.focusedBubbleColor ||
          props.focusedBubbleColor ||
          BubbleDefaults.focusedBubbleColor;
        bubblesRadius =
          item.focusedBubbleRadius ??
          props.focusedBubbleRadius ??
          item.r ??
          bubsRadius;
        if (showTextOnFocus) {
          text = item.label;
        }
        customBubble =
          item.focusedCustomBubble ||
          props.focusedCustomBubble ||
          item.customBubble ||
          props.customBubble;
        labelComponent =
          item.focusedLabelComponent ||
          item.labelComponent ||
          props.focusedLabelComponent ||
          props.labelComponent;
      } else {
        bubblesShape = item.bubbleShape || bubsShape;
        bubblesWidth = item.bubbleWidth || bubsWidth;
        bubblesHeight = item.bubbleHeight || bubsHeight;
        dataPointsColor = item.bubbleColor || bubsColor;
        bubblesRadius = item.r ?? bubsRadius;
        if (showTextOnFocus) {
          text = '';
        }
        customBubble = item.customBubble || props.customBubble;
        labelComponent = item.labelComponent || props.labelComponent;
      }

      if (showValuesAsDataPointsText) {
        text = originalDataFromProps[index].y;
      }

      const labelWidth = item.labelWidth
        ? item.labelWidth
        : props.labelWidth
          ? props.labelWidth
          : 30;

      const textLabel =
        !showTextOnFocus && !showValuesAsDataPointsText
          ? item.label
          : text.toString();
      const textStyle = (item.labelTextStyle ?? labelTextStyle ?? {}) as any;
      const fontSize =
        textStyle.fontSize || item.labelFontSize || labelFontSize;
      const defaultFontSize = 14;

      return (
        <Fragment key={index}>
          {focusEnabled ? (
            <>
              {key === lastLineNumber - 1 ? (
                <Rect
                  x={initialSpacing + (spacing * index - spacing / 2)}
                  y={8}
                  width={spacing}
                  height={containerHeight - 0}
                  fill={'none'}
                  onPressIn={evt => {
                    const locationY = evt.nativeEvent.locationY; // Note that we have another property named pageY which can be useful
                    handleFocus(
                      index,
                      //  item,
                      //  locationY,
                      //  onStripPress,
                    );
                  }}
                  onPressOut={handleUnFocus}
                />
              ) : null}
              {/* {unFocusOnPressOut ? ( // remove strip on onFocus
                    <Rect
                      onPressIn={(evt) => {
                        const locationY = evt.nativeEvent.locationY
                        onStripPress(item, index)
                      }}
                      onPressOut={() =>
                        setTimeout(() => setSelectedIndex(-1), delayBeforeUnFocus)
                      }
                      x={initialSpacing + (spacing * index - spacing / 2)}
                      y={8}
                      width={spacing}
                      height={containerHeight - 0}
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
                  )} */}
            </>
          ) : null}
          {/* {renderStrips(item, index, key)} // handled with strips coming from geifted-charts-core */}
          {hideBubbles ? null : (
            <>
              {customBubble ? (
                isWebApp ? (
                  <ForeignObject
                    height={svgHeight}
                    width={totalWidth}
                    x={getX(index)}
                    y={getYOrSecondaryY(item.y) - bubblesHeight / 2}>
                    {customBubble(item, index)}
                  </ForeignObject>
                ) : (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      // height: svgHeight,
                      // width: totalWidth,
                      left: getX(index) - bubblesWidth / 2,
                      top: getYOrSecondaryY(item.y) - bubblesHeight / 2,
                      opacity: isAnimated ? appearingOpacity : 1,
                    }}>
                    {customBubble(item, index)}
                  </Animated.View>
                )
              ) : null}
              {bubblesShape === 'rectangular' ? (
                <Fragment key={index}>
                  {customBubble ? null : (
                    <AnimatedRect
                      x={getX(index) - bubblesWidth / 2}
                      y={getYOrSecondaryY(item.y) - bubblesHeight / 2}
                      width={isAnimated ? growingWidth[index] : bubblesWidth}
                      height={isAnimated ? growingHeight[index] : bubblesHeight}
                      opacity={isAnimated ? appearingDataPoints : opacity}
                      fill={
                        showBubbleOnFocus
                          ? index === selectedIndex
                            ? dataPointsColor
                            : 'none'
                          : dataPointsColor
                      }
                      stroke={item.borderColor ?? borderColor}
                      strokeWidth={item.borderWidth ?? borderWidth}
                      strokeOpacity={
                        item.borderOpacity ??
                        props.borderOpacity ??
                        (isAnimated ? appearingDataPoints : opacity)
                      }
                      onPress={() => {
                        item.onPress
                          ? item.onPress(item, index)
                          : props.onPress
                            ? props.onPress(item, index)
                            : focusEnabled
                              ? handleFocus(
                                  index,
                                  //  item,
                                  //  0,
                                  //  onStripPress,
                                )
                              : null;
                      }}
                      onPressOut={() => {
                        if (!item.onPress && !props.onPress && focusEnabled) {
                          handleUnFocus();
                        }
                      }}
                    />
                  )}
                </Fragment>
              ) : (
                <Fragment key={index}>
                  {customBubble ? null : (
                    <AnimatedCircle
                      cx={getX(index)} // <-- here
                      cy={getYOrSecondaryY(item.y)}
                      r={isAnimated ? growingRadii[index] : bubblesRadius}
                      fill={
                        showBubbleOnFocus
                          ? index === selectedIndex
                            ? dataPointsColor
                            : 'none'
                          : dataPointsColor
                      }
                      opacity={isAnimated ? appearingDataPoints : opacity}
                      stroke={item.borderColor ?? borderColor}
                      strokeWidth={item.borderWidth ?? borderWidth}
                      strokeOpacity={
                        item.borderOpacity ??
                        props.borderOpacity ??
                        (isAnimated ? appearingDataPoints : opacity)
                      }
                      onPress={() => {
                        item.onPress
                          ? item.onPress(item, index)
                          : props.onPress
                            ? props.onPress(item, index)
                            : focusEnabled
                              ? handleFocus(
                                  index,
                                  //  item,
                                  //  0,
                                  //  onStripPress,
                                )
                              : null;
                      }}
                      onPressOut={() => {
                        if (!item.onPress && !props.onPress && focusEnabled) {
                          handleUnFocus();
                        }
                      }}
                    />
                  )}
                </Fragment>
              )}
              {labelComponent ? (
                !showTextOnFocus || index === selectedIndex ? (
                  isWebApp ? (
                    <ForeignObject
                      height={svgHeight}
                      width={labelWidth}
                      x={
                        initialSpacing +
                        (item.labelShiftX || props.labelShiftX || 0) -
                        labelWidth / 2 +
                        spacing * index
                      }
                      y={
                        containerHeight +
                        (item.labelShiftY || props.labelShiftY || 0) -
                        (item.y * containerHeight) / maxValue
                      }>
                      {showBubbleLabelOnFocus
                        ? index === selectedIndex &&
                          (focusTogether || key == selectedLineNumber)
                          ? labelComponent(item, index) // not pushed in latest release
                          : null
                        : labelComponent(item, index)}
                    </ForeignObject>
                  ) : (
                    <Animated.View
                      style={{
                        position: 'absolute',
                        height: svgHeight,
                        width: labelWidth,
                        left:
                          getX(index) -
                          defaultFontSize / 2 +
                          (item.labelShiftX || props.labelShiftX || 0),
                        top:
                          getYOrSecondaryY(item.y) -
                          defaultFontSize / 1.5 +
                          (item.labelShiftY || props.labelShiftY || 0),
                        opacity: isAnimated ? appearingDataPoints : 1,
                      }}>
                      {showBubbleLabelOnFocus
                        ? index === selectedIndex &&
                          (focusTogether || key == selectedLineNumber)
                          ? labelComponent(item, index) // not pushed in latest release
                          : null
                        : labelComponent(item, index)}
                    </Animated.View>
                  )
                ) : null
              ) : textLabel ? (
                !showTextOnFocus || index === selectedIndex ? (
                  <Animated.Text
                    style={{
                      ...textStyle,
                      position: 'absolute',
                      left:
                        getX(index) -
                        Math.min(
                          bubblesRadius,
                          (textLabel.length * fontSize) / 3,
                        ) +
                        (item.labelShiftX || props.labelShiftX || 0),
                      top:
                        getYOrSecondaryY(item.y) -
                        fontSize / 1.5 +
                        (item.labelShiftY || props.labelShiftY || 0),
                      fontSize,
                      opacity: isAnimated
                        ? appearingDataPoints
                        : (textStyle.opacity ?? 1),
                    }}>
                    {textLabel}
                  </Animated.Text>
                ) : null
              ) : null}
              {/* Workaround to fix the issue - focusedCustomBubble not rendering for focused data, (when both customBubble and focusedCustomBubble are used together)*/}
              {index === selectedIndex ? <Text>{''}</Text> : null}
            </>
          )}
        </Fragment>
      );
    });
  };
  const svgWrapperViewStyle = {
    position: 'absolute',
    top: 0, // 281 + xAxisLabelsVerticalShift + labelsExtraHeight - xAxisThickness,
    left: 0,
    zIndex: 1,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  };

  const renderChartContent = () => {
    return (
      <View
        style={[
          svgWrapperViewStyle as ViewStyle,
          {
            width: totalWidth,
            height: containerHeightIncludingBelowXAxis,
            //   zIndex,
          },
        ]}>
        <Svg
          height={svgHeight}
          width={totalWidth}
          onPress={props.onBackgroundPress}>
          {renderDataPoints(
            hideBubbles,
            props.data,
            props.data,
            bubblesShape,
            bubblesWidth,
            bubblesHeight,
            bubblesColor,
            bubblesRadius,
            labelFontSize,
            // textColor,
            // textFontSize,
            // textFontFamily,
            // textFontWeight,
            startIndex,
            endIndex,
            false,
            showValuesAsBubbleLabels,
            0,
          )}
          {showRegressionLine && (
            <AnimatedLine
              x1={regressionLineX1}
              y1={regressionLineY1}
              x2={
                regressionLineConfig.isAnimated
                  ? AnimatedRegressionLineX
                  : regressionLineX2
              }
              y2={
                regressionLineConfig.isAnimated
                  ? AnimatedRegressionLineY
                  : regressionLineY2
              }
              stroke={regressionLineConfig.color}
              strokeOpacity={regressionLineConfig.opacity}
              strokeWidth={regressionLineConfig.thickness}
              strokeDasharray={regressionLineConfig.strokeDashArray}
            />
          )}
        </Svg>
        {xAxisLabelTexts?.map((label: string, index: number) => {
          return (
            <View key={index}>
              {isAnimated
                ? renderAnimatedLabel(false, index, label)
                : renderLabel(false, index, label)}
              {/* {secondaryXAxis
                ? isAnimated
                  ? renderAnimatedLabel(
                      true,
                      index,
                      label
                    )
                  : renderLabel(
                      true,
                      index,
                      label
                    )
                : null} */}
            </View>
          );
        })}
      </View>
    );
  };

  const remainingScrollViewProps = {
    onScroll: (ev: any) => {
      props.onScroll?.(ev);
    },
    bounces: props.bounces,
    overScrollMode: props.overScrollMode ?? 'auto',
  };

  return (
    <BarAndLineChartsWrapper
      {...barAndLineChartsWrapperProps}
      scrollRef={scrollRef}
      animatedWidth={widthValue}
      renderChartContent={renderChartContent}
      remainingScrollViewProps={remainingScrollViewProps}
      nestedScrollEnabled={props.nestedScrollEnabled}
    />
  );
};
