import {
  BubbleChartPropsType,
  LineDefaults,
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
import {
  Circle,
  ForeignObject,
  Rect,
  Svg,
  Text as CanvasText,
} from 'react-native-svg';
import {lineDataItemNullSafe} from 'gifted-charts-core';
import {isWebApp, screenWidth} from '../utils';
import {bubbleDataItem} from 'gifted-charts-core';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

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
    showDataPointOnFocus,
    showDataPointLabelOnFocus,
    dataPointsShape,
    dataPointsWidth,
    dataPointsHeight,
    dataPointsColor,
    dataPointsRadius,
    textColor,
    textFontSize,
    startIndex,
    endIndex,
    showValuesAsDataPointsText,
    cumulativeSpacing,
    hideDataPoints,
    xAxisLabelsVerticalShift,
    labelsExtraHeight,
    xAxisThickness,
    xAxisTextNumberOfLines,
    rotateLabel,
    allowFontScaling,
    borderColor,
    borderWidth,
    opacity,
  } = useBubbleChart({
    ...props,
    parentWidth: props.parentWidth ?? screenWidth,
  });
  const radiiValues = useMemo(
    () => (props.data ?? []).map(_ => new Animated.Value(0)),
    [],
  );

  const pointsHeightValues = useMemo(
    () => (props.data ?? []).map(_ => new Animated.Value(0)),
    [],
  );
  const pointsWidthValues = useMemo(
    () => (props.data ?? []).map(_ => new Animated.Value(0)),
    [],
  );

  const scrollRef = props.scrollRef ?? useRef(null);
  const widthValue = useMemo(() => new Animated.Value(0), []);

  const appearingOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const growingRadii = radiiValues.map((r, i) =>
    r.interpolate({
      inputRange: [0, 1],
      outputRange: [0, props.data?.[i].r ?? dataPointsRadius],
    }),
  );

  const growingHeight = pointsHeightValues.map((h, i) =>
    h.interpolate({
      inputRange: [0, 1],
      outputRange: [0, props.data?.[i].dataPointHeight ?? dataPointsHeight],
    }),
  );

  const growingWidth = pointsHeightValues.map((w, i) =>
    w.interpolate({
      inputRange: [0, 1],
      outputRange: [0, props.data?.[i].dataPointWidth ?? dataPointsWidth],
    }),
  );

  const appearingDataPoints = pointsOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity],
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
    radiiValues.forEach(radiusValue => {
      radiusValue.setValue(0);
      Animated.timing(radiusValue, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    });
  }, [radiiValues]);

  const dataPointsHeightsGrow = useCallback(() => {
    pointsHeightValues.forEach(h => {
      h.setValue(0);
      Animated.timing(h, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    });
  }, [pointsHeightValues]);

  const dataPointsWidthsGrow = useCallback(() => {
    pointsWidthValues.forEach(w => {
      w.setValue(0);
      Animated.timing(w, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    });
  }, [pointsWidthValues]);

  // const dataPointsHeightGrow

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
      radiiGrow();
      dataPointsAppear();
      if (dataPointsShape === 'rectangular') {
        dataPointsHeightsGrow();
        dataPointsWidthsGrow();
      }
    }
  }, [isAnimated, dataPointsShape]);

  const svgHeight =
    containerHeightIncludingBelowXAxis + (props.overflowBottom ?? 0);

  const onStripPress = (item: any, index: number) => {
    if (props.focusedDataPointIndex === undefined || !props.onFocus) {
      setSelectedIndex(index);
    }
    if (props.onFocus) {
      props.onFocus(item, index);
    }
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
              : -xAxisTextNumberOfLines * 18,
            zIndex: 10,
            width: spacing + labelsExtraHeight,
            left: initialSpacing + spacing * index - spacing / 2,
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            style={[{textAlign: 'center'}, labelTextStyle]}
            allowFontScaling={allowFontScaling}
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
                : -xAxisTextNumberOfLines * 18,
            zIndex: 10,
            width: spacing,
            left: initialSpacing + spacing * index - spacing / 2,
            opacity: appearingOpacity,
          },
          rotateLabel && {transform: [{rotate: '60deg'}]},
        ]}>
        {labelComponent ? (
          labelComponent()
        ) : (
          <Text
            allowFontScaling={allowFontScaling}
            style={[{textAlign: 'center'}, labelTextStyle]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label}
          </Text>
        )}
      </Animated.View>
    );
  };

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
    const getYOrSecondaryY = getY; //isSecondary ? getSecondaryY : getY;
    return dataForRender.map((item: bubbleDataItem, index: number) => {
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
          item.r ??
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
        dataPointsRadius = item.r ?? dataPtsRadius;
        if (showTextOnFocus) {
          text = '';
        }
        customDataPoint = item.customDataPoint || props.customDataPoint;
        dataPointLabelComponent =
          item.dataPointLabelComponent || props.dataPointLabelComponent;
      }

      if (showValuesAsDataPointsText) {
        text = originalDataFromProps[index].y;
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
          {hideDataPoints ? null : (
            <>
              {customDataPoint ? (
                isWebApp ? (
                  <ForeignObject
                    height={svgHeight}
                    width={totalWidth}
                    x={
                      initialSpacing -
                      dataPointsWidth / 2 +
                      (spacingArray[index - 1] ?? 0)
                    }
                    y={getYOrSecondaryY(item.y) - dataPointsHeight / 2}>
                    {customDataPoint(item, index)}
                  </ForeignObject>
                ) : (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      // height: svgHeight,
                      // width: totalWidth,
                      left:
                        initialSpacing -
                        dataPointsWidth / 2 +
                        (spacingArray[index - 1] ?? 0),
                      top: getYOrSecondaryY(item.y) - dataPointsHeight / 2,
                      opacity: isAnimated ? appearingOpacity : 1,
                    }}>
                    {customDataPoint(item, index)}
                  </Animated.View>
                )
              ) : null}
              {dataPointsShape === 'rectangular' ? (
                <Fragment key={index}>
                  {customDataPoint ? null : (
                    <AnimatedRect
                      x={getX(spacingArray, index) - dataPointsWidth / 2}
                      y={getYOrSecondaryY(item.y) - dataPointsHeight / 2}
                      width={isAnimated ? growingWidth[index] : dataPointsWidth}
                      height={
                        isAnimated ? growingHeight[index] : dataPointsHeight
                      }
                      opacity={isAnimated ? appearingDataPoints : opacity}
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
                  {customDataPoint ? null : (
                    <AnimatedCircle
                      cx={getX(spacingArray, index)} // <-- here
                      cy={getYOrSecondaryY(item.y)}
                      r={isAnimated ? growingRadii[index] : dataPointsRadius}
                      fill={
                        showDataPointOnFocus
                          ? index === selectedIndex
                            ? dataPointsColor
                            : 'none'
                          : dataPointsColor
                      }
                      opacity={isAnimated ? appearingDataPoints : opacity}
                      stroke={item.borderColor ?? borderColor}
                      strokeWidth={item.borderWidth ?? borderWidth}
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
              {dataPointLabelComponent ? (
                !showTextOnFocus || index === selectedIndex ? (
                  isWebApp ? (
                    <ForeignObject
                      height={svgHeight}
                      width={dataPointLabelWidth}
                      x={
                        initialSpacing +
                        (item.dataPointLabelShiftX ||
                          props.dataPointLabelShiftX ||
                          0) -
                        dataPointLabelWidth / 2 +
                        spacing * index
                      }
                      y={
                        containerHeight +
                        (item.dataPointLabelShiftY ||
                          props.dataPointLabelShiftY ||
                          0) -
                        (item.y * containerHeight) / maxValue
                      }>
                      {showDataPointLabelOnFocus
                        ? index === selectedIndex &&
                          (focusTogether || key == selectedLineNumber)
                          ? dataPointLabelComponent(item, index) // not pushed in latest release
                          : null
                        : dataPointLabelComponent(item, index)}
                    </ForeignObject>
                  ) : (
                    <View
                      style={{
                        position: 'absolute',
                        height: svgHeight,
                        width: dataPointLabelWidth,
                        left:
                          initialSpacing +
                          (item.dataPointLabelShiftX ||
                            props.dataPointLabelShiftX ||
                            0) -
                          dataPointLabelWidth / 2 +
                          spacing * index,
                        top:
                          containerHeight +
                          (item.dataPointLabelShiftY ||
                            props.dataPointLabelShiftY ||
                            0) -
                          (item.y * containerHeight) / maxValue,
                      }}>
                      {showDataPointLabelOnFocus
                        ? index === selectedIndex &&
                          (focusTogether || key == selectedLineNumber)
                          ? dataPointLabelComponent(item, index) // not pushed in latest release
                          : null
                        : dataPointLabelComponent(item, index)}
                    </View>
                  )
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
                      getYOrSecondaryY(item.y) -
                      dataPointsHeight / 2 +
                      (item.textShiftY || props.textShiftY || 0)
                    }>
                    {!showTextOnFocus && !showValuesAsDataPointsText
                      ? item.dataPointText
                      : text}
                  </CanvasText>
                ) : null
              ) : null}
              {/* Workaround to fix the issue - focusedCustomDataPoint not rendering for focused data, (when both customDataPoint and focusedCustomDataPoint are used together)*/}
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
            hideDataPoints,
            props.data,
            props.data,
            dataPointsShape,
            dataPointsWidth,
            dataPointsHeight,
            dataPointsColor,
            dataPointsRadius,
            textColor,
            textFontSize,
            startIndex,
            endIndex,
            false,
            showValuesAsDataPointsText,
            cumulativeSpacing,
            0,
          )}
        </Svg>
        {props.data?.map((item: bubbleDataItem, index: number) => {
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
