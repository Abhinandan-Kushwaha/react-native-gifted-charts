import {Fragment, useCallback, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
  Dimensions,
  ColorValue,
  I18nManager,
  ViewStyle,
} from 'react-native';
import {screenWidth, usePrevious} from '../utils';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
  Line,
  ClipPath,
  Use,
  ForeignObject,
} from 'react-native-svg';
import {
  getSegmentedPathObjects,
  getRegionPathObjects,
  RANGE_ENTER,
  RANGE_EXIT,
  SEGMENT_END,
  SEGMENT_START,
  STOP,
  LineChartPropsType,
  lineDataItem,
  LineSvgProps,
  useLineChart,
  adjustToOffset,
  LineProperties,
  LineDefaults,
  pointsWithPaddedRepititions,
  lineDataItemNullSafe,
  Linecap,
} from 'gifted-charts-core';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {StripAndLabel} from '../Components/common/StripAndLabel';
import {Pointer} from '../Components/common/Pointer';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const LineChart = (props: LineChartPropsType) => {
  const scrollRef = props.scrollRef ?? useRef(null);
  const opacityValue = useMemo(() => new Animated.Value(0), []);
  // const heightValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const widthValue2 = useMemo(() => new Animated.Value(0), []);
  const widthValue3 = useMemo(() => new Animated.Value(0), []);
  const widthValue4 = useMemo(() => new Animated.Value(0), []);
  const widthValue5 = useMemo(() => new Animated.Value(0), []);

  const {
    curveType,
    scrollX,
    setScrollX,
    arrow1Points,
    arrow2Points,
    arrow3Points,
    arrow4Points,
    arrow5Points,
    secondaryArrowPoints,
    pointerIndex,
    setPointerIndex,
    pointerX,
    setPointerX,
    pointerY,
    setPointerY,
    pointerItem,
    setPointerItem,
    pointerY2,
    setPointerY2,
    pointerItem2,
    setPointerItem2,
    pointerY3,
    setPointerY3,
    pointerItem3,
    setPointerItem3,
    pointerY4,
    setPointerY4,
    pointerItem4,
    setPointerItem4,
    pointerY5,
    setPointerY5,
    pointerYsForDataSet,
    setPointerYsForDataSet,
    pointerItem5,
    setPointerItem5,
    secondaryPointerY,
    setSecondaryPointerY,
    secondaryPointerItem,
    setSecondaryPointerItem,
    pointerItemsForSet,
    setPointerItemsForSet,
    secondaryPointerItemsForSet,
    setSecondaryPointerItemsForSet,
    responderStartTime,
    setResponderStartTime,
    setResponderActive,
    points,
    points2,
    points3,
    points4,
    points5,
    secondaryPoints,
    fillPoints,
    fillPoints2,
    fillPoints3,
    fillPoints4,
    fillPoints5,
    secondaryFillPoints,
    pointsFromSet,
    fillPointsFromSet,
    arrowPointsFromSet,
    selectedIndex,
    setSelectedIndex,
    containerHeight,
    data,
    data2,
    data3,
    data4,
    data5,
    secondaryData,
    dataSet,
    data0,
    labelsExtraHeight,
    animationDuration,
    onDataChangeAnimationDuration,
    animateTogether,
    renderDataPointsAfterAnimationEnds,
    animateOnDataChange,
    startIndex1,
    startIndex2,
    endIndex1,
    endIndex2,
    startIndex3,
    endIndex3,
    startIndex4,
    endIndex4,
    startIndex5,
    endIndex5,
    initialSpacing,
    thickness,
    yAxisLabelWidth,
    spacing,
    xAxisThickness,
    dataPointsHeight1,
    dataPointsWidth1,
    dataPointsRadius1,
    dataPointsColor1,
    dataPointsShape1,
    dataPointsHeight2,
    dataPointsWidth2,
    dataPointsRadius2,
    dataPointsColor2,
    dataPointsShape2,
    dataPointsHeight3,
    dataPointsWidth3,
    dataPointsRadius3,
    dataPointsColor3,
    dataPointsShape3,
    dataPointsHeight4,
    dataPointsWidth4,
    dataPointsRadius4,
    dataPointsColor4,
    dataPointsShape4,
    dataPointsHeight5,
    dataPointsWidth5,
    dataPointsRadius5,
    dataPointsColor5,
    dataPointsShape5,
    getIsNthAreaChart,
    textFontSize1,
    textFontSize2,
    textFontSize3,
    textFontSize4,
    textFontSize5,
    textColor1,
    textColor2,
    textColor3,
    textColor4,
    textColor5,
    totalWidth,
    maxValue,
    overflowTop,
    extendedContainerHeight,
    getX,
    getY,
    getSecondaryY,
    secondaryMaxValue,
    showValuesAsDataPointsText,
    thickness1,
    thickness2,
    thickness3,
    thickness4,
    thickness5,
    zIndex1,
    zIndex2,
    zIndex3,
    zIndex4,
    zIndex5,
    strokeDashArray1,
    strokeDashArray2,
    strokeDashArray3,
    strokeDashArray4,
    strokeDashArray5,
    strokeLinecap1,
    strokeLinecap2,
    strokeLinecap3,
    strokeLinecap4,
    strokeLinecap5,
    rotateLabel,
    isAnimated,
    hideDataPoints1,
    hideDataPoints2,
    hideDataPoints3,
    hideDataPoints4,
    hideDataPoints5,
    color1,
    color2,
    color3,
    color4,
    color5,
    startFillColor1,
    endFillColor1,
    startOpacity1,
    endOpacity1,
    startFillColor2,
    endFillColor2,
    startOpacity2,
    endOpacity2,
    startFillColor3,
    endFillColor3,
    startOpacity3,
    endOpacity3,
    startFillColor4,
    endFillColor4,
    startOpacity4,
    endOpacity4,
    startFillColor5,
    endFillColor5,
    startOpacity5,
    endOpacity5,
    arrowStrokeWidth1,
    arrowStrokeColor1,
    arrowFillColor1,
    arrowStrokeWidth2,
    arrowStrokeColor2,
    arrowFillColor2,
    arrowStrokeWidth3,
    arrowStrokeColor3,
    arrowFillColor3,
    arrowStrokeWidth4,
    arrowStrokeColor4,
    arrowFillColor4,
    arrowStrokeWidth5,
    arrowStrokeColor5,
    arrowFillColor5,
    arrowStrokeWidthsFromSet,
    arrowStrokeColorsFromSet,
    arrowFillColorsFromSet,
    secondaryLineConfig,
    gradientDirection,
    stepHeight,
    noOfSectionsBelowXAxis,
    xAxisTextNumberOfLines,
    xAxisLabelsVerticalShift,
    pointerConfig,
    pointerHeight,
    pointerWidth,
    pointerRadius,
    pointerColor,
    pointerComponent,
    showPointerStrip,
    pointerStripHeight,
    pointerStripWidth,
    pointerStripColor,
    pointerStripUptoDataPoint,
    pointerLabelComponent,
    stripOverPointer,
    shiftPointerLabelX,
    shiftPointerLabelY,
    pointerLabelWidth,
    pointerLabelHeight,
    autoAdjustPointerLabelPosition,
    pointerVanishDelay,
    activatePointersOnLongPress,
    activatePointersInstantlyOnTouch,
    activatePointersDelay,
    persistPointer,
    resetPointerIndexOnRelease,
    hidePointers,
    hidePointer1,
    hidePointer2,
    hidePointer3,
    hidePointer4,
    hidePointer5,
    cumulativeSpacing1,
    cumulativeSpacing2,
    cumulativeSpacing3,
    cumulativeSpacing4,
    cumulativeSpacing5,
    cumulativeSpacingSecondary,
    cumulativeSpacingForSet,
    hideSecondaryPointer,
    hidePointerDataPointForMissingValues,
    pointerEvents,
    focusEnabled,
    showDataPointOnFocus,
    showStripOnFocus,
    stripOverDataPoints,
    showTextOnFocus,
    showDataPointLabelOnFocus,
    stripHeight,
    stripWidth,
    stripColor,
    stripOpacity,
    stripStrokeDashArray,
    containerHeightIncludingBelowXAxis = 0,
    lineGradient,
    lineGradientDirection,
    lineGradientStartColor,
    lineGradientEndColor,
    barAndLineChartsWrapperProps,
    areaChart,
    mostNegativeValue,
    strips,
    lastLineNumber,
    focusTogether,
    selectedLineNumber,
    handleFocus,
    handleUnFocus,
    stepValue,
    pointerItemLocal,
  } = useLineChart({
    ...props,
    parentWidth: props.parentWidth ?? screenWidth,
  });

  const svgHeight =
    containerHeightIncludingBelowXAxis +
    (props.overflowBottom ?? dataPointsRadius1);

  const {secondaryXAxis, intersectionAreaConfig} = props;

  const widthValuesFromSet = useMemo(
    () => dataSet?.map(set => new Animated.Value(0)),
    [],
  );

  const animatedPoints = new Animated.Value(0);
  const animatedFillPoints = new Animated.Value(0);
  const oldPoints = usePrevious(points);
  const oldFillPoints = usePrevious(fillPoints);

  const animatedPath =
    animateOnDataChange && points && oldPoints && points !== oldPoints
      ? animatedPoints.interpolate({
          inputRange: [0, 1],
          outputRange: pointsWithPaddedRepititions(oldPoints, points),
        })
      : '';

  const animatedFillPath =
    animateOnDataChange &&
    fillPoints &&
    oldFillPoints &&
    fillPoints !== oldFillPoints
      ? animatedFillPoints.interpolate({
          inputRange: [0, 1],
          outputRange: pointsWithPaddedRepititions(oldFillPoints, fillPoints),
        })
      : '';

  useEffect(() => {
    if (animateOnDataChange) {
      Animated.timing(animatedPoints, {
        toValue: 1,
        duration: onDataChangeAnimationDuration,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();

      if (props.areaChart || props.areaChart1) {
        Animated.timing(animatedFillPoints, {
          toValue: 1,
          duration: onDataChangeAnimationDuration,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start();
      }
    }
  }, [animatedPoints]);

  const labelsAppear = useCallback(() => {
    opacityValue.setValue(0);
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacityValue]);

  const appearingOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const decreaseWidth = useCallback(() => {
    widthValue.setValue(0);
    Animated.timing(widthValue, {
      toValue: totalWidth,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue]);

  const decreaseWidth2 = useCallback(() => {
    widthValue2.setValue(0);
    Animated.timing(widthValue2, {
      toValue: totalWidth,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue2]);

  const decreaseWidth3 = useCallback(() => {
    widthValue3.setValue(0);
    Animated.timing(widthValue3, {
      toValue: totalWidth,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue3]);

  const decreaseWidth4 = useCallback(() => {
    widthValue4.setValue(0);
    Animated.timing(widthValue4, {
      toValue: totalWidth,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue4]);

  const decreaseWidth5 = useCallback(() => {
    widthValue5.setValue(0);
    Animated.timing(widthValue5, {
      toValue: totalWidth,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue5]);

  const decreaseWidthsFromSet = useCallback(() => {
    dataSet?.map((set, index) => {
      widthValuesFromSet?.[index]?.setValue(0);
      if (widthValuesFromSet?.[index]) {
        Animated.timing(widthValuesFromSet?.[index], {
          toValue: totalWidth,
          duration: animationDuration,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }
    });
  }, [animationDuration, widthValuesFromSet]);

  useEffect(() => {
    decreaseWidth();
    labelsAppear();
    widthValuesFromSet?.forEach((item: any, index: number) => {
      setTimeout(
        () => {
          decreaseWidthsFromSet();
        },
        animateTogether ? 0 : animationDuration * index,
      );
    });
    setTimeout(
      () => {
        decreaseWidth2();
      },
      animateTogether ? 0 : animationDuration,
    );
    setTimeout(
      () => {
        decreaseWidth3();
      },
      animateTogether ? 0 : animationDuration * 2,
    );
    setTimeout(
      () => {
        decreaseWidth4();
      },
      animateTogether ? 0 : animationDuration * 3,
    );
    setTimeout(
      () => {
        decreaseWidth5();
      },
      animateTogether ? 0 : animationDuration * 4,
    );
  }, [
    animateTogether,
    animationDuration,
    decreaseWidth,
    decreaseWidth2,
    decreaseWidth3,
    decreaseWidth4,
    decreaseWidth5,
    labelsAppear,
  ]);

  const svgWrapperViewStyle = {
    position: 'absolute',
    bottom: 61 + xAxisLabelsVerticalShift + labelsExtraHeight - xAxisThickness,
    left: 0,
    zIndex: 1,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  };

  const renderLabel = (
    top: boolean,
    index: number,
    label: string,
    labelTextStyle: any,
    labelComponent: Function | undefined,
  ) => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: top
              ? containerHeight +
                60 +
                (secondaryXAxis?.labelsDistanceFromXaxis ?? 15)
              : 54 - xAxisTextNumberOfLines * 18,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left:
              index === 0 && initialSpacing < 10
                ? initialSpacing / 2 + spacing * index - spacing / 2 + 4
                : initialSpacing / 2 + spacing * index - spacing / 2 - 10,
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={[{textAlign: 'center'}, labelTextStyle]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (
    top: boolean,
    index: number,
    label: string,
    labelTextStyle: any,
    labelComponent: Function | undefined,
  ) => {
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
                : 54 - xAxisTextNumberOfLines * 18,
            zIndex: 10,
            width: spacing,
            left:
              index === 0 && initialSpacing < 10
                ? initialSpacing / 2 + spacing * index - spacing / 2 + 4
                : initialSpacing / 2 + spacing * index - spacing / 2 - 10,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={[{textAlign: 'center'}, labelTextStyle]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label}
          </Text>
        )}
      </Animated.View>
    );
  };

  const onStripPress = (item: any, index: number) => {
    if (props.focusedDataPointIndex === undefined || !props.onFocus) {
      setSelectedIndex(index);
    }
    if (props.onFocus) {
      props.onFocus(item, index);
    }
  };

  // const [selectedLineNumber, setSelectedLineNumber] = useState(-1);

  const renderDataPoints = (
    hideDataPoints: any,
    dataForRender: any,
    originalDataFromProps: any,
    dataPtsShape: any,
    dataPtsWidth: any,
    dataPtsHeight: any,
    dataPtsColor: any,
    dataPtsRadius: any,
    textColor: any,
    textFontSize: any,
    startIndex: any,
    endIndex: any,
    isSecondary: any,
    showValuesAsDataPointsText: any,
    spacingArray: number[],
    key: number,
  ) => {
    const getYOrSecondaryY = isSecondary ? getSecondaryY : getY;
    return dataForRender.map((item: lineDataItemNullSafe, index: number) => {
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
      if (
        index === selectedIndex &&
        (focusTogether || key === selectedLineNumber)
      ) {
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
          item.focusedDataPointColor ||
          props.focusedDataPointColor ||
          LineDefaults.focusedDataPointColor;
        dataPointsRadius =
          item.focusedDataPointRadius ??
          props.focusedDataPointRadius ??
          item.dataPointRadius ??
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
          item.focusedDataPointLabelComponent ||
          item.dataPointLabelComponent ||
          props.focusedDataPointLabelComponent ||
          props.dataPointLabelComponent;
      } else {
        dataPointsShape = item.dataPointShape || dataPtsShape;
        dataPointsWidth = item.dataPointWidth || dataPtsWidth;
        dataPointsHeight = item.dataPointHeight || dataPtsHeight;
        dataPointsColor = item.dataPointColor || dataPtsColor;
        dataPointsRadius = item.dataPointRadius ?? dataPtsRadius;
        if (showTextOnFocus) {
          text = '';
        }
        customDataPoint = item.customDataPoint || props.customDataPoint;
        dataPointLabelComponent =
          item.dataPointLabelComponent || props.dataPointLabelComponent;
      }

      if (showValuesAsDataPointsText) {
        text = originalDataFromProps[index].value;
      }

      const dataPointLabelWidth = item.dataPointLabelWidth
        ? item.dataPointLabelWidth
        : props.dataPointLabelWidth
          ? props.dataPointLabelWidth
          : 30;

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
                    handleFocus(index, item, locationY, onStripPress);
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
          {hideDataPoints ? null : (
            <>
              {customDataPoint ? (
                (() => {
                  try {
                    // Calculate absolute position
                    const xPos = initialSpacing - dataPointsWidth / 2 + 
                      (spacingArray[index - 1] ?? 0);
                    const yPos = getYOrSecondaryY(item.value) - dataPointsHeight / 2;
                    
                    // If item.value is not a valid number, return null without calling customDataPoint
                    if (typeof item.value !== 'number' || isNaN(item.value)) {
                      console.warn("LineChart invalid data point value:", item.value, "index:", index);
                      return null;
                    }
                    
                    // Use React Native View
                    const customPointWrapperStyle = {
                      position: 'absolute',
                      left: xPos,
                      top: yPos,
                      zIndex: 10,
                      width: dataPointsWidth,
                      height: dataPointsHeight
                    };
                    
                    // Execute custom data point rendering
                    const result = customDataPoint(item, index);
                    
                    // If result is invalid, use default rendering
                    if (!result) {
                      console.warn("customDataPoint returned invalid result");
                      return null;
                    }
                    
                    // Wrap in View for rendering
                    return (
                      <View style={customPointWrapperStyle}>
                        {result}
                      </View>
                    );
                  } catch (error) {
                    console.error("customDataPoint rendering error:", error);
                    return null;
                  }
                })()
              ) : null}
              {dataPointsShape === 'rectangular' ? (
                <Fragment key={index}>
                  {customDataPoint ? null : (
                    <Rect
                      x={getX(spacingArray, index) - dataPointsWidth / 2}
                      y={getYOrSecondaryY(item.value) - dataPointsHeight / 2}
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
                            : focusEnabled
                              ? handleFocus(index, item, 0, onStripPress)
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
                  {customDataPoint ? null : (
                    <Circle
                      cx={getX(spacingArray, index)}
                      cy={getYOrSecondaryY(item.value)}
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
                            : focusEnabled
                              ? handleFocus(index, item, 0, onStripPress)
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
              {dataPointLabelComponent ? (
                !showTextOnFocus || index === selectedIndex ? (
                  (() => {
                    try {
                      const xPos = initialSpacing +
                        (item.dataPointLabelShiftX ||
                          props.dataPointLabelShiftX ||
                          0) -
                        dataPointLabelWidth / 2 +
                        spacing * index;
                        
                      const yPos = containerHeight +
                        (item.dataPointLabelShiftY ||
                          props.dataPointLabelShiftY ||
                          0) -
                        (item.value * containerHeight) / maxValue;
                      
                      const labelWrapperStyle = {
                        position: 'absolute',
                        left: xPos,
                        top: yPos,
                        width: dataPointLabelWidth,
                        zIndex: 10
                      };
                      
                      const labelContent = showDataPointLabelOnFocus
                        ? index === selectedIndex &&
                          (focusTogether || key == selectedLineNumber)
                          ? dataPointLabelComponent(item, index)
                          : null
                        : dataPointLabelComponent(item, index);
                        
                      if (!labelContent) return null;
                      
                      return (
                        <View style={labelWrapperStyle}>
                          {labelContent}
                        </View>
                      );
                    } catch (error) {
                      console.error("dataPointLabelComponent rendering error:", error);
                      return null;
                    }
                  })()
                ) : null
              ) : text || item.dataPointText ? (
                !showTextOnFocus || index === selectedIndex ? (
                  <CanvasText
                    fill={item.textColor || textColor}
                    fontSize={item.textFontSize || textFontSize}
                    x={
                      getX(spacingArray, index) -
                      dataPointsWidth +
                      (item.textShiftX || props.textShiftX || 0)
                    }
                    y={
                      getYOrSecondaryY(item.value) -
                      dataPointsHeight / 2 +
                      (item.textShiftY || props.textShiftY || 0)
                    }>
                    {!showTextOnFocus && !showValuesAsDataPointsText
                      ? item.dataPointText
                      : text}
                  </CanvasText>
                ) : null
              ) : null}
              {/* Workaround to fix the issue - focusedCustomDataPoint not rendering for focused data, (when bot customDataPoint and focusedCustomDataPoint are used together)*/}
              {index === selectedIndex ? <Text>{''}</Text> : null}
            </>
          )}
        </Fragment>
      );
    });
  };

  const renderSpecificVerticalLines = (
    dataForRender: any,
    spacingArray: number[],
  ) => {
    return dataForRender.map((item: lineDataItemNullSafe, index: number) => {
      if (item.showVerticalLine) {
        const x = getX(spacingArray, index);
        return (
          <Line
            key={index}
            x1={x}
            y1={extendedContainerHeight}
            x2={x}
            y2={
              item.verticalLineHeight
                ? extendedContainerHeight - item.verticalLineHeight
                : props.verticalLinesHeight
                  ? extendedContainerHeight - props.verticalLinesHeight
                  : (item.verticalLineUptoDataPoint ??
                      props.verticalLinesUptoDataPoint)
                    ? getY(item.value)
                    : -xAxisThickness
            }
            stroke={
              item.verticalLineColor || props.verticalLinesColor || 'lightgray'
            }
            strokeWidth={
              item.verticalLineThickness || props.verticalLinesThickness || 2
            }
            strokeDasharray={
              item.verticalLineStrokeDashArray ??
              props.verticalLinesStrokeDashArray ??
              ''
            }
          />
        );
      }
      return null;
    });
  };

  const renderPointer = (lineNumber: number, isDataSet?: boolean) => {
    if (hidePointers) return;
    if (isDataSet) {
      let pointerItemLocal, pointerYLocal, pointerColorLocal;
      return dataSet?.map((set, index) => {
        const pIndex = barAndLineChartsWrapperProps.pointerIndex;
        pointerItemLocal = set.data[pIndex];
        if (set.hidePointers || pointerItemLocal?.hidePointer) return null;
        if (
          hidePointerDataPointForMissingValues &&
          typeof pointerItemLocal.value !== 'number'
        )
          return null;
        pointerYLocal = pointerYsForDataSet[index];
        pointerColorLocal =
          pointerConfig?.pointerColorsForDataSet?.[index] ?? pointerColor;
        return (
          <Fragment key={'dSetPts' + index}>
            {Pointer({
              pointerX,
              pointerYLocal: pointerYLocal + xAxisThickness,
              pointerComponent,
              pointerHeight,
              pointerRadius,
              pointerWidth,
              pointerItemLocal,
              pointerColorLocal,
              pointerIndex: pIndex,
            })}
          </Fragment>
        );
      });
    }
    if (lineNumber === 1 && hidePointer1) return;
    if (lineNumber === 2 && hidePointer2) return;
    if (lineNumber === 3 && hidePointer3) return;
    if (lineNumber === 4 && hidePointer4) return;
    if (lineNumber === 5 && hidePointer5) return;
    // 6666 is for secondaryData
    if (lineNumber === 6666 && hideSecondaryPointer) return;

    let pointerItemLocal, pointerYLocal, pointerColorLocal;
    switch (lineNumber) {
      case 1:
        pointerItemLocal = pointerItem;
        pointerYLocal = pointerY;
        pointerColorLocal = pointerConfig?.pointer1Color || pointerColor;
        break;
      case 2:
        pointerItemLocal = pointerItem2;
        pointerYLocal = pointerY2;
        pointerColorLocal = pointerConfig?.pointer2Color || pointerColor;
        break;
      case 3:
        pointerItemLocal = pointerItem3;
        pointerYLocal = pointerY3;
        pointerColorLocal = pointerConfig?.pointer3Color || pointerColor;
        break;
      case 4:
        pointerItemLocal = pointerItem4;
        pointerYLocal = pointerY4;
        pointerColorLocal = pointerConfig?.pointer4Color || pointerColor;
        break;
      case 5:
        pointerItemLocal = pointerItem5;
        pointerYLocal = pointerY5;
        pointerColorLocal = pointerConfig?.pointer5Color || pointerColor;
        break;
      case 6666:
        pointerItemLocal = secondaryPointerItem;
        pointerYLocal = secondaryPointerY;
        pointerColorLocal =
          pointerConfig?.secondaryPointerColor || pointerColor;
        break;
    }
    if (!pointerYLocal) return;
    if (
      hidePointerDataPointForMissingValues &&
      typeof props.data?.[pointerIndex]?.value !== 'number'
    )
      return null;

    return Pointer({
      pointerX,
      pointerYLocal: pointerYLocal + xAxisThickness,
      pointerComponent,
      pointerHeight,
      pointerRadius,
      pointerWidth,
      pointerItemLocal,
      pointerColorLocal,
      pointerIndex,
    });
  };

  const renderStripAndLabel = () => {
    let pointerYLocal;

    let arr = [pointerY];
    if (pointerY2 !== 0) {
      arr.push(pointerY2);
    }
    if (pointerY3 !== 0) {
      arr.push(pointerY3);
    }
    if (pointerY4 !== 0) {
      arr.push(pointerY4);
    }
    if (pointerY5 !== 0) {
      arr.push(pointerY5);
    }
    pointerYLocal = Math.min(...arr);

    if (
      pointerConfig?.hidePointerForMissingValues &&
      typeof pointerItemLocal[0].value !== 'number'
    )
      return null;

    return StripAndLabel({
      autoAdjustPointerLabelPosition,
      pointerX,
      pointerLabelWidth,
      activatePointersOnLongPress,
      yAxisLabelWidth,
      pointerRadius,
      pointerWidth,
      shiftPointerLabelX,
      pointerLabelHeight,
      pointerYLocal,
      pointerStripUptoDataPoint,
      pointerStripHeight,
      shiftPointerLabelY,
      pointerItemLocal,
      secondaryPointerItem,
      pointerItemsForSet,
      secondaryPointerItemsForSet,
      showPointerStrip,
      pointerStripWidth,
      containerHeight,
      xAxisThickness,
      pointerStripColor,
      pointerConfig,
      pointerLabelComponent,
      scrollX,
      pointerEvents,
      isBarChart: false,
      pointerIndex,
      width: totalWidth,
      screenWidth:
        props.width ??
        Math.min(totalWidth, props.parentWidth ?? screenWidth) -
          yAxisLabelWidth,
      hasDataSet: !!dataSet,
      containsNegative: mostNegativeValue < 0,
      horizontalStripConfig: pointerConfig?.horizontalStripConfig,
    });
  };

  const getLineGradientComponent = () => {
    return props.lineGradientComponent ? (
      props.lineGradientComponent()
    ) : (
      <LinearGradient
        id="lineGradient"
        x1="0"
        y1="0"
        x2={lineGradientDirection === 'horizontal' ? '1' : '0'}
        y2={lineGradientDirection === 'vertical' ? '1' : '0'}>
        <Stop offset="0" stopColor={lineGradientStartColor} />
        <Stop offset="1" stopColor={lineGradientEndColor} />
      </LinearGradient>
    );
  };

  const getAreaGradientComponent = (
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
  ) => {
    return props.areaGradientComponent ? (
      props.areaGradientComponent()
    ) : (
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
    );
  };

  const renderIntersection = () => {
    return (
      <View style={[svgWrapperViewStyle as ViewStyle, {width: totalWidth}]}>
        <Svg>
          {/* Define the pathe path1 & path2 */}
          <Path id="path1" d={fillPoints} fill="none" stroke={'none'} />
          <Path id="path2" d={fillPoints2} fill="none" stroke={'none'} />

          <ClipPath id="clip">
            <Use href="#path1" />
          </ClipPath>

          {/* Render the clipped Path */}
          <Path
            d={fillPoints2}
            clipPath="url(#clip)"
            fill={intersectionAreaConfig?.fillColor ?? 'white'}
          />

          {/* Render the Line1 again as its clipped portion gets hidden */}
          <Path
            d={points}
            stroke={color1}
            strokeWidth={thickness1 ?? thickness}
            fill={'none'}
          />
        </Svg>
      </View>
    );
  };

  const renderDataPointsForEachLine = () => {
    if (dataSet && pointsFromSet.length) {
      return (
        <>
          {dataSet.map((set, index) => {
            const {
              hideDataPoints,
              data,
              dataPointsShape,
              dataPointsWidth,
              dataPointsHeight,
              dataPointsColor,
              dataPointsRadius,
              textColor,
              textFontSize,
              startIndex,
              endIndex,
              isSecondary,
            } = set;
            return renderDataPoints(
              hideDataPoints ?? hideDataPoints1,
              data,
              adjustToOffset(data, -(props.yAxisOffset ?? 0)),
              dataPointsShape ?? dataPointsShape1,
              dataPointsWidth ?? dataPointsWidth1,
              dataPointsHeight ?? dataPointsHeight1,
              dataPointsColor ?? dataPointsColor1,
              dataPointsRadius ?? dataPointsRadius1,
              textColor ?? textColor1,
              textFontSize ?? textFontSize1,
              startIndex ?? 0,
              endIndex ?? set.data.length - 1,
              isSecondary,
              showValuesAsDataPointsText,
              cumulativeSpacingForSet[index],
              index,
            );
          })}
        </>
      );
    }
    return (
      <>
        {renderDataPoints(
          hideDataPoints1,
          data,
          props.data,
          dataPointsShape1,
          dataPointsWidth1,
          dataPointsHeight1,
          dataPointsColor1,
          dataPointsRadius1,
          textColor1,
          textFontSize1,
          startIndex1,
          endIndex1,
          false,
          showValuesAsDataPointsText,
          cumulativeSpacing1,
          0,
        )}
        {points2
          ? renderDataPoints(
              hideDataPoints2,
              data2,
              props.data2,
              dataPointsShape2,
              dataPointsWidth2,
              dataPointsHeight2,
              dataPointsColor2,
              dataPointsRadius2,
              textColor2,
              textFontSize2,
              startIndex2,
              endIndex2,
              false,
              showValuesAsDataPointsText,
              cumulativeSpacing2,
              1,
            )
          : null}
        {points3
          ? renderDataPoints(
              hideDataPoints3,
              data3,
              props.data3,
              dataPointsShape3,
              dataPointsWidth3,
              dataPointsHeight3,
              dataPointsColor3,
              dataPointsRadius3,
              textColor3,
              textFontSize3,
              startIndex3,
              endIndex3,
              false,
              showValuesAsDataPointsText,
              cumulativeSpacing3,
              2,
            )
          : null}
        {points4
          ? renderDataPoints(
              hideDataPoints4,
              data4,
              props.data4,
              dataPointsShape4,
              dataPointsWidth4,
              dataPointsHeight4,
              dataPointsColor4,
              dataPointsRadius4,
              textColor4,
              textFontSize4,
              startIndex4,
              endIndex4,
              false,
              showValuesAsDataPointsText,
              cumulativeSpacing4,
              3,
            )
          : null}
        {points5
          ? renderDataPoints(
              hideDataPoints5,
              data5,
              props.data5,
              dataPointsShape5,
              dataPointsWidth5,
              dataPointsHeight5,
              dataPointsColor5,
              dataPointsRadius5,
              textColor5,
              textFontSize5,
              startIndex5,
              endIndex5,
              false,
              showValuesAsDataPointsText,
              cumulativeSpacing5,
              4,
            )
          : null}
        {secondaryPoints
          ? renderDataPoints(
              secondaryLineConfig.hideDataPoints,
              secondaryData,
              props.secondaryData,
              secondaryLineConfig.dataPointsShape,
              secondaryLineConfig.dataPointsWidth,
              secondaryLineConfig.dataPointsHeight,
              secondaryLineConfig.dataPointsColor,
              secondaryLineConfig.dataPointsRadius,
              secondaryLineConfig.textColor,
              secondaryLineConfig.textFontSize,
              secondaryLineConfig.startIndex,
              secondaryLineConfig.endIndex,
              true,
              secondaryLineConfig.showValuesAsDataPointsText,
              cumulativeSpacingSecondary,
              6666,
            )
          : null}
      </>
    );
  };

  const lineSvgComponent = (
    points: any,
    currentLineThickness: number | undefined,
    color: ColorValue,
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
    strokeLinecap: Linecap,
    showArrow: boolean,
    arrowPoints: any,
    arrowStrokeWidth: any,
    arrowStrokeColor: any,
    arrowFillColor: any,
    key: any,
    hideDataPoints: any,
    data: any,
    propsData: any,
    dataPointsShape: any,
    dataPointsWidth: any,
    dataPointsHeight: any,
    dataPointsColor: any,
    dataPointsRadius: any,
    textColor: any,
    textFontSize: any,
    startIndex: any,
    endIndex: any,
    isSecondary: any,
    showValuesAsDataPointsText: any,
    spacingArray: number[],
  ) => {
    if (!points) return null;
    const isCurved = points.includes('C') || points.includes('Q');
    const isNthAreaChart = !!dataSet
      ? (dataSet[Number(key)].areaChart ?? areaChart)
      : getIsNthAreaChart(key ?? 0);
    let ar: LineProperties[] = [{d: '', color: '', strokeWidth: 0}];
    if (points.includes(RANGE_ENTER)) {
      ar = getRegionPathObjects(
        points,
        color,
        currentLineThickness ?? 0,
        thickness,
        strokeDashArray ?? [],
        isCurved,
        RANGE_ENTER,
        STOP,
        RANGE_EXIT,
        curveType,
      );
    } else if (points.includes(SEGMENT_START)) {
      ar = getSegmentedPathObjects(
        points,
        color,
        currentLineThickness ?? 0,
        thickness,
        strokeDashArray ?? [],
        isCurved,
        SEGMENT_START,
        SEGMENT_END,
        curveType,
      );
    }
    const lineSvgPropsOuter: LineSvgProps = {
      d: animateOnDataChange && animatedPath ? animatedPath : points,
      fill: 'none',
      stroke: lineGradient
        ? props.lineGradientId
          ? `url(#${props.lineGradientId})`
          : `url(#lineGradient)`
        : color,
      strokeWidth: currentLineThickness || thickness,
      strokeLinecap,
    };
    if (
      strokeDashArray &&
      strokeDashArray.length === 2 &&
      typeof strokeDashArray[0] === 'number' &&
      typeof strokeDashArray[1] === 'number'
    ) {
      lineSvgPropsOuter.strokeDasharray = strokeDashArray;
    }
    return (
      <Svg
        height={svgHeight}
        // width={widthValue}
        onPress={props.onBackgroundPress}>
        {lineGradient && getLineGradientComponent()}
        {points.includes(SEGMENT_START) || points.includes(RANGE_ENTER) ? (
          ar.map((item, index) => {
            const lineSvgProps: LineSvgProps = {
              d: item.d,
              fill: 'none',
              stroke: lineGradient
                ? props.lineGradientId
                  ? `url(#${props.lineGradientId})`
                  : `url(#lineGradient)`
                : item.color,
              strokeWidth: item.strokeWidth,
              strokeLinecap,
            };
            if (
              item.strokeDashArray &&
              item.strokeDashArray.length === 2 &&
              typeof item.strokeDashArray[0] === 'number' &&
              typeof item.strokeDashArray[1] === 'number'
            ) {
              lineSvgProps.strokeDasharray = item.strokeDashArray;
            }
            return <Path key={index} {...lineSvgProps} />;
          })
        ) : animateOnDataChange && animatedPath ? (
          <AnimatedPath {...lineSvgPropsOuter} />
        ) : (
          <Path {...lineSvgPropsOuter} />
        )}

        {/***********************      For Area Chart        ************/}

        {isNthAreaChart &&
          getAreaGradientComponent(
            startFillColor,
            endFillColor,
            startOpacity,
            endOpacity,
          )}
        {isNthAreaChart ? (
          props.interpolateMissingValues === false &&
          propsData.some(
            (item: any) => isNaN(item.value), // if we have a null/undefined value in data & interpolation is disabled, then don't render area
          ) ? null : animateOnDataChange && animatedFillPath ? (
            <AnimatedPath
              onPress={props.onChartAreaPress}
              d={animatedFillPath}
              fill={
                props.areaGradientId
                  ? `url(#${props.areaGradientId})`
                  : `url(#Gradient)`
              }
              stroke={'none'}
              strokeWidth={currentLineThickness || thickness}
            />
          ) : (
            <Path
              onPress={props.onChartAreaPress}
              d={fillPoints}
              fill={
                props.areaGradientId
                  ? `url(#${props.areaGradientId})`
                  : `url(#Gradient)`
              }
              stroke={'none'}
              strokeWidth={currentLineThickness || thickness}
            />
          )
        ) : null}

        {/******************************************************************/}

        {renderSpecificVerticalLines(data, cumulativeSpacing1)}
        {renderSpecificVerticalLines(data2, cumulativeSpacing2)}
        {renderSpecificVerticalLines(data3, cumulativeSpacing3)}
        {renderSpecificVerticalLines(data4, cumulativeSpacing4)}
        {renderSpecificVerticalLines(data5, cumulativeSpacing5)}

        {dataSet?.map((set, index) =>
          renderSpecificVerticalLines(
            set?.data,
            cumulativeSpacingForSet[index],
          ),
        ) ?? null}

        {/***  !!! Here it's done 5 times intentionally, so that onPress works for each line !!!  ***/}
        {isAnimated && !renderDataPointsAfterAnimationEnds // in this condition onPress won't work properly in case of multi-line, so it's suggested to use either renderDataPointsAfterAnimationEnds prop if you want to use onPress for data points
          ? renderDataPoints(
              hideDataPoints,
              data,
              propsData,
              dataPointsShape,
              dataPointsWidth,
              dataPointsHeight,
              dataPointsColor,
              dataPointsRadius,
              textColor,
              textFontSize,
              startIndex,
              endIndex,
              isSecondary,
              showValuesAsDataPointsText,
              spacingArray,
              key,
            )
          : key === lastLineNumber - 1
            ? renderDataPointsForEachLine()
            : null}
        {showArrow && (
          <Path
            d={arrowPoints}
            fill={arrowFillColor}
            stroke={arrowStrokeColor}
            strokeWidth={arrowStrokeWidth}
          />
        )}
      </Svg>
    );
  };

  // const getClosestValueFromSpacingArray = (spacingArray:number[],x:number):number => {
  //   let dif=0,prevDif=0,i;
  //   for(i=0;i<spacingArray.length;i++){
  //     dif = Math.abs(spacingArray[i]-x)

  //     if(prevDif!=0 && prevDif<dif){
  //       break;
  //     }

  //     prevDif = dif;
  //   }

  //   return i-1;
  // }

  const activatePointers = (x: number) => {
    let factor = (x - initialSpacing) / (props.spacing1 ?? spacing); // getClosestValueFromSpacingArray(cumulativeSpacing1,x-initialSpacing)
    factor = Math.round(factor);
    factor = Math.min(factor, (data0 ?? data).length - 1);
    factor = Math.max(factor, 0);
    let item, y;
    item = (data0 ?? data)[factor];
    if (!item.hidePointer) {
      let z =
        getX(
          dataSet?.length ? cumulativeSpacingForSet[0] : cumulativeSpacing1,
          factor,
        ) -
        (pointerRadius || pointerWidth / 2) -
        1;
      setPointerX(Math.max(0.1, z)); // 0.1 is to avoid pointer going out of the chart, See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/925
      setPointerIndex(factor);
      y =
        containerHeight -
        (item.value * containerHeight) / maxValue -
        (pointerRadius || pointerHeight / 2) +
        10;
      setPointerY(y);
      setPointerItem(item);
    }
    if (data2 && data2.length) {
      item = data2[factor];
      if (item && !item.hidePointer) {
        y =
          containerHeight -
          (item.value * containerHeight) / maxValue -
          (pointerRadius || pointerHeight / 2) +
          10;
        setPointerY2(y);
        setPointerItem2(item);
      }
    }
    if (data3 && data3.length) {
      item = data3[factor];
      if (item && !item.hidePointer) {
        y =
          containerHeight -
          (item.value * containerHeight) / maxValue -
          (pointerRadius || pointerHeight / 2) +
          10;
        setPointerY3(y);
        setPointerItem3(item);
      }
    }
    if (data4 && data4.length) {
      item = data4[factor];
      if (item && !item.hidePointer) {
        y =
          containerHeight -
          (item.value * containerHeight) / maxValue -
          (pointerRadius || pointerHeight / 2) +
          10;
        setPointerY4(y);
        setPointerItem4(item);
      }
    }
    if (data5 && data5.length) {
      item = data5[factor];
      if (item && !item.hidePointer) {
        y =
          containerHeight -
          (item.value * containerHeight) / maxValue -
          (pointerRadius || pointerHeight / 2) +
          10;
        setPointerY5(y);
        setPointerItem5(item);
      }
    }
    if (secondaryData?.length) {
      item = secondaryData[factor];
      if (item) {
        y =
          containerHeight -
          (item.value * containerHeight) / secondaryMaxValue -
          (pointerRadius || pointerHeight / 2) +
          10;
        setSecondaryPointerY(y);
        // @ts-ignore
        setSecondaryPointerItem(item);
      }
    }
    if (dataSet?.length) {
      const pointerItemsForSetLocal: lineDataItem[] = [];
      const secondaryPointerItemsForSetLocal: lineDataItem[] = [];
      const ysForDataSet = dataSet.map(set => {
        const item = set.data[factor];
        if (set.isSecondary) {
          secondaryPointerItemsForSetLocal.push(item);
        } else {
          pointerItemsForSetLocal.push(item);
        }
        const y = item
          ? containerHeight -
            (item.value * containerHeight) /
              (set.isSecondary ? secondaryMaxValue : maxValue) -
            (pointerRadius || pointerHeight / 2) +
            10
          : 0;
        return y;
      });
      setPointerItemsForSet(pointerItemsForSetLocal);
      setSecondaryPointerItemsForSet(secondaryPointerItemsForSetLocal);
      setPointerYsForDataSet(ysForDataSet);
    }
  };

  const renderLine = (
    containerHeightIncludingBelowXAxis: number,
    zIndex: number,
    points: any,
    currentLineThickness: number | undefined,
    color: ColorValue,
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
    strokeLinecap: Linecap,
    showArrow: any,
    arrowPoints: any,
    arrowStrokeWidth: any,
    arrowStrokeColor: any,
    arrowFillColor: any,
    hideDataPoints: any,
    paramData: any,
    propsData: any,
    dataPointsShape: any,
    dataPointsWidth: any,
    dataPointsHeight: any,
    dataPointsColor: any,
    dataPointsRadius: any,
    textColor: any,
    textFontSize: any,
    startIndex: any,
    endIndex: any,
    isSecondary: any,
    showValuesAsDataPointsText: any,
    spacingArray: number[],
    key?: number,
  ) => {
    return (
      <View
        key={key ?? 0}
        onPointerEnter={() => pointerConfig?.onPointerEnter?.()}
        onPointerLeave={() => pointerConfig?.onPointerLeave?.()}
        onTouchStart={() => pointerConfig?.onTouchStart?.()}
        onTouchEnd={() => pointerConfig?.onTouchEnd?.()}
        onMoveShouldSetResponder={evt => (pointerConfig ? true : false)}
        onStartShouldSetResponder={evt =>
          pointerConfig && activatePointersInstantlyOnTouch ? true : false
        }
        onResponderGrant={evt => {
          if (!pointerConfig) return;
          setResponderStartTime(evt.timeStamp);
          if (activatePointersOnLongPress) {
            return;
          }
          let x = evt.nativeEvent.locationX;
          activatePointers(x);
          pointerConfig.onResponderGrant?.();
        }}
        onResponderMove={evt => {
          if (!pointerConfig) return;
          if (
            activatePointersOnLongPress &&
            evt.timeStamp - responderStartTime < activatePointersDelay
          ) {
            return;
          } else {
            setResponderActive(true);
          }
          let x = evt.nativeEvent.locationX;
          let px = evt.nativeEvent.pageX;
          if (yAxisLabelWidth != -1 && x == px) return; // if locationX and pageX are equal, it means pointer has gone out of the chart, but this is not the case when yAxisLabelWidth is -1
          if (
            !activatePointersOnLongPress &&
            x > (props.width || Dimensions.get('window').width)
          )
            return;
          activatePointers(x);
          pointerConfig?.onResponderMove?.();
        }}
        // onResponderReject={evt => {
        //   console.log('evt...reject.......',evt);
        // }}
        onResponderEnd={evt => {
          setResponderStartTime(0);
          if (resetPointerIndexOnRelease) setPointerIndex(-1);
          setResponderActive(false);
          if (!persistPointer)
            setTimeout(() => setPointerX(0), pointerVanishDelay);
          pointerConfig?.onResponderEnd?.();
        }}
        onResponderTerminationRequest={evt => false}
        // onResponderTerminate={evt => {
        //   console.log('evt...terminate.......',evt);
        // }}
        // onResponderRelease={evt => {
        //   setResponderStartTime(0);
        //   setResponderActive(false);
        //   setTimeout(() => setPointerX(0), pointerVanishDelay);
        // }}
        style={[
          svgWrapperViewStyle as ViewStyle,
          {
            width: totalWidth,
            height: containerHeightIncludingBelowXAxis,
            zIndex,
          },
        ]}>
        {lineSvgComponent(
          points,
          currentLineThickness,
          color,
          fillPoints,
          startFillColor,
          endFillColor,
          startOpacity,
          endOpacity,
          strokeDashArray,
          strokeLinecap,
          showArrow,
          arrowPoints,
          arrowStrokeWidth,
          arrowStrokeColor,
          arrowFillColor,
          key,
          hideDataPoints,
          paramData,
          propsData,
          dataPointsShape,
          dataPointsWidth,
          dataPointsHeight,
          dataPointsColor,
          dataPointsRadius,
          textColor,
          textFontSize,
          startIndex,
          endIndex,
          isSecondary,
          showValuesAsDataPointsText,
          spacingArray,
        )}
      </View>
    );
  };

  const renderAnimatedLine = (
    containerHeightIncludingBelowXAxis: number,
    zIndex: number,
    points: any,
    animatedWidth: any,
    currentLineThickness: number | undefined,
    color: ColorValue,
    fillPoints: any,
    startFillColor: string,
    endFillColor: string,
    startOpacity: number,
    endOpacity: number,
    strokeDashArray: Array<number> | undefined | null,
    strokeLinecap: Linecap,
    showArrow: any,
    arrowPoints: any,
    arrowStrokeWidth: any,
    arrowStrokeColor: any,
    arrowFillColor: any,
    hideDataPoints: any,
    paramsData: any,
    propsData: any,
    dataPointsShape: any,
    dataPointsWidth: any,
    dataPointsHeight: any,
    dataPointsColor: any,
    dataPointsRadius: any,
    textColor: any,
    textFontSize: any,
    startIndex: any,
    endIndex: any,
    isSecondary: any,
    showValuesAsDataPointsText: any,
    spacingArray: number[],
    key?: number,
  ) => {
    return (
      <Animated.View
        key={key ?? 0}
        onPointerEnter={() => pointerConfig?.onPointerEnter?.()}
        onPointerLeave={() => pointerConfig?.onPointerLeave?.()}
        onMoveShouldSetResponder={evt => (pointerConfig ? true : false)}
        onStartShouldSetResponder={evt =>
          pointerConfig && activatePointersInstantlyOnTouch ? true : false
        }
        onResponderGrant={evt => {
          if (!pointerConfig) return;
          setResponderStartTime(evt.timeStamp);
          if (activatePointersOnLongPress) {
            return;
          }
          let x = evt.nativeEvent.locationX;
          activatePointers(x);
          pointerConfig.onResponderGrant?.();
        }}
        onResponderMove={evt => {
          if (!pointerConfig) return;
          if (
            activatePointersOnLongPress &&
            evt.timeStamp - responderStartTime < activatePointersDelay
          ) {
            return;
          } else {
            setResponderActive(true);
          }
          let x = evt.nativeEvent.locationX;
          if (
            !activatePointersOnLongPress &&
            x > (props.width || Dimensions.get('window').width)
          )
            return;

          activatePointers(x);
          pointerConfig?.onResponderMove?.();
        }}
        // onResponderReject={evt => {
        //   console.log('evt...reject.......',evt);
        // }}
        onResponderEnd={evt => {
          // console.log('evt...end.......',evt);
          setResponderStartTime(0);
          if (resetPointerIndexOnRelease) setPointerIndex(-1);
          setResponderActive(false);
          if (!persistPointer)
            setTimeout(() => setPointerX(0), pointerVanishDelay);
          pointerConfig?.onResponderEnd?.();
        }}
        onResponderTerminationRequest={evt => false}
        // onResponderTerminate={evt => {
        //   console.log('evt...terminate.......',evt);
        // }}
        // onResponderRelease={evt => {
        //   setResponderStartTime(0);
        //   setResponderActive(false);
        //   setTimeout(() => setPointerX(0), pointerVanishDelay);
        // }}
        style={[
          svgWrapperViewStyle as ViewStyle,
          {
            width: animatedWidth,
            height: containerHeightIncludingBelowXAxis,
            zIndex,
          },
        ]}>
        {lineSvgComponent(
          points,
          currentLineThickness,
          color,
          fillPoints,
          startFillColor,
          endFillColor,
          startOpacity,
          endOpacity,
          strokeDashArray,
          strokeLinecap,
          showArrow,
          arrowPoints,
          arrowStrokeWidth,
          arrowStrokeColor,
          arrowFillColor,
          key,
          hideDataPoints,
          paramsData,
          propsData,
          dataPointsShape,
          dataPointsWidth,
          dataPointsHeight,
          dataPointsColor,
          dataPointsRadius,
          textColor,
          textFontSize,
          startIndex,
          endIndex,
          isSecondary,
          showValuesAsDataPointsText,
          spacingArray,
        )}
      </Animated.View>
    );
  };

  const remainingScrollViewProps = {
    onScroll: (ev: any) => {
      props.onScroll?.(ev);
      if (
        pointerConfig &&
        pointerConfig.activatePointersOnLongPress &&
        pointerConfig.autoAdjustPointerLabelPosition
      ) {
        setScrollX(ev.nativeEvent.contentOffset.x);
      }
    },
    bounces: props.bounces,
    overScrollMode: props.overScrollMode ?? 'auto',
  };

  const renderStrips = (item: lineDataItem, index: number, ind: number) => {
    if (item.showStrip || index === selectedIndex) {
      const currentStripHeight = item.stripHeight ?? stripHeight;
      const currentStripWidth = item.stripWidth ?? stripWidth;
      const currentStripOpacity = item.stripOpacity ?? stripOpacity;
      const currentStripStrokeDashArray =
        item.stripStrokeDashArray ?? stripStrokeDashArray ?? '';
      const currentStripColor = item.stripColor || stripColor;

      const y1 = currentStripHeight
        ? containerHeight - currentStripHeight + 8
        : containerHeight -
          (item.dataPointHeight ?? dataPointsHeight1) / 2 +
          14 -
          ((item.value ?? 0) * containerHeight) / maxValue;

      const actualStripHeight =
        currentStripHeight ||
        ((item.value ?? 0) * containerHeight) / maxValue - 2 + overflowTop;
      return (
        <Line
          key={'strip' + (ind * 10000 + index)}
          x1={initialSpacing + spacing * index}
          y1={y1}
          x2={initialSpacing + spacing * index}
          y2={y1 + actualStripHeight + 2}
          strokeWidth={currentStripWidth}
          stroke={currentStripColor}
          strokeDasharray={currentStripStrokeDashArray}
          opacity={currentStripOpacity}
        />
      );
    }
    return null;
  };

  const renderChartContent = (containerHeightIncludingBelowXAxis: number) => {
    return (
      <>
        {Object.keys(strips).length > 0 ||
        (focusEnabled && showStripOnFocus && selectedIndex !== -1) ? ( // render focus strips separately (so that it's rendered below the data points unless specified otherwise)
          <View
            pointerEvents="none"
            style={[
              svgWrapperViewStyle as ViewStyle,
              {
                width: totalWidth,
                height: containerHeightIncludingBelowXAxis,
                zIndex: stripOverDataPoints ? 10000 : -1,
              },
            ]}>
            <Svg
              height={
                containerHeightIncludingBelowXAxis +
                (props.overflowBottom ?? dataPointsRadius1)
              }>
              {Object.keys(strips).map((stripKey: any) => {
                return Object.keys(strips[stripKey]).map((ind: any) => {
                  const {item, index, key} = strips[stripKey][ind];
                  return renderStrips(item, index, key);
                });
              })}
              {focusEnabled && showStripOnFocus && selectedIndex !== -1 ? (
                <>
                  {dataSet && pointsFromSet.length
                    ? dataSet.map((set, ind) => {
                        return set.data.map((item, index) =>
                          renderStrips(item, index, ind),
                        );
                      })
                    : props.data?.map((item, index) =>
                        renderStrips(item, index, 0),
                      )}
                  {props.data2?.map((item, index) =>
                    renderStrips(item, index, 1),
                  )}
                  {props.data3?.map((item, index) =>
                    renderStrips(item, index, 2),
                  )}
                  {props.data4?.map((item, index) =>
                    renderStrips(item, index, 3),
                  )}
                  {props.data5?.map((item, index) =>
                    renderStrips(item, index, 4),
                  )}
                  {props.secondaryData?.map((item, index) =>
                    renderStrips(item, index, 5),
                  )}
                </>
              ) : null}
            </Svg>
          </View>
        ) : null}
        {dataSet
          ? pointsFromSet.length
            ? dataSet.map((set, index) => {
                if (isAnimated) {
                  return renderAnimatedLine(
                    containerHeightIncludingBelowXAxis,
                    set.zIndex ?? zIndex1,
                    pointsFromSet[index],
                    widthValue,
                    set.thickness ?? thickness1,
                    set.color ?? color1,
                    fillPointsFromSet[index],
                    set.startFillColor ?? startFillColor1,
                    set.endFillColor ?? endFillColor1,
                    set.startOpacity ?? startOpacity1,
                    set.endOpacity ?? endOpacity1,
                    set.strokeDashArray ?? strokeDashArray1,
                    set.strokeLinecap ?? strokeLinecap1,
                    set.showArrow || props.showArrows,
                    arrowPointsFromSet[index],
                    arrowStrokeWidthsFromSet?.[index],
                    arrowStrokeColorsFromSet?.[index],
                    arrowFillColorsFromSet?.[index],
                    set.hideDataPoints ?? hideDataPoints1,
                    set.data,
                    adjustToOffset(set.data, -(props.yAxisOffset ?? 0)), // need the actual values passed by user
                    set.dataPointsShape ?? dataPointsShape1,
                    set.dataPointsWidth ?? dataPointsWidth1,
                    set.dataPointsHeight ?? dataPointsHeight1,
                    set.dataPointsColor ?? dataPointsColor1,
                    set.dataPointsRadius ?? dataPointsRadius1,
                    set.textColor ?? textColor1,
                    set.textFontSize ?? textFontSize1,
                    set.startIndex ?? 0,
                    set.endIndex ?? set.data.length - 1,
                    set.isSecondary,
                    showValuesAsDataPointsText,
                    cumulativeSpacingForSet[index],
                    index,
                  );
                } else {
                  return renderLine(
                    containerHeightIncludingBelowXAxis,
                    set.zIndex ?? zIndex1,
                    pointsFromSet[index],
                    set.thickness ?? thickness1,
                    set.color ?? color1,
                    fillPointsFromSet[index],
                    set.startFillColor ?? startFillColor1,
                    set.endFillColor ?? endFillColor1,
                    set.startOpacity ?? startOpacity1,
                    set.endOpacity ?? endOpacity1,
                    set.strokeDashArray ?? strokeDashArray1,
                    set.strokeLinecap ?? strokeLinecap1,
                    set.showArrow || props.showArrows,
                    arrowPointsFromSet[index],
                    arrowStrokeWidthsFromSet?.[index],
                    arrowStrokeColorsFromSet?.[index],
                    arrowFillColorsFromSet?.[index],
                    set.hideDataPoints ?? hideDataPoints1,
                    set.data,
                    adjustToOffset(set.data, -(props.yAxisOffset ?? 0)), // need the actual values passed by user
                    set.dataPointsShape ?? dataPointsShape1,
                    set.dataPointsWidth ?? dataPointsWidth1,
                    set.dataPointsHeight ?? dataPointsHeight1,
                    set.dataPointsColor ?? dataPointsColor1,
                    set.dataPointsRadius ?? dataPointsRadius1,
                    set.textColor ?? textColor1,
                    set.textFontSize ?? textFontSize1,
                    set.startIndex ?? 0,
                    set.endIndex ?? set.data.length - 1,
                    set.isSecondary,
                    showValuesAsDataPointsText,
                    cumulativeSpacingForSet[index],
                    index,
                  );
                }
              })
            : null
          : isAnimated
            ? renderAnimatedLine(
                containerHeightIncludingBelowXAxis,
                zIndex1,
                points,
                widthValue,
                thickness1,
                color1,
                fillPoints,
                startFillColor1,
                endFillColor1,
                startOpacity1,
                endOpacity1,
                strokeDashArray1,
                strokeLinecap1,
                props.showArrow1 || props.showArrows,
                arrow1Points,
                arrowStrokeWidth1,
                arrowStrokeColor1,
                arrowFillColor1,
                hideDataPoints1,
                data,
                props.data,
                dataPointsShape1,
                dataPointsWidth1,
                dataPointsHeight1,
                dataPointsColor1,
                dataPointsRadius1,
                textColor1,
                textFontSize1,
                startIndex1,
                endIndex1,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing1,
                0,
              )
            : renderLine(
                containerHeightIncludingBelowXAxis,
                zIndex1,
                points,
                thickness1,
                color1,
                fillPoints,
                startFillColor1,
                endFillColor1,
                startOpacity1,
                endOpacity1,
                strokeDashArray1,
                strokeLinecap1,
                props.showArrow1 || props.showArrows,
                arrow1Points,
                arrowStrokeWidth1,
                arrowStrokeColor1,
                arrowFillColor1,
                hideDataPoints1,
                data,
                props.data,
                dataPointsShape1,
                dataPointsWidth1,
                dataPointsHeight1,
                dataPointsColor1,
                dataPointsRadius1,
                textColor1,
                textFontSize1,
                startIndex1,
                endIndex1,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing1,
                0,
              )}
        {secondaryPoints
          ? isAnimated
            ? renderAnimatedLine(
                containerHeightIncludingBelowXAxis,
                secondaryLineConfig.zIndex,
                secondaryPoints,
                widthValue,
                secondaryLineConfig.thickness,
                secondaryLineConfig.color,
                secondaryFillPoints,
                secondaryLineConfig.startFillColor,
                secondaryLineConfig.endFillColor,
                secondaryLineConfig.startOpacity,
                secondaryLineConfig.endOpacity,
                secondaryLineConfig.strokeDashArray,
                secondaryLineConfig.strokeLinecap,
                secondaryLineConfig.showArrow,
                secondaryArrowPoints,
                secondaryLineConfig.arrowConfig?.strokeWidth,
                secondaryLineConfig.arrowConfig?.strokeColor,
                secondaryLineConfig.arrowConfig?.fillColor,
                secondaryLineConfig.hideDataPoints,
                secondaryData,
                props.secondaryData,
                secondaryLineConfig.dataPointsShape,
                secondaryLineConfig.dataPointsWidth,
                secondaryLineConfig.dataPointsHeight,
                secondaryLineConfig.dataPointsColor,
                secondaryLineConfig.dataPointsRadius,
                secondaryLineConfig.textColor,
                secondaryLineConfig.textFontSize,
                secondaryLineConfig.startIndex,
                secondaryLineConfig.endIndex,
                true,
                secondaryLineConfig.showValuesAsDataPointsText,
                cumulativeSpacingSecondary,
                6666,
              )
            : renderLine(
                containerHeightIncludingBelowXAxis,
                secondaryLineConfig.zIndex,
                secondaryPoints,
                secondaryLineConfig.thickness,
                secondaryLineConfig.color,
                secondaryFillPoints,
                secondaryLineConfig.startFillColor,
                secondaryLineConfig.endFillColor,
                secondaryLineConfig.startOpacity,
                secondaryLineConfig.endOpacity,
                secondaryLineConfig.strokeDashArray,
                secondaryLineConfig.strokeLinecap,
                secondaryLineConfig.showArrow,
                secondaryArrowPoints,
                secondaryLineConfig.arrowConfig?.strokeWidth,
                secondaryLineConfig.arrowConfig?.strokeColor,
                secondaryLineConfig.arrowConfig?.fillColor,
                secondaryLineConfig.hideDataPoints,
                secondaryData,
                props.secondaryData,
                secondaryLineConfig.dataPointsShape,
                secondaryLineConfig.dataPointsWidth,
                secondaryLineConfig.dataPointsHeight,
                secondaryLineConfig.dataPointsColor,
                secondaryLineConfig.dataPointsRadius,
                secondaryLineConfig.textColor,
                secondaryLineConfig.textFontSize,
                secondaryLineConfig.startIndex,
                secondaryLineConfig.endIndex,
                true,
                secondaryLineConfig.showValuesAsDataPointsText,
                cumulativeSpacingSecondary,
                6666,
              )
          : null}
        {points2
          ? isAnimated
            ? renderAnimatedLine(
                containerHeightIncludingBelowXAxis,
                zIndex2,
                points2,
                widthValue2,
                thickness2,
                color2,
                fillPoints2,
                startFillColor2,
                endFillColor2,
                startOpacity2,
                endOpacity2,
                strokeDashArray2,
                strokeLinecap2,
                props.showArrow2 || props.showArrows,
                arrow2Points,
                arrowStrokeWidth2,
                arrowStrokeColor2,
                arrowFillColor2,
                hideDataPoints2,
                data2,
                props.data2,
                dataPointsShape2,
                dataPointsWidth2,
                dataPointsHeight2,
                dataPointsColor2,
                dataPointsRadius2,
                textColor2,
                textFontSize2,
                startIndex2,
                endIndex2,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing2,
                1,
              )
            : renderLine(
                containerHeightIncludingBelowXAxis,
                zIndex2,
                points2,
                thickness2,
                color2,
                fillPoints2,
                startFillColor2,
                endFillColor2,
                startOpacity2,
                endOpacity2,
                strokeDashArray2,
                strokeLinecap2,
                props.showArrow2 || props.showArrows,
                arrow2Points,
                arrowStrokeWidth2,
                arrowStrokeColor2,
                arrowFillColor2,
                hideDataPoints2,
                data2,
                props.data2,
                dataPointsShape2,
                dataPointsWidth2,
                dataPointsHeight2,
                dataPointsColor2,
                dataPointsRadius2,
                textColor2,
                textFontSize2,
                startIndex2,
                endIndex2,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing2,
                1,
              )
          : null}
        {points3
          ? isAnimated
            ? renderAnimatedLine(
                containerHeightIncludingBelowXAxis,
                zIndex3,
                points3,
                widthValue3,
                thickness3,
                color3,
                fillPoints3,
                startFillColor3,
                endFillColor3,
                startOpacity3,
                endOpacity3,
                strokeDashArray3,
                strokeLinecap3,
                props.showArrow3 || props.showArrows,
                arrow3Points,
                arrowStrokeWidth3,
                arrowStrokeColor3,
                arrowFillColor3,
                hideDataPoints3,
                data3,
                props.data3,
                dataPointsShape3,
                dataPointsWidth3,
                dataPointsHeight3,
                dataPointsColor3,
                dataPointsRadius3,
                textColor3,
                textFontSize3,
                startIndex3,
                endIndex3,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing3,
                2,
              )
            : renderLine(
                containerHeightIncludingBelowXAxis,
                zIndex3,
                points3,
                thickness3,
                color3,
                fillPoints3,
                startFillColor3,
                endFillColor3,
                startOpacity3,
                endOpacity3,
                strokeDashArray3,
                strokeLinecap3,
                props.showArrow3 || props.showArrows,
                arrow3Points,
                arrowStrokeWidth3,
                arrowStrokeColor3,
                arrowFillColor3,
                hideDataPoints3,
                data3,
                props.data3,
                dataPointsShape3,
                dataPointsWidth3,
                dataPointsHeight3,
                dataPointsColor3,
                dataPointsRadius3,
                textColor3,
                textFontSize3,
                startIndex3,
                endIndex3,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing3,
                2,
              )
          : null}
        {points4
          ? isAnimated
            ? renderAnimatedLine(
                containerHeightIncludingBelowXAxis,
                zIndex4,
                points4,
                widthValue4,
                thickness4,
                color4,
                fillPoints4,
                startFillColor4,
                endFillColor4,
                startOpacity4,
                endOpacity4,
                strokeDashArray4,
                strokeLinecap4,
                props.showArrow4 || props.showArrows,
                arrow4Points,
                arrowStrokeWidth4,
                arrowStrokeColor4,
                arrowFillColor4,
                hideDataPoints4,
                data4,
                props.data4,
                dataPointsShape4,
                dataPointsWidth4,
                dataPointsHeight4,
                dataPointsColor4,
                dataPointsRadius4,
                textColor4,
                textFontSize4,
                startIndex4,
                endIndex4,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing4,
                3,
              )
            : renderLine(
                containerHeightIncludingBelowXAxis,
                zIndex4,
                points4,
                thickness4,
                color4,
                fillPoints4,
                startFillColor4,
                endFillColor4,
                startOpacity4,
                endOpacity4,
                strokeDashArray4,
                strokeLinecap4,
                props.showArrow4 || props.showArrows,
                arrow4Points,
                arrowStrokeWidth4,
                arrowStrokeColor4,
                arrowFillColor4,
                hideDataPoints4,
                data4,
                props.data4,
                dataPointsShape4,
                dataPointsWidth4,
                dataPointsHeight4,
                dataPointsColor4,
                dataPointsRadius4,
                textColor4,
                textFontSize4,
                startIndex4,
                endIndex4,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing4,
                3,
              )
          : null}
        {points5
          ? isAnimated
            ? renderAnimatedLine(
                containerHeightIncludingBelowXAxis,
                zIndex5,
                points5,
                widthValue5,
                thickness5,
                color5,
                fillPoints5,
                startFillColor5,
                endFillColor5,
                startOpacity5,
                endOpacity5,
                strokeDashArray5,
                strokeLinecap5,
                props.showArrow5 || props.showArrows,
                arrow5Points,
                arrowStrokeWidth5,
                arrowStrokeColor5,
                arrowFillColor5,
                hideDataPoints5,
                data5,
                props.data5,
                dataPointsShape5,
                dataPointsWidth5,
                dataPointsHeight5,
                dataPointsColor5,
                dataPointsRadius5,
                textColor5,
                textFontSize5,
                startIndex5,
                endIndex5,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing5,
                4,
              )
            : renderLine(
                containerHeightIncludingBelowXAxis,
                zIndex5,
                points5,
                thickness5,
                color5,
                fillPoints5,
                startFillColor5,
                endFillColor5,
                startOpacity5,
                endOpacity5,
                strokeDashArray5,
                strokeLinecap5,
                props.showArrow5 || props.showArrows,
                arrow5Points,
                arrowStrokeWidth5,
                arrowStrokeColor5,
                arrowFillColor5,
                hideDataPoints5,
                data5,
                props.data5,
                dataPointsShape5,
                dataPointsWidth5,
                dataPointsHeight5,
                dataPointsColor5,
                dataPointsRadius5,
                textColor5,
                textFontSize5,
                startIndex5,
                endIndex5,
                false,
                showValuesAsDataPointsText,
                cumulativeSpacing5,
                4,
              )
          : null}
        {intersectionAreaConfig &&
        (props.areaChart || (props.areaChart1 && props.areaChart2))
          ? renderIntersection()
          : null}
        {pointerX > 0 ? (
          <View
            pointerEvents={pointerEvents ?? 'none'}
            style={{
              position: 'absolute',
              height:
                extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
              bottom:
                58 + labelsExtraHeight + xAxisLabelsVerticalShift - overflowTop,
              // width: totalWidth,
              zIndex: 20,
            }}>
            {!stripOverPointer && renderStripAndLabel()}
            {dataSet ? (
              renderPointer(0, true)
            ) : (
              // dataSet.map((set, index) => renderPointer(index))
              <>
                {renderPointer(1)}
                {points2 ? renderPointer(2) : null}
                {points3 ? renderPointer(3) : null}
                {points4 ? renderPointer(4) : null}
                {points5 ? renderPointer(5) : null}
                {secondaryPoints ? renderPointer(6666) : null}
                {stripOverPointer && renderStripAndLabel()}
              </>
            )}
          </View>
        ) : null}
        {(data0 ?? data).map((item: lineDataItem, index: number) => {
          const secondaryLabel =
            item.secondaryLabel ?? secondaryXAxis?.labelTexts?.[index] ?? '';
          const secondaryLabelTextStyle =
            item.secondaryLabelTextStyle ??
            secondaryXAxis?.labelsTextStyle ??
            item.labelTextStyle ??
            props.xAxisLabelTextStyle;
          return (
            <View key={index}>
              {isAnimated
                ? renderAnimatedLabel(
                    false,
                    index,
                    item.label ||
                      (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : ''),
                    item.labelTextStyle || props.xAxisLabelTextStyle,
                    item.labelComponent,
                  )
                : renderLabel(
                    false,
                    index,
                    item.label ||
                      (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : ''),
                    item.labelTextStyle || props.xAxisLabelTextStyle,
                    item.labelComponent,
                  )}
              {secondaryXAxis
                ? isAnimated
                  ? renderAnimatedLabel(
                      true,
                      index,
                      secondaryLabel,
                      secondaryLabelTextStyle,
                      item.secondaryLabelComponent,
                    )
                  : renderLabel(
                      true,
                      index,
                      secondaryLabel,
                      secondaryLabelTextStyle,
                      item.secondaryLabelComponent,
                    )
                : null}
            </View>
          );
        })}
        {pointerConfig?.dynamicLegendComponent && pointerX > 0 ? (
          <View
            style={[
              {position: 'absolute'},
              pointerConfig.dynamicLegendContainerStyle,
            ]}>
            {pointerConfig.dynamicLegendComponent(
              pointerItemLocal,
              pointerIndex,
            )}
          </View>
        ) : null}
      </>
    );
  };

  return (
    <BarAndLineChartsWrapper
      {...barAndLineChartsWrapperProps}
      dataSet={dataSet}
      scrollRef={scrollRef}
      animatedWidth={widthValue}
      renderChartContent={renderChartContent}
      remainingScrollViewProps={remainingScrollViewProps}
      nestedScrollEnabled={props.nestedScrollEnabled}
    />
  );
};
