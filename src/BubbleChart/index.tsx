import {
  BubbleChartPropsType,
  BubbleDefaults,
  defaultBubbleColors,
  useBubbleChart,
  withinMinMaxRange,
} from 'gifted-charts-core';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  I18nManager,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  Circle,
  ForeignObject,
  Rect,
  Svg,
  Line,
  RadialGradient,
  Stop,
  Defs,
} from 'react-native-svg';
import {isAndroid, isWebApp, screenWidth} from '../utils';
import {bubbleDataItem} from 'gifted-charts-core';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedLine = Animated.createAnimatedComponent(Line);

export const BubbleChart = (props: BubbleChartPropsType) => {
  const opacityValue = useMemo(() => new Animated.Value(0), []);
  const pointsOpacityValue = useMemo(() => new Animated.Value(0), []);
  const {
    secondaryXAxis,
    xAxisLabelTextStyle,
    formatBubbleLabel,
    regressionLinesBehindBubbles,
  } = props;
  const {
    data,
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
    labelMaxLength,
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
    borderOpacity,
    xAxisLabelTexts,
    showRegressionLine,
    regressionLineX1,
    regressionLineY1,
    regressionLineX2,
    regressionLineY2,
    regressionLineCoordinates,
    regressionLineConfig,
    regressionLineConfigs,
    scatterChart,
    maxRadius,
    minRadius,
    extraWidthDueToBubble,
    showGradient,
    centerColorForGradient,
  } = useBubbleChart({
    ...props,
    parentWidth: props.parentWidth ?? screenWidth,
  });

  const progress = useRef(new Animated.Value(0)).current;
  const AnimatedRegressionLineX = useRef(new Animated.Value(0)).current;
  const AnimatedRegressionLineY = useRef(new Animated.Value(0)).current;

  const animatedRegressionLineXValues = useMemo(
    () => regressionLineConfigs.map(() => new Animated.Value(0)),
    [regressionLineConfigs.length],
  );

  const animatedRegressionLineYValues = useMemo(
    () => regressionLineConfigs.map(() => new Animated.Value(0)),
    [regressionLineConfigs.length],
  );

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
      (data ?? []).map(item =>
        progress.interpolate({
          inputRange: [0, 1],
          outputRange: [
            0,
            withinMinMaxRange(item.r ?? bubblesRadius, maxRadius, minRadius),
          ],
        }),
      ),
    [data, progress],
  );

  const growingHeight = (data ?? []).map((_, i) =>
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, data?.[i].bubbleHeight ?? bubblesHeight],
    }),
  );

  const growingWidth = (data ?? []).map((_, i) =>
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, data?.[i].bubbleWidth ?? bubblesWidth],
    }),
  );

  const appearingDataPoints = pointsOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity],
  });

  const appearingDataPointsAndroid = pointsOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity / 2], // hack to show slightly transparent bubbles while animating, as gradient on Android can't be animated
  });

  const appearingBorder = pointsOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, borderOpacity],
  });

  const drawRegressionLine = useCallback(() => {
    const hasMultipleRegressionLines = regressionLineConfigs.length > 0;

    if (hasMultipleRegressionLines) {
      const animations: Animated.CompositeAnimation[] = [];

      regressionLineConfigs.forEach((config, index) => {
        if (!config.isAnimated) {
          return;
        }

        const coordinates = regressionLineCoordinates[index];

        if (!coordinates) {
          return;
        }

        const {
          regressionLineX1: x1,
          regressionLineX2: x2,
          regressionLineY1: y1,
          regressionLineY2: y2,
        } = coordinates;

        const animatedX = animatedRegressionLineXValues[index];
        const animatedY = animatedRegressionLineYValues[index];

        if (!animatedX || !animatedY) {
          return;
        }

        animatedX.setValue(x1);
        animatedY.setValue(y1);

        animations.push(
          Animated.timing(animatedX, {
            toValue: x2,
            duration: config.animationDuration,
            easing: Easing.linear,
            useNativeDriver: false, // SVG props
          }),
        );

        animations.push(
          Animated.timing(animatedY, {
            toValue: y2,
            duration: config.animationDuration,
            easing: Easing.linear,
            useNativeDriver: false, // SVG props
          }),
        );
      });

      if (animations.length) {
        Animated.parallel(animations).start();
      }

      return;
    }

    if (!regressionLineConfig.isAnimated) {
      return;
    }

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
  }, [
    regressionLineConfig,
    regressionLineX1,
    regressionLineX2,
    regressionLineY1,
    regressionLineY2,
    // regressionLineConfigs,
    regressionLineCoordinates,
    animatedRegressionLineXValues,
    animatedRegressionLineYValues,
  ]);

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

  const [isAnimationOver, setIsAnimationOver] = useState(false);

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
      if (isAndroid) {
        setTimeout(() => {
          setIsAnimationOver(true);
        }, animationDuration + 20);
      }
    }
    const hasAnimatedRegressionLine =
      regressionLineConfig.isAnimated ||
      regressionLineConfigs.some(config => config.isAnimated);

    if (hasAnimatedRegressionLine) {
      drawRegressionLine();
    }
  }, [
    isAnimated,
    bubblesShape,
    regressionLineConfig.isAnimated,
    // regressionLineConfigs,
    // drawRegressionLine,
  ]);

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
    const left = index
      ? initialSpacing + spacing * index - spacing / 2
      : initialSpacing / 2;
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: top
              ? containerHeight +
                60 +
                (secondaryXAxis?.labelsDistanceFromXaxis ?? 15)
              : -xAxisTextNumberOfLines * 18 - (containerHeight - 200) / 20 - 4,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left,
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        <Text
          style={[{textAlign: index ? 'center' : 'left'}, xAxisLabelTextStyle]}
          allowFontScaling={allowFontScaling}
          numberOfLines={xAxisTextNumberOfLines}>
          {label}
        </Text>
      </View>
    );
  };

  const renderAnimatedLabel = (top: boolean, index: number, label: string) => {
    const left = index
      ? initialSpacing + spacing * index - spacing / 2
      : initialSpacing / 2;
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
                : -xAxisTextNumberOfLines * 18 - 4,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        <Text
          allowFontScaling={allowFontScaling}
          style={[{textAlign: index ? 'center' : 'left'}, xAxisLabelTextStyle]}
          numberOfLines={xAxisTextNumberOfLines}>
          {label}
        </Text>
      </Animated.View>
    );
  };

  const renderBubbles = (
    hideBubbles: any,
    dataForRender: any,
    originalDataFromProps: any,
    bubsShape: any,
    bubsWidth: any,
    bubsHeight: any,
    bubsColor: any,
    bubsRadius: any,
    labelFontSize: any,
    startIndex: any,
    endIndex: any,
    isSecondary: any,
    showValuesAsDataPointsText: any,
    key: number,
  ) => {
    const getYOrSecondaryY = getY; //isSecondary ? getSecondaryY : getY;
    return dataForRender.map((item: bubbleDataItem, index: number) => {
      // if (index < startIndex || index > endIndex) return null;
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
        bubblesRadius = withinMinMaxRange(
          item.focusedBubbleRadius ??
            props.focusedBubbleRadius ??
            item.r ??
            bubsRadius,
          maxRadius,
          minRadius,
        );
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
        dataPointsColor =
          item.bubbleColor ||
          bubsColor ||
          defaultBubbleColors[index % defaultBubbleColors.length];
        bubblesRadius = withinMinMaxRange(
          item.r ?? bubsRadius,
          maxRadius,
          minRadius,
        );
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
      let formattedTextLabel = textLabel
        ? (formatBubbleLabel?.(textLabel) ?? textLabel)
        : '';
      if (formattedTextLabel.length > labelMaxLength) {
        formattedTextLabel =
          formattedTextLabel.slice(0, labelMaxLength - 3) + '...';
      }
      const textStyle = (item.labelTextStyle ?? labelTextStyle ?? {}) as any;
      const fontSize =
        textStyle.fontSize || item.labelFontSize || labelFontSize;
      const defaultFontSize = 14;

      const fillColorForAnimatedGradientOnAndroid = isAnimationOver
        ? `url(#radial${index})`
        : dataPointsColor;

      const localBorderColor =
        item.borderColor ??
        borderColor ??
        defaultBubbleColors[index % defaultBubbleColors.length];

      const bubbleKey = `${key}-${item.indexUsedInDevForDataSet ?? ''}-${
        item.label ?? ''
      }-${index}`;

      return (
        <Fragment key={bubbleKey}>
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
                    x={getX(item.indexUsedInDevForDataSet ?? index, index)}
                    y={getYOrSecondaryY(item.y) - bubblesHeight / 2}>
                    {customBubble(item, index)}
                  </ForeignObject>
                ) : (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      // height: svgHeight,
                      // width: totalWidth,
                      left:
                        getX(item.indexUsedInDevForDataSet ?? index, index) -
                        bubblesWidth / 2,
                      top: getYOrSecondaryY(item.y) - bubblesHeight / 2,
                      opacity: isAnimated ? appearingOpacity : 1,
                    }}>
                    {customBubble(item, index)}
                  </Animated.View>
                )
              ) : null}
              {bubblesShape === 'rectangular' ? (
                <Fragment key={`rectBub-${index}`}>
                  {customBubble ? null : (
                    <AnimatedRect
                      x={
                        getX(item.indexUsedInDevForDataSet ?? index, index) -
                        bubblesWidth / 2
                      }
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
                      fillOpacity={isAnimated ? appearingDataPoints : opacity}
                      stroke={localBorderColor}
                      strokeWidth={item.borderWidth ?? borderWidth}
                      strokeOpacity={
                        item.borderOpacity ??
                        props.borderOpacity ??
                        (isAnimated ? appearingBorder : borderOpacity)
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
                <Fragment key={`bubble-${index}`}>
                  {customBubble ? null : (
                    <AnimatedCircle
                      cx={getX(item.indexUsedInDevForDataSet ?? index, index)} // <-- here
                      cy={getYOrSecondaryY(item.y)}
                      r={isAnimated ? growingRadii[index] : bubblesRadius}
                      fill={
                        (item.showGradient ?? showGradient)
                          ? isAndroid && isAnimated
                            ? fillColorForAnimatedGradientOnAndroid
                            : `url(#radial${index})`
                          : dataPointsColor
                      }
                      fillOpacity={
                        isAnimated
                          ? isAndroid && showGradient
                            ? isAnimationOver
                              ? opacity
                              : appearingDataPointsAndroid
                            : appearingDataPoints
                          : opacity
                      }
                      stroke={localBorderColor}
                      strokeWidth={item.borderWidth ?? borderWidth}
                      strokeOpacity={
                        item.borderOpacity ??
                        props.borderOpacity ??
                        (isAnimated ? appearingBorder : borderOpacity)
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
                      width={totalWidth}
                      x={
                        getX(item.indexUsedInDevForDataSet ?? index, index) -
                        labelWidth / 2 +
                        6 +
                        (item.labelShiftX || props.labelShiftX || 0)
                      }
                      y={
                        getYOrSecondaryY(item.y) -
                        10 +
                        (item.labelShiftY || props.labelShiftY || 0) -
                        (scatterChart ? bubblesRadius + 10 : 0)
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
                          getX(item.indexUsedInDevForDataSet ?? index, index) -
                          defaultFontSize / 2 +
                          (item.labelShiftX || props.labelShiftX || 0),
                        top:
                          getYOrSecondaryY(item.y) -
                          defaultFontSize / 1.5 +
                          (item.labelShiftY || props.labelShiftY || 0) -
                          (scatterChart ? bubblesRadius + 10 : 0),
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
              ) : formattedTextLabel ? (
                !showTextOnFocus || index === selectedIndex ? (
                  isWebApp ? (
                    <ForeignObject
                      height={svgHeight}
                      width={totalWidth}
                      x={
                        getX(item.indexUsedInDevForDataSet ?? index, index) -
                        (formattedTextLabel.length * fontSize) / 4 +
                        (item.labelShiftX || props.labelShiftX || 0)
                      }
                      y={
                        getYOrSecondaryY(item.y) -
                        Math.max(10, fontSize / 1.5) +
                        (item.labelShiftY || props.labelShiftY || 0) -
                        (scatterChart ? bubblesRadius + 10 : 0)
                      }>
                      <Text
                        style={{
                          ...textStyle,
                          fontSize,
                        }}>
                        {formattedTextLabel}
                      </Text>
                    </ForeignObject>
                  ) : (
                    <Animated.Text
                      style={{
                        ...textStyle,
                        position: 'absolute',
                        left:
                          getX(item.indexUsedInDevForDataSet ?? index, index) -
                          (formattedTextLabel.length * fontSize) / 4 +
                          (item.labelShiftX || props.labelShiftX || 0),
                        top:
                          getYOrSecondaryY(item.y) -
                          fontSize / 1.5 +
                          (item.labelShiftY || props.labelShiftY || 0) -
                          (scatterChart ? bubblesRadius + 10 : 0),
                        fontSize,
                        opacity: isAnimated
                          ? appearingDataPoints
                          : (textStyle.opacity ?? 1),
                      }}>
                      {formattedTextLabel}
                    </Animated.Text>
                  )
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
    top: xAxisLabelsVerticalShift, // 281 + xAxisLabelsVerticalShift + labelsExtraHeight - xAxisThickness,
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
            width: totalWidth + extraWidthDueToBubble,
            height: containerHeightIncludingBelowXAxis,
            //   zIndex,
          },
        ]}>
        <Svg
          height={svgHeight}
          width={totalWidth + extraWidthDueToBubble}
          onPress={props.onBackgroundPress}>
          {showGradient && (
            <Defs>
              {data?.map((item, index) => {
                const gradientKey = `radial-gradient-${
                  item.indexUsedInDevForDataSet ?? ''
                }-${item.label ?? ''}-${index}`;
                return (
                  <RadialGradient
                    key={gradientKey}
                    id={`radial${index}`}
                    cx="50%"
                    cy="50%"
                    r="50%">
                    <Stop
                      offset="0%"
                      stopColor={
                        item.centerColorForGradient ?? centerColorForGradient
                      }
                    />
                    <Stop
                      offset="100%"
                      stopColor={
                        item.bubbleColor ||
                        bubblesColor ||
                        defaultBubbleColors[index % defaultBubbleColors.length]
                      }
                    />
                  </RadialGradient>
                );
              })}
            </Defs>
          )}
          {!regressionLinesBehindBubbles
            ? renderBubbles(
                hideBubbles,
                data,
                data,
                bubblesShape,
                bubblesWidth,
                bubblesHeight,
                bubblesColor,
                bubblesRadius,
                labelFontSize,
                startIndex,
                endIndex,
                false,
                showValuesAsBubbleLabels,
                0,
              )
            : null}
          {regressionLineConfigs.length ? (
            regressionLineConfigs.map((config, index) => {
              const {
                regressionLineX1,
                regressionLineX2,
                regressionLineY1,
                regressionLineY2,
              } = regressionLineCoordinates[index];
              const animatedX = animatedRegressionLineXValues[index];
              const animatedY = animatedRegressionLineYValues[index];
              return (
                <AnimatedLine
                  x1={regressionLineX1}
                  y1={regressionLineY1}
                  x2={
                    config.isAnimated
                      ? (animatedX ?? regressionLineX2)
                      : regressionLineX2
                  }
                  y2={
                    config.isAnimated
                      ? (animatedY ?? regressionLineY2)
                      : regressionLineY2
                  }
                  stroke={config.color}
                  strokeOpacity={config.opacity}
                  strokeWidth={config.thickness}
                  strokeDasharray={config.strokeDashArray}
                />
              );
            })
          ) : showRegressionLine ? (
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
          ) : null}
          {regressionLinesBehindBubbles
            ? renderBubbles(
                hideBubbles,
                data,
                data,
                bubblesShape,
                bubblesWidth,
                bubblesHeight,
                bubblesColor,
                bubblesRadius,
                labelFontSize,
                startIndex,
                endIndex,
                false,
                showValuesAsBubbleLabels,
                0,
              )
            : null}
        </Svg>
        {xAxisLabelTexts?.map((label: string, index: number) => {
          const labelKey = `${label}-${index}`;
          return (
            <View key={labelKey}>
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
