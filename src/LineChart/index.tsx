import React, {Fragment, useCallback, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
  Dimensions,
  Platform,
  ColorValue,
  I18nManager,
} from 'react-native';
import {styles} from './styles';
import {screenWidth} from '../utils';
import Svg, {
  Path,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Text as CanvasText,
  Line,
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
} from 'gifted-charts-core';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {StripAndLabel} from '../Components/common/StripAndLabel';
import {Pointer} from '../Components/common/Pointer';

let initialData: Array<lineDataItem> | null = null;
let animations: Array<Animated.Value> = [];

export const LineChart = (props: LineChartPropsType) => {
  const scrollRef = props.scrollRef ?? useRef(null);
  const opacValue = useMemo(() => new Animated.Value(0), []);
  const heightValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const widthValue2 = useMemo(() => new Animated.Value(0), []);
  const widthValue3 = useMemo(() => new Animated.Value(0), []);
  const widthValue4 = useMemo(() => new Animated.Value(0), []);
  const widthValue5 = useMemo(() => new Animated.Value(0), []);

  if (!initialData) {
    initialData = props.dataSet?.[0]?.data ?? props.data ?? [];
    animations = initialData.map(item => new Animated.Value(item.value));
  }

  const {
    scrollX,
    setScrollX,
    arrow1Points,
    arrow2Points,
    arrow3Points,
    arrow4Points,
    arrow5Points,
    secondaryArrowPoints,
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
    pointerItem5,
    setPointerItem5,
    secondaryPointerY,
    setSecondaryPointerY,
    secondaryPointerItem,
    setSecondaryPointerItem,
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
    activatePointersDelay,
    persistPointer,
    hidePointer1,
    hidePointer2,
    hidePointer3,
    hidePointer4,
    hidePointer5,
    hideSecondaryPointer,
    pointerEvents,
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
    containerHeightIncludingBelowXAxis,
    lineGradient,
    lineGradientDirection,
    lineGradientStartColor,
    lineGradientEndColor,
    barAndLineChartsWrapperProps,
  } = useLineChart({...props, animations, screenWidth});

  const widthValuesFromSet = useMemo(
    () => dataSet?.map(set => new Animated.Value(0)),
    [],
  );

  useEffect(() => {
    if (animateOnDataChange) {
      Animated.parallel(
        animations.map((anItem, index) =>
          Animated.timing(anItem, {
            toValue: data[index]?.value ?? 0,
            useNativeDriver: Platform.OS === 'ios', // if useNativeDriver is set to true, animateOnDataChange feature fails for Android, so setting it true only for iOS
            duration: onDataChangeAnimationDuration,
          }),
        ),
      ).start();
    }
  }, [animateOnDataChange, data, onDataChangeAnimationDuration]);

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

  const decreaseWidth2 = useCallback(() => {
    widthValue2.setValue(0);
    Animated.timing(widthValue2, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue2]);

  const decreaseWidth3 = useCallback(() => {
    widthValue3.setValue(0);
    Animated.timing(widthValue3, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue3]);

  const decreaseWidth4 = useCallback(() => {
    widthValue4.setValue(0);
    Animated.timing(widthValue4, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue4]);

  const decreaseWidth5 = useCallback(() => {
    widthValue5.setValue(0);
    Animated.timing(widthValue5, {
      toValue: 1,
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
          toValue: 1,
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
    widthValuesFromSet?.forEach((item, index) => {
      setTimeout(
        () => {
          decreaseWidthsFromSet?.[index]?.();
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

  const renderLabel = (
    index: number,
    label: String,
    labelTextStyle: any,
    labelComponent: Function | undefined,
  ) => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            bottom: 54 - xAxisTextNumberOfLines * 18,
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
    labelComponent: Function | undefined,
  ) => {
    return (
      <Animated.View
        style={[
          {
            height: rotateLabel
              ? 40
              : props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
            position: 'absolute',
            bottom: rotateLabel ? 10 : 54 - xAxisTextNumberOfLines * 18,
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

  const animatedWidth2 = widthValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth3 = widthValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth4 = widthValue4.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const animatedWidth5 = widthValue5.interpolate({
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
    hideDataPoints,
    dataForRender,
    originalDataFromProps,
    dataPtsShape,
    dataPtsWidth,
    dataPtsHeight,
    dataPtsColor,
    dataPtsRadius,
    textColor,
    textFontSize,
    startIndex,
    endIndex,
    isSecondary,
    showValuesAsDataPointsText,
  ) => {
    const getYOrSecondaryY = isSecondary ? getSecondaryY : getY;
    return dataForRender.map((item: lineDataItem, index: number) => {
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

      if (showValuesAsDataPointsText) {
        text = originalDataFromProps[index].value;
      }

      const currentStripHeight = item.stripHeight ?? stripHeight;
      const currentStripWidth = item.stripWidth ?? stripWidth;
      const currentStripOpacity = item.stripOpacity ?? stripOpacity;
      const currentStripColor = item.stripColor || stripColor;
      const position = I18nManager.isRTL ? 'right' : 'left';

      return (
        <Fragment key={index}>
          {focusEnabled ? (
            <>
              {unFocusOnPressOut ? ( // remove strip on onFocus
                <Rect
                  onPressIn={() => onStripPress(item, index)}
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
              )}
            </>
          ) : null}
          {item.showStrip ||
          (focusEnabled && index === selectedIndex && showStripOnFocus) ? (
            <Rect
              x={initialSpacing + spacing * index - currentStripWidth / 2 - 1}
              y={
                currentStripHeight
                  ? containerHeight - currentStripHeight + 8
                  : containerHeight -
                    dataPointsHeight / 2 +
                    14 -
                    (item.value * containerHeight) / maxValue
              }
              width={currentStripWidth}
              height={
                currentStripHeight ||
                (item.value * containerHeight) / maxValue - 2 + overflowTop
              }
              opacity={currentStripOpacity}
              fill={currentStripColor}
            />
          ) : null}
          {hideDataPoints ? null : (
            <>
              {customDataPoint ? (
                <View
                  style={[
                    styles.customDataPointContainer,
                    {
                      height: dataPointsHeight,
                      width: dataPointsWidth,
                      top: getYOrSecondaryY(item.value),
                      [position]:
                        initialSpacing - dataPointsWidth + spacing * index,
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    },
                  ]}>
                  {customDataPoint(item, index)}
                </View>
              ) : null}
              {dataPointsShape === 'rectangular' ? (
                <Fragment key={index}>
                  {customDataPoint ? null : (
                    <Rect
                      x={getX(index) - dataPointsWidth / 2}
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
                        zIndex: index === selectedIndex ? 1000 : 0,
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
                      getX(index) -
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
            </>
          )}
        </Fragment>
      );
    });
  };

  const renderSpecificVerticalLines = (dataForRender: any) => {
    return dataForRender.map((item: lineDataItem, index: number) => {
      if (item.showVerticalLine) {
        const x = getX(index);
        return (
          <Line
            key={index}
            x1={x}
            y1={extendedContainerHeight}
            x2={x}
            y2={
              item.verticalLineUptoDataPoint ?? props.verticalLinesUptoDataPoint
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

  const renderPointer = (lineNumber: number) => {
    if (lineNumber === 1 && hidePointer1) return;
    if (lineNumber === 2 && hidePointer2) return;
    if (lineNumber === 3 && hidePointer3) return;
    if (lineNumber === 4 && hidePointer4) return;
    if (lineNumber === 5 && hidePointer5) return;
    // 6 is for secondaryData
    if (lineNumber === 6 && hideSecondaryPointer) return;

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
      case 6:
        pointerItemLocal = secondaryPointerItem;
        pointerYLocal = secondaryPointerY;
        pointerColorLocal =
          pointerConfig?.secondaryPointerColor || pointerColor;
        break;
    }

    return Pointer({
      pointerX,
      pointerYLocal: pointerYLocal + xAxisThickness,
      pointerComponent,
      pointerHeight,
      pointerRadius,
      pointerWidth,
      pointerItemLocal,
      pointerColorLocal,
    });
  };

  const renderStripAndLabel = () => {
    let pointerItemLocal, pointerYLocal;

    pointerItemLocal = [pointerItem];
    let arr = [pointerY];
    if (pointerY2 !== 0) {
      arr.push(pointerY2);
      pointerItemLocal.push(pointerItem2);
    }
    if (pointerY3 !== 0) {
      arr.push(pointerY3);
      pointerItemLocal.push(pointerItem3);
    }
    if (pointerY4 !== 0) {
      arr.push(pointerY4);
      pointerItemLocal.push(pointerItem4);
    }
    if (pointerY5 !== 0) {
      arr.push(pointerY5);
      pointerItemLocal.push(pointerItem5);
    }
    if (secondaryPointerY !== 0) {
      pointerItemLocal.push(secondaryPointerItem);
    }
    pointerYLocal = Math.min(...arr);

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
      showPointerStrip,
      pointerStripWidth,
      containerHeight,
      xAxisThickness,
      pointerStripColor,
      pointerConfig,
      pointerLabelComponent,
      secondaryPointerItem,
      scrollX,
      pointerEvents,
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
    showArrow: boolean,
    arrowPoints,
    arrowStrokeWidth,
    arrowStrokeColor,
    arrowFillColor,
    key,
  ) => {
    if (!points) return null;
    const isCurved = points.includes('C');
    const isNthAreaChart = getIsNthAreaChart(key ?? 0);
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
      );
    }
    const lineSvgPropsOuter: LineSvgProps = {
      d: points,
      fill: 'none',
      stroke: lineGradient
        ? props.lineGradientId
          ? `url(#${props.lineGradientId})`
          : `url(#lineGradient)`
        : color,
      strokeWidth: currentLineThickness || thickness,
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
      <Svg>
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
        {isNthAreaChart && (
          <Path
            d={fillPoints}
            fill={
              props.areaGradientId
                ? `url(#${props.areaGradientId})`
                : `url(#Gradient)`
            }
            stroke={'transparent'}
            strokeWidth={currentLineThickness || thickness}
          />
        )}

        {/******************************************************************/}

        {renderSpecificVerticalLines(data)}
        {renderSpecificVerticalLines(data2)}
        {renderSpecificVerticalLines(data3)}
        {renderSpecificVerticalLines(data4)}
        {renderSpecificVerticalLines(data5)}

        {dataSet?.map(set => renderSpecificVerticalLines(set?.data)) ?? null}
        {dataSet?.map(set => {
          return renderDataPoints(
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
            false,
            showValuesAsDataPointsText,
          );
        }) ?? null}

        {/***  !!! Here it's done thrice intentionally, trying to make it to only 1 breaks things !!!  ***/}
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
        )}
        {renderDataPoints(
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
        )}
        {renderDataPoints(
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
        )}
        {renderDataPoints(
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
        )}
        {renderDataPoints(
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
        )}
        {secondaryData?.length
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
            )
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

  const activatePointers = x => {
    let factor = (x - initialSpacing) / spacing;
    factor = Math.round(factor);
    factor = Math.min(factor, (data0 ?? data).length - 1);
    factor = Math.max(factor, 0);
    let z =
      initialSpacing +
      spacing * factor -
      (pointerRadius || pointerWidth / 2) -
      1;
    setPointerX(z);
    setPointerIndex(factor);
    let item, y;
    item = (data0 ?? data)[factor];
    y =
      containerHeight -
      (item.value * containerHeight) / maxValue -
      (pointerRadius || pointerHeight / 2) +
      10;
    setPointerY(y);
    setPointerItem(item);
    if (data2 && data2.length) {
      item = data2[factor];
      if (item) {
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
      if (item) {
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
      if (item) {
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
      if (item) {
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
          (item.value * containerHeight) / maxValue -
          (pointerRadius || pointerHeight / 2) +
          10;
        setSecondaryPointerY(y);
        setSecondaryPointerItem(item);
      }
    }
  };

  const renderLine = (
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
    showArrow,
    arrowPoints,
    arrowStrokeWidth,
    arrowStrokeColor,
    arrowFillColor,
    key?: number,
  ) => {
    return (
      <View
        key={key ?? 0}
        onMoveShouldSetResponder={evt => (pointerConfig ? true : false)}
        onResponderGrant={evt => {
          if (!pointerConfig) return;
          setResponderStartTime(evt.timeStamp);
          if (activatePointersOnLongPress) {
            return;
          }
          let x = evt.nativeEvent.locationX;
          activatePointers(x);
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
          let factor = (x - initialSpacing) / spacing;
          factor = Math.round(factor);
          factor = Math.min(factor, (data0 ?? data).length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            1;
          let item, y;
          setPointerX(z);
          setPointerIndex(factor);
          item = (data0 ?? data)[factor];
          y =
            containerHeight -
            (item.value * containerHeight) / maxValue -
            (pointerRadius || pointerHeight / 2) +
            10;
          setPointerY(y);
          setPointerItem(item);
          if (data2 && data2.length) {
            item = data2[factor];
            if (item) {
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
            if (item) {
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
            if (item) {
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
            if (item) {
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
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setSecondaryPointerY(y);
              setSecondaryPointerItem(item);
            }
          }
        }}
        // onResponderReject={evt => {
        //   console.log('evt...reject.......',evt);
        // }}
        onResponderEnd={evt => {
          // console.log('evt...end.......',evt);
          setResponderStartTime(0);
          setPointerIndex(-1);
          setResponderActive(false);
          if (!persistPointer)
            setTimeout(() => setPointerX(0), pointerVanishDelay);
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
        style={{
          position: 'absolute',
          height:
            containerHeightIncludingBelowXAxis +
            (props.overflowBottom ?? dataPointsRadius1),
          bottom:
            60 +
            xAxisLabelsVerticalShift +
            labelsExtraHeight -
            xAxisThickness -
            (props.overflowBottom ?? dataPointsRadius1),
          zIndex: zIndex,
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          width: totalWidth,
        }}>
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
          showArrow,
          arrowPoints,
          arrowStrokeWidth,
          arrowStrokeColor,
          arrowFillColor,
          key,
        )}
      </View>
    );
  };

  const renderAnimatedLine = (
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
    showArrow,
    arrowPoints,
    arrowStrokeWidth,
    arrowStrokeColor,
    arrowFillColor,
    key?: number,
  ) => {
    return (
      <Animated.View
        key={key ?? 0}
        onStartShouldSetResponder={evt => (pointerConfig ? true : false)}
        onMoveShouldSetResponder={evt => (pointerConfig ? true : false)}
        onResponderGrant={evt => {
          if (!pointerConfig) return;
          setResponderStartTime(evt.timeStamp);
          if (activatePointersOnLongPress) {
            return;
          }
          let x = evt.nativeEvent.locationX;
          activatePointers(x);
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
          let factor = (x - initialSpacing) / spacing;
          factor = Math.round(factor);
          factor = Math.min(factor, (data0 ?? data).length - 1);
          factor = Math.max(factor, 0);
          let z =
            initialSpacing +
            spacing * factor -
            (pointerRadius || pointerWidth / 2) -
            1;
          let item, y;
          setPointerX(z);
          setPointerIndex(factor);
          item = (data0 ?? data)[factor];
          y =
            containerHeight -
            (item.value * containerHeight) / maxValue -
            (pointerRadius || pointerHeight / 2) +
            10;
          setPointerY(y);
          setPointerItem(item);
          if (data2 && data2.length) {
            item = data2[factor];
            if (item) {
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
            if (item) {
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
            if (item) {
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
            if (item) {
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
                (item.value * containerHeight) / maxValue -
                (pointerRadius || pointerHeight / 2) +
                10;
              setSecondaryPointerY(y);
              setSecondaryPointerItem(item);
            }
          }
        }}
        // onResponderReject={evt => {
        //   console.log('evt...reject.......',evt);
        // }}
        onResponderEnd={evt => {
          // console.log('evt...end.......',evt);
          setResponderStartTime(0);
          setPointerIndex(-1);
          setResponderActive(false);
          if (!persistPointer)
            setTimeout(() => setPointerX(0), pointerVanishDelay);
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
        style={{
          position: 'absolute',
          height:
            containerHeightIncludingBelowXAxis +
            (props.overflowBottom ?? dataPointsRadius1),
          bottom:
            60 +
            xAxisLabelsVerticalShift +
            labelsExtraHeight -
            xAxisThickness -
            (props.overflowBottom ?? dataPointsRadius1),
          zIndex: zIndex,
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          width: animatedWidth,
        }}>
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
          showArrow,
          arrowPoints,
          arrowStrokeWidth,
          arrowStrokeColor,
          arrowFillColor,
          key,
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
  };

  const renderChartContent = () => {
    return (
      <>
        {dataSet
          ? pointsFromSet.length
            ? dataSet.map((set, index) => {
                if (isAnimated) {
                  return renderAnimatedLine(
                    set.zIndex ?? zIndex1,
                    pointsFromSet[index],
                    animatedWidth,
                    set.thickness ?? thickness1,
                    set.color ?? color1,
                    fillPointsFromSet[index],
                    set.startFillColor ?? startFillColor1,
                    set.endFillColor ?? endFillColor1,
                    set.startOpacity ?? startOpacity1,
                    set.endOpacity ?? endOpacity1,
                    set.strokeDashArray ?? strokeDashArray1,
                    set.showArrow || props.showArrows,
                    arrowPointsFromSet[index],
                    arrowStrokeWidthsFromSet?.[index],
                    arrowStrokeColorsFromSet?.[index],
                    arrowFillColorsFromSet?.[index],
                    index,
                  );
                } else {
                  return renderLine(
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
                    set.showArrow || props.showArrows,
                    arrowPointsFromSet[index],
                    arrowStrokeWidthsFromSet?.[index],
                    arrowStrokeColorsFromSet?.[index],
                    arrowFillColorsFromSet?.[index],
                    index,
                  );
                }
              })
            : null
          : isAnimated
            ? renderAnimatedLine(
                zIndex1,
                points,
                animatedWidth,
                thickness1,
                color1,
                fillPoints,
                startFillColor1,
                endFillColor1,
                startOpacity1,
                endOpacity1,
                strokeDashArray1,
                props.showArrow1 || props.showArrows,
                arrow1Points,
                arrowStrokeWidth1,
                arrowStrokeColor1,
                arrowFillColor1,
                0,
              )
            : renderLine(
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
                props.showArrow1 || props.showArrows,
                arrow1Points,
                arrowStrokeWidth1,
                arrowStrokeColor1,
                arrowFillColor1,
                0,
              )}
        {secondaryPoints
          ? isAnimated
            ? renderAnimatedLine(
                secondaryLineConfig.zIndex,
                secondaryPoints,
                animatedWidth,
                secondaryLineConfig.thickness,
                secondaryLineConfig.color,
                secondaryFillPoints,
                secondaryLineConfig.startFillColor,
                secondaryLineConfig.endFillColor,
                secondaryLineConfig.startOpacity,
                secondaryLineConfig.endOpacity,
                secondaryLineConfig.strokeDashArray,
                secondaryLineConfig.showArrow,
                secondaryArrowPoints,
                secondaryLineConfig.arrowConfig?.strokeWidth,
                secondaryLineConfig.arrowConfig?.strokeColor,
                secondaryLineConfig.arrowConfig?.fillColor,
                6,
              )
            : renderLine(
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
                secondaryLineConfig.showArrow,
                secondaryArrowPoints,
                secondaryLineConfig.arrowConfig?.strokeWidth,
                secondaryLineConfig.arrowConfig?.strokeColor,
                secondaryLineConfig.arrowConfig?.fillColor,
                6,
              )
          : null}
        {points2
          ? isAnimated
            ? renderAnimatedLine(
                zIndex2,
                points2,
                animatedWidth2,
                thickness2,
                color2,
                fillPoints2,
                startFillColor2,
                endFillColor2,
                startOpacity2,
                endOpacity2,
                strokeDashArray2,
                props.showArrow2 || props.showArrows,
                arrow2Points,
                arrowStrokeWidth2,
                arrowStrokeColor2,
                arrowFillColor2,
                1,
              )
            : renderLine(
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
                props.showArrow2 || props.showArrows,
                arrow2Points,
                arrowStrokeWidth2,
                arrowStrokeColor2,
                arrowFillColor2,
                1,
              )
          : null}
        {points3
          ? isAnimated
            ? renderAnimatedLine(
                zIndex3,
                points3,
                animatedWidth3,
                thickness3,
                color3,
                fillPoints3,
                startFillColor3,
                endFillColor3,
                startOpacity3,
                endOpacity3,
                strokeDashArray3,
                props.showArrow3 || props.showArrows,
                arrow3Points,
                arrowStrokeWidth3,
                arrowStrokeColor3,
                arrowFillColor3,
                2,
              )
            : renderLine(
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
                props.showArrow3 || props.showArrows,
                arrow3Points,
                arrowStrokeWidth3,
                arrowStrokeColor3,
                arrowFillColor3,
                2,
              )
          : null}
        {points4
          ? isAnimated
            ? renderAnimatedLine(
                zIndex4,
                points4,
                animatedWidth4,
                thickness4,
                color4,
                fillPoints4,
                startFillColor4,
                endFillColor4,
                startOpacity4,
                endOpacity4,
                strokeDashArray4,
                props.showArrow4 || props.showArrows,
                arrow4Points,
                arrowStrokeWidth4,
                arrowStrokeColor4,
                arrowFillColor4,
                3,
              )
            : renderLine(
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
                props.showArrow4 || props.showArrows,
                arrow4Points,
                arrowStrokeWidth4,
                arrowStrokeColor4,
                arrowFillColor4,
                3,
              )
          : null}
        {points5
          ? isAnimated
            ? renderAnimatedLine(
                zIndex5,
                points5,
                animatedWidth5,
                thickness5,
                color5,
                fillPoints5,
                startFillColor5,
                endFillColor5,
                startOpacity5,
                endOpacity5,
                strokeDashArray5,
                props.showArrow5 || props.showArrows,
                arrow5Points,
                arrowStrokeWidth5,
                arrowStrokeColor5,
                arrowFillColor5,
                4,
              )
            : renderLine(
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
                props.showArrow5 || props.showArrows,
                arrow5Points,
                arrowStrokeWidth5,
                arrowStrokeColor5,
                arrowFillColor5,
                4,
              )
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
              renderPointer(1)
            ) : (
              <>
                {renderPointer(1)}
                {points2 ? renderPointer(2) : null}
                {points3 ? renderPointer(3) : null}
                {points4 ? renderPointer(4) : null}
                {points5 ? renderPointer(5) : null}
                {secondaryPoints ? renderPointer(6) : null}
                {stripOverPointer && renderStripAndLabel()}
              </>
            )}
          </View>
        ) : null}
        {(data0 ?? data).map((item: lineDataItem, index: number) => {
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
      remainingScrollViewProps={remainingScrollViewProps}
    />
  );
};
